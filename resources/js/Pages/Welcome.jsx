import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Synchronize theme with local storage & document class
    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setDarkMode(true);
        }
    };

    // Food Gallery items (Kenali Jenis Makanan)
    const foods = [
        {
            name: "Nasi Goreng",
            calories: "450 kkal",
            image: "/images/nasigoreng1.jpg"
        },
        {
            name: "Smoothie",
            calories: "320 kkal",
            image: "/images/smoothie2.jpg"
        },
        {
            name: "Salad Sayuran",
            calories: "210 kkal",
            image: "/images/salad1.jpg"
        },
        {
            name: "Ikan Panggang",
            calories: "380 kkal",
            image: "/images/ikan3.avif"
        },
        {
            name: "Mango French Toast",
            calories: "290 kkal",
            image: "/images/roti2.jpg"
        },
        {
            name: " Fruit Bowl",
            calories: "185 kkal",
            image: "/images/buah3.jpg"
        }
    ];

    // Six features list (Keunggulan)
    const features = [
        {
            title: "Scan AI",
            description: "Upload foto makanan, AI identifikasi dan analisis nutrisi dalam hitungan detik.",
            icon: (
                <svg className="w-6 h-6 text-[#1F7A54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-16v3m9 8h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bg: "bg-emerald-50 dark:bg-emerald-950/20"
        },
        {
            title: "Health Insight",
            description: "Penjelasan kualitas gizi: apakah tinggi kalori, kurang protein, atau sudah seimbang.",
            icon: (
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            bg: "bg-blue-50 dark:bg-blue-950/20"
        },
        {
            title: "Daily Tracker",
            description: "Pantau total asupan nutrisi harianmu dan perkembangan pola makan dari waktu ke waktu.",
            icon: (
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
            ),
            bg: "bg-emerald-50 dark:bg-emerald-950/20"
        },
        {
            title: "Food Score",
            description: "Nilai kesehatan makanan 1-100 berdasarkan keseimbangan nutrisi dan kandungan gizinya.",
            icon: (
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.88a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.88a1 1 0 00-1.175 0l-3.97 2.88c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.88c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            bg: "bg-amber-50 dark:bg-amber-950/20"
        },
        {
            title: "Laporan Mingguan",
            description: "Grafik dan ringkasan pola konsumsi nutrisi lengkap selama satu minggu penuh.",
            icon: (
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            bg: "bg-purple-50 dark:bg-purple-950/20"
        },
        {
            title: "AI Nutrition Chat",
            description: "Tanya jawab nutrisi langsung dengan AI assistant yang siap membantu kapan saja.",
            icon: (
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
            bg: "bg-orange-50 dark:bg-orange-950/20"
        }
    ];

    // Testimonials (Apa kata mereka)
    const testimonials = [
        {
            name: "Rizki Pratama",
            role: "Mahasiswa",
            initial: "R",
            stars: 5,
            quote: "“siGizi bantu aku ngerti kandungan nasi kos harianku. Sekarang lebih terkontrol makannya!”",
            color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
        },
        {
            name: "Sari Dewi",
            role: "Ibu rumah tangga",
            initial: "S",
            stars: 5,
            quote: "“Fitur scan-nya sangat praktis! Tinggal foto, langsung tahu kalori dan nutrisinya.”",
            color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
        },
        {
            name: "Budi Setiawan",
            role: "Pekerja kantoran",
            initial: "B",
            stars: 4,
            quote: "“AI Assistant-nya helpful banget. Jawab pertanyaan nutrisi dengan jelas dan mudah dipahami.”",
            color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
        }
    ];

    return (
        <>
            <Head title="Kenali Gizi Makananmu Dalam Detik - siGizi" />
            <div className="min-h-screen bg-white text-gray-800 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100 font-sans">

                {/* Navbar/Header */}
                <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/80 transition-colors duration-300 dark:bg-zinc-950/95 dark:border-zinc-900/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16 sm:h-20">

                            {/* Logo siGizi */}
                            <div className="flex-shrink-0 flex items-center">
                                <a href="#" className="flex items-center group py-1">
                                    <img
                                        src="/images/logo-sigizi.png"
                                        alt="siGizi Logo"
                                        className="h-20 sm:h-24 w-auto max-w-none object-contain group-hover:scale-105 transition-transform duration-200"
                                    />
                                </a>
                            </div>

                            {/* Center Navigation Links */}
                            <nav className="hidden md:flex items-center space-x-8">
                                <a href="#" className="text-[#1F7A54] dark:text-emerald-400 font-bold border-b-2 border-[#1F7A54] pb-1">Home</a>
                                <Link href="/tentang-kami" className="text-gray-800 dark:text-zinc-100 hover:text-[#1F7A54] dark:hover:text-emerald-400 font-semibold transition-colors duration-200">Tentang Kami</Link>
                            </nav>
                            {/* Right Actions: Auth buttons + Dark mode toggle */}
                            <div className="hidden md:flex items-center space-x-4">
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="px-5 py-2 rounded-full border border-[#1F7A54] text-[#1F7A54] hover:bg-[#1F7A54]/5 font-semibold text-sm transition-all duration-200">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="px-5 py-2 rounded-full border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-zinc-200 hover:text-[#1F7A54] dark:hover:text-emerald-400 hover:border-[#1F7A54] dark:hover:border-emerald-500 font-semibold text-sm transition-all duration-200">
                                            Login
                                        </Link>
                                        <Link href={route('register')} className="px-5 py-2 rounded-full bg-[#1F7A54] text-white hover:bg-[#186041] font-semibold text-sm shadow-md shadow-[#1F7A54]/20 transition-all duration-200">
                                            Register
                                        </Link>
                                    </>
                                )}

                                {/* Dark mode Toggle */}
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors duration-200"
                                    aria-label="Toggle Dark Mode"
                                >
                                    {darkMode ? (
                                        // Sun Icon
                                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                        </svg>
                                    ) : (
                                        // Moon Icon
                                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex items-center space-x-3 md:hidden">
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors duration-200"
                                    aria-label="Toggle Dark Mode"
                                >
                                    {darkMode ? (
                                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    )}
                                </button>

                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors duration-200"
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
                        <div className="md:hidden px-4 pt-2 pb-6 border-t border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 transition-colors duration-300">
                            <div className="flex flex-col space-y-4">
                                <a href="#" className="text-[#1F7A54] dark:text-emerald-400 font-bold py-2">Home</a>
                                <Link href="/tentang-kami" className="text-gray-800 dark:text-zinc-100 font-semibold py-2 hover:text-[#1F7A54] dark:hover:text-emerald-400 transition-colors">Tentang Kami</Link>
                                <hr className="border-gray-100 dark:border-zinc-900" />
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="w-full text-center py-2.5 rounded-full border border-[#1F7A54] text-[#1F7A54] font-semibold text-sm">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex flex-col space-y-3 pt-2">
                                        <Link href={route('login')} className="w-full text-center py-2.5 rounded-full border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-200 font-semibold text-sm">
                                            Login
                                        </Link>
                                        <Link href={route('register')} className="w-full text-center py-2.5 rounded-full bg-[#1F7A54] text-white font-semibold text-sm">
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden min-h-[calc(100vh-72px)] flex items-center bg-zinc-950 py-12 lg:py-16 transition-colors duration-300">
                    {/* Background Food Image with Balanced Brightness & Soft Left Dark Gradient */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
                        <img
                            src="/images/sayuran1.png"
                            alt="Background Makanan Sehat"
                            className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05]"
                        />
                        {/* Gradient Gelap di sebelah kiri agar teks sangat kontras */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent"></div>
                    </div>

                    {/* Container Utama Konten Hero */}
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                            {/* Left Content: Headline & CTA */}
                            <div className="lg:col-span-7 space-y-5 pl-2 sm:pl-4">
                                {/* Badge Teknologi AI */}
                                <div className="inline-flex items-center space-x-2 bg-white/15 border border-white/25 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span className="text-xs font-medium text-white">Didukung Teknologi AI</span>
                                </div>

                                {/* Judul Utama (Disusun 3 baris ke bawah) */}
                                <h1
                                    className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] max-w-xl"
                                    style={{ WebkitTextStroke: '1.5px white' }}
                                >
                                    Kenali Gizi <br />
                                    <span className="text-amber-500" style={{ WebkitTextStroke: '1.5px #f59e0b' }}>Makananmu</span> <br />
                                    Dalam Detik
                                </h1>

                                {/* Deskripsi */}
                                <p className="text-sm sm:text-base text-gray-200 max-w-md font-normal leading-relaxed">
                                    Foto makananmu &rarr; AI analisis kandungan nutrisi &rarr; dapatkan insight kesehatan dan rekomendasi pola makan sehatmu.
                                </p>

                                {/* Tombol Aksi (CTA) */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-1">
                                    <a
                                        href="#scanner"
                                        className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-900/40 transition-all duration-300 text-sm"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Mulai Scan Sekarang
                                    </a>
                                    <a
                                        href="#cara-kerja"
                                        className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md border border-white/25 transition-all duration-300 text-sm"
                                    >
                                        Lihat Demo
                                    </a>
                                </div>

                                {/* Statistik Singkat di Bawah Teks dengan Jarak Aman (Tidak Mepet) */}
                                <div className="flex items-center space-x-12 pt-8 max-w-md">
                                    <div>
                                        <div
                                            className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                                            style={{ WebkitTextStroke: '1px white' }}
                                        >
                                            10K+
                                        </div>
                                        <div className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-medium">Pengguna</div>
                                    </div>
                                    <div>
                                        <div
                                            className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                                            style={{ WebkitTextStroke: '1px white' }}
                                        >
                                            98%
                                        </div>
                                        <div className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-medium">Akurasi AI</div>
                                    </div>
                                    <div>
                                        <div
                                            className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                                            style={{ WebkitTextStroke: '1px white' }}
                                        >
                                            500+
                                        </div>
                                        <div className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-medium">Menu Dikenal</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Floating Mockup Card */}
                            <div className="lg:col-span-5 flex justify-center relative scale-[0.92] transform origin-top pt-12 pb-6">
                                <div className="w-full max-w-[330px] bg-white dark:bg-[#09170F] rounded-3xl overflow-visible shadow-2xl border border-gray-100 dark:border-emerald-950/40 relative mt-4">

                                    {/* Badge Floating 450 kkal (Ditarik lebih jauh ke atas dan kiri menggunakan -top-12 dan -left-14) */}
                                    <div className="absolute -top-12 -left-14 z-30 bg-white dark:bg-zinc-900 text-orange-500 font-extrabold text-xs px-4 py-2 rounded-full shadow-xl flex items-center space-x-1.5 border border-orange-100 dark:border-zinc-800 whitespace-nowrap">
                                        <span>🔥</span>
                                        <span>450 kkal</span>
                                    </div>

                                    {/* Mock Food Image Container dengan Teks di Dalamnya */}
                                    <div className="relative w-full h-52 overflow-hidden rounded-t-3xl bg-gray-100">
                                        <img
                                            src="https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=500"
                                            alt="Nasi Goreng Ayam"
                                            className="w-full h-full object-cover object-center"
                                        />
                                        {/* Gradasi Hitam Transparan */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                        {/* Score Badge di Pojok Kanan Atas */}
                                        <div className="absolute top-3 right-3 bg-[#1F7A54] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                                            Skor 72
                                        </div>

                                        {/* Teks Nama Makanan & Porsi di Dalam Foto */}
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <h3 className="text-lg font-bold">Nasi Goreng Ayam</h3>
                                            <p className="text-xs text-gray-200">1 porsi ≈ 250g</p>
                                        </div>
                                    </div>

                                    {/* Card Content Details Bagian Bawah */}
                                    <div className="p-4 space-y-3">
                                        {/* Grid Nutrisi */}
                                        <div className="grid grid-cols-4 gap-2">
                                            <div className="bg-orange-50 dark:bg-orange-950/30 p-2 rounded-xl text-center">
                                                <div className="text-xs text-orange-600 font-extrabold">450</div>
                                                <div className="text-[9px] text-orange-600 font-semibold">kkal</div>
                                                <div className="text-[8px] text-gray-400 uppercase tracking-wider mt-0.5">Kalori</div>
                                            </div>
                                            <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-xl text-center">
                                                <div className="text-xs text-blue-600 font-extrabold">18g</div>
                                                <div className="text-[8px] text-blue-400 uppercase tracking-wider mt-3.5">Protein</div>
                                            </div>
                                            <div className="bg-amber-50 dark:bg-amber-950/30 p-2 rounded-xl text-center">
                                                <div className="text-xs text-amber-600 font-extrabold">12g</div>
                                                <div className="text-[8px] text-amber-400 uppercase tracking-wider mt-3.5">Lemak</div>
                                            </div>
                                            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-xl text-center">
                                                <div className="text-xs text-emerald-600 font-extrabold">62g</div>
                                                <div className="text-[8px] text-emerald-400 uppercase tracking-wider mt-3.5">Karbo</div>
                                            </div>
                                        </div>

                                        {/* Insight Box */}
                                        <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 p-2.5 rounded-xl">
                                            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium leading-tight flex items-center">
                                                <span className="text-emerald-600 font-bold mr-1.5">✓</span>
                                                Kalori sedang — cocok untuk makan siang aktif
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating "Analisis Selesai" Badge */}
                                <div className="absolute -bottom-6 -right-6 sm:-right-8 z-30 bg-white dark:bg-zinc-900 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 border border-gray-100 dark:border-zinc-800">
                                    <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Analisis selesai</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3 Langkah Mudah (Cara Kerja) */}
                <section id="cara-kerja" className="py-20 bg-gray-50 dark:bg-zinc-900/50 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Section Header */}
                        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1F7A54] dark:text-emerald-400">CARA KERJA</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Hanya 3 Langkah Mudah</h2>
                        </div>

                        {/* Steps Grid */}
                        <div className="relative mt-8">
                            {/* Connecting Dashed Line on Larger Screens */}
                            <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-gray-200 dark:border-zinc-800 z-0"></div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10">

                                {/* Step 1 */}
                                <div className="flex flex-col items-center text-center space-y-4 group">
                                    <div className="relative">
                                        {/* Step Counter Badge */}
                                        <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#1F7A54] text-white font-bold text-sm flex items-center justify-center shadow-md">
                                            1
                                        </div>
                                        {/* Step Icon */}
                                        <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#1F7A54]/10 group-hover:border-[#1F7A54]/30">
                                            <svg className="w-10 h-10 text-[#1F7A54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white pt-2">Upload Foto</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
                                        Foto makanan yang ingin kamu ketahui nutrisinya.
                                    </p>
                                </div>

                                {/* Step 2 */}
                                <div className="flex flex-col items-center text-center space-y-4 group">
                                    <div className="relative">
                                        <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#1F7A54] text-white font-bold text-sm flex items-center justify-center shadow-md">
                                            2
                                        </div>
                                        <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#1F7A54]/10 group-hover:border-[#1F7A54]/30">
                                            <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white pt-2">AI Analisis</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
                                        Sistem AI mengenali jenis makanan dan menghitung nutrisinya dalam detik.
                                    </p>
                                </div>

                                {/* Step 3 */}
                                <div className="flex flex-col items-center text-center space-y-4 group">
                                    <div className="relative">
                                        <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#1F7A54] text-white font-bold text-sm flex items-center justify-center shadow-md">
                                            3
                                        </div>
                                        <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#1F7A54]/10 group-hover:border-[#1F7A54]/30">
                                            <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white pt-2">Dapatkan Insight</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
                                        Lihat kalori, nutrisi, skor kesehatan, dan rekomendasi pola makan.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* Kenali Jenis Makanan (Food Gallery) */}
                <section id="jenis-makanan" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Section Header */}
                        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1F7A54] dark:text-emerald-400">MAKANAN TERDUKUNG</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Kenali ratusan jenis makanan</h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
                                Dari masakan Indonesia hingga internasional, siGizi mengenali kandungan nutrisi ribuan jenis makanan.
                            </p>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {foods.map((food, index) => (
                                <div
                                    key={index}
                                    className="group relative h-80 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                                >
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Gradient Dark Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>

                                    {/* Text Content Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6 text-white">
                                        <h3 className="text-xl font-bold tracking-tight">{food.name}</h3>
                                        <p className="text-orange-400 text-sm font-semibold mt-1 flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.317.766-.599 1.619-.874 2.417-.293.854-.538 1.482-.773 1.968a3.993 3.993 0 01-.58-1.72 1 1 0 00-1.477-.73c-.385.247-.69.595-.919.964-.226.362-.397.77-.524 1.166-.233.729-.33 1.432-.33 1.968 0 3.207 2.5 5.8 5.684 5.8 3.184 0 5.685-2.6 5.685-5.8 0-1.04-.325-1.99-.877-2.777a1 1 0 00-1.428-.15c-.345.257-.665.558-.934.88-.27.323-.497.669-.675 1.01-.229.439-.427.917-.613 1.348-.184.428-.354.767-.525.996a1.996 1.996 0 01-.577-1.417c0-.295.037-.588.11-.874.14-.523.354-1.087.595-1.637.243-.556.518-1.127.795-1.637.279-.516.559-.92.812-1.206a3.99 3.99 0 011.666-1.16z" clipRule="evenodd" />
                                            </svg>
                                            {food.calories}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Keunggulan/Fitur */}
                <section className="py-20 bg-gray-50 dark:bg-zinc-900/50 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Section Header */}
                        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1F7A54] dark:text-emerald-400">FITUR UTAMA</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Solusi Pantau Gizi Terpadu</h2>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                                >
                                    <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Testimoni */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Section Header */}
                        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1F7A54] dark:text-emerald-400">TESTIMONI</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Apa kata mereka?</h2>
                        </div>

                        {/* Testimonial Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testi, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-md flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                                >
                                    <div className="space-y-4">
                                        {/* Stars Row */}
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${i < testi.stars ? 'text-amber-400' : 'text-gray-200 dark:text-zinc-800'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.88a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.88a1 1 0 00-1.175 0l-3.97 2.88c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.88c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                </svg>
                                            ))}
                                        </div>

                                        {/* Quote Text */}
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
                                            {testi.quote}
                                        </p>
                                    </div>

                                    {/* Author Profile */}
                                    <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-gray-100 dark:border-zinc-800">
                                        <div className={`w-10 h-10 rounded-full ${testi.color} flex items-center justify-center font-bold text-sm shadow-sm`}>
                                            {testi.initial}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{testi.name}</h4>
                                            <p className="text-gray-500 dark:text-gray-400 text-xs">{testi.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Footer Call-To-Action (CTA) Banner */}
                <section className="py-16 md:py-20 relative overflow-hidden text-white text-center">
                    {/* Background Image Asli Tanpa Efek Pudar */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/background2.png"
                            alt="Background Makanan Sehat"
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay Gelap Tipis agar teks putih tetap terbaca jelas di atas foto */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                        {/* Circle leaf logo outline */}
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                            <svg className="w-6.5 h-6.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
                                <path d="M19 2c-2.26 4.33-5.27 7.14-8 10" />
                            </svg>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                            Mulai hidup lebih sehat hari ini
                        </h2>

                        <p className="text-zinc-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed drop-shadow">
                            Bergabung dengan ribuan pengguna yang sudah memantau gizi mereka dengan siGizi — gratis, mudah, dan akurat.
                        </p>

                        <div className="pt-4">
                            <Link
                                href={route('register')}
                                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-900/20 transition-all duration-300 hover:scale-[1.02]"
                            >
                                Daftar Gratis Sekarang →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Bottom Footer Info */}
                <footer className="bg-white border-t border-gray-100 dark:bg-zinc-950 dark:border-zinc-900 py-10 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                            {/* Logo siGizi Extra Besar */}
                            <div className="flex-shrink-0 flex items-center">
                                <a href="#" className="flex items-center group py-1">
                                    <img
                                        src="/images/logo-sigizi.png"
                                        alt="siGizi Logo"
                                        className="h-20 sm:h-24 w-auto max-w-none object-contain group-hover:scale-105 transition-transform duration-200"
                                    />
                                </a>
                            </div>

                            {/* Copyright Text */}
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center order-last md:order-none">
                                © 2026 siGizi — Sistem Informasi Gizi Berbasis AI - Nutrisi Untuk Hidup Lebih Baik
                            </div>

                            {/* Links */}
                            <div className="flex items-center space-x-6">
                                <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#1F7A54] dark:hover:text-emerald-400">Privasi</a>
                                <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#1F7A54] dark:hover:text-emerald-400">Syarat</a>
                                <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#1F7A54] dark:hover:text-emerald-400">Kontak</a>
                            </div>

                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}

