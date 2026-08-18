<?php

use App\Http\Controllers\AiChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScanController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\Admin\KelolaPenggunaController;
use App\Http\Controllers\Admin\LaporanGlobalController;
use App\Http\Controllers\RiwayatController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

Route::get('/', function () {
    $testimonials = \App\Models\Testimonial::with('user:id,name,photo')
        ->where('is_approved', true)
        ->latest()
        ->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'testimonials' => $testimonials,
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

// API Endpoint untuk Scan History (dari Supabase)
Route::get('/api/user/scan-history', function () {
    $supabase = app(\App\Services\SupabaseService::class);
    $data = $supabase->get('riwayat_scan_makanans', [
        'order' => 'id.desc',
        'limit' => 100
    ]);
    return response()->json($data);
});

// Semua Rute yang Membutuhkan Login (Auth)
Route::middleware(['auth'])->group(function () {

    // Rute Onboarding (Hanya untuk yang belum menyelesaikan onboarding)
    Route::middleware(['redirect.onboarded'])->group(function () {
        Route::get('/onboarding', [OnboardingController::class, 'index'])->name('onboarding');
        Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.store');
    });

    // Rute yang Dilindungi (Wajib menyelesaikan onboarding)
    Route::middleware(['onboarded'])->group(function () {
        // Dashboard (Supabase-backed)
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Admin Routes
        Route::middleware([\App\Http\Middleware\EnsureUserIsAdmin::class])->prefix('admin')->group(function () {
            Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

            Route::get('/kelola-pengguna', [KelolaPenggunaController::class, 'index'])->name('admin.kelola-pengguna');
            Route::post('/kelola-pengguna', [KelolaPenggunaController::class, 'store'])->name('admin.kelola-pengguna.store');
            Route::put('/kelola-pengguna/{id}', [KelolaPenggunaController::class, 'update'])->name('admin.kelola-pengguna.update');
            Route::delete('/kelola-pengguna/{id}', [KelolaPenggunaController::class, 'destroy'])->name('admin.kelola-pengguna.destroy');
            
            // Rute Tambahan untuk Fitur Tangguhkan / Suspend Pengguna
            Route::patch('/kelola-pengguna/{id}/toggle-suspend', [KelolaPenggunaController::class, 'toggleSuspend'])->name('admin.users.toggle-suspend');

            Route::get('/kelola-tampilan', function () {
                $testimonials = \App\Models\Testimonial::with('user:id,name,photo')->latest()->get();
                return Inertia::render('Admin/KelolaTampilan', [
                    'testimonials' => $testimonials
                ]);
            })->name('admin.kelola-tampilan');

            Route::patch('/testimonials/{testimonial}/status', [TestimonialController::class, 'updateStatus'])
                ->name('admin.testimonials.update-status');

            Route::get('/laporan-global', [LaporanGlobalController::class, 'index'])->name('admin.laporan-global');

            Route::get('/pengaturan-sistem', function () {
                return Inertia::render('Admin/PengaturanSistem');
            })->name('admin.pengaturan-sistem');

            // Rute untuk menyimpan pengaturan sistem (UPDATE)
            Route::put('/pengaturan-sistem', function (\Illuminate\Http\Request $request) {
                $validated = $request->validate([
                    'app_name' => 'required|string|max:255',
                    'admin_email' => 'required|email',
                    'enable_2fa' => 'boolean',
                    'maintenance_mode' => 'boolean',
                    'notify_new_user' => 'boolean',
                    'notify_weekly_report' => 'boolean',
                    'session_timeout' => 'required',
                ]);

                return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
            })->name('admin.pengaturan-update');

            // Rute untuk Pengaturan Profil Admin
            Route::get('/settings/profile', function () {
                return Inertia::render('Admin/ProfileSettings');
            })->name('admin.profile.settings');

            // Ubah dari Route::put menjadi Route::post
            Route::post('/settings/profile', [\App\Http\Controllers\Admin\AdminProfileController::class, 'updateProfile'])
                ->name('admin.profile.update');

            Route::put('/settings/password', [\App\Http\Controllers\Admin\AdminProfileController::class, 'updatePassword'])
                ->name('admin.profile.password');
        });

        // Profile Routes (User Biasa)
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::post('/profile/goals', [ProfileController::class, 'updateGoals'])->name('profile.goals.update');
        Route::post('/profile/testimonial', [TestimonialController::class, 'store'])->name('profile.testimonial.store');

        // Scan Routes
        Route::get('/scan', function () {
            return Inertia::render('ScanPage');
        })->name('scan');

        Route::post('/scan', [ScanController::class, 'store'])->name('scan.store');

        Route::get('/result', function () {
            return Inertia::render('ResultPage');
        })->name('result');

        // Rute Riwayat Scan (Supabase-backed)
        Route::get('/riwayat', [RiwayatController::class, 'index'])->name('riwayat');

        // Rute Laporan Mingguan (Supabase-backed)
        Route::get('/laporan-mingguan', [LaporanController::class, 'index'])->name('laporan.mingguan');

        // Rute AI Assistant
        Route::get('/ai-assistant', [AiChatController::class, 'index'])->name('ai.assistant');
        Route::post('/ai-assistant/chat', [AiChatController::class, 'chat'])->name('ai.chat');
    });
});

require __DIR__.'/auth.php';