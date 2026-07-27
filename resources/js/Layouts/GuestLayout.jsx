import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function GuestLayout({ children, title, subtitle }) {
    // State untuk dark mode toggle
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Deteksi halaman aktif secara aman menggunakan vanilla JavaScript
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    // Pengecekan status halaman aktif untuk Login dan Register
    const isLogin = currentPath.startsWith('/login');
    const isRegister = currentPath.startsWith('/register');

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-[#071A0E] transition-colors duration-300">

            {/* NAVBAR UTAMA */}
            <nav className="w-full bg-white dark:bg-[#071A0E] border-b border-gray-100 dark:border-[#164D2B] px-6 py-3 shadow-sm transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Brand Logo Kiri - Ukuran h-10 agar pas dan tidak terlalu kecil */}
                    <Link href="/" prefetch={["hover", "mount"]} className="flex items-center">
                        <div className="h-7 w-[150px] overflow-hidden flex items-center">
                            <img
                                src="/images/logo-sigizi.png"
                                alt="Logo siGizi"
                                className="h-[80px] w-auto object-contain"
                            />
                        </div>
                    </Link>

                    {/* Menu Navigation Tengah */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
                        <Link
                            href="/"
                            prefetch={["hover", "mount"]}
                            className={currentPath === '/' || currentPath === ''
                                ? "text-[#1F7A54] dark:text-emerald-400 border-b-2 border-[#1F7A54] pb-1"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white transition-colors pb-1"
                            }
                        >
                            Home
                        </Link>

                        <Link
                            href="/tentang-kami"
                            prefetch={["hover", "mount"]}
                            className={currentPath === '/tentang-kami'
                                ? "text-[#1F7A54] dark:text-emerald-400 border-b-2 border-[#1F7A54] pb-1"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white transition-colors pb-1"
                            }
                        >
                            Tentang Kami
                        </Link>
                    </div>

                    {/* Kanan: Tombol & Dark Mode Toggle */}
                    <div className="flex items-center space-x-3">
                        <Link
                            href="/login"
                            prefetch={["hover", "mount"]}
                            className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 ${isLogin
                                ? "bg-[#1F7A54] dark:bg-emerald-600 text-white shadow-sm"
                                : "text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white border border-gray-200 dark:border-[#164D2B] bg-transparent"
                                }`}
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            prefetch={["hover", "mount"]}
                            className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 ${isRegister
                                ? "bg-[#1F7A54] dark:bg-emerald-600 text-white shadow-sm"
                                : "text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white border border-gray-200 dark:border-[#164D2B] bg-transparent"
                                }`}
                        >
                            Register
                        </Link>

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full bg-gray-100 dark:bg-[#0B2B18] text-gray-700 dark:text-emerald-400 hover:bg-gray-200 dark:hover:bg-[#164D2B] transition-all cursor-pointer ml-1"
                            aria-label="Toggle Dark Mode"
                        >
                            {darkMode ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.343l.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* AREA UTAMA DI TENGAH */}
            <div className="w-full flex flex-col items-center pt-3 pb-12 px-4">

                {/* LOGO BESAR DI TENGAH - Ukuran Jauh Lebih Besar (w-32 h-32) */}
                <div className="mb-4 flex flex-col items-center">
                    <img
                        src="/images/logo-sigizi.png"
                        alt="Logo siGizi"
                        className="w-[290px] h-auto object-contain"
                    />
                </div>

                {/* JUDUL DAN SUBJUDUL DI BAWAH LOGO */}
                {title && (
                    <div className="text-center mb-6 max-w-md animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-xs text-gray-400 dark:text-gray-400 mt-1 font-medium">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* KOTAK KONTEN FORM */}
                <div className="w-full sm:max-w-md px-8 py-8 bg-white dark:bg-[#0B2B18] border border-gray-100 dark:border-[#164D2B] shadow-md sm:rounded-3xl transition-colors duration-300">
                    {children}
                </div>
            </div>
        </div>
    );
}