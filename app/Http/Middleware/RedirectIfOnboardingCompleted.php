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

        // Jika user login dan sudah menyelesaikan onboarding, alihkan ke dashboard
        if ($user && $user->onboarding_completed) {
            return redirect()->route('dashboard');
        }

        return $next($request);
    }
}
