import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import {
    LayoutDashboard,
    Camera,
    BarChart3,
    History,
    Sparkles,
    User,
    LogOut,
    Menu,
    X,
    Search,
    Sun,
    Moon
} from 'lucide-react';

export default function AuthenticatedLayout({ children }) {
    const { auth, url } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Close mobile drawer on page navigation
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
        setIsLoggingOut(true);
        router.post(route('logout'), {}, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsLoggingOut(false),
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
            icon: LayoutDashboard,
            route: 'dashboard',
        },
        {
            name: 'Scan Makanan',
            icon: Camera,
            route: 'scan',
        },
        {
            name: 'Lap. Mingguan',
            icon: BarChart3,
            route: 'laporan.mingguan',
        },
        {
            name: 'Riwayat Scan',
            icon: History,
            route: 'riwayat',
        },
        {
            name: 'AI Assistant',
            icon: Sparkles,
            route: 'ai.assistant',
        },
        {
            name: 'Profil',
            icon: User,
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
        <div className="min-h-screen bg-white text-gray-800 dark:bg-[#07110B] dark:text-emerald-50 flex transition-colors duration-500">

            {/* Sidebar Navigation */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 dark:bg-[#08160E] dark:border-emerald-900/30 transform transition-transform duration-300 ease-in-out flex flex-col justify-between shadow-xl lg:shadow-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="flex flex-col h-full justify-between">
                    <div>
                        {/* Sidebar Header */}
                        <div className="h-20 sm:h-24 flex items-center justify-between px-6 border-b border-gray-50 dark:border-emerald-900/20 relative">
                            <Link href="/" prefetch={['hover', 'mount']} className="flex items-center transform active:scale-95 transition-transform duration-200">
                                <img src="/images/logo-sigizi.png" alt="Logo siGizi" className="w-[130px] sm:w-[140px] h-auto object-contain hover:opacity-90 transition-opacity" />
                            </Link>

                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-emerald-400 dark:hover:bg-emerald-950/40 transition-all duration-200 active:scale-90"
                                aria-label="Tutup Menu"
                            >
                                <X className="w-5 h-5 transform hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Menu Items List */}
                        <div className="px-4 py-6 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)] scroll-smooth custom-scrollbar">
                            <span className="px-3 text-[10px] font-bold text-gray-400 dark:text-emerald-500 uppercase tracking-widest block mb-3">
                                PENGGUNA
                            </span>

                            {menuItems.map((item, idx) => {
                                const isCurrent = checkIsActive(item.route);
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={idx}
                                        href={item.route !== '#' ? route(item.route) : '#'}
                                        prefetch={item.route !== '#' ? ['hover', 'mount'] : undefined}
                                        className={`relative group w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:translate-x-1.5 ${isCurrent
                                                ? 'bg-[#1F7A54] text-white dark:bg-emerald-500/20 dark:text-emerald-300 font-bold shadow-md shadow-[#1F7A54]/20 scale-[1.02]'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-emerald-50/80 dark:text-emerald-300/80 dark:hover:text-emerald-50 dark:hover:bg-emerald-950/60'
                                            }`}
                                    >
                                        <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-emerald-500 transition-opacity duration-300 ${isCurrent || 'opacity-0 group-hover:opacity-100'}`} />
                                        <Icon className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isCurrent ? 'text-white dark:text-emerald-300 scale-110' : 'text-gray-500 dark:text-emerald-400'}`} />
                                        <span className="truncate">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom Sidebar Actions (Keluar) */}
                    <div className="p-4 border-t border-gray-50 dark:border-emerald-900/20">
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-300 transform hover:translate-x-1 cursor-pointer ${isLoggingOut ? 'opacity-55 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoggingOut ? (
                                <svg className="animate-spin h-5 w-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <LogOut className="w-5 h-5 text-rose-500 shrink-0 transform hover:-translate-x-1 transition-transform duration-200" />
                            )}
                            <span className="truncate">{isLoggingOut ? 'Keluar...' : 'Keluar'}</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Drawer Overlay Backdrop */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity duration-300 animate-fadeIn"
                    aria-hidden="true"
                />
            )}

            {/* Main Content Layout Container */}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen bg-white dark:bg-[#07110B] transition-all duration-300">

                {/* Top Header */}
                <header className="h-16 bg-white/95 backdrop-blur-md border-b border-gray-100 dark:bg-[#08160E]/95 dark:border-emerald-900/30 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 transition-colors duration-300">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        {/* Hamburger Button (Mobile Drawer Toggle) */}
                        <button
                            onClick={() => setSidebarOpen((prev) => !prev)}
                            className="p-2 rounded-xl bg-gray-50 dark:bg-emerald-950/40 border border-gray-200/80 dark:border-emerald-900/40 lg:hidden text-gray-700 dark:text-emerald-300 hover:bg-gray-100 dark:hover:bg-emerald-900/40 transition-all duration-200 active:scale-95 cursor-pointer"
                            aria-label="Toggle Navigation Menu"
                        >
                            {sidebarOpen ? <X className="w-5 h-5 transform rotate-90 transition-transform duration-300" /> : <Menu className="w-5 h-5 transform hover:scale-110 transition-transform duration-200" />}
                        </button>

                        {/* Breadcrumbs */}
                        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 dark:text-emerald-500">
                            <span className="hidden sm:inline">siGizi</span>
                            <span className="hidden sm:inline">&gt;</span>
                            <span className="text-gray-800 dark:text-emerald-300 font-bold text-sm sm:text-xs animate-fadeIn">
                                {currentPageTitle}
                            </span>
                        </div>
                    </div>

                    {/* Right Header Actions */}
                    <div className="flex items-center space-x-3 sm:space-x-4">

                        {/* Quick Search Input */}
                        <div className="relative hidden md:block" ref={searchRef}>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Cari menu, fitur..."
                                    className="w-48 lg:w-64 bg-gray-50/70 border border-gray-200 dark:border-emerald-900/45 dark:bg-[#0D2217] rounded-xl py-2 pl-9 pr-8 text-xs font-semibold text-gray-700 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-400/50 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all duration-300 focus:w-72 shadow-sm hover:shadow-md"
                                />

                                <Search className="w-4 h-4 text-gray-400 dark:text-emerald-400 absolute left-3 top-2.5 transition-transform duration-300 hover:scale-110" />
                            </div>

                            {/* Search Results Dropdown */}
                            {isSearching && (
                                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0B1E13] border border-gray-100 dark:border-emerald-900/40 rounded-2xl shadow-xl py-2 z-50 transform origin-top animate-in fade-in slide-in-from-top-2 duration-300">
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
                                                    className="px-3.5 py-2.5 hover:bg-gray-50 dark:hover:bg-emerald-900/30 transition-all duration-200 flex items-center justify-between cursor-pointer block transform hover:translate-x-1"
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
                                            <div className="px-4 py-6 text-center text-xs text-gray-400 animate-fadeIn">
                                                Tidak ada hasil
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Dark / Light Mode Toggle Button */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-xl text-amber-500 dark:text-amber-300 transition-all duration-300 transform hover:scale-110 active:scale-90 bg-gray-50 dark:bg-emerald-950/40 border border-gray-200/70 dark:border-emerald-900/40 shadow-sm hover:shadow-md cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/60 flex items-center justify-center"
                            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            aria-label="Toggle Theme Mode"
                        >
                            {darkMode ? (
                                <Sun className="w-4 h-4 text-amber-400 transform rotate-0 hover:rotate-90 transition-transform duration-500" />
                            ) : (
                                <Moon className="w-4 h-4 text-emerald-700 transform -rotate-12 hover:rotate-12 transition-transform duration-500" />
                            )}
                        </button>

                        {/* User Profile Avatar / Initial */}
                        {user && (
                            <Link
                                href={route('profile.edit')}
                                prefetch={['hover', 'mount']}
                                className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 dark:bg-[#1F7A54] dark:text-white flex items-center justify-center font-extrabold text-sm shadow-sm hover:shadow-md cursor-pointer border-2 border-transparent hover:border-emerald-500 dark:hover:border-emerald-400 overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300"
                            >
                                {user.avatar || user.photo ? (
                                    <img
                                        src={user.avatar || (user.photo.startsWith('http') ? user.photo : `/storage/${user.photo}`)}
                                        alt={user.name}
                                        className="w-full h-full object-cover rounded-full transform hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <span className="transform hover:scale-110 transition-transform duration-300">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                )}
                            </Link>
                        )}
                    </div>
                </header>

                {/* Main Content Body */}
                <main className="flex-1 p-4 sm:p-8 pb-24 lg:pb-8 bg-white dark:bg-[#07110B] transition-all duration-300 animate-fadeIn">
                    {children}
                </main>

                {/* Mobile Bottom Navigation Toolbar */}
                <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-100 dark:bg-[#08160E]/95 dark:border-emerald-900/30 px-2 py-1.5 flex items-center justify-around shadow-lg">
                    {menuItems.map((item, idx) => {
                        const isCurrent = checkIsActive(item.route);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={idx}
                                href={item.route !== '#' ? route(item.route) : '#'}
                                prefetch={item.route !== '#' ? ['hover', 'mount'] : undefined}
                                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-300 transform active:scale-90 ${isCurrent
                                        ? 'text-[#1F7A54] dark:text-emerald-400 font-bold scale-110'
                                        : 'text-gray-400 dark:text-emerald-300/60 hover:text-gray-600 dark:hover:text-emerald-200 hover:scale-105'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 mb-0.5 transition-transform duration-300 ${isCurrent ? 'scale-110' : ''}`} />
                                <span className="text-[10px] leading-none whitespace-nowrap">
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