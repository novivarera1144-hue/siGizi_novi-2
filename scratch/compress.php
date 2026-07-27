<?php

function compressPNGtoWebP($src, $dst, $quality = 75) {
    if (!file_exists($src)) {
        echo "Source file does not exist: $src\n";
        return;
    }
    echo "Compressing $src -> $dst (quality: $quality)...\n";
    $img = imagecreatefrompng($src);
    if (!$img) {
        echo "Failed to load PNG: $src\n";
        return;
    }
    imagealphablending($img, true);
    imagesavealpha($img, true);
    $success = imagewebp($img, $dst, $quality);
    imagedestroy($img);
    if ($success) {
        echo "Successfully created $dst (" . round(filesize($dst) / 1024, 2) . " KB, original was " . round(filesize($src) / 1024, 2) . " KB)\n";
    } else {
        echo "Failed to save WebP: $dst\n";
    }
}

$dir = __DIR__ . '/../public/images/';
compressPNGtoWebP($dir . 'sayuran1.png', $dir . 'sayuran1.webp', 70);
compressPNGtoWebP($dir . 'nasgor.png', $dir . 'nasgor.webp', 75);
compressPNGtoWebP($dir . 'background2.png', $dir . 'background2.webp', 65);
