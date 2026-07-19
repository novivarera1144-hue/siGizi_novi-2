import React from 'react';
import { Link } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <div className="min-h-screen bg-[#F8F9FA] dark:bg-zinc-950 transition-colors duration-300 flex flex-col justify-between">

                {/* Navbar */}
                <nav className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-zinc-800 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            {/* Logo */}
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg bg-[#1F7A54] flex items-center justify-center text-white font-black text-xl shadow-sm">
                                    s
                                </div>
                                <span className="text-xl font-bold tracking-tight text-gray-950 dark:text-white">
                                    <span className="text-[#1F7A54] dark:text-emerald-400">si</span>Gizi
                                </span>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Home</Link>
                                <Link href="/tentang-kami" className="text-sm font-bold text-[#1F7A54] dark:text-emerald-400 border-b-2 border-[#1F7A54] pb-1">Tentang Kami</Link>
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-zinc-700 px-5 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">Login</Link>
                                <Link href="/register" className="text-sm font-semibold text-white bg-[#1F7A54] hover:bg-[#196344] px-5 py-2 rounded-full shadow-sm transition-all">Register</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Konten Utama (Gambar 1 & 2) */}
                <main className="flex-grow py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                        {/* Section Mengenal siGizi */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">TENTANG KAMI</span>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Mengenal siGizi</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-3xl text-lg leading-relaxed">
                                Platform berbasis web yang dirancang untuk membantu masyarakat memahami kandungan nutrisi makanan secara lebih mudah dan praktis melalui teknologi AI.
                            </p>
                        </div>

                        {/* Grid Latar Belakang & Tujuan */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Latar Belakang */}
                            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Latar Belakang</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                    Banyak masyarakat peduli kesehatan namun kesulitan mengetahui kandungan nutrisi makanan yang dikonsumsi. siGizi hadir sebagai solusi berbasis AI yang mudah diakses.
                                </p>
                            </div>

                            {/* Tujuan */}
                            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tujuan</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
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
                                    <div key={index} className="flex items-center space-x-3 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{manfaat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section Target Pengguna */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm text-center space-y-6">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">Target Pengguna</h4>
                            <div className="flex flex-wrap justify-center gap-3">
                                {[
                                    "Mahasiswa", "Pelajar", "Anak Kost", "Pekerja", "Masyarakat Umum", "Program Diet", "Penggiat Hidup Sehat"
                                ].map((target, index) => (
                                    <span key={index} className="px-4 py-2 rounded-full bg-[#F8F9FA] dark:bg-zinc-800 text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-zinc-700">
                                        {target}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white dark:bg-zinc-900 py-6 border-t border-gray-100 dark:border-zinc-800 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400">
                        <p>&copy; {new Date().getFullYear()} siGizi. Hak Cipta Dilindungi.</p>
                    </div>
                </footer>

            </div>
        </>
    );
}