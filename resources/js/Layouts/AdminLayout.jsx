import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function AdminLayout({ children, activePage = 'dashboard', title, subtitle }) {
    const user = usePage().props.auth?.user || { name: 'Administrator', email: 'admin@sigizi.com' };
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // State untuk Fitur Pencarian Interaktif
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef(null);

    // State untuk Fitur Notifikasi Interaktif & Scrollable (Dummy data ditambah agar langsung bisa scroll)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Pengguna Baru Terdaftar',
            description: 'Budi Santoso mendaftarkan akun baru sebagai warga.',
            time: '5 menit lalu',
            read: false,
        },
        {
            id: 2,
            title: 'Laporan Sistem',
            description: 'Backup basis data mingguan berhasil dijalankan otomatis.',
            time: '1 jam lalu',
            read: false,
        },
        {
            id: 3,
            title: 'Pembaruan Tampilan',
            description: 'Konfigurasi halaman utama berhasil diperbarui.',
            time: 'Kemarin',
            read: true,
        },
        {
            id: 4,
            title: 'Peringatan Kapasitas Server',
            description: 'Penggunaan penyimpanan database mencapai 80%.',
            time: '2 hari lalu',
            read: false,
        },
        {
            id: 5,
            title: 'Validasi Data Gizi',
            description: 'Terdapat 15 data laporan posyandu baru yang perlu verifikasi.',
            time: '3 hari lalu',
            read: true,
        },
        {
            id: 6,
            title: 'Keamanan Akun',
            description: 'Login terdeteksi dari perangkat baru di area Jakarta.',
            time: '4 hari lalu',
            read: true,
        },
    ]);
    const notificationRef = useRef(null);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'), {}, {
            preserveScroll: true,
            preserveState: true,
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

    // Logika ketika mengetik di input pencarian
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

    // Handler Notifikasi
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const toggleNotificationRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    // Tutup dropdown jika klik di luar area search atau notification
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchResults.length > 0) {
                // Memastikan pemanggilan route aman menggunakan penanganan route helper ziggy
                const targetRoute = typeof route === 'function' ? route(searchResults[0].route) : searchResults[0].route;
                router.visit(targetRoute);
                setIsSearchFocused(false);
            }
        }
    };

    const currentPageInfo = menuItems.find(item => item.key === activePage) || menuItems[0];

    return (
        <div className="min-h-screen bg-[#F4F9F6] text-gray-800 dark:bg-[#07130C] dark:text-gray-100 flex transition-colors duration-300">
            {/* Sidebar Navigation - Left Panel */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 dark:bg-[#09170F] dark:border-emerald-950/40 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col justify-between ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div>
                    {/* Header Logo */}
                    <div className="py-6 px-4 border-b border-gray-100 dark:border-emerald-950/40 flex items-center justify-center">
                        <Link href="/" prefetch={["hover", "mount"]} className="flex items-center justify-center">
                            <img
                                src="/images/logo-sigizi.png"
                                alt="siGizi"
                                className="h-15 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <div className="px-4 py-6 space-y-2">
                        <span className="px-4 text-[10px] font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-widest block mb-4">
                            ADMIN
                        </span>
                        {menuItems.map((item) => {
                            const isCurrent = activePage === item.key;
                            return (
                                <Link
                                    key={item.key}
                                    href={route(item.route)}
                                    prefetch={["hover", "mount"]}
                                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-full text-sm transition-all duration-200 ${isCurrent
                                        ? 'bg-[#1e7e34] text-white font-semibold shadow-md shadow-emerald-700/20'
                                        : 'text-slate-600 hover:text-[#1e7e34] hover:bg-emerald-50/55 dark:text-slate-300 dark:hover:text-emerald-200 dark:hover:bg-emerald-950/30'
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
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Keluar</span>
                    </button>
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
                        {/* Search Input Interaktif dengan Dropdown */}
                        <div className="relative hidden md:block" ref={searchRef}>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={handleInputFocus}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Cari menu, fitur..."
                                    className="w-48 lg:w-64 bg-gray-50 dark:bg-[#122017] border border-gray-100 dark:border-[#1a2e22] rounded-xl py-2 pl-9 pr-8 text-xs font-semibold text-gray-600 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-100/40 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#1F7A54] dark:focus:ring-emerald-500 transition-all"
                                />
                                <svg className="w-4 h-4 text-gray-400 dark:text-emerald-500/70 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {searchQuery && (
                                    <button
                                        onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                                        className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-emerald-300 text-xs font-bold"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {/* Dropdown Hasil Pencarian Interaktif */}
                            {isSearchFocused && searchResults.length > 0 && (
                                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0B1E13] border border-gray-100 dark:border-emerald-900/80 rounded-2xl shadow-2xl py-3 z-50">
                                    <div className="px-4 pb-2 text-[10px] font-bold text-gray-400 dark:text-emerald-500 uppercase tracking-wider border-b border-gray-100 dark:border-emerald-900/40">
                                        HASIL PENCARIAN
                                    </div>
                                    <div className="max-h-60 overflow-y-auto pt-2 space-y-1">
                                        {searchResults.map((item, index) => (
                                            <Link
                                                key={index}
                                                href={route(item.route)}
                                                onClick={() => setIsSearchFocused(false)}
                                                className="flex items-center justify-between px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition-colors"
                                            >
                                                <span className="font-semibold">{item.name}</span>
                                                <span className="text-[10px] px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-emerald-900/60 text-gray-600 dark:text-emerald-300 font-medium">
                                                    {item.category}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
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

                        {/* Notification Bell Interaktif */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="relative p-2 rounded-full text-gray-400 dark:text-emerald-500 hover:text-gray-600 dark:hover:text-emerald-300 cursor-pointer focus:outline-none"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#09170F]"></span>
                                )}
                            </button>

                            {/* Dropdown Notifikasi dengan Scroll */}
                            {isNotificationOpen && (
                                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#0B1E13] border border-gray-100 dark:border-emerald-900/85 rounded-2xl shadow-2xl py-3 z-50">
                                    <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100 dark:border-emerald-900/40">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Notifikasi</span>
                                            {unreadCount > 0 && (
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 font-bold">
                                                    {unreadCount} baru
                                                </span>
                                            )}
                                        </div>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-[10px] text-[#1F7A54] dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                                            >
                                                Tandai semua dibaca
                                            </button>
                                        )}
                                    </div>

                                    {/* Daftar Notifikasi dengan Scroll (max-h-80 & overflow-y-auto) */}
                                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-emerald-950/40">
                                        {notifications.length > 0 ? (
                                            notifications.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => toggleNotificationRead(item.id)}
                                                    className={`p-4 cursor-pointer transition-colors flex items-start space-x-3 ${item.read
                                                        ? 'bg-white dark:bg-[#0B1E13] opacity-75'
                                                        : 'bg-emerald-50/50 dark:bg-emerald-950/20'
                                                        } hover:bg-emerald-50 dark:hover:bg-emerald-900/30`}
                                                >
                                                    <span className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${item.read ? 'bg-gray-300 dark:bg-emerald-800' : 'bg-[#1F7A54] dark:bg-emerald-400'}`}></span>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</h4>
                                                            <span className="text-[10px] text-gray-400 dark:text-emerald-500">{item.time}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-600 dark:text-emerald-100/70 mt-0.5">{item.description}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-6 text-center text-xs text-gray-400 dark:text-emerald-500">
                                                Tidak ada notifikasi baru.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile Avatar */}
                        <Link
                            href={route('admin.profile.settings')}
                            prefetch={["hover", "mount"]}
                            className="w-8 h-8 rounded-full bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] flex items-center justify-center font-extrabold text-sm shadow-sm transition duration-150 cursor-pointer"
                            title="Pengaturan Profil"
                        >
                            {user.name ? user.name.charAt(0).toUpperCase() : 'B'}
                        </Link>
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
                            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Admin</span>
                            </div>

                            {/* Logout button */}
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-3 py-1 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold rounded-full transition duration-150 cursor-pointer"
                            >
                                Keluar
                            </button>
                        </div>
                    </div>

                    {/* Page specific children content */}
                    {children}
                </main>
            </div>
        </div>
    );
}