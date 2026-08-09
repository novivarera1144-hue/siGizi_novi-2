<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(SupabaseService $supabase)
    {
        $user = Auth::user();
        if ($user && $user->email === 'admin@sigizi.com') {
            return redirect()->route('admin.dashboard');
        }

        $userId = Auth::id();

        $scans = [];
        if ($userId) {
            $scans = $supabase->get('riwayat_scan_makanans', [
                'user_id' => 'eq.' . $userId,
                'order'   => 'created_at.desc',
                'limit'   => 100
            ]);
        }

        if (!is_array($scans)) {
            $scans = [];
        }

        // 1. Ambil Tanggal Hari Ini (Y-m-d)
        $todayStr = Carbon::today()->toDateString();

        // 2. Filter Scan Khusus Hari Ini (Untuk Angka Utama di Kotak Atas)
        $todayScans = array_filter($scans, function ($scan) use ($todayStr) {
            if (!isset($scan['created_at'])) return false;
            $scanDate = Carbon::parse($scan['created_at'])->toDateString();
            return $scanDate === $todayStr;
        });

        // Hitung nutrisi khusus HARI INI
        $todayKalori = array_sum(array_column($todayScans, 'kalori_terdeteksi'));
        $todayProtein = array_sum(array_column($todayScans, 'protein'));
        $todayLemak = array_sum(array_column($todayScans, 'lemak'));
        $todayKarbo = array_sum(array_column($todayScans, 'karbohidrat'));

        // 3. Hitung Total Keseluruhan (All-Time) untuk "Total Sementara"
        $totalKaloriAll = array_sum(array_column($scans, 'kalori_terdeteksi'));
        $totalProteinAll = array_sum(array_column($scans, 'protein'));
        $totalLemakAll = array_sum(array_column($scans, 'lemak'));
        $totalKarboAll = array_sum(array_column($scans, 'karbohidrat'));

        if ($user && $user->target_calories) {
            $targetCalories = $user->target_calories;
            $targetProtein = $user->target_protein ?? round($user->weight * 1.5);
            $targetFat = $user->target_fat ?? round(($targetCalories * 0.25) / 9);
            $targetCarbs = $user->target_carbs ?? round(($targetCalories * 0.60) / 4);
        } else {
            $targetCalories = 2000;
            if ($user && $user->height && $user->weight) {
                $bmr = (10 * $user->weight) + (6.25 * $user->height) - 120;
                $tdee = $bmr * 1.375;
                if ($user->weight_goal === 'Menurunkan Berat Badan') {
                    $targetCalories = $tdee - 400;
                } elseif ($user->weight_goal === 'Menaikkan Berat Badan') {
                    $targetCalories = $tdee + 400;
                } else {
                    $targetCalories = $tdee;
                }
                $targetCalories = max(1200, min(4000, round($targetCalories / 50) * 50));
            }
            $targetProtein = $user && $user->weight ? round($user->weight * 1.5) : 90;
            $targetFat = round(($targetCalories * 0.25) / 9);
            $targetCarbs = round(($targetCalories * 0.60) / 4);
        }

        // --- PERUBAHAN: 'value' pakai data hari ini, 'total_sementara' (atau sesuaikan dengan props di frontend) pakai data all-time ---
        // Jika di Frontend Anda menggunakan properti terpisah, sesuaikan kuncinya di bawah ini:
        $stats = [
            [
                'title' => 'Kalori Hari Ini',
                'value' => number_format($todayKalori),
                'total_sementara' => number_format($totalKaloriAll) . ' kkal',
                'unit' => 'kkal',
                'target' => 'Target: ' . number_format($targetCalories) . ' kkal',
                'color' => 'bg-orange-500 text-white',
                'icon' => 'cal'
            ],
            [
                'title' => 'Protein',
                'value' => $todayProtein . 'g',
                'total_sementara' => $totalProteinAll . 'g',
                'unit' => 'g',
                'target' => 'Target: ' . $targetProtein . 'g',
                'color' => 'bg-blue-500 text-white',
                'icon' => 'prot'
            ],
            [
                'title' => 'Lemak',
                'value' => $todayLemak . 'g',
                'total_sementara' => $totalLemakAll . 'g',
                'unit' => 'g',
                'target' => 'Target: ' . $targetFat . 'g',
                'color' => 'bg-amber-400 text-black',
                'icon' => 'fat'
            ],
            [
                'title' => 'Karbohidrat',
                'value' => $todayKarbo . 'g',
                'total_sementara' => $totalKarboAll . 'g',
                'unit' => 'g',
                'target' => 'Target: ' . $targetCarbs . 'g',
                'color' => 'bg-emerald-500 text-white',
                'icon' => 'carbs'
            ]
        ];

        // Untuk progress bar tetap menggunakan data hari ini agar akurat dengan target harian
        $progressNutrients = [
            ['name' => 'Kalori', 'current' => (string)$todayKalori, 'target' => (string)$targetCalories, 'unit' => 'kkal', 'pct' => $targetCalories > 0 ? min(100, round(($todayKalori / $targetCalories) * 100)) : 0, 'barColor' => 'bg-orange-500'],
            ['name' => 'Protein', 'current' => (string)$todayProtein, 'target' => (string)$targetProtein, 'unit' => 'g', 'pct' => $targetProtein > 0 ? min(100, round(($todayProtein / $targetProtein) * 100)) : 0, 'barColor' => 'bg-blue-500'],
            ['name' => 'Lemak', 'current' => (string)$todayLemak, 'target' => (string)$targetFat, 'unit' => 'g', 'pct' => $targetFat > 0 ? min(100, round(($todayLemak / $targetFat) * 100)) : 0, 'barColor' => 'bg-amber-500'],
            ['name' => 'Karbohidrat', 'current' => (string)$todayKarbo, 'target' => (string)$targetCarbs, 'unit' => 'g', 'pct' => $targetCarbs > 0 ? min(100, round(($todayKarbo / $targetCarbs) * 100)) : 0, 'barColor' => 'bg-emerald-500'],
        ];

        $uniqueScans = [];
        $seenIds = [];
        foreach ($scans as $s) {
            $id = $s['id'] ?? null;
            if ($id && !in_array($id, $seenIds)) {
                $uniqueScans[] = $s;
                $seenIds[] = $id;
            }
        }

        $recentHistory = array_slice(array_map(function ($s) {
            $calories = intval($s['kalori_terdeteksi'] ?? 0);
            $prot = intval($s['protein'] ?? 0);
            $lemak = intval($s['lemak'] ?? 0);
            $score = min(99, max(40, round(85 - ($lemak * 0.5) + ($prot * 0.4))));
            $timeStr = isset($s['created_at']) ? date('H:i', strtotime($s['created_at'])) : '12:00';

            return [
                'id' => $s['id'] ?? null,
                'name' => $s['nama_makanan'] ?? 'Makanan',
                'info' => $calories . ' kkal • ' . $timeStr,
                'score' => $score,
                'scoreColor' => $score >= 80 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/50' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50',
                'image' => $s['foto_scan'] ?? 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=100'
            ];
        }, $uniqueScans), 0, 5);

        $days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
        $weeklyData = [];
        foreach ($days as $idx => $d) {
            $dayScans = array_filter($scans, function ($s) use ($idx) {
                if (!isset($s['created_at'])) return false;
                $w = date('N', strtotime($s['created_at'])); 
                return $w == ($idx + 1);
            });
            $cals = array_sum(array_column($dayScans, 'kalori_terdeteksi'));
            $weeklyData[] = [
                'day' => $d,
                'calories' => $cals,
                'target' => $targetCalories
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'progressNutrients' => $progressNutrients,
            'recentHistory' => $recentHistory,
            'weeklyData' => $weeklyData,
        ]);
    }
}