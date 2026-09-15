import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';

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

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    // Deteksi halaman aktif secara aman
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    let activePage = 'home';
    if (currentPath.startsWith('/login')) activePage = 'login';
    else if (currentPath.startsWith('/register')) activePage = 'register';
    else if (currentPath.startsWith('/tentang-kami')) activePage = 'about';

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-[#071A0E] transition-colors duration-300">

            {/* NAVBAR UTAMA */}
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} activePage={activePage} />

            {/* AREA UTAMA DI TENGAH */}
            <div className="w-full flex flex-col items-center pt-3 pb-12 px-4">

                {/* LOGO DI TENGAH - Menonjol & Glow Saat Hover (Tanpa Shimmer) */}
                <div className="mb-4 flex flex-col items-center">
                    <Link
                        href="/"
                        prefetch={["hover", "mount"]}
                        className="group inline-flex items-center justify-center px-3 py-1.5 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 cursor-pointer"
                    >
                        <img
                            src="/images/logo-sigizi.png"
                            alt="Logo siGizi"
                            className="w-48 sm:w-56 h-auto object-contain transition-all duration-300 filter group-hover:drop-shadow-[0_8px_16px_rgba(31,122,84,0.35)] dark:group-hover:drop-shadow-[0_8px_16px_rgba(52,211,153,0.35)] group-hover:brightness-105"
                        />
                    </Link>
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