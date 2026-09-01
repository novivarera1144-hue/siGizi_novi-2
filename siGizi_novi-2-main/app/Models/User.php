<?php

namespace App\Models;

use App\Models\RiwayatScanMakanan;
use App\Models\RiwayatChatAi;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password'])]
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
        ];
    }

    // User memiliki banyak riwayat scan
    public function riwayatScan()
    {
        return $this->hasMany(RiwayatScanMakanan::class);
    }

    // User memiliki banyak riwayat chat AI
    public function riwayatChat()
    {
        return $this->hasMany(RiwayatChatAi::class);
    }
}