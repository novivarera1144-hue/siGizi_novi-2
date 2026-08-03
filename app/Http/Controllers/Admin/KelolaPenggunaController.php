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
        $users = $supabase->get('users', [
            'order' => 'id.asc',
            'limit' => 100
        ]);

        $formattedUsers = array_map(function ($u) {
            $email = $u['email'] ?? '';
            $isAdmin = str_contains($email, 'admin') || str_contains($email, 'novi');
            $role = $isAdmin ? 'Admin' : 'Pengguna';
            $status = $u['status'] ?? 'Aktif';

            $statusColor = $status === 'Aktif'
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

        return Inertia::render('Admin/KelolaPengguna', [
            'initialUsers' => $formattedUsers
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
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        try {
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make('password123'),
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

    public function destroy($id, SupabaseService $supabase)
    {
        $supabase->delete('users', $id);

        try {
            User::where('id', $id)->delete();
        } catch (\Exception $e) {}

        return redirect()->back()->with('success', 'Pengguna berhasil dihapus.');
    }
}
