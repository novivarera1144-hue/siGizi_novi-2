<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\SupabaseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    // ══════════════════════════════════════════════
    //  REDIRECT KE GOOGLE
    // ══════════════════════════════════════════════

    /**
     * Redirect ke Google untuk alur Login.
     */
    public function redirectToGoogleLogin(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Redirect ke Google untuk alur Register (Universal Redirect).
     */
    public function redirectToGoogleRegister(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    // ══════════════════════════════════════════════
    //  UNIVERSAL CALLBACK
    // ══════════════════════════════════════════════

    /**
     * Callback universal dari Google.
     * 1. Mengambil data dari Google.
     * 2. Jika email/google_id sudah ada di DB -> Otomatis Login -> Redirect ke Dashboard.
     * 3. Jika belum ada -> Simpan data Google ke session -> Redirect ke /register untuk pre-fill form.
     */
    public function handleGoogleCallback(Request $request): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            logger()->error('Google Auth callback error: ' . $e->getMessage());

            return redirect()->route('register')->withErrors([
                'email' => 'Gagal mengautentikasi dengan Google. Silakan coba kembali.',
            ]);
        }

        $email    = $googleUser->getEmail();
        $googleId = $googleUser->getId();

        // Cek apakah user sudah terdaftar di database
        $user = User::where('email', $email)
            ->orWhere('google_id', $googleId)
            ->first();

        // JIKA USER SUDAH TERDAFTAR → Otomatis Login dan Redirect ke Dashboard
        if ($user) {
            // Perbarui google_id jika belum tersimpan
            if (!$user->google_id) {
                $user->google_id = $googleId;
                $user->save();
            }

            // Sinkronisasi status dari Supabase (jika ada)
            $this->syncStatusFromSupabase($user);

            // Cek jika akun ditangguhkan
            if ($this->isSuspended($user)) {
                return redirect()->route('login')->withErrors([
                    'email' => 'Akun Anda telah ditangguhkan oleh administrator.',
                ]);
            }

            Auth::login($user);
            $request->session()->regenerate();

            if ($user->role === 'Admin' || $user->email === 'admin@sigizi.com') {
                return redirect()->route('admin.dashboard');
            }

            return redirect()->route('dashboard');
        }

        // JIKA USER BELUM TERDAFTAR → Simpan data ke session untuk pre-fill form register
        $googleData = [
            'google_id' => $googleId,
            'name'      => $googleUser->getName(),
            'email'     => $email,
        ];

        $request->session()->put('googleData', $googleData);

        return redirect()->route('register')->with('googleData', $googleData);
    }

    // ══════════════════════════════════════════════
    //  HELPER METHODS
    // ══════════════════════════════════════════════

    /**
     * Sinkronisasi status user dari Supabase.
     */
    private function syncStatusFromSupabase(User $user): void
    {
        try {
            $supabase = app(SupabaseService::class);
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
            // Abaikan jika Supabase offline
        }
    }

    /**
     * Cek apakah akun user ditangguhkan.
     */
    private function isSuspended(User $user): bool
    {
        return isset($user->status)
            && in_array(strtolower(trim($user->status)), ['suspended', 'ditangguhkan']);
    }
}
