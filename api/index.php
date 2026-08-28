<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// 1. Lokasi Storage & View Sementara (Read-Write di AWS/Vercel Lambda)
putenv('VIEW_COMPILED_PATH=/tmp/views');
if (!is_dir('/tmp/views')) {
    @mkdir('/tmp/views', 0755, true);
}

// 2. Load Autoloader & Bootstrap App
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

// 3. Set Base Path & Storage Path Eksplisit
$app->useBasePath(realpath(__DIR__ . '/..'));
$app->useStoragePath('/tmp');

// 4. Jalankan Aplikasi
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Request::capture()
);
$response->send();
$kernel->terminate($request, $response);