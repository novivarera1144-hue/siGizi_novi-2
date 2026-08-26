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
        if (!Schema::hasColumn('home_settings', 'about_target_users')) {
            Schema::table('home_settings', function (Blueprint $table) {
                $table->json('about_target_users')->nullable()->after('about_benefits');
            });
        }

        // Fill existing record with default target users if null
        $defaultUsers = [
            'Mahasiswa',
            'Pelajar',
            'Anak Kost',
            'Pekerja',
            'Masyarakat Umum',
            'Program Diet',
            'Penggiat Hidup Sehat',
        ];

        DB::table('home_settings')
            ->whereNull('about_target_users')
            ->update([
                'about_target_users' => json_encode($defaultUsers),
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('home_settings', 'about_target_users')) {
            Schema::table('home_settings', function (Blueprint $table) {
                $table->dropColumn('about_target_users');
            });
        }
    }
};
