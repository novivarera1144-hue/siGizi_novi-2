import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Sidebar items mapping (based on the design image)
    const menuItems = [
        {
            name: 'Dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
            ),
            route: 'dashboard',
            active: true
        },
        {
            name: 'Scan Makanan',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-16v3m9 8h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            route: 'scan',
            active: false
        },
        {
            name: 'Lap. Mingguan',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            route: 'laporan.mingguan',
            active: false
        },
        {
            name: 'Riwayat Scan',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            route: 'riwayat',
            active: false
        },
        {
            name: 'AI Assistant',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
            route: '#',
            active: false
        },
        {
            name: 'Profil',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            route: 'profile.edit',
            active: false
        },
    ];

    return (
        <div className="min-h-screen bg-[#F4F9F6] text-gray-800 dark:bg-zinc-950 dark:text-zinc-100 flex transition-colors duration-300">

            {/* Sidebar Navigation - Left Panel */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 dark:bg-zinc-900 dark:border-zinc-800/80 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col justify-between ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:translate-x-0'
                }`}>

                {/* Top Section Logo & Links */}
                <div>
                    {/* Header Logo */}
                    <div className="h-20 flex items-center px-6 border-b border-gray-100 dark:border-zinc-800/80">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-[#1F7A54] p-1.5 rounded-lg flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                <span className="text-[#1F7A54]">si</span>
                                <span className="text-orange-500">Gizi</span>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <div className="px-4 py-6 space-y-1.5">
                        <span className="px-3 text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block mb-4">Pengguna</span>
                        {menuItems.map((item, idx) => {
                            const isCurrent = item.route !== '#' && route().current(item.route);
                            return (
                                <Link
                                    key={idx}
                                    href={item.route !== '#' ? route(item.route) : '#'}
                                    className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isCurrent
                                        ? 'bg-[#1F7A54] text-white shadow-md shadow-[#1F7A54]/15'
                                        : 'text-gray-500 hover:text-[#1F7A54] hover:bg-emerald-50/55 dark:text-zinc-400 dark:hover:text-emerald-400 dark:hover:bg-zinc-800/40'
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
                <div className="p-4 border-t border-gray-100 dark:border-zinc-800/80">
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
                    className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">

                {/* Header Navbar - Top Area */}
                <header className="h-20 bg-white border-b border-gray-100 dark:bg-zinc-900 dark:border-zinc-800/80 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">

                    {/* Left: Breadcrumbs / Sidebar toggle */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800/60 lg:hidden text-gray-500 hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-gray-400 dark:text-zinc-500">
                            <span className="hover:text-gray-600 dark:hover:text-zinc-300 cursor-pointer">siGizi</span>
                            <span>&gt;</span>
                            <span className="text-[#1F7A54] dark:text-emerald-400 font-bold">Dashboard</span>
                        </div>
                    </div>

                    {/* Right: Search + Quick Tools + User Profile */}
                    <div className="flex items-center space-x-4">
                        {/* Search Bar */}
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="w-48 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800/80 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-gray-600 dark:text-zinc-300 placeholder-gray-400 focus:outline-none focus:border-[#1F7A54] focus:ring-1 focus:ring-[#1F7A54] transition-all"
                            />
                            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Dark/Light Mode Indicator Icon (pure layout representation) */}
                        <div className="p-2 rounded-full text-gray-400 hover:text-gray-600 cursor-pointer">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </div>

                        {/* Notifications Icon */}
                        <div className="relative p-2 rounded-full text-gray-400 hover:text-gray-600 cursor-pointer">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-zinc-900"></span>
                        </div>

                        {/* User Profile Initial Circular Icon */}
                        <div className="w-8 h-8 rounded-full bg-[#1F7A54] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                    </div>

                </header>

                {/* Main Content Area wrapper */}
                <main className="flex-1 p-4 sm:p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}

