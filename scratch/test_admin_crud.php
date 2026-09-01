<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$ctrl = new \App\Http\Controllers\Admin\SystemSettingController();
$supabase = app(\App\Services\SupabaseService::class);

echo "1. CREATING NEW ADMIN...\n";
$createReq = Illuminate\Http\Request::create('/admin/pengaturan-sistem/admin', 'POST', [
    'name' => 'Testing Admin',
    'email' => 'testadmin@sigizi.com',
    'role' => 'Super Admin',
    'password' => 'secret123',
]);
$ctrl->storeAdmin($createReq, $supabase);

$createdUser = \App\Models\User::where('email', 'testadmin@sigizi.com')->first();
echo "CREATED USER ID: " . ($createdUser ? $createdUser->id : 'NONE') . "\n";
echo "ROLE: " . ($createdUser ? $createdUser->role : 'NONE') . "\n";

if ($createdUser) {
    echo "2. UPDATING ADMIN (WITHOUT CHANGING PASSWORD)...\n";
    $updateReq = Illuminate\Http\Request::create('/admin/pengaturan-sistem/admin/' . $createdUser->id, 'PUT', [
        'name' => 'Testing Admin Updated',
        'email' => 'testadmin@sigizi.com',
        'role' => 'Admin Konten',
        'password' => '', // kosong
    ]);
    $ctrl->updateAdmin($updateReq, $createdUser->id, $supabase);

    $updatedUser = \App\Models\User::find($createdUser->id);
    echo "UPDATED NAME: " . $updatedUser->name . "\n";
    echo "UPDATED ROLE: " . $updatedUser->role . "\n";

    echo "3. FETCHING ADMINS LIST FROM INDEX...\n";
    $indexRes = $ctrl->index();
    $ref = new ReflectionClass($indexRes);
    $propProps = $ref->getProperty('props');
    $propProps->setAccessible(true);
    $props = $propProps->getValue($indexRes);
    echo "ADMINS COUNT: " . count($props['admins']) . "\n";

    echo "4. CLEANING UP TEST ADMIN...\n";
    $createdUser->delete();
    echo "CLEANUP DONE.\n";
}
