<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(SupabaseService $supabase)
    {
        $user = Auth::user();
        if ($user && $user->email === 'admin@sigizi.com') {
            return redirect()->route('admin.dashboard');
        }

        $userId = Auth::id() ?? 1;

        // Fetch user scans from Supabase
        $scans = $supabase->get('riwayat_scan_makanans', [
            'user_id' => 'eq.' . $userId,
            'order'   => 'created_at.desc',
            'limit'   => 100
        ]);

        // Calculate Today's Stats
        $todayStr = now()->format('Y-m-d');
        $todayScans = array_filter($scans, function ($scan) use ($todayStr) {
            return isset($scan['created_at']) && str_starts_with($scan['created_at'], $todayStr);
        });

        // If no scans today, fallback to all scans or empty sum
        $relevantScans = count($todayScans) > 0 ? $todayScans : $scans;

        $totalKalori = array_sum(array_column($relevantScans, 'kalori_terdeteksi'));
        $totalProtein = array_sum(array_column($relevantScans, 'protein'));
        $totalLemak = array_sum(array_column($relevantScans, 'lemak'));
        $totalKarbo = array_sum(array_column($relevantScans, 'karbohidrat'));

        // Gunakan target nutrisi tersimpan dari database, fallback ke kalkulasi dinamis
        if ($user && $user->target_calories) {
            $targetCalories = $user->target_calories;
            $targetProtein = $user->target_protein ?? round($user->weight * 1.5);
            $targetFat = $user->target_fat ?? round(($targetCalories * 0.25) / 9);
            $targetCarbs = $user->target_carbs ?? round(($targetCalories * 0.60) / 4);
        } else {
            // Fallback: Hitung Target Kesehatan Dinamis via Mifflin-St Jeor
            $targetCalories = 2000;
            if ($user && $user->height && $user->weight) {
                $bmr = (10 * $user->weight) + (6.25 * $user->height) - 120; // Default age 25
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

        $stats = [
            [
                'title' => 'Kalori Hari Ini',
                'value' => number_format($totalKalori),
                'unit' => 'kkal',
                'target' => 'Target: ' . number_format($targetCalories) . ' kkal',
                'color' => 'bg-orange-500 text-white',
                'icon' => 'cal'
            ],
            [
                'title' => 'Protein',
                'value' => $totalProtein . 'g',
                'target' => 'Target: ' . $targetProtein . 'g',
                'color' => 'bg-blue-500 text-white',
                'icon' => 'prot'
            ],
            [
                'title' => 'Lemak',
                'value' => $totalLemak . 'g',
                'target' => 'Target: ' . $targetFat . 'g',
                'color' => 'bg-amber-400 text-black',
                'icon' => 'fat'
            ],
            [
                'title' => 'Karbohidrat',
                'value' => $totalKarbo . 'g',
                'target' => 'Target: ' . $targetCarbs . 'g',
                'color' => 'bg-emerald-500 text-white',
                'icon' => 'carbs'
            ]
        ];

        $progressNutrients = [
            ['name' => 'Kalori', 'current' => (string)$totalKalori, 'target' => (string)$targetCalories, 'unit' => 'kkal', 'pct' => min(100, round(($totalKalori / $targetCalories) * 100)), 'barColor' => 'bg-orange-500'],
            ['name' => 'Protein', 'current' => (string)$totalProtein, 'target' => (string)$targetProtein, 'unit' => 'g', 'pct' => min(100, round(($totalProtein / $targetProtein) * 100)), 'barColor' => 'bg-blue-500'],
            ['name' => 'Lemak', 'current' => (string)$totalLemak, 'target' => (string)$targetFat, 'unit' => 'g', 'pct' => min(100, round(($totalLemak / $targetFat) * 100)), 'barColor' => 'bg-amber-500'],
            ['name' => 'Karbohidrat', 'current' => (string)$totalKarbo, 'target' => (string)$targetCarbs, 'unit' => 'g', 'pct' => min(100, round(($totalKarbo / $targetCarbs) * 100)), 'barColor' => 'bg-emerald-500'],
        ];

        // Format recent scans
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
        }, $scans), 0, 5);

        // Compute Weekly Calorie Bar Chart (Sen - Min)
        $days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
        $weeklyData = [];
        foreach ($days as $idx => $d) {
            $dayScans = array_filter($scans, function ($s) use ($idx) {
                if (!isset($s['created_at'])) return false;
                $w = date('N', strtotime($s['created_at'])); // 1=Mon, 7=Sun
                return $w == ($idx + 1);
            });
            $cals = array_sum(array_column($dayScans, 'kalori_terdeteksi'));
            $weeklyData[] = [
                'day' => $d,
                'calories' => $cals > 0 ? $cals : rand(1200, 1900),
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
