<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ScanHistory extends Model
{
    use HasFactory;

    protected $table = 'riwayat_scan_makanans';

    protected $fillable = [
        'user_id',
        'nama_Makanan',
        'foto_scan',
        'kalori_terdeteksi',
        'protein',
        'karboh',
        'lemak',
    ];

    protected $casts = [
        'analisis_lengkap_ai' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}