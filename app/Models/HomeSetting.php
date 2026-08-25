<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeSetting extends Model
{
    protected $table = 'home_settings';

    protected $fillable = [
        'hero_headline',
        'hero_image',
        'about_short_description',
        'about_background',
        'about_goal',
        'about_benefits',
    ];

    protected $casts = [
        'about_benefits' => 'array',
    ];

    /**
     * Get the single settings row, or create it with defaults if it doesn't exist.
     */
    public static function getSettings(): self
    {
        return self::firstOrCreate([], [
            'hero_headline'           => 'Kenali Gizi Makananmu',
            'hero_image'              => null,
            'about_short_description' => 'Platform berbasis web yang dirancang untuk membantu masyarakat memahami kandungan nutrisi makanan sehari-hari secara mudah, cepat, dan akurat.',
            'about_background'        => 'Banyak masyarakat peduli kesehatan namun kesulitan mengetahui kandungan nutrisi lengkap dari makanan yang mereka konsumsi sehari-hari.',
            'about_goal'              => 'Mengembangkan platform AI berbasis web untuk membantu masyarakat memantau gizi demi gaya hidup sehat berkelanjutan.',
            'about_benefits'          => [
                'Mengetahui kandungan nutrisi makanan secara instan',
                'Memantau asupan nutrisi harian dengan mudah',
            ],
        ]);
    }
}
