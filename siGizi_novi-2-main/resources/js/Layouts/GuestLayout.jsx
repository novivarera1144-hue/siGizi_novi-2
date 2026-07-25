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

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-[#071A0E] transition-colors duration-300">

            {/* NAVBAR UTAMA */}
            <nav className="w-full bg-white dark:bg-[#071A0E] border-b border-gray-100 dark:border-[#164D2B] px-6 py-4 shadow-sm transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Brand Logo Kiri - Menggunakan absolute path */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-[#1F7A54] flex items-center justify-center text-white font-black text-lg shadow-sm">
                            s
                        </div>
                        <span className="text-xl font-black tracking-tight text-gray-950 dark:text-white">
                            <span className="text-[#1F7A54] dark:text-emerald-400">si</span>Gizi
                        </span>
                    </Link>

                    {/* Menu Navigation Tengah - Menggunakan absolute path */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
                        <Link
                            href="/"
                            className={currentPath === '/' || currentPath === ''
                                ? "text-[#1F7A54] dark:text-emerald-400 border-b-2 border-[#1F7A54] pb-1"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white transition-colors pb-1"
                            }
                        >
                            Home
                        </Link>

                        {/* Menggunakan absolute path murni agar tidak terpengaruh halaman /login atau /register */}
                        <Link
                            href="/about"
                            className={currentPath === '/about'
                                ? "text-[#1F7A54] dark:text-emerald-400 border-b-2 border-[#1F7A54] pb-1"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white transition-colors pb-1"
                            }
                        >
                            Tentang Kami
                        </Link>
                    </div>

                    {/* Kanan: Tombol & Dark Mode Toggle - Menggunakan absolute path murni */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white border border-gray-200 dark:border-[#164D2B] rounded-full transition-all"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-4 py-2 text-sm font-bold text-white bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-full transition-all shadow-sm"
                        >
                            Register
                        </Link>

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full bg-gray-100 dark:bg-[#0B2B18] text-gray-700 dark:text-emerald-400 hover:bg-gray-200 dark:hover:bg-[#164D2B] transition-all cursor-pointer"
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
            <div className="flex-1 flex flex-col justify-center items-center pt-10 pb-16 px-4">

                {/* LOGO BESAR DI TENGAH */}
                <div className="mb-2 flex flex-col items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-2xl bg-[#1F7A54] flex items-center justify-center text-white font-black text-3xl shadow-md">
                            s
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black tracking-tight text-gray-950 dark:text-white leading-none">
                                <span className="text-[#1F7A54] dark:text-emerald-400">si</span>Gizi
                            </span>
                            <span className="text-[9px] font-bold tracking-widest text-gray-400 dark:text-[#52B788]/60 uppercase mt-1">
                                NUTRISI UNTUK HIDUP LEBIH BAIK
                            </span>
                        </div>
                    </div>
                </div>

                {/* JUDUL DAN SUBJUDUL DI BAWAH LOGO */}
                {title && (
                    <div className="text-center mt-4 mb-6 max-w-md animate-fade-in">
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