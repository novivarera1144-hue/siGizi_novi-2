<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class LaporanController extends Controller
{
    public function index(SupabaseService $supabase)
    {
        $userId = Auth::id() ?? 1;

        // 1. Ambil data scan dari Supabase
        $scans = $supabase->get('riwayat_scan_makanans', [
            'user_id' => 'eq.' . $userId,
            'order'   => 'created_at.asc',
            'limit'   => 500
        ]);

        if (!is_array($scans)) {
            $scans = [];
        }

        // 2. Tentukan rentang waktu MINGGU INI (Senin 00:00:00 s/d Minggu 23:59:59)
        $now = Carbon::now();
        $startOfWeek = $now->copy()->startOfWeek(Carbon::MONDAY);
        $endOfWeek = $now->copy()->endOfWeek(Carbon::SUNDAY);

        // 3. Filter scan yang HANYA terjadi di MINGGU INI
        $weeklyScans = array_filter($scans, function ($s) use ($startOfWeek, $endOfWeek) {
            if (!isset($s['created_at'])) return false;
            $dt = Carbon::parse($s['created_at']);
            return $dt->between($startOfWeek, $endOfWeek);
        });

        $days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
        $barData = [];
        $lineData = [];
        $totalCaloriesAll = 0;
        $totalProteinAll = 0;
        $totalLemakAll = 0;
        $totalKarboAll = 0;
        $scores = [];
        $targetMetDays = 0;

        // Target harian standar
        $dailyCalorieTarget = 2000;

        // 4. Looping untuk setiap hari dari Senin (index 0) sampai Minggu (index 6)
        foreach ($days as $idx => $d) {
            // Ambil tanggal spesifik untuk hari tersebut di minggu ini
            $targetDate = $startOfWeek->copy()->addDays($idx)->format('Y-m-d');

            // Filter scan khusus di tanggal tersebut
            $dayScans = array_filter($weeklyScans, function ($s) use ($targetDate) {
                return Carbon::parse($s['created_at'])->format('Y-m-d') === $targetDate;
            });

            // Hitung total murni dari database
            $cals = array_sum(array_column($dayScans, 'kalori_terdeteksi'));
            $prot = array_sum(array_column($dayScans, 'protein'));
            $lemak = array_sum(array_column($dayScans, 'lemak'));
            $karbo = array_sum(array_column($dayScans, 'karbohidrat'));

            // Cek apakah kalori hari ini memenuhi target
            if ($cals >= 1600 && $cals <= 2400) {
                $targetMetDays++;
            }

            $totalCaloriesAll += $cals;
            $totalProteinAll += $prot;
            $totalLemakAll += $lemak;
            $totalKarboAll += $karbo;

            // Hitung skor nutrisi harian
            $score = count($dayScans) > 0 
                ? min(99, max(40, round(85 - ($lemak * 0.5) + ($prot * 0.4)))) 
                : 0;
            
            if ($score > 0) {
                $scores[] = $score;
            }

            // Data Bar Chart (Kalori Harian vs Target)
            $barData[] = [
                'name'   => $d,
                'Aktual' => $cals,
                'Target' => $dailyCalorieTarget
            ];

            // Data Line Chart (Tren Nutrisi)
            $lineData[] = [
                'name'    => $d,
                'Protein' => $prot,
                'Lemak'   => $lemak,
                'Karbo'   => $karbo
            ];
        }

        // 5. Hitung Ringkasan & Rata-rata Mingguan
        $avgCalories = round($totalCaloriesAll / 7);
        $avgProtein  = round($totalProteinAll / 7);
        $avgScore    = count($scores) > 0 ? round(array_sum($scores) / count($scores)) : 0;

        // 6. Data Radar Chart
        $radarData = [
            ['subject' => 'Kalori',     'A' => min(100, round(($avgCalories / $dailyCalorieTarget) * 100)), 'fullMark' => 100],
            ['subject' => 'Protein',    'A' => min(100, round(($avgProtein / 60) * 100)),                   'fullMark' => 100],
            ['subject' => 'Lemak',      'A' => min(100, round((($totalLemakAll / 7) / 65) * 100)),          'fullMark' => 100],
            ['subject' => 'Karbohidrat','A' => min(100, round((($totalKarboAll / 7) / 300) * 100)),         'fullMark' => 100],
            ['subject' => 'Serat',      'A' => 0, 'fullMark' => 100],
            ['subject' => 'Vitamin',    'A' => 0, 'fullMark' => 100],
        ];

        return Inertia::render('LaporanMingguan', [
            'barData'   => $barData,
            'lineData'  => $lineData,
            'radarData' => $radarData,
            'summaryStats' => [
                'avgCalories'   => $avgCalories,
                'avgProtein'    => $avgProtein,
                'targetMetDays' => $targetMetDays,
                'avgScore'      => $avgScore,
                'totalCalories' => $totalCaloriesAll,
                'totalScans'    => count($weeklyScans),
                // Menggunakan translatedFormat agar bulan tampil dalam Bahasa Indonesia
                'dateRange'     => $startOfWeek->translatedFormat('d M') . ' - ' . $endOfWeek->translatedFormat('d M Y')
            ]
        ]);
    }
}