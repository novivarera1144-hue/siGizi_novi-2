<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\SupabaseService;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request, SupabaseService $supabase): RedirectResponse
    {
        // 1. Proses autentikasi standar (cek email & password di database lokal)
        $request->authenticate();

        // 2. Ambil user lokal yang berhasil login
        $user = $request->user();

        // --- PENTING: SINKRONISASI DULU DARI SUPABASE ---
        try {
            $supabaseUsers = $supabase->get('users', [
                'email' => 'eq.' . $user->email,
                'limit' => 1
            ]);

            $supabaseUser = $supabaseUsers[0] ?? null;

            if ($supabaseUser) {
                $user->status = $supabaseUser['status'] ?? 'Aktif';
                $user->save();
            }
        } catch (\Exception $e) {
            // Jika gagal konek supabase, biarkan pakai data lokal apa adanya
        }

        // 3. SEKARANG CEK STATUSNYA
        if (isset($user->status) && $user->status === 'Ditangguhkan') {
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            throw ValidationException::withMessages([
                'email' => 'Akun Anda telah ditangguhkan oleh administrator.',
            ]);
        }

        // 4. Lanjutkan login biasa
        $request->session()->regenerate();

        if ($user->email === 'admin@sigizi.com') {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}