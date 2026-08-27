<?php

// 1. Force Environment Variables
putenv('APP_ENV=production');
putenv('APP_DEBUG=true');
putenv('APP_KEY=base64:4d8vK9Xz2mQ1wE8rT5yU7iO0pA3sD6fG9hJ2kL5zX8=');
putenv('LOG_CHANNEL=stderr');
putenv('VIEW_COMPILED_PATH=/tmp');

$_ENV['APP_ENV'] = 'production';
$_ENV['APP_DEBUG'] = 'true';
$_ENV['APP_KEY'] = 'base64:4d8vK9Xz2mQ1wE8rT5yU7iO0pA3sD6fG9hJ2kL5zX8=';

// 2. Buat direktori cache sementara di serverless /tmp
if (!is_dir('/tmp/views')) {
    @mkdir('/tmp/views', 0755, true);
}

// 3. Panggil entrypoint utama Laravel
require __DIR__ . '/../public/index.php';