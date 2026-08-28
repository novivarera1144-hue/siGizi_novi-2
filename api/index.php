<?php

// Arahkan lokasi compiled views ke /tmp agar tidak error Read-Only Filesystem
putenv('VIEW_COMPILED_PATH=/tmp/views');

if (!is_dir('/tmp/views')) {
    @mkdir('/tmp/views', 0755, true);
}

// Panggil entrypoint bawaan Laravel yang asli
require __DIR__ . '/../public/index.php';