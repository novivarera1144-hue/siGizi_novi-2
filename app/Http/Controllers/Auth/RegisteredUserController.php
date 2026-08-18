<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\SupabaseService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * Jika ada data Google di session (dari alur Google Register),
     * teruskan ke frontend sebagai prop 'googleData' untuk pre-fill form.
     */
    public function create(Request $request): Response
    {
        $googleData = session('googleData') ?? $request->session()->get('google_register_data');

        return Inertia::render('Auth/Register', [
            'googleData' => $googleData,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'google_id' => 'nullable|string',
        ]);

        // Ambil google_id dari request atau fallback ke session
        $sessionGoogleData = $request->session()->pull('googleData') ?? $request->session()->pull('google_register_data');
        $googleId = $request->google_id ?: ($sessionGoogleData['google_id'] ?? null);

        // Tentukan role berdasarkan email
        $email = $request->email;
        $isAdmin = ($email === 'admin@sigizi.com')
            || str_contains(strtolower($email), 'admin')
            || str_contains(strtolower($email), 'novi');
        $role = $isAdmin ? 'Admin' : 'Pengguna';

        $user = User::create([
            'name' => $request->name,
            'email' => $email,
            'password' => Hash::make($request->password),
            'google_id' => $googleId,
            'role' => $role,
            'status' => 'Aktif',
        ]);

        // Sinkronisasi user baru ke Supabase
        try {
            $supabase = app(SupabaseService::class);
            $now = now()->toIso8601String();
            $supabase->insert('users', [
                'name' => $request->name,
                'email' => $email,
                'password' => Hash::make($request->password),
                'status' => 'Aktif',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        } catch (\Exception $e) {
            logger()->error('Failed to sync new user to Supabase: ' . $e->getMessage());
        }

        event(new Registered($user));

        Auth::login($user);

        // Redirect berdasarkan role
        if ($user->role === 'Admin') {
            return redirect()->route('admin.dashboard');
        }

        return redirect(route('dashboard', absolute: false));
    }
}
