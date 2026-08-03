import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function AuthenticatedLayout({ children }) {
    const { auth, url } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setSidebarOpen(false);
    }, [url]);

    const [notificationOpen, setNotificationOpen] = useState(false);
    const notificationRef = useRef(null);

    // State data notifikasi agar status "unread" (isRead) bisa berubah dinamis
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            icon: '🥗',
            title: 'Waktunya Makan Siang!',
            message: 'Jangan lupa catat dan scan menu makan siangmu hari ini agar target gizi tercapai.',
            time: 'Baru saja',
            isRead: false,
        },
        {
            id: 2,
            icon: '🎯',
            title: 'Target Kalori Terpenuhi',
            message: 'Hebat! Target nutrisi mingguanmu menunjukkan tren positif yang konsisten.',
            time: 'Kemarin',
            isRead: false,
        },
        {
            id: 3,
            icon: '💧',
            title: 'Pengingat Minum Air',
            message: 'Jangan biarkan tubuhmu dehidrasi. Yuk, minum segelas air sekarang.',
            time: '2 hari lalu',
            isRead: false,
        },
        // Tambahan data dummy agar fitur scroll langsung aktif dan terlihat
        {
            id: 4,
            icon: '🏃',
            title: 'Aktivitas Fisik Tercapai',
            message: 'Kamu telah berjalan 8.000 langkah hari ini. Pertahankan!',
            time: '3 hari lalu',
            isRead: false,
        },
        {
            id: 5,
            icon: '🍎',
            title: 'Tips Kesehatan Harian',
            message: 'Konsumsi buah kaya vitamin C di siang hari untuk menjaga imun tubuh.',
            time: '4 hari lalu',
            isRead: true, // Contoh yang sudah dibaca sebelumnya
        }
    ]);

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
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setNotificationOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    // Fungsi saat satu notifikasi diklik (tanda hijau & status dibaca diperbarui)
    const handleNotificationClick = (id) => {
        setNotifications(prev =>
            prev.map(item => item.id === id ? { ...item, isRead: true } : item)
        );
    };

    // Fungsi "Tandai semua dibaca"
    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(item => ({ ...item, isRead: true }))
        );
    };

    // Hitung jumlah notifikasi yang belum dibaca
    const unreadCount = notifications.filter(item => !item.isRead).length;

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

    const activeMenuItem = menuItems.find(item => item.route !== '#' && checkIsActive(item.route));
    const currentPageTitle = activeMenuItem ? activeMenuItem.name : 'Dashboard';

    return (
        <div className="min-h-screen bg-[#F4F9F6] text-gray-800 dark:bg-[#05100B] dark:text-emerald-50 flex transition-colors duration-300">

            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-emerald-100/60 dark:bg-[#08160E] dark:border-emerald-900/30 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col justify-between shadow-sm ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div>
                    <div className="h-24 flex items-center justify-between px-6 border-b border-emerald-50 dark:border-emerald-900/20 relative">
                        <Link href="/" prefetch={["hover", "mount"]} className="flex items-center">
                            <img
                                src="/images/logo-sigizi.png"
                                alt="Logo siGizi"
                                className="w-[140px] h-auto object-contain"
                            />
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="px-4 py-6 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
                        <span className="px-3 text-[10px] font-bold text-emerald-600/70 dark:text-emerald-500 uppercase tracking-widest block mb-4">Pengguna</span>
                        {menuItems.map((item, idx) => {
                            const isCurrent = checkIsActive(item.route);
                            return (
                                <Link
                                    key={idx}
                                    href={item.route !== '#' ? route(item.route) : '#'}
                                    prefetch={item.route !== '#' ? ["hover", "mount"] : undefined}
                                    className={`relative w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isCurrent
                                            ? 'bg-[#1F7A54] text-white dark:bg-emerald-500/20 dark:text-emerald-300 font-bold shadow-md shadow-[#1F7A54]/20'
                                            : 'text-gray-600 hover:text-[#1F7A54] hover:bg-emerald-50/70 dark:text-emerald-300/80 dark:hover:text-emerald-100 dark:hover:bg-emerald-900/20'
                                        }`}
                                >
                                    {isCurrent && (
                                        <div className="absolute left-0 top-2.5 bottom-2.5 w-1.5 bg-white dark:bg-emerald-400 rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                    )}
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}

                        <div className="pt-4 border-t border-emerald-50 dark:border-emerald-900/20 mt-4">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
                            >
                                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Keluar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"></div>
            )}

            {/* Main Content */}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
                <header className="h-14 bg-white border-b border-emerald-100/60 dark:bg-[#08160E] dark:border-emerald-900/30 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 transition-colors duration-300">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/40 lg:hidden text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-gray-400 dark:text-emerald-500">
                            <span>siGizi</span>
                            <span>&gt;</span>
                            <span className="text-[#1F7A54] dark:text-emerald-400 font-bold">{currentPageTitle}</span>
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
                                    className="w-48 lg:w-64 bg-emerald-50/30 dark:bg-[#0D2217] border border-emerald-100 dark:border-emerald-900/40 rounded-xl py-2 pl-9 pr-8 text-xs font-semibold text-gray-700 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-400/50 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-400 transition-all"
                                />
                                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            {isSearching && (
                                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0B1E13] border border-emerald-100 dark:border-emerald-900/40 rounded-2xl shadow-xl py-2 z-50">
                                    <div className="px-3 py-1.5 border-b border-emerald-50 dark:border-emerald-900/30 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                                        Hasil Pencarian
                                    </div>
                                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                        {searchResults.length > 0 ? (
                                            searchResults.map((item, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={route(item.route)}
                                                    onClick={() => setIsSearching(false)}
                                                    className="px-3.5 py-2.5 hover:bg-emerald-50/60 dark:hover:bg-emerald-900/30 transition-colors flex items-center justify-between cursor-pointer block"
                                                >
                                                    <span className="text-xs font-semibold text-gray-800 dark:text-emerald-100">{item.name}</span>
                                                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-[#1F7A54] dark:text-emerald-300 px-2 py-0.5 rounded-md font-medium">
                                                        {item.category}
                                                    </span>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-4 py-6 text-center text-xs text-gray-400">Tidak ada hasil</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Dark Mode */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-emerald-600 hover:text-emerald-700 dark:text-amber-300 transition-colors bg-emerald-50/50 dark:bg-emerald-950/40 cursor-pointer"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>

                        {/* Notifications */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setNotificationOpen(!notificationOpen)}
                                className="relative p-2 rounded-full text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 cursor-pointer bg-emerald-50/50 dark:bg-emerald-950/40"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                {/* Titik merah indikator di ikon lonceng hanya muncul jika ada yang belum dibaca */}
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border border-white dark:border-[#08160E]"></span>
                                )}
                            </button>

                            {notificationOpen && (
                                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#0B1E13] border border-emerald-100 dark:border-emerald-900/40 rounded-2xl shadow-xl pt-3 pb-2 z-50">
                                    <div className="flex items-center justify-between px-4 pb-2.5 border-b border-emerald-50 dark:border-emerald-900/30">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs font-bold text-gray-800 dark:text-emerald-100">Notifikasi</span>
                                            {unreadCount > 0 && (
                                                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-[#1F7A54] dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                                                    {unreadCount} Baru
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleMarkAllAsRead}
                                            className="text-[11px] text-[#1F7A54] dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                                        >
                                            Tandai semua dibaca
                                        </button>
                                    </div>

                                    {/* LIST NOTIFIKASI DENGAN SCROLL (max-h-72 & overflow-y-auto memastikan scrollbar aktif) */}
                                    <div className="divide-y divide-emerald-50/50 dark:divide-emerald-900/20 max-h-[280px] overflow-y-auto custom-scrollbar">
                                        {notifications.length > 0 ? (
                                            notifications.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleNotificationClick(item.id)}
                                                    className={`px-4 py-3 transition-colors cursor-pointer flex gap-3 items-start relative ${item.isRead
                                                            ? 'opacity-60 bg-transparent hover:bg-emerald-50/20'
                                                            : 'hover:bg-emerald-50/40 dark:hover:bg-emerald-900/20'
                                                        }`}
                                                >
                                                    {/* Titik hijau penanda unread. Jika isRead true (sudah dibaca), titik hijaunya hilang */}
                                                    {!item.isRead && (
                                                        <span className="absolute top-4 right-4 w-2 h-2 bg-[#1F7A54] dark:bg-emerald-400 rounded-full"></span>
                                                    )}

                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold text-gray-800 dark:text-emerald-100">{item.title}</p>
                                                        <p className="text-[11px] text-gray-500 dark:text-emerald-300/70 mt-0.5 leading-relaxed">{item.message}</p>
                                                        <span className="text-[10px] text-emerald-600/70 dark:text-emerald-400 mt-1 block">{item.time}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-8 text-center text-xs text-gray-400 dark:text-emerald-400/50">
                                                Tidak ada notifikasi baru
                                            </div>
                                        )}
                                    </div>

                                    {/* Tombol Tutup */}
                                    <div className="px-4 pt-2 mt-1 border-t border-emerald-50 dark:border-emerald-900/35">
                                        <button
                                            onClick={() => setNotificationOpen(false)}
                                            className="w-full py-2 bg-emerald-50/60 hover:bg-emerald-100/70 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-[#1F7A54] dark:text-emerald-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                                        >
                                            Tutup
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Initial */}
                        {user && (
                            <Link
                                href={route('profile.edit')}
                                className="w-8 h-8 rounded-full bg-[#1F7A54] text-white flex items-center justify-center font-extrabold text-sm shadow-sm cursor-pointer"
                            >
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </Link>
                        )}
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-8 pb-24 lg:pb-8">
                    {children}
                </main>
            </div>
        </div>
    );
}