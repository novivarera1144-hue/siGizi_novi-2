<?php

namespace App\Services;

use App\Exceptions\GeminiApiException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    /**
     * Gemini API base URL.
     */
    protected string $baseUrl;

    /**
     * Gemini API key.
     */
    protected ?string $apiKey;

    /**
     * Gemini model identifier.
     */
    protected string $model;

    public function __construct()
    {
        $this->baseUrl = config('services.gemini.base_url') ?? 'https://generativelanguage.googleapis.com/v1beta';
        $this->apiKey = config('services.gemini.api_key') ?? env('GEMINI_API_KEY') ?? '';
        $this->model = config('services.gemini.model') ?? 'gemini-1.5-flash';
    }

    /**
     * Analyze a food image using Google Gemini API.
     *
     * @param  \Illuminate\Http\UploadedFile  $image
     * @return array  Parsed JSON response with nutritional data
     *
     * @throws \App\Exceptions\GeminiApiException
     */
    public function analyzeFood(UploadedFile $image): array
    {
        if (empty($this->apiKey)) {
            throw new GeminiApiException('GEMINI_API_KEY belum diatur di file .env.');
        }

        // 1. Encode image to base64
        $imageBase64 = base64_encode(file_get_contents($image->getRealPath()));
        $mimeType = $image->getMimeType();

        // 2. Build request body sesuai dokumentasi Google Gemini API
        //    Reference: https://ai.google.dev/gemini-api/docs/text-generation
        $requestBody = [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => 'Analisis foto makanan ini. Berikan jawaban dalam format JSON sesuai schema yang diberikan. Tentukan kandungan gizi (protein, lemak, karbohidrat) hanya dalam bentuk angka gram saja tanpa satuan (misal 18, bukan \'18g\'). Berikan maksimal 3 saran rekomendasi.',
                        ],
                        [
                            'inlineData' => [
                                'mimeType' => $mimeType,
                                'data' => $imageBase64,
                            ],
                        ],
                    ],
                ],
            ],
            'generationConfig' => [
                'responseMimeType' => 'application/json',
                'responseSchema' => [
                    'type' => 'object',
                    'properties' => [
                        'nama_makanan' => ['type' => 'string'],
                        'total_kalori' => ['type' => 'integer'],
                        'protein' => ['type' => 'integer'],
                        'lemak' => ['type' => 'integer'],
                        'karbohidrat' => ['type' => 'integer'],
                        'health_insight' => ['type' => 'string'],
                        'saran_rekomendasi' => [
                            'type' => 'array',
                            'items' => ['type' => 'string'],
                        ],
                    ],
                    'required' => ['nama_makanan', 'total_kalori', 'protein', 'lemak', 'karbohidrat', 'health_insight', 'saran_rekomendasi'],
                ],
                'maxOutputTokens' => 1024,
            ],
        ];

        // 3. Build endpoint URL
        //    Format: {baseUrl}/models/{model}:generateContent
        $url = "{$this->baseUrl}/models/{$this->model}:generateContent";

        // 4. Send POST request with x-goog-api-key header
        //    Sesuai dokumentasi Google: API key dikirim via header, BUKAN query parameter
        //    Reference: https://ai.google.dev/gemini-api/docs/quickstart
        $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'x-goog-api-key' => $this->apiKey,
            ])
            ->timeout(120)
            ->post($url, $requestBody);

        // 5. Handle HTTP errors
        if ($response->failed()) {
            $errorMessage = $response->json('error.message') ?? 'Unknown Gemini API error';
            $statusCode = $response->status();

            Log::error('Gemini API Error', [
                'status' => $statusCode,
                'error' => $errorMessage,
                'body' => $response->body(),
            ]);

            throw new GeminiApiException(
                "Gemini API error ({$statusCode}): {$errorMessage}",
                $statusCode,
                null,
                $response->body()
            );
        }

        // 6. Parse response sesuai struktur Google Gemini API
        //    Response: { candidates: [{ content: { parts: [{ text: "..." }] } }] }
        $result = $response->json();
        $textResponse = $result['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (empty($textResponse)) {
            Log::warning('Gemini API returned empty response', ['result' => $result]);
            throw new GeminiApiException('Gemini API mengembalikan response kosong.');
        }

        // 7. Clean up the text response before JSON decoding
        //    Gemini sometimes returns JSON wrapped in markdown code fences or with extra whitespace
        $cleanedText = trim($textResponse);

        // Strip markdown code fences if present (```json ... ``` or ``` ... ```)
        if (preg_match('/^```(?:json)?\s*\n?(.*?)\n?\s*```$/s', $cleanedText, $matches)) {
            $cleanedText = trim($matches[1]);
        }

        // Clean control characters (e.g. unescaped newlines/tabs) that break json_decode
        $cleanedText = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $cleanedText);

        // 8. Decode the JSON text from Gemini's response
        $data = json_decode($cleanedText, true);

        // IMPORTANT: Capture json error immediately BEFORE any logging
        // Log::warning() internally calls json_encode which resets json_last_error()
        $jsonError = json_last_error();
        $jsonErrorMsg = json_last_error_msg();

        if ($jsonError !== JSON_ERROR_NONE) {
            // Attempt to repair truncated JSON (missing closing braces/brackets)
            $repaired = $this->attemptJsonRepair($cleanedText);
            if ($repaired !== null) {
                $data = $repaired;
            } else {
                Log::warning('Failed to parse Gemini JSON response', [
                    'raw' => $cleanedText,
                    'json_error' => $jsonErrorMsg,
                ]);
                throw new GeminiApiException(
                    'Gagal mem-parse response JSON dari Gemini: ' . $jsonErrorMsg
                );
            }
        }

        if (!is_array($data) || !isset($data['nama_makanan'])) {
            Log::warning('Gemini response missing required fields', ['data' => $data]);
            throw new GeminiApiException('AI gagal mengidentifikasi makanan di dalam foto. Coba ganti sudut foto atau ganti gambar.');
        }

        return $data;
    }

    /**
     * Attempt to repair truncated JSON by adding missing closing braces/brackets.
     *
     * Gemini sometimes returns JSON that is cut off at the end, missing
     * closing } or ] characters. This method tries to fix that.
     *
     * @param  string  $json  The potentially truncated JSON string
     * @return array|null  Parsed array if repair succeeded, null otherwise
     */
    protected function attemptJsonRepair(string $json): ?array
    {
        // Count opening and closing braces/brackets
        $openBraces = substr_count($json, '{');
        $closeBraces = substr_count($json, '}');
        $openBrackets = substr_count($json, '[');
        $closeBrackets = substr_count($json, ']');

        $repaired = $json;

        // Add missing closing brackets
        $missingBrackets = $openBrackets - $closeBrackets;
        if ($missingBrackets > 0) {
            $repaired .= str_repeat(']', $missingBrackets);
        }

        // Add missing closing braces
        $missingBraces = $openBraces - $closeBraces;
        if ($missingBraces > 0) {
            $repaired .= str_repeat('}', $missingBraces);
        }

        // Try to decode the repaired JSON
        $data = json_decode($repaired, true);

        if (json_last_error() === JSON_ERROR_NONE && is_array($data)) {
            Log::info('Successfully repaired truncated Gemini JSON response');
            return $data;
        }

        return null;
    }
}