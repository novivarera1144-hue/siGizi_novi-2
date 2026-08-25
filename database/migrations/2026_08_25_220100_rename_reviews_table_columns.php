<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Rename columns in the reviews table to match the new schema.
     * pekerjaan -> role, ulasan -> comment, is_approved -> is_visible
     */
    public function up(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->renameColumn('pekerjaan', 'role');
            $table->renameColumn('ulasan', 'comment');
            $table->renameColumn('is_approved', 'is_visible');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->renameColumn('role', 'pekerjaan');
            $table->renameColumn('comment', 'ulasan');
            $table->renameColumn('is_visible', 'is_approved');
        });
    }
};
