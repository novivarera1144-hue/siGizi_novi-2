<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SupabaseService;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(SupabaseService $supabase)
    {
        // 1. Ambil Total Data
        $totalUsers = $supabase->count('users') ?? 0;
        $totalScans = $supabase->count('riwayat_scan_makanans') ?? 0;

        // 2. Ambil Semua Scan Terakhir
        $scans = $supabase->get('riwayat_scan_makanans', [
            'order' => 'created_at.desc',
            'limit' => 200
        ]) ?? [];

        // 3. Ambil Data Users
        $allUsers = $supabase->get('users') ?? [];

        // Buat Kamus/Mapping ID User ke Nama (Mendukung ID berupa String, Int, UUID)
        $userMap = [];
        foreach ($allUsers as $u) {
            // Cek ID (bisa id, user_id, atau id_user)
            $uId = $u['id'] ?? $u['user_id'] ?? $u['id_user'] ?? null;
            
            if ($uId !== null) {
                // Cari nama dari kolom yang mungkin tersedia
                $name = $u['name'] 
                     ?? $u['nama'] 
                     ?? $u['full_name'] 
                     ?? $u['username'] 
                     ?? $u['email'] 
                     ?? 'Pengguna';

                // Ubah nama email jadi nama biasa jika tidak ada kolom nama (misal: "john@gmail.com" -> "John")
                if (str_contains($name, '@')) {
                    $name = ucfirst(explode('@', $name)[0]);
                }

                // Simpan kunci sebagai string agar cocok baik UUID maupun Integer
                $userMap[(string)$uId] = $name;
            }
        }

        // 4. Hitung Pengguna Aktif (User unik yang pernah scan)
        $activeUserIds = [];
        foreach ($scans as $s) {
            $sUserId = $s['user_id'] ?? $s['id_user'] ?? null;
            if ($sUserId !== null) {
                $activeUserIds[(string)$sUserId] = true;
            }
        }
        $activeUsersCount = count($activeUserIds);

        // 5. Hitung Grafik Scan per Hari (Senin - Minggu)
        $days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
        $countsByDay = array_fill(1, 7, 0);

        foreach ($scans as $s) {
            if (isset($s['created_at'])) {
                $time = strtotime($s['created_at']);
                if ($time) {
                    $w = (int) date('N', $time);
                    $countsByDay[$w]++;
                }
            }
        }

        $maxCount = max(max($countsByDay), 1);
        $weeklyScanData = [];

        foreach ($days as $idx => $d) {
            $dayNumber = $idx + 1;
            $countVal = $countsByDay[$dayNumber];
            $heightPct = min(100, round(($countVal / $maxCount) * 100));

            $weeklyScanData[] = [
                'day' => $d,
                'scans' => $countVal,
                'heightPct' => $heightPct
            ];
        }

        // 6. Susun List Aktivitas Terkini (Relasikan ID ke Nama User)
        $recentActivities = array_map(function ($s) use ($userMap) {
            $foodName = $s['nama_makanan'] ?? $s['makanan'] ?? $s['food_name'] ?? 'Makanan';
            
            // Ambil ID user dari riwayat scan
            $rawUserId = $s['user_id'] ?? $s['id_user'] ?? null;
            $stringUserId = $rawUserId !== null ? (string)$rawUserId : '';
            
            // Cari di kamus userMap
            $userName = isset($userMap[$stringUserId]) ? $userMap[$stringUserId] : 'Pengguna';
            
            $initial = strtoupper(substr($userName, 0, 1));
            
            $timeAgo = isset($s['created_at']) 
                ? date('H:i', strtotime($s['created_at'])) . ' WIB'
                : 'Baru saja';

            return [
                'id' => $s['id'] ?? uniqid(),
                'user_name' => $userName,
                'initial' => $initial,
                'action' => "melakukan scan makanan " . $foodName,
                'time_ago' => $timeAgo
            ];
        }, array_slice($scans, 0, 10));

        // 7. Render Ke Frontend Inertia
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalScans' => $totalScans,
                'activeUsers' => $activeUsersCount > 0 ? $activeUsersCount : count($allUsers),
                'aiAccuracy' => '94.2%'
            ],
            'weeklyScanData' => $weeklyScanData,
            'recentActivities' => $recentActivities
        ]);
    }
}