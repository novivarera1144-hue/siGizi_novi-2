<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'onboarding_completed', 'personal_motivation', 'height', 'weight', 'target_weight', 'weight_goal', 'duration_weeks', 'target_calories', 'target_protein', 'target_fat', 'target_carbs', 'phone', 'photo'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'onboarding_completed' => 'boolean',
            'height' => 'double',
            'weight' => 'double',
            'target_weight' => 'double',
            'duration_weeks' => 'integer',
            'target_calories' => 'double',
            'target_protein' => 'double',
            'target_fat' => 'double',
            'target_carbs' => 'double',
        ];
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }
}
