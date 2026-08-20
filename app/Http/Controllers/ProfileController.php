<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if it exists
            if ($user->photo) {
                Storage::disk('public')->delete($user->photo);
            }
            // Store new photo
            $path = $request->file('photo')->store('profile-photos', 'public');
            $user->photo = $path;
        } elseif ($request->boolean('delete_photo')) {
            // Delete old photo if it exists
            if ($user->photo) {
                Storage::disk('public')->delete($user->photo);
            }
            $user->photo = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('success', 'Profil berhasil diperbarui.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Update the user's health goals.
     */
    public function updateGoals(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'personal_motivation' => ['required', 'string', 'max:1000'],
            'height' => ['required', 'numeric', 'min:30', 'max:300'],
            'weight' => ['required', 'numeric', 'min:10', 'max:500'],
            'weight_goal' => ['required'], // Mengizinkan array dari multi-select frontend
            'target_weight' => ['nullable', 'numeric', 'min:10', 'max:500'],
            'duration_weeks' => ['required', 'integer', 'min:1', 'max:52'],
            'target_calories' => ['required', 'numeric', 'min:500', 'max:10000'],
            'target_protein' => ['required', 'numeric', 'min:5', 'max:1000'],
            'target_fat' => ['required', 'numeric', 'min:5', 'max:1000'],
            'target_carbs' => ['required', 'numeric', 'min:5', 'max:2000'],
        ]);

        // Jika weight_goal berupa array, ubah jadi JSON/string agar aman disimpan ke database
        if (is_array($validated['weight_goal'])) {
            $validated['weight_goal'] = json_encode($validated['weight_goal']);
        }

        $request->user()->update($validated);

        return Redirect::route('profile.edit')->with('success', 'Target kesehatan berhasil diperbarui.');
    }
}