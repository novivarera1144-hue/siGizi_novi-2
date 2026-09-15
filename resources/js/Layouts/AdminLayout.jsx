import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import {
    LayoutDashboard,
    Users,
    FileText,
    BarChart3,
    Settings
} from 'lucide-react';

// Custom CSS keyframes for admin layout animations
const adminAnimationStyles = `
@keyframes adminFloatLogo {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-3px); }
}
@keyframes adminGlowPulse {
    0%, 100% { filter: drop-shadow(0 0 4px rgba(31,122,84,0.3)); }
    50% { filter: drop-shadow(0 0 12px rgba(31,122,84,0.6)); }
}
@keyframes adminSlideInLeft {
    from { opacity: 0; transform: translateX(-16px); }
    to { opacity: 1; transform: translateX(0); }
}
@keyframes adminFadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes adminSearchGlow {
    0%, 100% { box-shadow: 0 0 0 2px rgba(31,122,84,0.2); }
    50% { box-shadow: 0 0 0 4px rgba(31,122,84,0.35); }
}
@keyframes adminAvatarRing {
    0%, 100% { box-shadow: 0 0 0 0px rgba(31,122,84,0.5); }
    50% { box-shadow: 0 0 0 5px rgba(31,122,84,0.15); }
}
@keyframes adminShimmer {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
}
@keyframes adminIconBounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
}
`;

