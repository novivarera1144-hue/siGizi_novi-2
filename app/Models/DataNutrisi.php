<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataNutrisi extends Model
{
    use HasFactory;

    // Menghubungkan ke nama tabel di Supabase
    protected $table = 'data_nutrisis';

    // Sesuaikan nama kolom berikut dengan kolom yang ada di tabel Supabase kamu
    protected $fillable = [
        'user_id',
        'nama_makanan',
        'kalori',
        'protein',
        'karbohidrat',
        'lemak',
        // tambahkan kolom lain di sini jika ada
    ];

    // Relasi balik ke User (opsional)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}