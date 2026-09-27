<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Paksa HTTPS di lingkungan produksi/Vercel agar tidak Mixed Content
        if (config('app.env') !== 'local' || request()->header('x-forwarded-proto') === 'https') {
            URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);

        // Mengatur bahasa Carbon ke Bahasa Indonesia secara global
        Carbon::setLocale('id');
    }
}
