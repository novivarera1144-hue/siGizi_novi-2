<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\SupabaseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $request->validate([
            'current_password' => [
                'required',
                function ($attribute, $value, $fail) use ($user) {
                    if (!Hash::check($value, $user->password)) {
                        $fail('Kata sandi saat ini yang Anda masukkan salah. Silakan coba lagi.');
                    }
                },
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[a-zA-Z]/',
                'regex:/[0-9]/',
                'confirmed',
            ],
        ], [
            'current_password.required' => 'Kata sandi saat ini wajib diisi.',
            'password.required' => 'Kata sandi baru wajib diisi.',
            'password.min' => 'Kata sandi baru minimal harus 8 karakter.',
            'password.regex' => 'Kata sandi baru wajib mengandung setidaknya 1 huruf dan 1 angka.',
            'password.confirmed' => 'Konfirmasi kata sandi baru tidak cocok.',
        ]);

        $hashedPassword = Hash::make($request->input('password'));

        $user->update([
            'password' => $hashedPassword,
        ]);

        // Sinkronisasi password baru ke database Supabase jika pengguna terdaftar
        try {
            $supabase = app(SupabaseService::class);
            $supabaseUsers = $supabase->get('users', [
                'email' => 'eq.' . $user->email,
                'limit' => 1,
            ]);

            if (!empty($supabaseUsers[0]['id'])) {
                $supabase->update('users', $supabaseUsers[0]['id'], [
                    'password' => $hashedPassword,
                    'updated_at' => now()->toIso8601String(),
                ]);
            }
        } catch (\Throwable $e) {
            Log::warning('Sinkronisasi password ke Supabase gagal: ' . $e->getMessage());
        }

        return back()->with('success', 'Kata sandi berhasil diperbarui.');
    }
}
