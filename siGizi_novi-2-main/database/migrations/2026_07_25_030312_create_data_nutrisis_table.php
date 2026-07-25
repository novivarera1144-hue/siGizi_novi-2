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
    Schema::create('data_nutrisis', function (Blueprint $table) {
        $table->id();
        $table->string('nama_makanan');
        $table->string('porsi')->default('1 porsi');
        $table->float('kalori');
        $table->float('protein');
        $table->float('karbohidrat');
        $table->float('lemak');
        $table->string('gambar_makanan')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_nutrisis');
    }
};
