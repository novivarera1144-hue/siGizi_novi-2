import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, stats, progressNutrients, recentHistory, weeklyData }) {
    const user = auth.user;
    const [hoveredDay, setHoveredDay] = useState(null);

    // Fungsi untuk menentukan salam berdasarkan jam saat ini
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 3 && hour < 11) return 'Selamat pagi';
        if (hour >= 11 && hour < 15) return 'Selamat siang';
        if (hour >= 15 && hour < 18) return 'Selamat sore';
        return 'Selamat malam';
    };

    // Helper Icon SVG & Background Color sesuai Nutrisi
    const getNutriTheme = (title) => {
        const t = (title || '').toLowerCase();

        if (t.includes('kalori') || t.includes('calor')) {
            return {
                label: 'KALORI HARI INI',
                bg: 'bg-orange-500',
                icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9.879z" />
                    </svg>
                )
            };
        }

        if (t.includes('protein')) {
            return {
                label: 'PROTEIN HARI INI',
                bg: 'bg-blue-500',
                icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                )
            };
        }

        if (t.includes('lemak') || t.includes('fat')) {
            return {
                label: 'LEMAK HARI INI',
                bg: 'bg-amber-500',
                icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                    </svg>
                )
            };
        }

        if (t.includes('karbo') || t.includes('carb')) {
            return {
                label: 'KARBOHIDRAT HARI INI',
                bg: 'bg-emerald-500',
                icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3m15.364-6.364l-12.728 12.728m0-12.728l12.728 12.728" />
                    </svg>
                )
            };
        }

        return {
            label: `${(title || 'NUTRISI').toUpperCase()} HARI INI`,
            bg: 'bg-emerald-600',
            icon: (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
            )
        };
    };

    // Format Tanggal Hari Ini
    const todayFormatted = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const todayShortFormatted = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).toUpperCase();

    // Fallback Data
    const defaultStats = stats || [];
    const defaultProgress = progressNutrients || [];
    const defaultHistory = recentHistory || [];
    const defaultWeekly = weeklyData || [
        { day: "Sen", calories: 0, target: 2000 },
        { day: "Sel", calories: 0, target: 2000 },
        { day: "Rab", calories: 0, target: 2000 },
        { day: "Kam", calories: 0, target: 2000 },
        { day: "Jum", calories: 0, target: 2000 },
        { day: "Sab", calories: 0, target: 2000 },
        { day: "Min", calories: 0, target: 2000 },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard - siGizi" />

            <div className="space-y-8">

                {/* Header Greeting */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">
                            DASHBOARD
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                            {getGreeting()}, {user?.name ?? 'User'} 👏
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-medium mt-1">
                            {todayFormatted}
                        </p>
                    </div>

                    <Link
                        href="/scan"
                        prefetch={["hover", "mount"]}
                        className="inline-flex items-center space-x-2 px-5 py-3 bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-black font-bold text-sm rounded-2xl shadow-lg transition-all duration-200 cursor-pointer"
                    >
                        <svg className="w-4 h-4 text-white dark:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-16v3m9 8h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Scan Makanan</span>
                    </Link>
                </div>

                {/* 4 Stat Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {defaultStats.map((stat, idx) => {
                        const theme = getNutriTheme(stat.title);
                        const isCalorie = (stat.title || '').toLowerCase().includes('kalori');

                        const rawValue = String(stat.value ?? stat.currentValue ?? '0').replace(/[^0-9]/g, '');
                        const displayUnit = isCalorie ? 'kkal' : 'g';
                        const currentValueDisplay = `${rawValue || '0'} ${displayUnit}`;

                        const rawDailyTarget = parseInt(String(stat.dailyTarget || stat.target).replace(/[^0-9]/g, '')) || 0;
                        const totalProgramTarget = `${(rawDailyTarget * 7).toLocaleString('id-ID')} ${displayUnit}`;

                        return (
                            <div key={idx} className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between space-y-4">

                                {/* Top Section: Icon, Label HARI INI & Angka Utama */}
                                <div className="flex items-start space-x-3">
                                    <div className={`w-11 h-11 rounded-2xl ${theme.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                                        {theme.icon}
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 dark:text-emerald-400/80 uppercase tracking-wider block">
                                            {theme.label}
                                        </span>
                                        <div className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">
                                            {currentValueDisplay}
                                        </div>
                                    </div>
                                </div>

                                {/* Rincian Target & Total */}
                                <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-[#1a2e22]/80">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400 dark:text-emerald-100/50 font-medium">Target per hari:</span>
                                        <span className="font-bold text-gray-700 dark:text-emerald-200">
                                            {stat.dailyTarget || stat.target}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400 dark:text-emerald-100/50 font-medium">Total sementara:</span>
                                        <span className="font-extrabold text-[#1F7A54] dark:text-emerald-400">
                                            {stat.total_sementara}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400 dark:text-emerald-100/50 font-medium">Total target:</span>
                                        <span className="font-bold text-gray-900 dark:text-white">
                                            {stat.totalTargetProgram || totalProgramTarget}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

                {/* Progress Nutrisi & Riwayat */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Progress Bars */}
                    <div className="lg:col-span-8 bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Nutrisi Hari Ini</h2>
                            <span className="text-[10px] font-bold text-gray-400 dark:text-emerald-100/40 tracking-wider">
                                {todayShortFormatted}
                            </span>
                        </div>

                        <div className="space-y-6">
                            {defaultProgress.map((nutri, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-emerald-100/80">
                                        <span>{nutri.name}</span>
                                        <span>
                                            {nutri.current}/{nutri.target}{nutri.unit} ({nutri.pct}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-[#0b140e] rounded-full h-3 overflow-hidden">
                                        <div
                                            className={`${nutri.barColor} h-full rounded-full transition-all duration-500`}
                                            style={{ width: `${nutri.pct}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Riwayat Scan */}
                    <div className="lg:col-span-4 bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Riwayat Terbaru</h2>
                            <Link href="/riwayat" prefetch={["hover", "mount"]} className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 hover:underline">
                                Lihat semua
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {defaultHistory.length > 0 ? (
                                defaultHistory.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#182b1f] rounded-2xl transition-all duration-200">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-2xl object-cover border border-gray-100 dark:border-[#1a2e22] shadow-sm"
                                            />
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                                <p className="text-[10px] text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">{item.info}</p>
                                            </div>
                                        </div>

                                        <div className={`w-8 h-8 rounded-full ${item.scoreColor} flex items-center justify-center font-bold text-xs shadow-sm shrink-0`}>
                                            {item.score}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-xs text-gray-400 py-4">Belum ada riwayat scan hari ini.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar Chart */}
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Kalori Minggu Ini</h2>
                        <Link href="/riwayat" prefetch={["hover", "mount"]} className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 flex items-center hover:underline">
                            <span>Lihat laporan</span>
                            <span className="ml-1">→</span>
                        </Link>
                    </div>

                    <div className="flex items-end pt-6 pb-2 px-2 sm:px-4">
                        <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-44 w-full relative border-b border-gray-100 dark:border-[#1a2e22] px-2">
                            {defaultWeekly.map((data, idx) => {
                                const currentHeight = Math.min((data.calories / 2400) * 100, 100);
                                const targetHeight = Math.min((data.target / 2400) * 100, 100);
                                const isHovered = hoveredDay === data.day;

                                return (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => setHoveredDay(data.day)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                        onClick={() => setHoveredDay(hoveredDay === data.day ? null : data.day)}
                                        className="flex flex-col items-center group relative w-full pt-4 rounded-2xl px-1 pb-1 cursor-pointer"
                                    >
                                        {isHovered && (
                                            <div className="absolute -top-20 bg-gray-900 text-white text-[11px] font-medium py-2 px-3 rounded-2xl shadow-xl z-30 pointer-events-none transition-all flex flex-col space-y-0.5 min-w-[95px] border border-gray-800">
                                                <span className="font-extrabold text-emerald-400 mb-0.5 border-b border-gray-800 pb-0.5">
                                                    {data.day}
                                                </span>
                                                <div className="flex justify-between items-center text-[10px]">
                                                    <span className="text-gray-400">Kalori :</span>
                                                    <span className="font-bold text-white ml-2">{data.calories}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px]">
                                                    <span className="text-gray-400">Target :</span>
                                                    <span className="font-bold text-white ml-2">{data.target}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex space-x-1 items-end justify-center w-full h-36">
                                            <div
                                                style={{ height: `${currentHeight}%` }}
                                                className={`w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-200 ${isHovered ? 'bg-emerald-400' : 'bg-[#22c55e]/90'}`}
                                            ></div>
                                            <div
                                                style={{ height: `${targetHeight}%` }}
                                                className={`w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-200 ${isHovered ? 'bg-gray-700' : 'bg-gray-900 dark:bg-gray-800'}`}
                                            ></div>
                                        </div>

                                        <span className={`text-xs font-bold mt-2 block transition-colors ${isHovered ? 'text-[#1F7A54] dark:text-emerald-400' : 'text-gray-400 dark:text-emerald-100/40'}`}>
                                            {data.day}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}