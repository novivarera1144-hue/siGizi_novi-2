<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $table = 'reviews';

    protected $fillable = [
        'user_id',
        'role',
        'rating',
        'comment',
        'is_visible',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
        'rating'     => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}