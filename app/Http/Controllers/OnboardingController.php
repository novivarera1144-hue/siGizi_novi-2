<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class OnboardingController extends Controller
{
    /**
     * Tampilkan halaman onboarding.
     */
    public function index(): Response
    {
        return Inertia::render('Auth/Onboarding');
    }

    /**
     * Simpan data onboarding/target kesehatan pengguna.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'personal_motivation' => ['required', 'string', 'max:1000'],
            'height' => ['required', 'numeric', 'min:30', 'max:300'],
            'weight' => ['required', 'numeric', 'min:10', 'max:500'],
            
            // PERBAIKAN DI SINI: Ubah dari 'in:...' menjadi 'string' biasa
            'weight_goal' => ['required', 'string'], 
            
            'target_weight' => ['nullable', 'numeric', 'min:10', 'max:500'], // Diubah jadi nullable jika tidak diisi
            'duration_weeks' => ['required', 'integer', 'min:1', 'max:52'],
            'target_calories' => ['required', 'numeric', 'min:500', 'max:10000'],
            'target_protein' => ['required', 'numeric', 'min:5', 'max:1000'],
            'target_fat' => ['required', 'numeric', 'min:5', 'max:1000'],
            'target_carbs' => ['required', 'numeric', 'min:5', 'max:2000'],
        ]);

        $user = $request->user();
        $user->update([
            'personal_motivation' => $validated['personal_motivation'],
            'height' => $validated['height'],
            'weight' => $validated['weight'],
            'weight_goal' => $validated['weight_goal'],
            'target_weight' => $validated['target_weight'] ?? null,
            'duration_weeks' => $validated['duration_weeks'],
            'target_calories' => $validated['target_calories'],
            'target_protein' => $validated['target_protein'],
            'target_fat' => $validated['target_fat'],
            'target_carbs' => $validated['target_carbs'],
            'onboarding_completed' => true,
        ]);

        return redirect()->route('dashboard')->with('success', 'Target kesehatan berhasil disimpan! Selamat datang di siGizi.');
    }
}