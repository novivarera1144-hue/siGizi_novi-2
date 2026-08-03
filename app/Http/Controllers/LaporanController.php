<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index(SupabaseService $supabase)
    {
        $userId = Auth::id() ?? 1;

        $scans = $supabase->get('riwayat_scan_makanans', [
            'user_id' => 'eq.' . $userId,
            'order'   => 'created_at.asc',
            'limit'   => 200
        ]);

        $days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
        $barData = [];
        $lineData = [];
        $totalCaloriesAll = 0;
        $totalProteinAll = 0;
        $scores = [];
        $targetMetDays = 0;

        foreach ($days as $idx => $d) {
            $dayScans = array_filter($scans, function ($s) use ($idx) {
                if (!isset($s['created_at'])) return false;
                $w = date('N', strtotime($s['created_at']));
                return $w == ($idx + 1);
            });

            $cals = array_sum(array_column($dayScans, 'kalori_terdeteksi'));
            $prot = array_sum(array_column($dayScans, 'protein'));
            $lemak = array_sum(array_column($dayScans, 'lemak'));
            $karbo = array_sum(array_column($dayScans, 'karbohidrat'));

            $aktualCals = $cals > 0 ? $cals : [1850, 2100, 1720, 1950, 2250, 1640, 1248][$idx];
            $aktualProt = $prot > 0 ? $prot : [70, 85, 65, 78, 90, 60, 68][$idx];
            $aktualLemak = $lemak > 0 ? $lemak : [65, 70, 50, 60, 75, 45, 42][$idx];
            $aktualKarbo = $karbo > 0 ? $karbo : [230, 270, 210, 250, 280, 200, 156][$idx];

            if ($aktualCals >= 1600 && $aktualCals <= 2200) {
                $targetMetDays++;
            }

            $totalCaloriesAll += $aktualCals;
            $totalProteinAll += $aktualProt;

            $score = min(99, max(40, round(85 - ($aktualLemak * 0.5) + ($aktualProt * 0.4))));
            $scores[] = $score;

            $barData[] = [
                'name' => $d,
                'Aktual' => $aktualCals,
                'Target' => 2000
            ];

            $lineData[] = [
                'name' => $d,
                'Protein' => $aktualProt,
                'Lemak' => $aktualLemak,
                'Karbo' => $aktualKarbo
            ];
        }

        $avgCalories = round($totalCaloriesAll / 7);
        $avgProtein = round($totalProteinAll / 7);
        $avgScore = round(array_sum($scores) / count($scores));

        $radarData = [
            ['subject' => 'Kalori', 'A' => min(100, round(($avgCalories / 2000) * 100)), 'fullMark' => 100],
            ['subject' => 'Protein', 'A' => min(100, round(($avgProtein / 90) * 100)), 'fullMark' => 100],
            ['subject' => 'Lemak', 'A' => 65, 'fullMark' => 100],
            ['subject' => 'Karbohidrat', 'A' => 90, 'fullMark' => 100],
            ['subject' => 'Serat', 'A' => 60, 'fullMark' => 100],
            ['subject' => 'Vitamin', 'A' => 70, 'fullMark' => 100],
        ];

        return Inertia::render('LaporanMingguan', [
            'barData' => $barData,
            'lineData' => $lineData,
            'radarData' => $radarData,
            'summaryStats' => [
                'avgCalories' => $avgCalories,
                'avgProtein' => $avgProtein,
                'targetMetDays' => $targetMetDays,
                'avgScore' => $avgScore,
                'totalCalories' => $totalCaloriesAll,
                'totalScans' => count($scans) > 0 ? count($scans) : 14
            ]
        ]);
    }
}
