<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('home_settings', function (Blueprint $table) {
            $table->id();
            $table->string('hero_headline')->default('Kenali Gizi Makananmu');
            $table->string('hero_image')->nullable();
            $table->text('about_short_description')->nullable();
            $table->text('about_background')->nullable();
            $table->text('about_goal')->nullable();
            $table->json('about_benefits')->nullable();
            $table->json('about_target_users')->nullable();
            $table->timestamps();
        });

        // Insert default row with sensible values
        DB::table('home_settings')->insert([
            'hero_headline' => 'Kenali Gizi Makananmu',
            'hero_image' => null,
            'about_short_description' => 'Platform berbasis web yang dirancang untuk membantu masyarakat memahami kandungan nutrisi makanan sehari-hari secara mudah, cepat, dan akurat.',
            'about_background' => 'Banyak masyarakat peduli kesehatan namun kesulitan mengetahui kandungan nutrisi lengkap dari makanan yang mereka konsumsi sehari-hari.',
            'about_goal' => 'Mengembangkan platform AI berbasis web untuk membantu masyarakat memantau gizi demi gaya hidup sehat berkelanjutan.',
            'about_benefits' => json_encode([
                'Mengetahui kandungan nutrisi makanan secara instan',
                'Memantau asupan nutrisi harian dengan mudah',
            ]),
            'about_target_users' => json_encode([
                'Mahasiswa',
                'Pelajar',
                'Anak Kost',
                'Pekerja',
                'Masyarakat Umum',
                'Program Diet',
                'Penggiat Hidup Sehat',
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_settings');
    }
};
