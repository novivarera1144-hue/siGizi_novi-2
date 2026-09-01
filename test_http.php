<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Http;

echo "Testing Http::get...\n";
try {
    $response = Http::timeout(10)->get('https://generativelanguage.googleapis.com/v1beta/models');
    echo "Status: " . $response->status() . "\n";
    echo "Body: " . substr($response->body(), 0, 100) . "...\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
