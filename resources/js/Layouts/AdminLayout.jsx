import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children, activePage = 'dashboard', title, subtitle }) {
    const user = usePage().props.auth?.user || { name: 'Administrator', email: 'admin@sigizi.com' };
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Dark Mode state & sync
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    // Sidebar items configuration
    const menuItems = [
        {
            key: 'dashboard',
            name: 'Dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
            ),
            route: 'admin.dashboard',
        },
        {
            key: 'kelola-pengguna',
            name: 'Kelola Pengguna',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            route: 'admin.kelola-pengguna',
        },
        {
            key: 'kelola-tampilan',
            name: 'Kelola Tampilan',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" />
                </svg>
            ),
            route: 'admin.kelola-tampilan',
        },
        {
            key: 'laporan-global',
            name: 'Laporan Global',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            route: 'admin.laporan-global',
        },
        {
            key: 'pengaturan-sistem',
            name: 'Pengaturan Sistem',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            route: 'admin.pengaturan-sistem',
        },
    ];

    // Find dynamic breadcrumb title based on active page
    const currentPageInfo = menuItems.find(item => item.key === activePage) || menuItems[0];

    return (
        <div className="min-h-screen bg-[#F4F9F6] text-gray-800 dark:bg-[#07130C] dark:text-gray-100 flex transition-colors duration-300">
            {/* Sidebar Navigation - Left Panel */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 dark:bg-[#09170F] dark:border-emerald-950/40 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col justify-between ${
                sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:translate-x-0'
            }`}>
                <div>
                    {/* Header Logo */}
                    <div className="h-20 flex items-center px-6 border-b border-gray-100 dark:border-emerald-950/40">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-[#1F7A54] p-1.5 rounded-lg flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                <span className="text-[#1F7A54] dark:text-emerald-400">si</span>
                                <span className="text-orange-500">Gizi</span>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <div className="px-4 py-6 space-y-1.5">
                        <span className="px-3 text-[10px] font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-widest block mb-4">
                            ADMIN
                        </span>
                        {menuItems.map((item) => {
                            const isCurrent = activePage === item.key;
                            return (
                                <Link
                                    key={item.key}
                                    href={route(item.route)}
                                    className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                        isCurrent
                                            ? 'bg-[#1F7A54] dark:bg-[#34D399] text-white dark:text-[#040C07] font-bold shadow-md shadow-[#1F7A54]/15'
                                            : 'text-gray-500 hover:text-[#1F7A54] hover:bg-emerald-50/55 dark:text-emerald-300/70 dark:hover:text-emerald-200 dark:hover:bg-emerald-950/30'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Section Logout Button */}
                <div className="p-4 border-t border-gray-100 dark:border-emerald-950/40">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Keluar</span>
                    </Link>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
                {/* Header Navbar - Top Area */}
                <header className="h-20 bg-white border-b border-gray-100 dark:bg-[#09170F] dark:border-emerald-950/40 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
                    {/* Left: Breadcrumbs / Sidebar toggle */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg bg-gray-50 dark:bg-emerald-950/40 lg:hidden text-gray-500 dark:text-emerald-300 hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-gray-400 dark:text-emerald-600">
                            <span className="hover:text-gray-600 dark:hover:text-emerald-400 cursor-pointer">siGizi</span>
                            <span>&gt;</span>
                            <span className="text-[#1F7A54] dark:text-emerald-400 font-bold">Admin Panel</span>
                            {activePage !== 'dashboard' && (
                                <>
                                    <span>&gt;</span>
                                    <span className="text-[#1F7A54] dark:text-emerald-400 font-bold">{currentPageInfo.name}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Navbar Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Search Input */}
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="w-48 lg:w-64 bg-gray-50 dark:bg-[#122017] border border-gray-100 dark:border-[#1a2e22] rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-gray-600 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-100/40 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#1F7A54] dark:focus:ring-emerald-500 transition-all"
                            />
                            <svg className="w-4 h-4 text-gray-400 dark:text-emerald-500/70 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:text-amber-300 dark:hover:text-amber-200 transition-colors focus:outline-none cursor-pointer"
                        >
                            {darkMode ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Notification Bell */}
                        <div className="relative p-2 rounded-full text-gray-400 dark:text-emerald-500 hover:text-gray-600 dark:hover:text-emerald-300 cursor-pointer">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#09170F]"></span>
                        </div>

                        {/* User Profile Avatar */}
                        <div className="w-8 h-8 rounded-full bg-[#1F7A54] dark:bg-[#34D399] text-white dark:text-[#040C07] flex items-center justify-center font-extrabold text-sm shadow-sm">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'B'}
                        </div>
                    </div>
                </header>

                {/* Main Content Body Wrapper */}
                <main className="flex-1 p-4 sm:p-8">
                    {/* Greeting & Roles Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">
                                ADMIN PANEL
                            </span>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                {title}
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-medium mt-1">
                                {subtitle}
                            </p>
                        </div>

                        <div className="flex items-center space-x-3">
                            {/* Admin badge */}
                            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Admin</span>
                            </div>

                            {/* Logout button */}
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="inline-flex items-center px-4 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl transition duration-150 cursor-pointer"
                            >
                                Keluar
                            </Link>
                        </div>
                    </div>

                    {/* Page specific children content */}
                    {children}
                </main>
            </div>
        </div>
    );
}
