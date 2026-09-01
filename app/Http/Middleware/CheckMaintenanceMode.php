<?php

namespace App\Http\Middleware;

use App\Models\SystemSetting;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CheckMaintenanceMode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $isMaintenance = SystemSetting::get('maintenance_mode', false);

        if ($isMaintenance) {
            $user = $request->user();
            
            // Cek apakah user yang login adalah admin
            $isAdmin = false;
            if ($user) {
                $email = strtolower($user->email ?? '');
                $role = $user->role ?? '';
                $isAdmin = in_array($role, ['Admin', 'Super Admin', 'Admin Konten'])
                    || $email === 'admin@sigizi.com'
                    || str_contains($email, 'admin')
                    || str_contains($email, 'novi');
            }

            // Izinkan admin, rute login, logout, dan halaman maintenance itu sendiri
            $exemptRoutes = [
                'login',
                'logout',
                'maintenance',
                'admin.*',
            ];

            $isExemptRoute = false;
            foreach ($exemptRoutes as $routePattern) {
                if ($request->routeIs($routePattern) || $request->is('admin*') || $request->is('login*') || $request->is('logout*') || $request->is('maintenance')) {
                    $isExemptRoute = true;
                    break;
                }
            }

            if (!$isAdmin && !$isExemptRoute) {
                if ($request->header('X-Inertia')) {
                    return Inertia::render('Maintenance')->toResponse($request);
                }
                return redirect()->route('maintenance');
            }
        }

        return $next($request);
    }
}
