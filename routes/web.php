<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route halaman Tentang Kami
Route::get('/tentang-kami', function () {
    return Inertia::render('About', [
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('tentang-kami');

// API Endpoint untuk Scan History
Route::get('/api/user/scan-history', function () {
    $data = DB::table('scan_histories')->get();
    return response()->json($data);
});

// Semua Rute yang Membutuhkan Login (Auth)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Scan Routes
    Route::get('/scan', function () {
        return Inertia::render('ScanPage');
    })->name('scan');

    Route::post('/scan', [ScanController::class, 'store'])->name('scan.store');

    Route::get('/result', function () {
        return Inertia::render('ResultPage');
    })->name('result');

    // Rute Riwayat Scan
    Route::get('/riwayat', function () {
        return Inertia::render('RiwayatScanPage');
    })->name('riwayat');

    // Rute Laporan Mingguan
    Route::get('/laporan-mingguan', function () {
        return Inertia::render('LaporanMingguan');
    })->name('laporan.mingguan');
});

require __DIR__.'/auth.php';