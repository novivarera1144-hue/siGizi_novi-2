<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\SupabaseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    // ══════════════════════════════════════════════
    //  REDIRECT KE GOOGLE
    // ══════════════════════════════════════════════

    /**
     * Redirect ke Google untuk alur LOGIN.
     * Simpan intent 'login' di session sebelum redirect.
     */
    public function redirectToGoogleLogin(Request $request): RedirectResponse
    {
        $request->session()->put('google_auth_intent', 'login');
        $request->session()->save();

        return Socialite::driver('google')->with(['prompt' => 'select_account'])->redirect();
    }

    /**
     * Redirect ke Google untuk alur REGISTER.
     * Simpan intent 'register' di session sebelum redirect.
     */
    public function redirectToGoogleRegister(Request $request): RedirectResponse
    {
        $request->session()->put('google_auth_intent', 'register');
        $request->session()->save();

        return Socialite::driver('google')->with(['prompt' => 'select_account'])->redirect();
    }

    // ══════════════════════════════════════════════
    //  UNIFIED CALLBACK WITH INTENT DISPATCH
    // ══════════════════════════════════════════════

    /**
     * Callback dari Google.
     * Membaca intent dari session untuk memisahkan alur Login dan Register.
     */
    public function handleGoogleCallback(Request $request): RedirectResponse
    {
        $intent = $request->session()->pull('google_auth_intent', 'login');

        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            try {
                // Fallback stateless jika terjadi masalah session state mismatch
                $googleUser = Socialite::driver('google')->stateless()->user();
            } catch (\Exception $ex) {
                logger()->error('Google Auth callback error: ' . $ex->getMessage(), ['trace' => $ex->getTraceAsString()]);

                $fallbackRoute = $intent === 'register' ? 'register' : 'login';

                return redirect()->route($fallbackRoute)->withErrors([
                    'email' => 'Gagal mengautentikasi dengan Google. Silakan coba kembali.',
                ]);
            }
        }

        if ($intent === 'register') {
            return $this->handleRegisterFlow($request, $googleUser);
        }

        return $this->handleLoginFlow($request, $googleUser);
    }

    // ══════════════════════════════════════════════
    //  ALUR LOGIN
    // ══════════════════════════════════════════════

    /**
     * Login Flow:
     * - Cari user berdasarkan google_id atau email.
     * - Jika belum terdaftar → otomatis daftarkan akun baru agar proses login lancar.
     * - Jika ditangguhkan → tolak.
     * - Jika valid → login langsung dan redirect ke dashboard sesuai role.
     */
    private function handleLoginFlow(Request $request, $googleUser): RedirectResponse
    {
        try {
            $email    = $googleUser->getEmail();
            $googleId = $googleUser->getId();

            logger()->info('Google Auth handleLoginFlow processing', ['email' => $email, 'google_id' => $googleId]);

            $user = User::where('google_id', $googleId)->first()
                ?: User::where('email', $email)->first();

            // Jika user BELUM terdaftar -> otomatis buat akun baru agar pengguna dapat langsung masuk
            if (!$user) {
                logger()->info('Google Auth handleLoginFlow user not found, auto creating user', ['email' => $email]);

                $user = User::create([
                    'name'                 => $googleUser->getName() ?? $googleUser->getNickname() ?? 'Pengguna Google',
                    'email'                => $email,
                    'google_id'            => $googleId,
                    'password'             => bcrypt(Str::random(16)),
                    'role'                 => 'User',
                    'status'               => 'Aktif',
                    'onboarding_completed' => false,
                    'avatar'               => $googleUser->getAvatar(),
                ]);
            }

            // Perbarui google_id jika belum tersimpan
            if (!$user->google_id) {
                $user->google_id = $googleId;
                $user->save();
            }

            // Sinkronisasi status dari Supabase
            $this->syncStatusFromSupabase($user);

            // Cek jika akun ditangguhkan
            if ($this->isSuspended($user)) {
                logger()->info('Google Auth handleLoginFlow user suspended', ['email' => $email]);

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
        } catch (\Exception $e) {
            logger()->error('Google Auth handleLoginFlow Exception: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);

            return redirect()->route('login')->withErrors([
                'email' => 'Terjadi kesalahan sistem saat proses masuk Google: ' . $e->getMessage(),
            ]);
        }
    }

    // ══════════════════════════════════════════════
    //  ALUR REGISTER
    // ══════════════════════════════════════════════

    /**
     * Register Flow:
     * - Memeriksa apakah email dari akun Google sudah terdaftar di database.
     * - Jika SUDAH terdaftar → JANGAN auto-login, kembalikan ke /register dengan error.
     * - Jika BELUM terdaftar → Simpan data Google ke session dan redirect ke /register untuk pre-fill form.
     */
    private function handleRegisterFlow(Request $request, $googleUser): RedirectResponse
    {
        try {
            $email    = $googleUser->getEmail();
            $googleId = $googleUser->getId();

            logger()->info('Google Auth handleRegisterFlow processing', ['email' => $email, 'google_id' => $googleId]);

            // Cek apakah email atau google_id sudah terdaftar
            $existingUser = User::where('email', $email)
                ->orWhere('google_id', $googleId)
                ->first();

            // JIKA EMAIL SUDAH TERDAFTAR → Tolak, jangan login, redirect ke /register dengan error
            if ($existingUser) {
                logger()->info('Google Auth handleRegisterFlow email already registered', ['email' => $email]);

                return redirect()->route('register')->withErrors([
                    'email' => 'Email ' . $email . ' sudah terdaftar. Silakan masuk melalui halaman login.',
                ]);
            }

            // JIKA BELUM TERDAFTAR → Simpan data ke session untuk pre-fill form register
            $googleData = [
                'google_id' => $googleId,
                'name'      => $googleUser->getName(),
                'email'     => $email,
            ];

            $request->session()->put('googleData', $googleData);
            $request->session()->save();

            logger()->info('Google Auth handleRegisterFlow googleData saved to session', $googleData);

            return redirect()->route('register')->with('googleData', $googleData);
        } catch (\Exception $e) {
            logger()->error('Google Auth handleRegisterFlow Exception: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);

            return redirect()->route('register')->withErrors([
                'email' => 'Terjadi kesalahan sistem saat memproses registrasi Google: ' . $e->getMessage(),
            ]);
        }
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
            logger()->warning('Supabase sync error (non-fatal): ' . $e->getMessage());
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
