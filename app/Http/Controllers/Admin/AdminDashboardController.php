<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SupabaseService;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(SupabaseService $supabase)
    {
        // Cache data dashboard selama 60 detik untuk mempercepat navigasi
        $data = Cache::remember('admin_dashboard_data', 60, function () use ($supabase) {
            // 1. Ambil Total Data
            $totalUsers = $supabase->count('users') ?? 0;
            $totalScans = $supabase->count('riwayat_scan_makanans') ?? 0;

            // 2. Ambil Semua Scan Terakhir (200 record)
            $scans = $supabase->get('riwayat_scan_makanans', [
                'order' => 'created_at.desc',
                'limit' => 200
            ]) ?? [];

            // 3. Ambil data user yang HANYA muncul di 10 scan teratas (recent activities)
            $recentScans = array_slice($scans, 0, 10);
            $userIds = [];
            foreach ($recentScans as $s) {
                $uId = $s['user_id'] ?? $s['id_user'] ?? null;
                if ($uId !== null) {
                    $userIds[] = (string)$uId;
                }
            }
            $userIds = array_unique($userIds);

            $userMap = [];
            if (!empty($userIds)) {
                $allUsers = $supabase->get('users', [
                    'id' => 'in.(' . implode(',', $userIds) . ')'
                ]) ?? [];

                foreach ($allUsers as $u) {
                    $uId = $u['id'] ?? $u['user_id'] ?? $u['id_user'] ?? null;
                    if ($uId !== null) {
                        $name = $u['name'] ?? $u['nama'] ?? $u['full_name'] ?? $u['username'] ?? $u['email'] ?? 'Pengguna';

                        if (str_contains($name, '@')) {
                            $name = ucfirst(explode('@', $name)[0]);
                        }

                        $userMap[(string)$uId] = $name;
                    }
                }
            }

            // 4. Hitung Pengguna Aktif dari last 200 scans
            $activeUserIds = [];
            foreach ($scans as $s) {
                $sUserId = $s['user_id'] ?? $s['id_user'] ?? null;
                if ($sUserId !== null) {
                    $activeUserIds[(string)$sUserId] = true;
                }
            }
            $activeUsersCount = count($activeUserIds);

            // 5. Hitung Grafik Scan per Hari (Senin - Minggu Berjalan)
            $weeklyScanData = [];
            $startOfWeek = Carbon::now()->startOfWeek(Carbon::MONDAY); 
            $today = Carbon::today();
            $days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

            for ($i = 0; $i < 7; $i++) {
                $currentDate = $startOfWeek->copy()->addDays($i);
                $dayName = $days[$i];

                if ($currentDate->greaterThan($today)) {
                    // Hari di masa depan pada minggu ini = 0
                    $countVal = 0;
                } else {
                    // Filter hanya data yang tanggalnya sama persis dengan hari ini (di minggu ini)
                    $countVal = count(array_filter($scans, function ($s) use ($currentDate) {
                        if (!isset($s['created_at'])) return false;
                        return Carbon::parse($s['created_at'])->toDateString() === $currentDate->toDateString();
                    }));
                }

                // Hitung persentase untuk tinggi bar (diatur agar proporsional)
                $heightPct = min(100, ($countVal > 0) ? ($countVal * 10) : 0);

                $weeklyScanData[] = [
                    'day' => $dayName,
                    'scans' => $countVal,
                    'heightPct' => $heightPct
                ];
            }

            // 6. Susun List Aktivitas Terkini
            $recentActivities = array_map(function ($s) use ($userMap) {
                $foodName = $s['nama_makanan'] ?? $s['makanan'] ?? $s['food_name'] ?? 'Makanan';
                $rawUserId = $s['user_id'] ?? $s['id_user'] ?? null;
                $stringUserId = $rawUserId !== null ? (string)$rawUserId : '';
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
            }, $recentScans);

            return [
                'stats' => [
                    'totalUsers' => $totalUsers,
                    'totalScans' => $totalScans,
                    'activeUsers' => $activeUsersCount > 0 ? $activeUsersCount : $totalUsers,
                    'aiAccuracy' => '94.2%'
                ],
                'weeklyScanData' => $weeklyScanData,
                'recentActivities' => $recentActivities
            ];
        });

        // 7. Render Ke Frontend dengan closure (lazy props) agar optimal
        return Inertia::render('Admin/Dashboard', [
            'stats' => fn() => $data['stats'],
            'weeklyScanData' => fn() => $data['weeklyScanData'],
            'recentActivities' => fn() => $data['recentActivities']
        ]);
    }
}