<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class AdminProfileController extends Controller
{
    /**
     * Show the admin profile settings page.
     */
    public function edit(Request $request)
    {
        $sessions = \Illuminate\Support\Facades\DB::table('sessions')
            ->where('user_id', $request->user()->id)
            ->orderBy('last_activity', 'desc')
            ->get()
            ->map(function ($session) use ($request) {
                $agent = $session->user_agent;
                
                $browser = 'Unknown';
                if (preg_match('/Firefox/i', $agent)) $browser = 'Firefox';
                elseif (preg_match('/Edg/i', $agent)) $browser = 'Edge';
                elseif (preg_match('/Chrome/i', $agent)) $browser = 'Chrome';
                elseif (preg_match('/Safari/i', $agent)) $browser = 'Safari';

                $os = 'Unknown';
                if (preg_match('/Windows/i', $agent)) $os = 'Windows';
                elseif (preg_match('/Mac/i', $agent)) $os = 'macOS';
                elseif (preg_match('/Linux/i', $agent)) $os = 'Linux';
                elseif (preg_match('/Android/i', $agent)) $os = 'Android';
                elseif (preg_match('/iPhone|iPad/i', $agent)) $os = 'iOS';

                return (object) [
                    'id' => $session->id,
                    'ip_address' => $session->ip_address,
                    'is_current_device' => $session->id === $request->session()->getId(),
                    'browser' => $browser,
                    'os' => $os,
                    'last_active' => \Carbon\Carbon::createFromTimestamp($session->last_activity)->diffForHumans(),
                ];
            });

        return \Inertia\Inertia::render('Admin/ProfileSettings', [
            'sessions' => $sessions
        ]);
    }

    /**
     * Destroy other browser sessions.
     */
    public function destroySession(Request $request, string $sessionId)
    {
        if ($sessionId === $request->session()->getId()) {
            return redirect()->back()->with('error', 'Anda tidak dapat mengeluarkan sesi perangkat yang sedang digunakan.');
        }

        $deleted = \Illuminate\Support\Facades\DB::table('sessions')
            ->where('id', $sessionId)
            ->where('user_id', $request->user()->id)
            ->delete();

        if ($deleted) {
            return redirect()->back()->with('success', 'Sesi perangkat berhasil dikeluarkan.');
        }

        return redirect()->back()->with('error', 'Sesi tidak ditemukan atau sudah berakhir.');
    }

    /**
     * Update the admin's profile information.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'avatar' => ['nullable', 'image', 'max:2048'],
            'remove_avatar' => ['nullable', 'boolean'],
        ]);

        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($request->hasFile('avatar')) {
            if ($user->avatar && !filter_var($user->avatar, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($user->avatar);
            }
            if ($user->photo && !filter_var($user->photo, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($user->photo);
            }
            
            $path = $request->file('avatar')->store('profile-photos', 'public');
            $user->avatar = $path;
            $user->photo = null;
        } elseif ($request->boolean('remove_avatar') || $request->input('remove_avatar') === 'true' || $request->input('remove_avatar') == 1) {
            if ($user->avatar && !filter_var($user->avatar, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($user->avatar);
            }
            if ($user->photo && !filter_var($user->photo, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($user->photo);
            }
            
            $user->avatar = null;
            $user->photo = null;
        }

        $user->save();

        return redirect()->back()->with('success', 'Informasi profil berhasil diperbarui.');
    }

    /**
     * Update the admin's password.
     */
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->back()->with('success', 'Kata sandi berhasil diperbarui.');
    }
}