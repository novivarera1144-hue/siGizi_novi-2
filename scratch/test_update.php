<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$req = Illuminate\Http\Request::create('/admin/pengaturan-sistem', 'PUT', [
    'app_name' => 'siGizi Pro',
    'admin_email' => 'admin@sigizi.id',
    'maintenance_mode' => true,
    'enable_2fa' => false,
    'session_timeout' => 30,
]);

$ctrl = new \App\Http\Controllers\Admin\SystemSettingController();
$ctrl->update($req);

echo "UPDATED SETTINGS IN DB:\n";
var_dump(\App\Models\SystemSetting::getAll());
