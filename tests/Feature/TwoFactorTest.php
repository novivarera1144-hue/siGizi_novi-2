<?php

use App\Models\OtpCode;
use App\Models\User;

test('2FA verification code can be requested', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/profile/two-factor/send-code');

    $response->assertSessionHas('status');

    $this->assertDatabaseHas('otp_codes', [
        'email' => $user->email,
    ]);
});

test('2FA activation fails with incorrect code', function () {
    $user = User::factory()->create(['two_factor_enabled' => false]);

    $response = $this
        ->actingAs($user)
        ->post('/profile/two-factor/enable', [
            'code' => '999999',
        ]);

    $response->assertSessionHasErrors('code');
    $this->assertFalse($user->refresh()->two_factor_enabled);
});

test('2FA can be enabled with valid code', function () {
    $user = User::factory()->create(['two_factor_enabled' => false]);

    OtpCode::create([
        'email' => $user->email,
        'otp_code' => '654321',
        'expires_at' => now()->addMinutes(10),
    ]);

    $response = $this
        ->actingAs($user)
        ->post('/profile/two-factor/enable', [
            'code' => '654321',
        ]);

    $response->assertSessionHasNoErrors();
    $this->assertTrue($user->refresh()->two_factor_enabled);
});

test('2FA can be disabled', function () {
    $user = User::factory()->create(['two_factor_enabled' => true]);

    $response = $this
        ->actingAs($user)
        ->post('/profile/two-factor/disable');

    $response->assertSessionHasNoErrors();
    $this->assertFalse($user->refresh()->two_factor_enabled);
});
