<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// 1. Set environment variables & lokasi sementara
putenv('APP_ENV=production');
putenv('APP_DEBUG=true');
putenv('APP_KEY=base64:4d8vK9Xz2mQ1wE8rT5yU7iO0pA3sD6fG9hJ2kL5zX8=');
putenv('VIEW_COMPILED_PATH=/tmp/views');
putenv('CACHE_STORE=array');
putenv('SESSION_DRIVER=cookie');

if (!is_dir('/tmp/views')) {
    @mkdir('/tmp/views', 0755, true);
}

// 2. Load Autoload & App
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

// 3. Set Base Path & Storage Path
$app->useBasePath(realpath(__DIR__ . '/..'));
$app->useStoragePath('/tmp');

// 4. Inisialisasi Kernel HTTP (Memuat Service Providers & View Engine)
$kernel = $app->make(Kernel::class);

// 5. Tangkap Request & Kirim Response
$request = Request::capture();
$response = $kernel->handle($request);

$response->send();

$kernel->terminate($request, $response);