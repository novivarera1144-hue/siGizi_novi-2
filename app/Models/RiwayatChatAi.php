<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatChatAi extends Model
{
    use HasFactory;

    // Hubungkan dengan nama tabel di Supabase
    protected $table = 'riwayat_chat_ais';

    // Kolom yang boleh diisi
    protected $fillable = [
        'user_id',
        'pesan_user',
        'respon_ai',
    ];
}