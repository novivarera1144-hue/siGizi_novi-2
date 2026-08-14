<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $table = 'reviews';

    protected $fillable = [
        'user_id',
        'pekerjaan',
        'rating',
        'ulasan',
        'is_approved',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
        'rating' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}