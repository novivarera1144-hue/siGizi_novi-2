<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$req = Illuminate\Http\Request::create('/admin/pengaturan-sistem/reset', 'POST');
$ctrl = new \App\Http\Controllers\Admin\SystemSettingController();
$ctrl->resetData($req);

echo "RESET SETTINGS IN DB:\n";
var_dump(\App\Models\SystemSetting::getAll());
