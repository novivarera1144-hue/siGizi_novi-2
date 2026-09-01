<?php

namespace App\Http\Middleware;

use App\Models\SystemSetting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class DynamicSessionTimeout
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $timeoutMinutes = (int) SystemSetting::get('session_timeout', 15);
        if ($timeoutMinutes <= 0) {
            $timeoutMinutes = 15;
        }

        // Set dynamic session lifetime config
        config(['session.lifetime' => $timeoutMinutes]);

        if (Auth::check()) {
            $lastActivity = session('last_activity_time');
            $currentTime = time();
            $timeoutSeconds = $timeoutMinutes * 60;

            if ($lastActivity && ($currentTime - $lastActivity) > $timeoutSeconds) {
                Auth::guard('web')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return redirect()->route('login')->with('error', 'Sesi Anda telah berakhir karena tidak ada aktivitas selama ' . $timeoutMinutes . ' menit.');
            }

            session(['last_activity_time' => $currentTime]);
        }

        return $next($request);
    }
}
