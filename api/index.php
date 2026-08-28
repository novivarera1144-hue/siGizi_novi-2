<?php

// 1. Force Environment Variables
putenv('APP_ENV=production');
putenv('APP_DEBUG=true');
putenv('APP_KEY=base64:4d8vK9Xz2mQ1wE8rT5yU7iO0pA3sD6fG9hJ2kL5zX8=');
putenv('LOG_CHANNEL=stderr');
putenv('VIEW_COMPILED_PATH=/tmp/views');
putenv('CACHE_STORE=array');
putenv('SESSION_DRIVER=cookie');

// 2. Buat folder sementara untuk views compiled
if (!is_dir('/tmp/views')) {
    @mkdir('/tmp/views', 0755, true);
}

// 3. Muat Autoload & Inisialisasi Aplikasi Laravel
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

// 4. Set Base Path dan Path Komponen Utama Laravel secara Eksplisit
$app->useBasePath(realpath(__DIR__ . '/..'));
$app->useStoragePath('/tmp');

// 5. Jalankan HTTP Kernel Laravel
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
$response->send();
$kernel->terminate($request, $response);