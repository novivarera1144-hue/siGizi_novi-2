<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Preload Critical Images -->
        <link rel="preload" as="image" href="/images/logo-sigizi.png">
        <link rel="preload" as="image" href="/images/sayuran1.webp">
        <link rel="preload" as="image" href="/images/nasgor.webp">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-[#F4F9F6] dark:bg-[#07130C] text-gray-800 dark:text-gray-100 transition-colors duration-300">
        @inertia
    </body>
</html>