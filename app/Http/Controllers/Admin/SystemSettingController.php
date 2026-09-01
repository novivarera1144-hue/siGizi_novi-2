<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SystemSetting;
use App\Models\User;
use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SystemSettingController extends Controller
{
    /**
     * Display the System Settings page with current settings, gemini status, & admin users.
     */
    public function index()
    {
        $settings = SystemSetting::getAll();

        // Cek status API Gemini AI
        $geminiKey = env('GEMINI_API_KEY', config('services.gemini.key'));
        $geminiStatus = !empty($geminiKey) ? 'Terhubung (Aktif)' : 'Terputus';

        // Ambil data admin secara dinamis dari tabel users
        $adminUsers = User::whereIn('role', ['Admin', 'Super Admin', 'Admin Konten'])
            ->orWhere('email', 'admin@sigizi.com')
            ->orWhere('email', 'like', '%admin%')
            ->orWhere('email', 'like', '%novi%')
            ->orderBy('id', 'asc')
            ->get();

        $admins = $adminUsers->map(function ($u) {
            return [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'role' => $u->role ?: (str_contains(strtolower($u->email), 'super') ? 'Super Admin' : 'Admin Konten'),
            ];
        });

        return Inertia::render('Admin/PengaturanSistem', [
            'settings' => $settings,
            'geminiStatus' => $geminiStatus,
            'admins' => $admins,
        ]);
    }

    /**
     * Update global system settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'app_name' => 'required|string|max:255',
            'admin_email' => 'required|email',
            'enable_2fa' => 'boolean',
            'maintenance_mode' => 'boolean',
            'session_timeout' => 'required|integer|min:1',
        ]);

        foreach ($validated as $key => $value) {
            SystemSetting::set($key, $value);
        }

        return redirect()->back()->with('success', 'Pengaturan sistem berhasil diperbarui.');
    }

    /**
     * Store a new admin user.
     */
    public function storeAdmin(Request $request, SupabaseService $supabase)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        $createData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'status' => 'Aktif',
        ];

        if (\Illuminate\Support\Facades\Schema::hasColumn('users', 'role')) {
            $createData['role'] = $validated['role'];
        }

        $user = User::create($createData);

        // Sync ke Supabase REST jika ada
        try {
            $now = now()->toIso8601String();
            $supabasePayload = array_merge($createData, [
                'created_at' => $now,
                'updated_at' => $now,
            ]);
            $supabase->insert('users', $supabasePayload);
        } catch (\Exception $e) {}

        return redirect()->back()->with('success', 'Admin ' . $user->name . ' berhasil ditambahkan.');
    }

    /**
     * Update an existing admin user.
     */
    public function updateAdmin(Request $request, $id, SupabaseService $supabase)
    {
        $admin = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'role' => 'required|string',
            'password' => 'nullable|string|min:6',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ];

        if (\Illuminate\Support\Facades\Schema::hasColumn('users', 'role')) {
            $updateData['role'] = $validated['role'];
        }

        // Cek jika password diisi (opsional)
        $password = $request->input('password');
        if (!empty($password) && strlen(trim($password)) >= 6) {
            $updateData['password'] = Hash::make($password);
        }

        $admin->update($updateData);

        // Sync ke Supabase REST jika ada
        try {
            $supabasePayload = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'updated_at' => now()->toIso8601String(),
            ];
            if (isset($updateData['role'])) {
                $supabasePayload['role'] = $updateData['role'];
            }
            if (isset($updateData['password'])) {
                $supabasePayload['password'] = $updateData['password'];
            }
            $supabase->update('users', $id, $supabasePayload);
        } catch (\Exception $e) {}

        return redirect()->back()->with('success', 'Data admin ' . $admin->name . ' berhasil diperbarui.');
    }

    /**
     * Delete an admin user.
     */
    public function destroyAdmin($id, SupabaseService $supabase)
    {
        if (Auth::id() == $id) {
            return redirect()->back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        $admin = User::findOrFail($id);
        $name = $admin->name;
        $admin->delete();

        // Sync ke Supabase REST jika ada
        try {
            $supabase->delete('users', $id);
        } catch (\Exception $e) {}

        return redirect()->back()->with('success', 'Akun admin ' . $name . ' berhasil dihapus.');
    }

    /**
     * Reset system settings to default values.
     */
    public function resetData(Request $request)
    {
        $defaults = [
            'app_name' => 'siGizi',
            'admin_email' => 'noreply@sigizi.com',
            'maintenance_mode' => '0',
            'enable_2fa' => '1',
            'session_timeout' => '15',
        ];

        foreach ($defaults as $key => $value) {
            SystemSetting::set($key, $value);
        }

        return redirect()->back()->with('success', 'Data pengaturan sistem berhasil di-reset ke pengaturan awal.');
    }
}
