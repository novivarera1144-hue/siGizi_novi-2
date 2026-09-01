<?php

namespace App\Services;

use App\Exceptions\GeminiApiException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected string $baseUrl;
    protected ?string $apiKey;
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
     * @param  ?string  $userFoodName
     * @return array  Parsed JSON response with nutritional data
     *
     * @throws \App\Exceptions\GeminiApiException
     */
    public function analyzeFood(UploadedFile $image, ?string $userFoodName = null): array
    {
        if (empty($this->apiKey)) {
            throw new GeminiApiException('GEMINI_API_KEY belum diatur di file .env.');
        }

        $imageBase64 = base64_encode(file_get_contents($image->getRealPath()));
        $mimeType = $image->getMimeType();

        $promptContext = "Analisis foto makanan ini.";
        if (!empty($userFoodName)) {
            $promptContext = "Analisis foto makanan ini yang diketahui atau dinamai oleh pengguna sebagai \"{$userFoodName}\". Gunakan nama ini atau variasi akuratnya pada field nama_makanan.";
        }

        $requestBody = [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => "{$promptContext} Berikan jawaban dalam format JSON sesuai schema yang diberikan. Tentukan kandungan gizi (protein, lemak, karbohidrat) hanya dalam bentuk angka gram saja tanpa satuan (misal 18, bukan '18g'). Berikan maksimal 3 saran rekomendasi. PENTING: Kembalikan HANYA data JSON murni yang valid tanpa menyertakan teks pengantar, penjelas, penutup, atau membungkusnya dalam blok markdown (seperti ```json ... ```).",
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
                'maxOutputTokens' => 2048,
            ],
        ];

        $url = "{$this->baseUrl}/models/{$this->model}:generateContent";

        $maxRetries = 2;
        $retryDelay = 1500000;
        $response = null;

        for ($attempt = 0; $attempt <= $maxRetries; $attempt++) {
            $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'x-goog-api-key' => $this->apiKey,
                ])
                ->timeout(120)
                ->post($url, $requestBody);

            if ($response->status() !== 429 || $attempt === $maxRetries) {
                break;
            }

            usleep($retryDelay * ($attempt + 1));
        }

        if ($response->failed()) {
            $statusCode = $response->status();
            $errorMessage = $response->json('error.message') ?? 'Unknown Gemini API error';

            if ($statusCode === 429) {
                $friendlyMessage = 'Terlalu banyak permintaan dalam waktu singkat. Mohon tunggu beberapa detik sebelum mencoba scan ulang.';
            } else {
                $friendlyMessage = "Gemini API error ({$statusCode}): {$errorMessage}";
            }

            Log::error('Gemini API Error', [
                'status' => $statusCode,
                'error' => $errorMessage,
                'body' => $response->body(),
            ]);

            throw new GeminiApiException(
                $friendlyMessage,
                $statusCode,
                null,
                $response->body()
            );
        }

        $result = $response->json();
        $textResponse = $result['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (empty($textResponse)) {
            Log::warning('Gemini API returned empty response', ['result' => $result]);
            throw new GeminiApiException('Gemini API mengembalikan response kosong.');
        }

        $rawResponse = trim($textResponse);

        if (preg_match('/^```(?:json)?\s*\n?(.*?)\n?\s*```$/s', $rawResponse, $matches)) {
            $rawResponse = trim($matches[1]);
        }

        if (($firstOpen = strpos($rawResponse, '{')) !== false && ($lastClose = strrpos($rawResponse, '}')) !== false) {
            $rawResponse = substr($rawResponse, $firstOpen, $lastClose - $firstOpen + 1);
        }

        $cleanedText = preg_replace('/[\x00-\x1F\x7F-\x9F]/u', '', $rawResponse);
        $data = json_decode($cleanedText, true);

        $jsonError = json_last_error();
        $jsonErrorMsg = json_last_error_msg();

        if ($jsonError !== JSON_ERROR_NONE) {
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

        if (!is_array($data)) {
            Log::warning('Gemini response is not an array', ['data' => $data]);
            throw new GeminiApiException('AI gagal mengidentifikasi makanan di dalam foto. Coba ganti sudut foto atau ganti gambar.');
        }

        // Paksa/override property nama_makanan dengan input manual dari user secara mutlak
        if (!empty($userFoodName)) {
            $data['nama_makanan'] = trim($userFoodName);
        } elseif (!isset($data['nama_makanan'])) {
            Log::warning('Gemini response missing required fields', ['data' => $data]);
            throw new GeminiApiException('AI gagal mengidentifikasi makanan di dalam foto. Coba ganti sudut foto atau ganti gambar.');
        }

        return $data;
    }

    public function chat(string $message, array $history = []): string
    {
        if (empty($this->apiKey)) {
            throw new GeminiApiException('GEMINI_API_KEY belum diatur di file .env.');
        }

        $contents = [];
        $recentHistory = array_slice($history, -20);
        foreach ($recentHistory as $msg) {
            $contents[] = [
                'role' => $msg['role'] === 'user' ? 'user' : 'model',
                'parts' => [['text' => $msg['text']]],
            ];
        }

        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => $message]],
        ];

        $requestBody = [
            'system_instruction' => [
                'parts' => [
                    [
                        'text' => 'Kamu adalah "siGizi AI", asisten nutrisi cerdas berbahasa Indonesia. '
                            . 'Tugasmu adalah menjawab pertanyaan seputar nutrisi, kalori, pola makan sehat, diet, '
                            . 'kandungan gizi makanan, dan rekomendasi makanan. '
                            . 'Berikan jawaban yang informatif, ramah, dan mudah dipahami. '
                            . 'Gunakan emoji sesekali agar lebih menarik. '
                            . 'Jika pertanyaan di luar topik nutrisi/kesehatan, arahkan kembali dengan sopan.',
                    ],
                ],
            ],
            'contents' => $contents,
            'generationConfig' => [
                'maxOutputTokens' => 2048,
                'temperature' => 0.7,
            ],
        ];

        $url = "{$this->baseUrl}/models/{$this->model}:generateContent";

        $maxRetries = 2;
        $retryDelay = 1500000;
        $response = null;

        for ($attempt = 0; $attempt <= $maxRetries; $attempt++) {
            $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'x-goog-api-key' => $this->apiKey,
                ])
                ->timeout(60)
                ->post($url, $requestBody);

            if ($response->status() !== 429 || $attempt === $maxRetries) {
                break;
            }

            usleep($retryDelay * ($attempt + 1));
        }

        if ($response->failed()) {
            $errorMessage = $response->json('error.message') ?? 'Unknown Gemini API error';
            $statusCode = $response->status();

            if ($statusCode === 429) {
                $friendlyMessage = 'Terlalu banyak permintaan dalam waktu singkat. Mohon tunggu beberapa detik sebelum mengirim pesan kembali.';
            } else {
                $friendlyMessage = "Gemini API error ({$statusCode}): {$errorMessage}";
            }

            Log::error('Gemini Chat API Error', [
                'status' => $statusCode,
                'error' => $errorMessage,
            ]);

            throw new GeminiApiException(
                $friendlyMessage,
                $statusCode,
                null,
                $response->body()
            );
        }

        $result = $response->json();
        $textResponse = $result['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (empty($textResponse)) {
            Log::warning('Gemini Chat API returned empty response', ['result' => $result]);
            throw new GeminiApiException('AI tidak dapat memberikan jawaban saat ini.');
        }

        return trim($textResponse);
    }

    protected function attemptJsonRepair(string $json): ?array
    {
        $json = trim($json);

        if (substr_count($json, '"') % 2 !== 0) {
            $json .= '"';
        }

        $openBraces = substr_count($json, '{');
        $closeBraces = substr_count($json, '}');
        $openBrackets = substr_count($json, '[');
        $closeBrackets = substr_count($json, ']');

        $repaired = $json;

        $missingBrackets = $openBrackets - $closeBrackets;
        if ($missingBrackets > 0) {
            $repaired .= str_repeat(']', $missingBrackets);
        }

        $missingBraces = $openBraces - $closeBraces;
        if ($missingBraces > 0) {
            $repaired .= str_repeat('}', $missingBraces);
        }

        $data = json_decode($repaired, true);

        if (json_last_error() === JSON_ERROR_NONE && is_array($data)) {
            Log::info('Successfully repaired truncated Gemini JSON response');
            return $data;
        }

        return null;
    }
}