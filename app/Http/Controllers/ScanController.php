<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\GeminiApiException;
use App\Services\GeminiService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ScanController extends Controller
{
    public function store(Request $request, GeminiService $geminiService)
    {
        // 1. Validasi input gambar DAN nama makanan
        $request->validate([
            'image' => 'required|image|mimes:jpeg,jpg,png|max:10240',
            'nama_makanan' => 'nullable|string|max:255',
            'food_name' => 'nullable|string|max:255',
        ]);

        try {
            // 2. Pastikan folder uploads ada di public storage
            if (!Storage::disk('public')->exists('uploads')) {
                Storage::disk('public')->makeDirectory('uploads');
            }

            // Simpan gambar ke public storage untuk ditampilkan di ResultPage
            $path = $request->file('image')->store('uploads', 'public');
            $imageUrl = asset('storage/' . $path);

            // Ambil input nama makanan dari user
            $userFoodName = $request->input('nama_makanan') ?: $request->input('food_name');

            // 3. Panggil GeminiService dengan menyertakan nama makanan pilihan user
            $data = $geminiService->analyzeFood($request->file('image'), $userFoodName);

            // 4. Format data nutrisi dari response Gemini
            $foodName = !empty($userFoodName) ? trim($userFoodName) : ($data['nama_makanan'] ?? 'Makanan Terdeteksi');
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
                $color = ($index === 1) 
                    ? 'bg-amber-50/40 border-amber-100/50 text-amber-700' 
                    : 'bg-emerald-50/40 border-emerald-100/50 text-[#1F7A54]';
                $recommendations[] = [
                    'text' => $text,
                    'color' => $color
                ];
            }

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
            
            $userId = auth()->id() ?? 1;
            $now = now()->format('Y-m-d H:i:s');

            $supabase = app(\App\Services\SupabaseService::class);
            
            $supabase->insert('riwayat_scan_makanans', [
                'user_id' => $userId,
                'nama_makanan' => $foodName,
                'foto_scan' => $imageUrl,
                'kalori_terdeteksi' => $calories,
                'protein' => $protG,
                'karbohidrat' => $karboG,
                'lemak' => $lemakG,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            $supabase->insert('data_nutrisis', [
                'user_id'      => $userId,
                'nama_makanan' => $foodName,
                'gambar_makanan' => $imageUrl,
                'kalori'       => $calories,
                'protein'      => $protG,
                'karbohidrat'  => $karboG,
                'lemak'        => $lemakG,
                'created_at'   => $now,
                'updated_at'   => $now,
            ]);

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