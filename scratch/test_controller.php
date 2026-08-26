<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$ctrl = new \App\Http\Controllers\Admin\SystemSettingController();
$res = $ctrl->index();
$response = $res->toResponse(request());
echo "STATUS: " . $response->getStatusCode() . "\n";
$ref = new ReflectionClass($res);
$propComponent = $ref->getProperty('component');
$propComponent->setAccessible(true);
$propProps = $ref->getProperty('props');
$propProps->setAccessible(true);

echo "COMPONENT: " . $propComponent->getValue($res) . "\n";
echo "PROPS: " . json_encode($propProps->getValue($res)) . "\n";
