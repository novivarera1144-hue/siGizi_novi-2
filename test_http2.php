<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Http;

echo "Testing Http::post gemini-3.5-flash...\n";
try {
    $response = Http::withHeaders([
        'Content-Type' => 'application/json',
        'x-goog-api-key' => env('GEMINI_API_KEY')
    ])->timeout(30)->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent', [
        'contents' => [['parts' => [['text' => 'hello']]]]
    ]);
    echo "Status: " . $response->status() . "\n";
    echo "Body: " . substr($response->body(), 0, 200) . "...\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
