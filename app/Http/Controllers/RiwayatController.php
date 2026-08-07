<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RiwayatController extends Controller
{
    public function index(SupabaseService $supabase)
    {
        $userId = Auth::id() ?? 1;

        $scans = $supabase->get('riwayat_scan_makanans', [
            'user_id' => 'eq.' . $userId,
            'order'   => 'id.desc',
            'limit'   => 100
        ]);

        // Pengamanan: Jika data dari Supabase bukan array (kosong/error), set jadi array kosong
        if (!is_array($scans)) {
            $scans = [];
        }

        $formattedHistory = array_map(function ($item) {
            $cals = intval($item['kalori_terdeteksi'] ?? 0);
            $prot = intval($item['protein'] ?? 0);
            $lemak = intval($item['lemak'] ?? 0);
            $score = min(99, max(40, round(85 - ($lemak * 0.5) + ($prot * 0.4))));

            $timestamp = isset($item['created_at']) ? strtotime($item['created_at']) : time();

            return [
                'id' => $item['id'],
                'food_name' => $item['nama_makanan'] ?? 'Makanan',
                'calories' => $cals,
                'date' => date('d M', $timestamp),
                'time' => date('H:i', $timestamp),
                'score' => $score,
                'image' => $item['foto_scan'] ?? null,
            ];
        }, $scans);

        return Inertia::render('RiwayatScanPage', [
            'scanHistory' => $formattedHistory
        ]);
    }
}