export default function AdminLayout({ children, activePage = 'dashboard', title, subtitle, userAvatar }) {
    const user = usePage().props.auth?.user || { name: 'Administrator', email: 'admin@sigizi.com' };
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        setSidebarOpen(false);
    }, [url]);

    // State untuk Fitur Pencarian Interaktif
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef(null);

    const handleLogout = (e) => {
        e.preventDefault();
        setIsLoggingOut(true);
        router.post(route('logout'), {}, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsLoggingOut(false),
        });
    };

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
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                </svg>
            ),
            route: 'admin.dashboard',
        },
        {
            key: 'kelola-pengguna',
            name: 'Kelola Pengguna',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            route: 'admin.kelola-pengguna',
        },
        {
            key: 'kelola-tampilan',
            name: 'Kelola Tampilan',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                </svg>
            ),
            route: 'admin.kelola-tampilan',
        },
        {
            key: 'laporan-global',
            name: 'Laporan Global',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
            ),
            route: 'admin.laporan-global',
        },
        {
            key: 'pengaturan-sistem',
            name: 'Pengaturan Sistem',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            ),
            route: 'admin.pengaturan-sistem',
        },
    ];

    // Dummy Data Interaktif untuk Pencarian
    const dummySearchData = [
        { name: 'Dashboard Admin', category: 'Menu Utama', route: 'admin.dashboard' },
        { name: 'Kelola Pengguna & Akun', category: 'Manajemen', route: 'admin.kelola-pengguna' },
        { name: 'Kelola Tampilan & Konten', category: 'Manajemen', route: 'admin.kelola-tampilan' },
        { name: 'Laporan Global & Statistik', category: 'Analitik', route: 'admin.laporan-global' },
        { name: 'Pengaturan Sistem & Konfigurasi', category: 'Sistem', route: 'admin.pengaturan-sistem' },
    ];

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setIsSearchFocused(true);

        if (query.trim() === '') {
            setSearchResults([]);
        } else {
            const filtered = dummySearchData.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filtered);
        }
    };

    const handleInputFocus = () => {
        setIsSearchFocused(true);
        if (searchQuery.trim() !== '') {
            const filtered = dummySearchData.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchResults.length > 0) {
                const targetRoute = typeof route === 'function' ? route(searchResults[0].route) : searchResults[0].route;
                router.visit(targetRoute);
                setIsSearchFocused(false);
            }
        }
    };

    const currentPageInfo = menuItems.find(item => item.key === activePage) || menuItems[0];

    return (
        <div className="min-h-screen bg-[#F4F9F6] text-gray-800 dark:bg-[#07130C] dark:text-gray-100 flex transition-colors duration-300 pb-20 lg:pb-0">
            {/* Inject custom animation keyframes */}
            <style>{adminAnimationStyles}</style>

            {/* Sidebar Navigation - Left Panel */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 dark:bg-[#09170F] dark:border-emerald-950/40 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col justify-between ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div>
                    {/* Header Logo - Animated Float & Glow */}
                    <div className="py-6 px-6 border-b border-gray-100 dark:border-emerald-950/40 flex items-center justify-between relative">
                        <Link href="/" prefetch={["hover", "mount"]} className="flex items-center justify-center group">
                            <div
                                className="relative"
                                style={{ animation: 'adminFloatLogo 3s ease-in-out infinite' }}
                            >
                                <img
                                    src="/images/logo-sigizi.png"
                                    alt="siGizi"
                                    className="h-15 w-auto object-contain transition-all duration-500 group-hover:scale-110"
                                    style={{ animation: 'adminGlowPulse 3s ease-in-out infinite' }}
                                />
                                {/* Shimmer overlay on hover */}
                                <span className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        style={{ animation: 'adminShimmer 1.5s ease-in-out infinite' }}
                                    />
                                </span>
                            </div>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-emerald-500 dark:hover:text-emerald-300 hover:bg-gray-100 dark:hover:bg-emerald-950/40 focus:outline-none transition-all duration-300 hover:rotate-90 hover:scale-110"
                            title="Tutup Menu"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <div className="px-4 py-6 space-y-2">
                        <span
                            className="px-4 text-[10px] font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-widest block mb-4"
                            style={{ animation: 'adminFadeInUp 0.4s ease-out both' }}
                        >
                            ADMIN
                        </span>
                        {menuItems.map((item, index) => {
                            const isCurrent = activePage === item.key;
                            return (
                                <Link
                                    key={item.key}
                                    href={route(item.route)}
                                    prefetch={["hover", "mount"]}
                                    className={`group relative w-full flex items-center gap-4 px-4 py-3 rounded-full text-sm transition-all duration-300 overflow-hidden transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] ${isCurrent
                                        ? 'bg-[#1e7e34] text-white font-semibold shadow-md shadow-emerald-700/20'
                                        : 'text-slate-600 hover:text-[#1e7e34] hover:bg-emerald-50/55 dark:text-slate-300 dark:hover:text-emerald-200 dark:hover:bg-emerald-950/30 hover:shadow-sm'
                                        }`}
                                    style={{ animation: `adminSlideInLeft 0.4s ease-out ${0.1 * (index + 1)}s both` }}
                                >
                                    {/* Shimmer hover effect */}
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/15 dark:via-emerald-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                                    <span className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${isCurrent ? 'drop-shadow-sm' : ''}`}>
                                        {item.icon}
                                    </span>
                                    <span className="relative z-10">{item.name}</span>
                                    {/* Active indicator dot */}
                                    {isCurrent && (
                                        <span className="ml-auto w-2 h-2 rounded-full bg-white/80 shadow-sm" style={{ animation: 'adminIconBounce 2s ease-in-out infinite' }} />
                                    )}
                                </Link>
                            );
                        })}

                        <div
                            className="pt-4 border-t border-gray-100 dark:border-emerald-950/40 mt-4"
                            style={{ animation: `adminSlideInLeft 0.4s ease-out ${0.1 * (menuItems.length + 1)}s both` }}
                        >
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className={`group relative w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] ${
                                    isLoggingOut ? 'opacity-55 cursor-not-allowed' : ''
                                }`}
                            >
                                {/* Shimmer hover effect */}
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-red-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                                {isLoggingOut ? (
                                    <svg className="animate-spin h-5 w-5 text-red-500 relative z-10" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-red-500 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                )}
                                <span className="relative z-10">{isLoggingOut ? 'Keluar...' : 'Keluar'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
                {/* Header Navbar - Top Area */}
                <header className="h-20 bg-white border-b border-gray-100 dark:bg-[#09170F] dark:border-emerald-950/40 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg bg-gray-50 dark:bg-emerald-950/40 lg:hidden text-gray-500 dark:text-emerald-300 hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 dark:text-emerald-600">
                            <span className="text-xs font-bold px-3 py-1 bg-gray-100 dark:bg-[#122017] text-gray-700 dark:text-emerald-400 rounded-full border border-gray-200 dark:border-[#1a2e22]">
                                {currentPageInfo.name}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Search Input Interaktif - Animated Glow Focus */}
                        <div
                            className="relative hidden md:block"
                            ref={searchRef}
                            style={{ animation: 'adminFadeInUp 0.5s ease-out 0.2s both' }}
                        >
                            <div className="relative flex items-center group">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={handleInputFocus}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Cari menu, fitur..."
                                    className="w-48 lg:w-64 bg-gray-50 dark:bg-[#122017] border border-gray-100 dark:border-[#1a2e22] rounded-xl py-2 pl-9 pr-8 text-xs font-semibold text-gray-600 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-100/40 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-500 transition-all duration-300 hover:border-[#1F7A54]/50 dark:hover:border-emerald-500/50 hover:shadow-md hover:shadow-emerald-500/10"
                                    style={isSearchFocused ? { animation: 'adminSearchGlow 2s ease-in-out infinite' } : {}}
                                />
                                <svg className={`w-4 h-4 absolute left-3 top-2.5 transition-all duration-300 ${isSearchFocused ? 'text-[#1F7A54] dark:text-emerald-400 scale-110' : 'text-gray-400 dark:text-emerald-500/70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {searchQuery && (
                                    <button
                                        onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                                        className="absolute right-3 text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-xs font-bold transition-all duration-200 hover:scale-125 hover:rotate-90 active:scale-90"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {isSearchFocused && searchResults.length > 0 && (
                                <div
                                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0B1E13] border border-gray-100 dark:border-emerald-900/80 rounded-2xl shadow-2xl py-3 z-50"
                                    style={{ animation: 'adminFadeInUp 0.25s ease-out both' }}
                                >
                                    <div className="px-4 pb-2 text-[10px] font-bold text-gray-400 dark:text-emerald-500 uppercase tracking-wider border-b border-gray-100 dark:border-emerald-900/40">
                                        HASIL PENCARIAN
                                    </div>
                                    <div className="max-h-60 overflow-y-auto pt-2 space-y-1">
                                        {searchResults.map((item, index) => (
                                            <Link
                                                key={index}
                                                href={route(item.route)}
                                                prefetch={["hover", "mount"]}
                                                onClick={() => setIsSearchFocused(false)}
                                                className="group/item flex items-center justify-between px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition-all duration-200 hover:translate-x-1"
                                                style={{ animation: `adminFadeInUp 0.2s ease-out ${0.05 * index}s both` }}
                                            >
                                                <span className="font-semibold group-hover/item:text-[#1F7A54] dark:group-hover/item:text-emerald-300 transition-colors">{item.name}</span>
                                                <span className="text-[10px] px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-emerald-900/60 text-gray-600 dark:text-emerald-300 font-medium transition-all duration-200 group-hover/item:bg-emerald-100 dark:group-hover/item:bg-emerald-800/60">
                                                    {item.category}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Dark Mode Toggle - Animated Rotate & Scale */}
                        <button
                            onClick={toggleDarkMode}
                            className="group relative p-2.5 rounded-full text-gray-400 hover:text-amber-500 dark:text-amber-300 dark:hover:text-amber-200 bg-transparent hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 focus:outline-none cursor-pointer transform hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95"
                            style={{ animation: 'adminFadeInUp 0.5s ease-out 0.3s both' }}
                        >
                            <span className="block transition-transform duration-500 ease-out group-hover:rotate-[30deg]">
                                {darkMode ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </span>
                        </button>

                        {/* User Profile Avatar - Animated Pulse Ring */}
                        {(() => {
                            const defaultAvatar = user.avatar || (user.photo ? (user.photo.startsWith('http') ? user.photo : `/storage/${user.photo}`) : null);
                            const effectiveAvatar = userAvatar !== undefined ? userAvatar : defaultAvatar;
                            return (
                                <Link
                                    href={route('admin.profile.settings')}
                                    prefetch={["hover", "mount"]}
                                    className="group relative w-9 h-9 rounded-full bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] flex items-center justify-center font-extrabold text-sm shadow-sm transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95"
                                    title="Pengaturan Profil"
                                    style={{ animation: 'adminAvatarRing 3s ease-in-out infinite, adminFadeInUp 0.5s ease-out 0.4s both' }}
                                >
                                    {effectiveAvatar ? (
                                        <img
                                            src={effectiveAvatar}
                                            alt={user.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        />
                                    ) : null}
                                    <span
                                        className="w-full h-full items-center justify-center font-extrabold text-sm"
                                        style={{ display: effectiveAvatar ? 'none' : 'flex' }}
                                    >
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                                    </span>
                                    {/* Shimmer overlay on hover */}
                                    <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                            style={{ animation: 'adminShimmer 1.2s ease-in-out infinite' }}
                                        />
                                    </span>
                                </Link>
                            );
                        })()}
                    </div>
                </header>

                {/* Main Content Body Wrapper */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">
                                PANEL KONTROL
                            </span>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                {title}
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-medium mt-1">
                                {subtitle}
                            </p>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Terverifikasi</span>
                            </div>

                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className={`inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold rounded-full transition duration-150 cursor-pointer ${
                                    isLoggingOut ? 'opacity-55 cursor-not-allowed' : ''
                                }`}
                            >
                                {isLoggingOut && (
                                    <svg className="animate-spin h-3 w-3 text-red-500" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                )}
                                <span>{isLoggingOut ? 'Keluar...' : 'Keluar'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Page specific children content */}
                    {children}
                </main>
            </div>

            {/* --- BOTTOM NAVIGATION BAR (Khusus Mobile/Tablet di bagian bawah layar) --- */}
            <div className={`fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-[#07110B]/90 backdrop-blur-md border-t border-gray-200 dark:border-[#1a2e22] py-2 px-4 lg:hidden ${sidebarOpen ? 'hidden' : ''}`}>
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <Link href={route('admin.dashboard')} prefetch={["hover", "mount"]} className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'dashboard' ? 'text-[#1F7A54] dark:text-emerald-400 font-bold' : 'text-gray-400 dark:text-emerald-100/40 hover:text-[#1F7A54]'}`}>
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-[10px]">Dashboard</span>
                    </Link>

                    <Link href={route('admin.kelola-pengguna')} prefetch={["hover", "mount"]} className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'kelola-pengguna' ? 'text-[#1F7A54] dark:text-emerald-400 font-bold' : 'text-gray-400 dark:text-emerald-100/40 hover:text-[#1F7A54]'}`}>
                        <Users className="w-5 h-5" />
                        <span className="text-[10px]">Pengguna</span>
                    </Link>

                    <Link href={route('admin.kelola-tampilan')} prefetch={["hover", "mount"]} className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'kelola-tampilan' ? 'text-[#1F7A54] dark:text-emerald-400 font-bold' : 'text-gray-400 dark:text-emerald-100/40 hover:text-[#1F7A54]'}`}>
                        <FileText className="w-5 h-5" />
                        <span className="text-[10px]">Tampilan</span>
                    </Link>

                    <Link href={route('admin.laporan-global')} prefetch={["hover", "mount"]} className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'laporan-global' ? 'text-[#1F7A54] dark:text-emerald-400 font-bold' : 'text-gray-400 dark:text-emerald-100/40 hover:text-[#1F7A54]'}`}>
                        <BarChart3 className="w-5 h-5" />
                        <span className="text-[10px]">Laporan</span>
                    </Link>

                    <Link href={route('admin.pengaturan-sistem')} prefetch={["hover", "mount"]} className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'pengaturan-sistem' ? 'text-[#1F7A54] dark:text-emerald-400 font-bold' : 'text-gray-400 dark:text-emerald-100/40 hover:text-[#1F7A54]'}`}>
                        <Settings className="w-5 h-5" />
                        <span className="text-[10px]">Pengaturan</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}