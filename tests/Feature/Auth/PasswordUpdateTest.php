<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('password can be updated', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->put('/password', [
            'current_password' => 'password',
            'password' => 'new-password1',
            'password_confirmation' => 'new-password1',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/profile');

    $this->assertTrue(Hash::check('new-password1', $user->refresh()->password));
});

test('password update fails if missing numbers or letters or under 8 chars', function () {
    $user = User::factory()->create();

    // Missing numbers
    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->put('/password', [
            'current_password' => 'password',
            'password' => 'onlyletters',
            'password_confirmation' => 'onlyletters',
        ]);
    $response->assertSessionHasErrors('password');

    // Missing letters
    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->put('/password', [
            'current_password' => 'password',
            'password' => '12345678',
            'password_confirmation' => '12345678',
        ]);
    $response->assertSessionHasErrors('password');

    // Under 8 chars
    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->put('/password', [
            'current_password' => 'password',
            'password' => 'pass1',
            'password_confirmation' => 'pass1',
        ]);
    $response->assertSessionHasErrors('password');
});

test('correct password must be provided to update password', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->put('/password', [
            'current_password' => 'wrong-password',
            'password' => 'new-password1',
            'password_confirmation' => 'new-password1',
        ]);

    $response
        ->assertSessionHasErrors('current_password')
        ->assertRedirect('/profile');
});
