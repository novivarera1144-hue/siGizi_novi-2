<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfOnboardingCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Jika user login dan sudah menyelesaikan onboarding, alihkan ke dashboard,
        // kecuali jika ada session 'success' (baru saja submit form onboarding agar modal sukses tampil).
        if ($user && $user->onboarding_completed && !session()->has('success')) {
            return redirect()->route('dashboard');
        }

        return $next($request);
    }
}
