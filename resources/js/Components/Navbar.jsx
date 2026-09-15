import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ auth, darkMode, toggleDarkMode, activePage = 'home' }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Beranda', href: route('home'), key: 'home' },
        { name: 'Tentang Kami', href: route('about'), key: 'about' },
        { name: 'Artikel & Fitur', href: `${route('home')}#fitur`, key: 'fitur' },
        { name: 'Kontak', href: `${route('home')}#kontak`, key: 'kontak' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#09170F]/90 backdrop-blur-md border-b border-gray-100 dark:border-emerald-950/80 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Logo with lift & glow animation */}
                    <Link href={route('home')} className="flex items-center gap-3 group">
                        <div className="relative overflow-hidden p-1 rounded-2xl transition-transform duration-300 transform group-hover:scale-105 group-hover:-translate-y-0.5">
                            <img
                                src="/images/logo-sigizi.png"
                                alt="siGizi Logo"
                                className="h-10 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/logo-sigizi.png';
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                siGizi<span className="text-emerald-600 dark:text-[#20D080]">.</span>
                            </span>
                            <span className="text-[10px] font-semibold text-gray-400 dark:text-emerald-500/80 -mt-1 tracking-wider uppercase">
                                Nutrisi & Kesehatan
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1 bg-gray-50/80 dark:bg-[#0C1E14]/80 p-1.5 rounded-full border border-gray-100 dark:border-emerald-900/40">
                        {navLinks.map((link) => {
                            const isActive = activePage === link.key;
                            return (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 relative ${
                                        isActive
                                            ? 'bg-emerald-600 dark:bg-[#20D080] text-white dark:text-slate-950 shadow-sm shadow-emerald-500/20'
                                            : 'text-gray-600 dark:text-emerald-400/80 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-white/60 dark:hover:bg-emerald-950/40'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Actions (Dark mode toggle & Auth buttons) */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Dark Mode Toggle */}
                        {toggleDarkMode && (
                            <button
                                onClick={toggleDarkMode}
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#0C1E14] border border-gray-200 dark:border-emerald-800/60 flex items-center justify-center text-gray-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
                                title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
                            >
                                {darkMode ? <Sun size={18} className="text-amber-400 animate-spin-slow" /> : <Moon size={18} />}
                            </button>
                        )}

                        {/* Auth Buttons */}
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-[#20D080] dark:hover:bg-emerald-400 text-white dark:text-slate-950 rounded-full text-xs font-extrabold shadow-sm hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <span>Dashboard</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 text-xs font-bold text-gray-700 dark:text-emerald-300 hover:text-emerald-600 dark:hover:text-white transition"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="group inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-[#20D080] dark:hover:bg-emerald-400 text-white dark:text-slate-950 rounded-full text-xs font-extrabold shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <span>Daftar Gratis</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex md:hidden items-center gap-2">
                        {toggleDarkMode && (
                            <button
                                onClick={toggleDarkMode}
                                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#0C1E14] border border-gray-200 dark:border-emerald-800/60 flex items-center justify-center text-gray-600 dark:text-emerald-400"
                            >
                                {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
                            </button>
                        )}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-xl bg-gray-100 dark:bg-[#0C1E14] text-gray-600 dark:text-emerald-400 hover:bg-gray-200 dark:hover:bg-emerald-950/60 transition"
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-[#09170F] border-b border-gray-100 dark:border-emerald-950/80 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                                    activePage === link.key
                                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                        : 'text-gray-600 dark:text-emerald-400/80 hover:bg-gray-50 dark:hover:bg-emerald-950/40'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-emerald-950/80 flex flex-col gap-2">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="w-full py-3 text-center bg-emerald-600 text-white dark:bg-[#20D080] dark:text-slate-950 rounded-xl text-sm font-bold shadow-sm"
                            >
                                Ke Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="w-full py-2.5 text-center bg-gray-100 dark:bg-[#0C1E14] text-gray-700 dark:text-emerald-300 rounded-xl text-sm font-bold"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="w-full py-2.5 text-center bg-emerald-600 text-white dark:bg-[#20D080] dark:text-slate-950 rounded-xl text-sm font-bold shadow-sm"
                                >
                                    Daftar Gratis
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
