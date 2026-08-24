<?php

// Paksa APP_KEY yang valid (32 karakter Base64 yang valid)
$appKey = 'base64:4d8vK9Xz2mQ1wE8rT5yU7iO0pA3sD6fG9hJ2kL5zX8=';
$_ENV['APP_KEY'] = $appKey;
$_SERVER['APP_KEY'] = $appKey;
putenv("APP_KEY={$appKey}");

// Arahkan direktori storage & log ke /tmp (lingkungan Vercel)
$_ENV['APP_STORAGE_PATH'] = '/tmp/storage';
$_ENV['LOG_CHANNEL'] = 'stderr';
$_ENV['VIEW_COMPILED_PATH'] = '/tmp/storage/framework/views';

$dirs = [
    '/tmp/storage/bootstrap/cache',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/logs',
];

foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

putenv('APP_CONFIG_CACHE=/tmp/storage/bootstrap/cache/config.php');
putenv('APP_SERVICES_CACHE=/tmp/storage/bootstrap/cache/services.php');
putenv('APP_PACKAGES_CACHE=/tmp/storage/bootstrap/cache/packages.php');
putenv('APP_ROUTES_CACHE=/tmp/storage/bootstrap/cache/routes.php');
putenv('APP_EVENTS_CACHE=/tmp/storage/bootstrap/cache/events.php');

require __DIR__ . '/../public/index.php';