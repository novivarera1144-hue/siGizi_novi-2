<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SupabaseService;
use Inertia\Inertia;
use Carbon\Carbon;

class LaporanGlobalController extends Controller
{
    public function index(SupabaseService $supabase)
    {
        // Ambil data statistik dasar
        $totalUsers = $supabase->count('users');
        $totalScans = $supabase->count('riwayat_scan_makanans');

        // Ambil data scan (limit 2000 untuk akurasi perhitungan)
        $scans = $supabase->get('riwayat_scan_makanans', [
            'order' => 'id.desc',
            'limit' => 2000
        ]);

        $today = Carbon::today()->toDateString();
        $startOfMonth = Carbon::now()->startOfMonth()->toDateString();
        
        // Nama bulan aktif dalam bahasa Indonesia
        $namaBulan = Carbon::now()->translatedFormat('F');

        // Hitung Scan Hari Ini
        $scanHariIni = count(array_filter($scans, function($s) use ($today) {
            return isset($s['created_at']) && strpos($s['created_at'], $today) === 0;
        }));

        // Hitung Scan Bulan Ini
        $scanBulanIni = count(array_filter($scans, function($s) use ($startOfMonth) {
            return isset($s['created_at']) && $s['created_at'] >= $startOfMonth;
        }));

        // 1. Hitung Tren Per Bulan
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        $monthlyTrends = [];
        foreach ($months as $mIdx => $mName) {
            $monthScans = array_filter($scans, function ($s) use ($mIdx) {
                if (!isset($s['created_at'])) return false;
                $m = date('n', strtotime($s['created_at']));
                return $m == ($mIdx + 1);
            });
            $monthlyTrends[] = [
                'month' => $mName,
                'count' => count($monthScans)
            ];
        }

        // 2. Hitung Top 5 Makanan (Dengan Normalisasi Keyword / Pengelompokan Cerdas)
        $foodCounts = [];
        $originalNames = [];

        foreach ($scans as $s) {
            $rawName = trim($s['nama_makanan'] ?? 'Lainnya');
            if (empty($rawName)) continue;

            $lowerName = strtolower($rawName);

            $normalizedKey = $lowerName;
            if (strpos($lowerName, 'dim sum') !== false || strpos($lowerName, 'siomay') !== false) {
                $normalizedKey = 'siomay dim sum';
            } elseif (strpos($lowerName, 'seblak') !== false) {
                $normalizedKey = 'seblak';
            } elseif (strpos($lowerName, 'salad') !== false) {
                $normalizedKey = 'salad';
            } elseif (strpos($lowerName, 'bakso') !== false) {
                $normalizedKey = 'bakso';
            }

            $foodCounts[$normalizedKey] = ($foodCounts[$normalizedKey] ?? 0) + 1;

            if (!isset($originalNames[$normalizedKey][$rawName])) {
                $originalNames[$normalizedKey][$rawName] = 0;
            }
            $originalNames[$normalizedKey][$rawName]++;
        }

        arsort($foodCounts);

        $topFoods = [];
        $i = 0;
        foreach ($foodCounts as $normalizedKey => $fcount) {
            if ($i >= 5) break;

            arsort($originalNames[$normalizedKey]);
            $bestName = array_key_first($originalNames[$normalizedKey]);
            $displayName = ucwords(strtolower($bestName));

            $topFoods[] = [
                'name' => $displayName,
                'count' => $fcount
            ];
            $i++;
        }

        // 3. Hitung Kategori Makanan Berdasarkan Nama Menu & Kalori (Lebih Presisi Tanpa Kolom Kategori)
        $kategoriCounts = ['Makanan Berat' => 0, 'Makanan Ringan' => 0, 'Minuman' => 0, 'Lainnya' => 0];
        $totalKategoriScan = count($scans);

        foreach ($scans as $s) {
            $rawName = strtolower(trim($s['nama_makanan'] ?? ''));
            $kalori = $s['kalori_terdeteksi'] ?? 0;

            // Deteksi kategori berdasarkan kata kunci nama makanan atau jumlah kalori
            if (strpos($rawName, 'es ') !== false || strpos($rawName, 'jus') !== false || strpos($rawName, 'teh') !== false || strpos($rawName, 'kopi') !== false || strpos($rawName, 'susu') !== false || strpos($rawName, 'boba') !== false || $kalori < 50) {
                $kategoriCounts['Minuman']++;
            } elseif (strpos($rawName, 'salad') !== false || strpos($rawName, 'dim sum') !== false || strpos($rawName, 'siomay') !== false || strpos($rawName, 'keripik') !== false || strpos($rawName, 'snack') !== false || ($kalori > 0 && $kalori <= 250)) {
                $kategoriCounts['Makanan Ringan']++;
            } elseif (strpos($rawName, 'nasi') !== false || strpos($rawName, 'mie') !== false || strpos($rawName, 'bakso') !== false || strpos($rawName, 'seblak') !== false || strpos($rawName, 'ayam') !== false || $kalori > 250) {
                $kategoriCounts['Makanan Berat']++;
            } else {
                $kategoriCounts['Lainnya']++;
            }
        }

        $foodCategories = [];
        foreach ($kategoriCounts as $katName => $katCount) {
            $persen = $totalKategoriScan > 0 ? round(($katCount / $totalKategoriScan) * 100) : 0;
            $foodCategories[] = [
                'name' => $katName,
                'percentage' => $persen,
                'count' => $katCount
            ];
        }

        return Inertia::render('Admin/LaporanGlobal', [
            'monthlyTrends' => $monthlyTrends,
            'topFoods' => $topFoods,
            'foodCategories' => $foodCategories,
            'globalStats' => [
                'totalUsers' => $totalUsers,
                'totalScans' => $totalScans,
                'scanHariIni' => $scanHariIni,
                'scanBulanIni' => $scanBulanIni,
                'namaBulan' => $namaBulan,
            ]
        ]);
    }
}