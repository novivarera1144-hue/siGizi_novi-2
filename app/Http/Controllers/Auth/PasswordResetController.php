<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\OtpCode;
use App\Models\User;
use App\Mail\SendOtpMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
    /**
     * Send OTP to the user's email.
     */
    public function sendOtp(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.exists' => 'Email ini tidak terdaftar di sistem kami.',
        ]);

        // Generate 6 digit random number
        $otp = sprintf('%06d', mt_rand(0, 999999));

        // Save to database with 10 minutes expiry
        OtpCode::updateOrCreate(
            ['email' => $request->email],
            [
                'otp_code' => $otp,
                'expires_at' => now()->addMinutes(10),
            ]
        );

        // Send via Laravel Mail
        try {
            Mail::to($request->email)->send(new SendOtpMail($otp));
        } catch (\Exception $e) {
            // Log the error or handle it, but keep user experience smooth
            logger()->error('Failed sending OTP mail to ' . $request->email . ': ' . $e->getMessage());
            throw ValidationException::withMessages([
                'email' => ['Gagal mengirimkan email verifikasi. Silakan coba beberapa saat lagi.'],
            ]);
        }

        return back()->with('status', 'Kode verifikasi telah dikirim ke email Anda.');
    }

    /**
     * Verify the sent OTP.
     */
    public function verifyOtp(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|size:6',
        ], [
            'otp.required' => 'Kode verifikasi wajib diisi.',
            'otp.size' => 'Kode verifikasi harus berukuran 6 digit.',
        ]);

        $otpRecord = OtpCode::where('email', $request->email)
            ->where('otp_code', $request->otp)
            ->first();

        if (!$otpRecord) {
            throw ValidationException::withMessages([
                'otp' => ['Kode verifikasi (OTP) salah.'],
            ]);
        }

        if ($otpRecord->expires_at->isPast()) {
            throw ValidationException::withMessages([
                'otp' => ['Kode verifikasi (OTP) telah kedaluwarsa. Silakan kirim ulang.'],
            ]);
        }

        // Return success response via Inertia (refresh screen)
        return back()->with('status', 'Kode verifikasi berhasil diverifikasi.');
    }

    /**
     * Reset the user's password.
     */
    public function resetPassword(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|size:6',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'otp.required' => 'Sesi OTP tidak valid.',
            'password.confirmed' => 'Konfirmasi kata sandi tidak cocok.',
        ]);

        // Re-verify the OTP for security
        $otpRecord = OtpCode::where('email', $request->email)
            ->where('otp_code', $request->otp)
            ->first();

        if (!$otpRecord || $otpRecord->expires_at->isPast()) {
            throw ValidationException::withMessages([
                'otp' => ['Sesi verifikasi tidak valid atau telah kedaluwarsa. Silakan ulangi proses.'],
            ]);
        }

        // Update the password in users table
        $user = User::where('email', $request->email)->firstOrFail();
        $user->forceFill([
            'password' => Hash::make($request->password),
        ])->save();

        // Delete the used OTP record
        $otpRecord->delete();

        // Redirect to login page with success status
        return redirect()->route('login')->with('status', 'Kata sandi berhasil diubah! Silakan masuk kembali dengan kata sandi baru Anda.');
    }
}
