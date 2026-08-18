<?php

use App\Models\User;
use App\Models\OtpCode;
use App\Mail\SendOtpMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

test('reset password link screen can be rendered', function () {
    $response = $this->get('/forgot-password');

    $response->assertStatus(200);
});

test('OTP code can be requested', function () {
    Mail::fake();

    $user = User::factory()->create();

    $response = $this->post('/forgot-password', ['email' => $user->email]);

    $response->assertSessionHasNoErrors();
    
    // Assert OTP is created in DB
    $this->assertDatabaseHas('otp_codes', [
        'email' => $user->email,
    ]);

    // Assert mail is sent
    Mail::assertSent(SendOtpMail::class, function ($mail) use ($user) {
        return $mail->hasTo($user->email);
    });
});

test('OTP code can be verified', function () {
    $user = User::factory()->create();
    $otp = '123456';
    OtpCode::create([
        'email' => $user->email,
        'otp_code' => $otp,
        'expires_at' => now()->addMinutes(10),
    ]);

    $response = $this->post('/verify-otp', [
        'email' => $user->email,
        'otp' => $otp,
    ]);

    $response->assertSessionHasNoErrors();
    $response->assertSessionHas('status');
});

test('OTP verification fails with invalid or expired OTP', function () {
    $user = User::factory()->create();
    
    // Test invalid OTP
    $response = $this->post('/verify-otp', [
        'email' => $user->email,
        'otp' => '999999',
    ]);
    $response->assertSessionHasErrors('otp');

    // Test expired OTP
    $otp = '123456';
    OtpCode::create([
        'email' => $user->email,
        'otp_code' => $otp,
        'expires_at' => now()->subMinutes(1),
    ]);

    $response = $this->post('/verify-otp', [
        'email' => $user->email,
        'otp' => $otp,
    ]);
    $response->assertSessionHasErrors('otp');
});

test('password can be reset with valid OTP', function () {
    $user = User::factory()->create();
    $otp = '123456';
    OtpCode::create([
        'email' => $user->email,
        'otp_code' => $otp,
        'expires_at' => now()->addMinutes(10),
    ]);

    $response = $this->post('/reset-password', [
        'email' => $user->email,
        'otp' => $otp,
        'password' => 'newpassword123',
        'password_confirmation' => 'newpassword123',
    ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('login'));

    // Check user password is updated
    $user->refresh();
    $this->assertTrue(Hash::check('newpassword123', $user->password));

    // Check OTP record is deleted
    $this->assertDatabaseMissing('otp_codes', [
        'email' => $user->email,
    ]);
});
