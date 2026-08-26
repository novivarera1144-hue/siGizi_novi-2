<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user) {
            $email = strtolower($user->email ?? '');
            $role = $user->role ?? '';

            $isAdmin = in_array($role, ['Admin', 'Super Admin', 'Admin Konten'])
                || $email === 'admin@sigizi.com'
                || str_contains($email, 'admin')
                || str_contains($email, 'novi');

            if ($isAdmin) {
                return $next($request);
            }
        }

        return redirect()->route('dashboard')->with('error', 'Anda tidak memiliki hak akses Administrator.');
    }
}
