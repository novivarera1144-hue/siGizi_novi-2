import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function AuthenticatedLayout({ children }) {
    const { auth, url } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setSidebarOpen(false);
    }, [url]);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);

    const dummySearchData = [
        { name: 'Dashboard Utama', category: 'Menu', route: 'dashboard' },
        { name: 'Nasi Goreng Spesial', category: 'Makanan', route: 'dashboard' },
        { name: 'Scan Makanan Baru', category: 'Menu', route: 'scan' },
        { name: 'Laporan Mingguan Nutrisi', category: 'Laporan', route: 'laporan.mingguan' },
        { name: 'Riwayat Konsumsi Kalori', category: 'Riwayat', route: 'riwayat' },
        { name: 'AI Assistant Gizi', category: 'Bantuan', route: 'ai.assistant' },
        { name: 'Pengaturan Profil', category: 'Akun', route: 'profile.edit' },
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
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

    useEffect(() => {
        const handleClickOutsideSearch = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearching(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutsideSearch);
        return () => document.removeEventListener('mousedown', handleClickOutsideSearch);
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        const filtered = dummySearchData.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filtered);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (searchResults.length > 0) {
                router.visit(route(searchResults[0].route));
                setIsSearching(false);
                setSearchQuery('');
            }
        }
    };

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    const menuItems = [
        {
            name: 'Dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
            ),
            route: 'dashboard',
        },
        {
            name: 'Scan Makanan',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-16v3m9 8h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            route: 'scan',
        },
        {
            name: 'Lap. Mingguan',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            route: 'laporan.mingguan',
        },
        {
            name: 'Riwayat Scan',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            route: 'riwayat',
        },
        {
            name: 'AI Assistant',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
            route: 'ai.assistant',
        },
        {
            name: 'Profil',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            route: 'profile.edit',
        },
    ];

    const checkIsActive = (routeName) => {
        try {
            return typeof route === 'function' && route().current(routeName);
        } catch {
            return false;
        }
    };

    const activeMenuItem = menuItems.find(
        (item) => item.route !== '#' && checkIsActive(item.route)
    );

    const currentPageTitle = activeMenuItem ? activeMenuItem.name : 'Dashboard';

    return (
        <div className="min-h-screen bg-white text-gray-800 dark:bg-[#07110B] dark:text-emerald-50 flex transition-colors duration-300">

            {/* Sidebar Navigation */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 dark:bg-[#08160E] dark:border-emerald-900/30 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col justify-between shadow-sm ${sidebarOpen
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div>
                    <div className="h-24 flex items-center justify-between px-6 border-b border-gray-50 dark:border-emerald-900/20 relative">
                        <Link href="/" prefetch={['hover', 'mount']} className="flex items-center">
                            <img src="/images/logo-sigizi.png" alt="Logo siGizi" className="w-[140px] h-auto object-contain" />
                        </Link>

                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="px-4 py-6 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)] scroll-smooth custom-scrollbar">
                        <span className="px-3 text-[10px] font-bold text-gray-400 dark:text-emerald-500 uppercase tracking-widest block mb-4">
                            Pengguna
                        </span>

                        {menuItems.map((item, idx) => {
                            const isCurrent = checkIsActive(item.route);

                            return (
                                <Link
                                    key={idx}
                                    href={item.route !== '#' ? route(item.route) : '#'}
                                    prefetch={item.route !== '#' ? ['hover', 'mount'] : undefined}
                                    className={`relative w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isCurrent
                                            ? 'bg-[#1F7A54] text-white dark:bg-emerald-500/20 dark:text-emerald-300 font-bold shadow-md shadow-[#1F7A54]/20'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/70 dark:text-emerald-300/80 dark:hover:text-emerald-100 dark:hover:bg-emerald-900/20'
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}

                        <div className="pt-4 border-t border-gray-50 dark:border-emerald-900/20 mt-4">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200 cursor-pointer"
                            >
                                <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Keluar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
                ></div>
            )}

            {/* Main Content Layout */}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen bg-white dark:bg-[#07110B]">

                {/* Header */}
                <header className="h-14 bg-white border-b border-gray-100 dark:bg-[#08160E] dark:border-emerald-900/30 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 transition-colors duration-300">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg bg-gray-50/50 dark:bg-emerald-950/40 lg:hidden text-gray-700 dark:text-emerald-300 hover:bg-gray-100 flex items-center space-x-2"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 dark:text-emerald-500">
                            <span className="hidden sm:inline">siGizi</span>
                            <span className="hidden sm:inline">&gt;</span>
                            <span className="text-gray-700 dark:text-emerald-400 font-bold text-sm sm:text-xs">
                                {currentPageTitle}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">

                        {/* Search */}
                        <div className="relative hidden md:block" ref={searchRef}>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Cari menu, fitur..."
                                    className="w-48 lg:w-64 bg-gray-50/70 border border-gray-200 dark:border-emerald-900/45 dark:bg-[#0D2217] rounded-xl py-2 pl-9 pr-8 text-xs font-semibold text-gray-700 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-400/50 focus:outline-none focus:border-gray-400 dark:focus:border-emerald-400 transition-all shadow-sm"
                                />

                                <svg className="w-4 h-4 text-gray-400 dark:text-emerald-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {isSearching && (
                                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0B1E13] border border-gray-100 dark:border-emerald-900/40 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-3 py-1.5 border-b border-gray-50 dark:border-emerald-900/30 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                        Hasil Pencarian
                                    </div>

                                    <div className="max-h-60 overflow-y-auto scroll-smooth custom-scrollbar">
                                        {searchResults.length > 0 ? (
                                            searchResults.map((item, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={route(item.route)}
                                                    prefetch={['hover', 'mount']}
                                                    onClick={() => setIsSearching(false)}
                                                    className="px-3.5 py-2.5 hover:bg-gray-50 dark:hover:bg-emerald-900/30 transition-colors flex items-center justify-between cursor-pointer block"
                                                >
                                                    <span className="text-xs font-semibold text-gray-800 dark:text-emerald-100">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-[10px] bg-gray-100 dark:bg-emerald-900/60 text-gray-600 dark:text-emerald-300 px-2 py-0.5 rounded-md font-medium">
                                                        {item.category}
                                                    </span>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-4 py-6 text-center text-xs text-gray-400">
                                                Tidak ada hasil
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Dark Mode */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-amber-300 transition-colors bg-gray-50 dark:bg-emerald-950/40 border border-gray-200/70 dark:border-emerald-900/40 shadow-sm cursor-pointer"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>

                        {/* Profile Initial / Photo */}
                        {user && (
                            <Link
                                href={route('profile.edit')}
                                prefetch={['hover', 'mount']}
                                className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 dark:bg-[#1F7A54] dark:text-white flex items-center justify-center font-extrabold text-sm shadow-sm cursor-pointer border border-gray-300/60 dark:border-transparent overflow-hidden"
                            >
                                {user.avatar || user.photo ? (
                                    <img
                                        src={user.avatar || (user.photo.startsWith('http') ? user.photo : `/storage/${user.photo}`)}
                                        alt={user.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    user.name ? user.name.charAt(0).toUpperCase() : 'U'
                                )}
                            </Link>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-8 pb-24 lg:pb-8 bg-white dark:bg-[#07110B]">
                    {children}
                </main>

                {/* Bottom Navigation (Mobile) */}
                <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 dark:bg-[#08160E] dark:border-emerald-900/30 px-2 py-2 flex items-center justify-around shadow-lg">
                    {menuItems.map((item, idx) => {
                        const isCurrent = checkIsActive(item.route);

                        return (
                            <Link
                                key={idx}
                                href={item.route !== '#' ? route(item.route) : '#'}
                                prefetch={item.route !== '#' ? ['hover', 'mount'] : undefined}
                                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${isCurrent
                                        ? 'text-[#1F7A54] dark:text-emerald-400 font-bold'
                                        : 'text-gray-400 dark:text-emerald-300/60 hover:text-gray-600 dark:hover:text-emerald-200'
                                    }`}
                            >
                                <div className="w-5 h-5 mb-1 flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <span className="text-[10px] leading-none">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}