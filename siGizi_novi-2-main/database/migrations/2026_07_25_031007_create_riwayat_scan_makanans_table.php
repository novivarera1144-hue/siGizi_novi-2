<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('riwayat_scan_makanans', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('nama_makanan');
        $table->string('foto_scan');
        $table->float('kalori_terdeteksi');
        $table->float('protein');
        $table->float('karbohidrat');
        $table->float('lemak');
        $table->json('analisis_lengkap_ai')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_scan_makanans');
    }
};
