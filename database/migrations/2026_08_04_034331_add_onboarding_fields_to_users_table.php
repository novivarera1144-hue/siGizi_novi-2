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
            $table->boolean('onboarding_completed')->default(false);
            $table->text('personal_motivation')->nullable();
            $table->double('height')->nullable();
            $table->double('weight')->nullable();
            $table->double('target_weight')->nullable();
            $table->string('weight_goal')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'onboarding_completed',
                'personal_motivation',
                'height',
                'weight',
                'target_weight',
                'weight_goal'
            ]);
        });
    }
};
