<?php

// 1. Force Debug Mode & App Key
$_ENV['APP_DEBUG'] = 'true';
$_SERVER['APP_DEBUG'] = 'true';
putenv('APP_DEBUG=true');

$key = 'base64:4d8vK9Xz2mQ1wE8rT5yU7iO0pA3sD6fG9hJ2kL5zX8=';
$_ENV['APP_KEY'] = $key;
$_SERVER['APP_KEY'] = $key;
putenv("APP_KEY={$key}");

// 2. Alihkan Storage & Logging ke /tmp
$_ENV['APP_STORAGE_PATH'] = '/tmp/storage';
$_ENV['LOG_CHANNEL'] = 'stderr';
$_ENV['VIEW_COMPILED_PATH'] = '/tmp/storage/views';
$_ENV['SESSION_DRIVER'] = 'cookie';

$dirs = [
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/logs',
    '/tmp/storage/views',
];

foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

require __DIR__ . '/../public/index.php';