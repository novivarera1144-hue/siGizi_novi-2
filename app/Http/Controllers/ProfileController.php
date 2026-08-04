<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
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
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
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
            'weight_goal' => ['required', 'string', 'in:Menjaga Berat Badan,Menurunkan Berat Badan,Menaikkan Berat Badan'],
            'target_weight' => ['required', 'numeric', 'min:10', 'max:500'],
            'duration_weeks' => ['required', 'integer', 'min:1', 'max:52'],
            'target_calories' => ['required', 'numeric', 'min:500', 'max:10000'],
            'target_protein' => ['required', 'numeric', 'min:5', 'max:1000'],
            'target_fat' => ['required', 'numeric', 'min:5', 'max:1000'],
            'target_carbs' => ['required', 'numeric', 'min:5', 'max:2000'],
        ]);

        $request->user()->update($validated);

        return Redirect::route('profile.edit')->with('success', 'Target kesehatan berhasil diperbarui.');
    }
}
