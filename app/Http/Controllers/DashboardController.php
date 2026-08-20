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
        $user = Auth::user()->fresh();
        
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

        $todayStr = Carbon::today()->toDateString();

        $todayScans = array_filter($scans, function ($scan) use ($todayStr) {
            if (!isset($scan['created_at'])) return false;
            $scanDate = Carbon::parse($scan['created_at'])->toDateString();
            return $scanDate === $todayStr;
        });

        $todayKalori = array_sum(array_column($todayScans, 'kalori_terdeteksi'));
        $todayProtein = array_sum(array_column($todayScans, 'protein'));
        $todayLemak = array_sum(array_column($todayScans, 'lemak'));
        $todayKarbo = array_sum(array_column($todayScans, 'karbohidrat'));

        $totalKaloriAll = array_sum(array_column($scans, 'kalori_terdeteksi'));
        $totalProteinAll = array_sum(array_column($scans, 'protein'));
        $totalLemakAll = array_sum(array_column($scans, 'lemak'));
        $totalKarboAll = array_sum(array_column($scans, 'karbohidrat'));

        // --- AMBIL TARGET HARIAN DARI DATABASE ---
        $targetCalories = (!empty($user->target_calories) && $user->target_calories > 0) ? $user->target_calories : 2000;
        $targetProtein  = (!empty($user->target_protein) && $user->target_protein > 0) ? $user->target_protein : 90;
        $targetFat      = (!empty($user->target_fat) && $user->target_fat > 0) ? $user->target_fat : 57;
        $targetCarbs    = (!empty($user->target_carbs) && $user->target_carbs > 0) ? $user->target_carbs : 308;

        // --- AMBIL DURASI MINGGU (DEFAULT 10 MINGGU JIKA KOSONG) ---
        $durationWeeks = (!empty($user->duration_weeks) && $user->duration_weeks > 0) ? $user->duration_weeks : 10;
        $totalDays = $durationWeeks * 7;

        // Hitung total target keseluruhan selama durasi program
        $totalTargetCalories = $targetCalories * $totalDays;
        $totalTargetProtein  = $targetProtein * $totalDays;
        $totalTargetFat      = $targetFat * $totalDays;
        $totalTargetCarbs    = $targetCarbs * $totalDays;

        $stats = [
            [
                'title' => 'Kalori Hari Ini',
                'value' => number_format($todayKalori),
                'total_sementara' => number_format($totalKaloriAll) . ' kkal',
                'unit' => 'kkal',
                'target' => 'Target: ' . number_format($targetCalories) . ' kkal',
                'dailyTarget' => number_format($targetCalories) . ' kkal',
                'totalTarget' => number_format($totalTargetCalories, 0, ',', '.') . ' kkal',
                'color' => 'bg-orange-500 text-white',
                'icon' => 'cal'
            ],
            [
                'title' => 'Protein',
                'value' => $todayProtein . 'g',
                'total_sementara' => $totalProteinAll . 'g',
                'unit' => 'g',
                'target' => 'Target: ' . $targetProtein . 'g',
                'dailyTarget' => $targetProtein . 'g',
                'totalTarget' => number_format($totalTargetProtein, 0, ',', '.') . ' g',
                'color' => 'bg-blue-500 text-white',
                'icon' => 'prot'
            ],
            [
                'title' => 'Lemak',
                'value' => $todayLemak . 'g',
                'total_sementara' => $totalLemakAll . 'g',
                'unit' => 'g',
                'target' => 'Target: ' . $targetFat . 'g',
                'dailyTarget' => $targetFat . 'g',
                'totalTarget' => number_format($totalTargetFat, 0, ',', '.') . ' g',
                'color' => 'bg-amber-400 text-black',
                'icon' => 'fat'
            ],
            [
                'title' => 'Karbohidrat',
                'value' => $todayKarbo . 'g',
                'total_sementara' => $totalKarboAll . 'g',
                'unit' => 'g',
                'target' => 'Target: ' . $targetCarbs . 'g',
                'dailyTarget' => $targetCarbs . 'g',
                'totalTarget' => number_format($totalTargetCarbs, 0, ',', '.') . ' g',
                'color' => 'bg-emerald-500 text-white',
                'icon' => 'carbs'
            ]
        ];

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

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'progressNutrients' => $progressNutrients,
            'recentHistory' => $recentHistory,
        ]);
    }
}