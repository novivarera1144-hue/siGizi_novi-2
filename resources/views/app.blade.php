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

        <!-- Indikator Loading Sidebar Kiri -->
        <div id="global-sidebar-loader" class="fixed bottom-4 left-4 z-50 w-[224px] p-3 rounded-xl bg-emerald-50/95 dark:bg-emerald-950/90 border border-emerald-200/80 dark:border-emerald-800/80 shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 pointer-events-none transform translate-y-2">
            <div class="flex items-center space-x-2.5">
                <span class="relative flex h-2.5 w-2.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 dark:bg-emerald-400"></span>
                </span>
                <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    Memuat...
                </span>
            </div>
        </div>

        <script>
            document.addEventListener('click', function(e) {
                const link = e.target.closest('a') || e.target.closest('button');
                if (link) {
                    const loader = document.getElementById('global-sidebar-loader');
                    if (loader) {
                        loader.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
                        loader.classList.add('opacity-100', 'translate-y-0');
                        
                        if (window._sidebarLoaderTimer) {
                            clearTimeout(window._sidebarLoaderTimer);
                        }
                        
                        window._sidebarLoaderTimer = setTimeout(function() {
                            loader.classList.remove('opacity-100', 'translate-y-0');
                            loader.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
                        }, 1500);
                    }
                }
            });
        </script>
    </body>
</html>