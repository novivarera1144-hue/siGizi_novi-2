<?php

// Fix read-only filesystem di Vercel Serverless
putenv('VIEW_COMPILED_PATH=/tmp/views');
putenv('APP_CONFIG_CACHE=/tmp/config.php');
putenv('APP_SERVICES_CACHE=/tmp/services.php');
putenv('APP_PACKAGES_CACHE=/tmp/packages.php');
putenv('APP_ROUTES_CACHE=/tmp/routes.php');

if (!is_dir('/tmp/views')) {
    @mkdir('/tmp/views', 0755, true);
}

// Forward langsung ke entrypoint asli Laravel
require __DIR__ . '/../public/index.php';