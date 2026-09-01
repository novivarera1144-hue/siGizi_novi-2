<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnboardingCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Jika user adalah admin, bypass onboarding
        if ($user && ($user->email === 'admin@sigizi.com' || $request->is('admin*'))) {
            return $next($request);
        }

        // Jika user login dan belum menyelesaikan onboarding, alihkan ke halaman onboarding
        if ($user && !$user->onboarding_completed) {
            // Biarkan request untuk logout, halaman onboarding, atau penyimpanan onboarding lewat
            if ($request->routeIs('onboarding') || $request->routeIs('onboarding.store') || $request->routeIs('logout')) {
                return $next($request);
            }

            return redirect()->route('onboarding');
        }

        return $next($request);
    }
}
