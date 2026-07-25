<?php

namespace App\Http\Controllers;

use App\Exceptions\GeminiApiException;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ScanController extends Controller
{
    /**
     * Handle the incoming food scan upload request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Services\GeminiService  $geminiService
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, GeminiService $geminiService)
    {
        // 1. Validasi input gambar (jpeg/jpg/png, max 10MB)
        $request->validate([
            'image' => 'required|image|mimes:jpeg,jpg,png|max:10240',
        ]);

        try {
            // 2. Simpan gambar ke public storage untuk ditampilkan di ResultPage
            $path = $request->file('image')->store('uploads', 'public');
            $imageUrl = asset('storage/' . $path);

            // 3. Panggil GeminiService untuk analisis makanan
            $data = $geminiService->analyzeFood($request->file('image'));

            // 4. Format data nutrisi dari response Gemini
            $foodName = $data['nama_makanan'] ?? 'Makanan Terdeteksi';
            $calories = intval($data['total_kalori'] ?? 350);
            $protG = intval($data['protein'] ?? 15);
            $lemakG = intval($data['lemak'] ?? 10);
            $karboG = intval($data['karbohidrat'] ?? 45);
            $insight = $data['health_insight'] ?? 'Makanan sehat seimbang.';

            $rawRecs = $data['saran_rekomendasi'] ?? [];
            if (!is_array($rawRecs)) {
                $rawRecs = [$rawRecs];
            }

            $recommendations = [];
            foreach ($rawRecs as $index => $text) {
                // Alternating color styles matching theme designs
                $color = ($index === 1) 
                    ? 'bg-amber-50/40 border-amber-100/50 text-amber-700' 
                    : 'bg-emerald-50/40 border-emerald-100/50 text-[#1F7A54]';
                $recommendations[] = [
                    'text' => $text,
                    'color' => $color
                ];
            }

            // Target split ratios: Protein (90g), Lemak (65g), Karbohidrat (250g)
            $nutrients = [
                [
                    'name' => 'Protein', 
                    'current' => $protG, 
                    'target' => 90, 
                    'pct' => min(100, round(($protG / 90) * 100)), 
                    'barColor' => 'bg-blue-500', 
                    'textColor' => 'text-blue-500'
                ],
                [
                    'name' => 'Lemak', 
                    'current' => $lemakG, 
                    'target' => 65, 
                    'pct' => min(100, round(($lemakG / 65) * 100)), 
                    'barColor' => 'bg-amber-500', 
                    'textColor' => 'text-amber-500'
                ],
                [
                    'name' => 'Karbo', 
                    'current' => $karboG, 
                    'target' => 250, 
                    'pct' => min(100, round(($karboG / 250) * 100)), 
                    'barColor' => 'bg-emerald-500', 
                    'textColor' => 'text-emerald-500'
                ],
            ];

            // Dynamic health score calculation based on balance
            $score = min(99, max(40, round(85 - ($lemakG * 0.5) + ($protG * 0.4))));

            if ($calories < 300) {
                $badge = 'Rendah Kalori — Cocok untuk Diet';
            } else if ($calories > 600) {
                $badge = 'Tinggi Kalori — Pastikan Aktivitas Cukup';
            } else {
                $badge = 'Nutrisi Seimbang — Cocok untuk Makan Siang';
            }

            $hasilAnalisis = [
                'name' => $foodName,
                'calories' => $calories,
                'score' => $score,
                'image' => $imageUrl,
                'nutrients' => $nutrients,
                'insight' => $insight,
                'recommendations' => $recommendations,
                'badge' => $badge,
            ];

            // 5. Render ResultPage via Inertia
            return Inertia::render('ResultPage', [
                'data' => $hasilAnalisis
            ]);

        } catch (GeminiApiException $e) {
            Log::error('Gemini API Exception: ' . $e->getMessage(), [
                'response_body' => $e->getResponseBody(),
            ]);
            return back()->withErrors([
                'image' => $e->getMessage()
            ]);

        } catch (\Exception $e) {
            Log::error('Scan Error: ' . $e->getMessage());
            return back()->withErrors([
                'image' => 'Terjadi kesalahan sistem saat menganalisis gambar: ' . $e->getMessage()
            ]);
        }
    }
}
