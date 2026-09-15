import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Navbar({ auth, darkMode, toggleDarkMode, activePage = 'home' }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Dynamic path detection if activePage is not explicitly passed
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const currentActive = activePage !== 'home' 
        ? activePage 
        : (currentPath.startsWith('/login') 
            ? 'login' 
            : currentPath.startsWith('/register') 
                ? 'register' 
                : currentPath.startsWith('/tentang-kami') 
                    ? 'about' 
                    : 'home');

    const isLoginActive = currentActive === 'login';
    const isRegisterActive = currentActive === 'register';

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-gray-100/80 dark:border-zinc-900/80 transition-colors duration-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">

                    {/* Logo siGizi */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" prefetch={["hover", "mount"]} className="flex items-center group py-1">
                            <img
                                src="/images/logo-sigizi.png"
                                alt="siGizi Logo"
                                className="h-16 sm:h-20 w-auto max-w-none object-contain transition-all duration-300 group-hover:scale-105 transform hover:drop-shadow-md"
                            />
                        </Link>
                    </div>

                    {/* Center Navigation Links: Home & Tentang Kami */}
                    <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
                        {/* 1. Menu Navigasi: Home */}
                        <Link
                            href="/"
                            prefetch={["hover", "mount"]}
                            className={`relative group overflow-hidden px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 flex items-center justify-center ${
                                currentActive === 'home'
                                    ? 'text-[#1F7A54] dark:text-emerald-400 bg-[#1F7A54]/10 dark:bg-emerald-500/15 shadow-sm'
                                    : 'text-gray-700 dark:text-zinc-200 hover:text-[#1F7A54] dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-zinc-900/80'
                            }`}
                        >
                            {/* Shimmer Effect (Kilau Berjalan Saat Hover) */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/30 dark:via-emerald-400/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                            
                            <span className="relative z-10">Home</span>

                            {/* Dynamic Glow Line Indicator */}
                            <span
                                className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#1F7A54] dark:bg-emerald-400 transition-all duration-300 ${
                                    currentActive === 'home'
                                        ? 'w-1/2'
                                        : 'w-0 group-hover:w-2/3'
                                }`}
                            />
                        </Link>

                        {/* 1. Menu Navigasi: Tentang Kami */}
                        <Link
                            href="/tentang-kami"
                            prefetch={["hover", "mount"]}
                            className={`relative group overflow-hidden px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 flex items-center justify-center ${
                                currentActive === 'about'
                                    ? 'text-[#1F7A54] dark:text-emerald-400 bg-[#1F7A54]/10 dark:bg-emerald-500/15 shadow-sm'
                                    : 'text-gray-700 dark:text-zinc-200 hover:text-[#1F7A54] dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-zinc-900/80'
                            }`}
                        >
                            {/* Shimmer Effect (Kilau Berjalan Saat Hover) */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/30 dark:via-emerald-400/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                            <span className="relative z-10">Tentang Kami</span>

                            {/* Dynamic Glow Line Indicator */}
                            <span
                                className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#1F7A54] dark:bg-emerald-400 transition-all duration-300 ${
                                    currentActive === 'about'
                                        ? 'w-1/2'
                                        : 'w-0 group-hover:w-2/3'
                                }`}
                            />
                        </Link>
                    </nav>

                    {/* Right Actions: Login, Register & Dark Mode Toggle */}
                    <div className="hidden md:flex items-center space-x-3">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                prefetch={["hover", "mount"]}
                                className="relative group overflow-hidden px-6 py-2.5 rounded-full border-2 border-[#1F7A54] text-[#1F7A54] dark:border-emerald-400 dark:text-emerald-400 font-bold text-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-[#1F7A54]/10 dark:hover:bg-emerald-400/10 hover:shadow-lg hover:shadow-[#1F7A54]/20 active:scale-95 flex items-center justify-center"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#1F7A54]/20 dark:via-emerald-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                                <span className="relative z-10">Dashboard</span>
                            </Link>
                        ) : (
                            <>
                                {/* 2. Tombol Login */}
                                <Link
                                    href="/login"
                                    prefetch={["hover", "mount"]}
                                    className={`relative group overflow-hidden px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 flex items-center justify-center ${
                                        isLoginActive
                                            ? 'bg-gradient-to-r from-[#1F7A54] to-[#165a3e] dark:from-emerald-600 dark:to-emerald-500 text-white shadow-md shadow-[#1F7A54]/30 dark:shadow-emerald-600/30 hover:shadow-xl hover:shadow-[#1F7A54]/50 dark:hover:shadow-emerald-500/50'
                                            : 'border-2 border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-zinc-100 hover:text-[#1F7A54] dark:hover:text-emerald-400 hover:border-[#1F7A54] dark:hover:border-emerald-400 bg-white/80 dark:bg-zinc-900/80 hover:bg-emerald-50/60 dark:hover:bg-zinc-800 hover:shadow-lg hover:shadow-[#1F7A54]/20 dark:hover:shadow-emerald-500/20'
                                    }`}
                                >
                                    {/* Shimmer Effect (Kilau Berjalan Saat Hover) */}
                                    <span className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent ${
                                        isLoginActive ? 'via-white/40' : 'via-[#1F7A54]/25 dark:via-emerald-400/30'
                                    } to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none`} />
                                    <span className="relative z-10">Login</span>
                                </Link>

                                {/* 3. Tombol Register */}
                                <Link
                                    href="/register"
                                    prefetch={["hover", "mount"]}
                                    className={`relative group overflow-hidden px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 flex items-center justify-center ${
                                        isRegisterActive || (!isLoginActive && !isRegisterActive)
                                            ? 'bg-gradient-to-r from-[#1F7A54] to-[#165a3e] dark:from-emerald-600 dark:to-emerald-500 text-white shadow-md shadow-[#1F7A54]/30 dark:shadow-emerald-600/30 hover:shadow-xl hover:shadow-[#1F7A54]/50 dark:hover:shadow-emerald-500/50'
                                            : 'border-2 border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-zinc-100 hover:text-[#1F7A54] dark:hover:text-emerald-400 hover:border-[#1F7A54] dark:hover:border-emerald-400 bg-white/80 dark:bg-zinc-900/80 hover:bg-emerald-50/60 dark:hover:bg-zinc-800 hover:shadow-lg hover:shadow-[#1F7A54]/20 dark:hover:shadow-emerald-500/20'
                                    }`}
                                >
                                    {/* Shimmer Effect (Kilau Berjalan Saat Hover) */}
                                    <span className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent ${
                                        isRegisterActive || (!isLoginActive && !isRegisterActive) ? 'via-white/40' : 'via-[#1F7A54]/25 dark:via-emerald-400/30'
                                    } to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none`} />
                                    <span className="relative z-10">Register</span>
                                </Link>
                            </>
                        )}

                        {/* 4. Tombol ikon Mode Gelap (Dark Mode) */}
                        <button
                            onClick={toggleDarkMode}
                            className="relative group overflow-hidden p-2.5 rounded-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-amber-400 hover:text-[#1F7A54] dark:hover:text-amber-300 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/25 dark:hover:shadow-amber-400/30 active:scale-90 flex items-center justify-center cursor-pointer"
                            aria-label="Toggle Dark Mode"
                        >
                            {/* Shimmer Effect (Kilau Berjalan Saat Hover) */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-400/30 dark:via-amber-300/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                            <span className="relative z-10 transform group-hover:rotate-45 transition-transform duration-500 ease-out flex items-center justify-center">
                                {darkMode ? (
                                    /* Sun Icon */
                                    <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                    </svg>
                                ) : (
                                    /* Moon Icon */
                                    <svg className="w-5 h-5 text-gray-700 group-hover:text-[#1F7A54] fill-current" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </span>
                        </button>
                    </div>

                    {/* Mobile Menu Button & Dark Mode Toggle */}
                    <div className="flex items-center space-x-3 md:hidden">
                        <button
                            onClick={toggleDarkMode}
                            className="relative group overflow-hidden p-2 rounded-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-amber-400 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105"
                            aria-label="Toggle Dark Mode"
                        >
                            <span className="transform group-hover:rotate-45 transition-transform duration-300 block">
                                {darkMode ? (
                                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </span>
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-200 transform hover:scale-105"
                            aria-label="Open Menu"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden px-4 pt-3 pb-6 border-t border-gray-100 dark:border-zinc-900 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors duration-300">
                    <div className="flex flex-col space-y-3">
                        <Link
                            href="/"
                            prefetch={["hover", "mount"]}
                            className={`relative group overflow-hidden px-4 py-2.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-between ${
                                currentActive === 'home'
                                    ? 'text-[#1F7A54] dark:text-emerald-400 bg-[#1F7A54]/10 dark:bg-emerald-500/15'
                                    : 'text-gray-800 dark:text-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-900'
                            }`}
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                            <span className="relative z-10">Home</span>
                        </Link>

                        <Link
                            href="/tentang-kami"
                            prefetch={["hover", "mount"]}
                            className={`relative group overflow-hidden px-4 py-2.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-between ${
                                currentActive === 'about'
                                    ? 'text-[#1F7A54] dark:text-emerald-400 bg-[#1F7A54]/10 dark:bg-emerald-500/15'
                                    : 'text-gray-800 dark:text-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-900'
                            }`}
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                            <span className="relative z-10">Tentang Kami</span>
                        </Link>

                        <hr className="border-gray-100 dark:border-zinc-900 my-1" />

                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                prefetch={["hover", "mount"]}
                                className="relative group overflow-hidden w-full text-center py-3 rounded-xl border-2 border-[#1F7A54] text-[#1F7A54] dark:border-emerald-400 dark:text-emerald-400 font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#1F7A54]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                                <span className="relative z-10">Dashboard</span>
                            </Link>
                        ) : (
                            <div className="flex flex-col space-y-2.5 pt-1">
                                <Link
                                    href="/login"
                                    prefetch={["hover", "mount"]}
                                    className={`relative group overflow-hidden w-full text-center py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all duration-300 transform hover:scale-[1.02] ${
                                        isLoginActive 
                                            ? 'bg-gradient-to-r from-[#1F7A54] to-[#165a3e] dark:from-emerald-600 dark:to-emerald-500 text-white' 
                                            : 'border-2 border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-zinc-200'
                                    }`}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#1F7A54]/20 dark:via-emerald-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                                    <span className="relative z-10">Login</span>
                                </Link>
                                <Link
                                    href="/register"
                                    prefetch={["hover", "mount"]}
                                    className={`relative group overflow-hidden w-full text-center py-2.5 rounded-xl font-bold text-sm shadow-md transition-all duration-300 transform hover:scale-[1.02] ${
                                        isRegisterActive || (!isLoginActive && !isRegisterActive)
                                            ? 'bg-gradient-to-r from-[#1F7A54] to-[#165a3e] dark:from-emerald-600 dark:to-emerald-500 text-white'
                                            : 'border-2 border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-zinc-200'
                                    }`}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                                    <span className="relative z-10">Register</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
