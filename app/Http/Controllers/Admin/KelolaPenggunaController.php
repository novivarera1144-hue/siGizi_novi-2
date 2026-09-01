<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class KelolaPenggunaController extends Controller
{
    public function index(SupabaseService $supabase)
    {
        return Inertia::render('Admin/KelolaPengguna', [
            'initialUsers' => function () use ($supabase) {
                $users = $supabase->get('users', [
                    'order' => 'id.asc',
                    'limit' => 100
                ]);

                return array_map(function ($u) {
                    $email = $u['email'] ?? '';
                    $isAdmin = str_contains($email, 'admin') || str_contains($email, 'novi');
                    $role = $isAdmin ? 'Admin' : 'Pengguna';
                    
                    // Ambil status mentah dari database dan bersihkan spasi
                    $rawStatus = trim($u['status'] ?? 'Aktif');
                    
                    // Cek apakah statusnya termasuk kategori ditangguhkan (case-insensitive)
                    $isSuspended = in_array(strtolower($rawStatus), ['suspended', 'ditangguhkan']);
                    
                    // Tentukan label status yang akan ditampilkan ke UI secara konsisten
                    $status = $isSuspended ? 'Ditangguhkan' : 'Aktif';

                    // Warna badge status
                    $statusColor = !$isSuspended
                        ? ($isAdmin
                            ? 'text-[#1F7A54] bg-emerald-100 dark:bg-[#34D399]/20 dark:text-[#34D399]'
                            : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400')
                        : 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400';

                    return [
                        'id' => $u['id'],
                        'name' => $u['name'] ?? 'Pengguna',
                        'email' => $email,
                        'role' => $role,
                        'status' => $status,
                        'statusColor' => $statusColor
                    ];
                }, $users);
            }
        ]);
    }

    public function store(Request $request, SupabaseService $supabase)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'role' => 'required|string',
        ]);

        $now = now()->toIso8601String();
        $supabase->insert('users', [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make('password123'),
            'status' => 'Aktif',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        try {
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make('password123'),
                'status' => 'Aktif',
            ]);
        } catch (\Exception $e) {}

        return redirect()->back()->with('success', 'Pengguna berhasil ditambahkan.');
    }

    public function update(Request $request, $id, SupabaseService $supabase)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'role' => 'required|string',
            'status' => 'sometimes|string',
        ]);

        $now = now()->toIso8601String();
        $supabase->update('users', $id, [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'updated_at' => $now,
        ]);

        return redirect()->back()->with('success', 'Data pengguna berhasil diperbarui.');
    }

    /**
     * Toggle status "Aktif / Ditangguhkan" for a user.
     * Returns JSON when called via Inertia (X-Inertia header) so the
     * frontend can reload the props, otherwise falls back to a redirect
     * for non‑ajax usage.
     */
    public function toggleSuspend($id, SupabaseService $supabase)
    {
        // 1️⃣ Ambil data user dari Supabase berdasarkan ID
        $users = $supabase->get('users', [
            'id'    => 'eq.' . $id,
            'limit' => 1,
        ]);

        $currentUser = $users[0] ?? null;
        if (! $currentUser) {
            return redirect()->back()->with('error', 'Pengguna tidak ditemukan.');
        }

        // 3️⃣ Tentukan status baru (case‑insensitive)
        $currentStatus = strtolower(trim($currentUser['status'] ?? 'aktif'));
        $newStatus = in_array($currentStatus, ['aktif', 'active']) ? 'Ditangguhkan' : 'Aktif';
        $now = now()->toIso8601String();

        // 4️⃣ Update di Supabase
        $supabase->update('users', $id, [
            'status'     => $newStatus,
            'updated_at' => $now,
        ]);

        // 5️⃣ Sinkronkan ke DB lokal (jika ada)
        try {
            $localUser = User::find($id);
            if ($localUser) {
                $localUser->status = $newStatus;
                $localUser->save();
            }
        } catch (\Exception $e) {}

        return redirect()->back()->with('success', 'Status penangguhan pengguna berhasil diperbarui.');
    }

    public function destroy($id, SupabaseService $supabase)
    {
        $supabase->delete('users', $id);

        try {
            User::where('id', $id)->delete();
        } catch (\Exception $e) {}

        return redirect()->back()->with('success', 'Pengguna berhasil dihapus.');
    }
}