<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route halaman Tentang Kami (Mengirimkan data auth agar navbar sinkron)
Route::get('/tentang-kami', function () {
    return Inertia::render('About', [
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('tentang-kami');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/scan', function () {
        return Inertia::render('ScanPage');
    })->name('scan');

    Route::post('/scan', [ScanController::class, 'store'])->name('scan.store');

    Route::get('/result', function () {
        return Inertia::render('ResultPage');
    })->name('result');
});

require __DIR__.'/auth.php';