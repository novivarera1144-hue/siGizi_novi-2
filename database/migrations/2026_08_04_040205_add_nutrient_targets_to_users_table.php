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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('duration_weeks')->default(12);
            $table->double('target_calories')->nullable();
            $table->double('target_protein')->nullable();
            $table->double('target_fat')->nullable();
            $table->double('target_carbs')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'duration_weeks',
                'target_calories',
                'target_protein',
                'target_fat',
                'target_carbs'
            ]);
        });
    }
};
