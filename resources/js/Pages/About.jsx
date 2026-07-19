import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function About() {
    // State untuk mengatur dark mode
    const [darkMode, setDarkMode] = useState(false);

    // Cek tema saat komponen pertama kali dimuat
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Fungsi untuk mengubah tema saat tombol diklik
    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setDarkMode(true);
        }
    };

    return (
        <>
            {/* Background Utama Diubah dari dark:bg-zinc-950 menjadi hijau gelap pekat */}
            <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#071A0E] transition-colors duration-300 flex flex-col justify-between">

                {/* Navbar Diubah menjadi hijau gelap transparan dan border hijau tua */}
                <nav className="bg-white/80 dark:bg-[#092213]/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-[#133A22] transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">

                            {/* Logo Bulat Asli siGizi */}
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/images/logo.png"
                                    alt="Logo siGizi"
                                    className="w-8 h-8 object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none' }} className="w-8 h-8 rounded-lg bg-[#1F7A54] items-center justify-center text-white font-black text-xl shadow-sm mr-1">
                                    s
                                </div>
                                <span className="text-xl font-bold tracking-tight text-gray-950 dark:text-white flex items-center">
                                    <span className="text-[#1F7A54] dark:text-emerald-400">si</span>Gizi
                                </span>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#1F7A54] dark:hover:text-emerald-400 transition-colors">Home</Link>
                                <Link href="/tentang-kami" className="text-sm font-bold text-[#1F7A54] dark:text-emerald-400 border-b-2 border-[#1F7A54] pb-1">Tentang Kami</Link>
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-sm font-semibold text-[#1F7A54] bg-white border border-[#1F7A54] px-6 py-2 rounded-xl hover:bg-emerald-50 transition-all">
                                    Login
                                </Link>
                                <Link href="/register" className="text-sm font-semibold text-white bg-[#2E7D32] hover:bg-[#1E5A22] px-6 py-2 rounded-xl shadow-sm transition-all">
                                    Register
                                </Link>

                                {/* Tombol Toggle Mode */}
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0B2B18] rounded-xl transition-all"
                                    aria-label="Toggle Dark Mode"
                                >
                                    {darkMode ? (
                                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.343l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Konten Utama */}
                <main className="flex-grow py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                        {/* Section Mengenal siGizi */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-emerald-600/80">TENTANG KAMI</span>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Mengenal siGizi</h2>
                            <p className="text-gray-600 dark:text-[#52B788] max-w-3xl text-lg leading-relaxed">
                                Platform berbasis web yang dirancang untuk membantu masyarakat memahami kandungan nutrisi makanan secara lebih mudah dan praktis melalui teknologi AI.
                            </p>
                        </div>

                        {/* Grid Latar Belakang & Tujuan - Card diubah menjadi hijau tua dengan border serasi */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-[#0B2B18] p-8 rounded-3xl border border-gray-100 dark:border-[#164D2B] shadow-sm space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Latar Belakang</h3>
                                <p className="text-gray-500 dark:text-[#52B788]/90 text-sm leading-relaxed">
                                    Banyak masyarakat peduli kesehatan namun kesulitan mengetahui kandungan nutrisi makanan yang dikonsumsi. siGizi hadir sebagai solusi berbasis AI yang mudah diakses.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-[#0B2B18] p-8 rounded-3xl border border-gray-100 dark:border-[#164D2B] shadow-sm space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tujuan</h3>
                                <p className="text-gray-500 dark:text-[#52B788]/90 text-sm leading-relaxed">
                                    Mengembangkan platform AI berbasis web untuk membantu masyarakat memahami nutrisi makanan dan menerapkan pola makan sehat.
                                </p>
                            </div>
                        </div>

                        {/* Section Manfaat Platform */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Manfaat Platform</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Mengetahui kandungan nutrisi makanan dengan cepat",
                                    "Memantau asupan nutrisi harian secara terstruktur",
                                    "Mendapatkan rekomendasi pola makan yang lebih sehat",
                                    "Meningkatkan kesadaran terhadap pentingnya gizi",
                                    "Edukasi nutrisi yang mudah diakses semua kalangan",
                                    "Membangun kebiasaan makan sehat secara berkelanjutan"
                                ].map((manfaat, index) => (
                                    <div key={index} className="flex items-center space-x-3 bg-white dark:bg-[#0B2B18] p-4 rounded-2xl border border-gray-100 dark:border-[#164D2B] shadow-sm">
                                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-700 dark:text-[#52B788] font-medium">{manfaat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section Target Pengguna */}
                        <div className="bg-white dark:bg-[#0B2B18] p-8 rounded-3xl border border-gray-100 dark:border-[#164D2B] shadow-sm text-center space-y-6">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">Target Pengguna</h4>
                            <div className="flex flex-wrap justify-center gap-3">
                                {[
                                    "Mahasiswa", "Pelajar", "Anak Kost", "Pekerja", "Masyarakat Umum", "Program Diet", "Penggiat Hidup Sehat"
                                ].map((target, index) => (
                                    <span key={index} className="px-4 py-2 rounded-full bg-[#F8F9FA] dark:bg-[#092213] text-xs font-semibold text-gray-700 dark:text-[#52B788] border border-gray-200/60 dark:border-[#164D2B]">
                                        {target}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white dark:bg-[#092213] py-6 border-t border-gray-100 dark:border-[#133A22] transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400 dark:text-[#52B788]/60">
                        <p>&copy; {new Date().getFullYear()} siGizi. Hak Cipta Dilindungi.</p>
                    </div>
                </footer>

            </div>
        </>
    );
}