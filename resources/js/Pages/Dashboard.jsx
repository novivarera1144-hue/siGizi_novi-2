import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({
    auth,
    stats: initialStats,
    progressNutrients: initialProgress,
    recentHistory: initialHistory,
    weeklyData: initialWeekly,
    totalDays = 30
}) {
    const user = auth.user;
    const [activeDay, setActiveDay] = useState(null);

    const defaultIcons = [
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.317.766-.599 1.619-.874 2.417-.293.854-.538 1.482-.773 1.968a3.993 3.993 0 01-.58-1.72 1 1 0 00-1.477-.73c-.385.247-.69.595-.919.964-.226.362-.397.77-.524 1.166-.233.729-.33 1.432-.33 1.968 0 3.207 2.5 5.8 5.684 5.8 3.184 0 5.685-2.6 5.685-5.8 0-1.04-.325-1.99-.877-2.777a1 1 0 00-1.428-.15c-.345.257-.665.558-.934.88-.27.323-.497.669-.675 1.01-.229.439-.427.917-.613 1.348-.184.428-.354.767-.525.996a1.996 1.996 0 01-.577-1.417c0-.295.037-.588.11-.874.14-.523.354-1.087.595-1.637.243-.556.518-1.127.795-1.637.279-.516.559-.92.812-1.206a3.99 3.99 0 011.666-1.16z" clipRule="evenodd" />
        </svg>,
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>,
        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>,
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
    ];

    const targets = {
        calories: user?.daily_calorie_goal ?? 1650,
        protein: user?.protein_goal ?? 90,
        fat: user?.fat_goal ?? 46,
        carbs: user?.carbs_goal ?? 248,
    };

    const stats = [
        {
            title: "Kalori Hari Ini",
            value: "3,120",
            unit: "kkal",
            dailyTarget: `${targets.calories.toLocaleString()} kkal`,
            totalTarget: `${(targets.calories * totalDays).toLocaleString()} kkal`,
            color: "bg-orange-500 text-white"
        },
        {
            title: "Protein",
            value: "123",
            unit: "g",
            dailyTarget: `${targets.protein} g`,
            totalTarget: `${(targets.protein * totalDays).toLocaleString()} g`,
            color: "bg-blue-500 text-white"
        },
        {
            title: "Lemak",
            value: "155",
            unit: "g",
            dailyTarget: `${targets.fat} g`,
            totalTarget: `${(targets.fat * totalDays).toLocaleString()} g`,
            color: "bg-amber-400 text-black"
        },
        {
            title: "Karbohidrat",
            value: "306",
            unit: "g",
            dailyTarget: `${targets.carbs} g`,
            totalTarget: `${(targets.carbs * totalDays).toLocaleString()} g`,
            color: "bg-emerald-500 text-white"
        }
    ].map((s, idx) => ({
        ...s,
        icon: defaultIcons[idx % defaultIcons.length]
    }));

    const progressNutrients = initialProgress || [
        { name: "Kalori", current: "3120", target: targets.calories, unit: "kkal", pct: 100, barColor: "bg-orange-500" },
        { name: "Protein", current: "123", target: targets.protein, unit: "g", pct: 100, barColor: "bg-blue-500" },
        { name: "Lemak", current: "155", target: targets.fat, unit: "g", pct: 100, barColor: "bg-amber-500" },
        { name: "Karbohidrat", current: "306", target: targets.carbs, unit: "g", pct: 100, barColor: "bg-emerald-500" },
    ];

    const recentHistory = initialHistory || [
        { name: "Nasi Goreng Ayam", info: "450 kkal • 12:30", score: 72, scoreColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=100" },
        { name: "Smoothie Bowl", info: "320 kkal • 08:00", score: 91, scoreColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/50", image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=100" },
        { name: "Salad Sayuran", info: "210 kkal • 13:00", score: 95, scoreColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/50", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=100" }
    ];

    const weeklyData = initialWeekly || [
        { day: "Sen", calories: 1450, target: targets.calories },
        { day: "Sel", calories: 1600, target: targets.calories },
        { day: "Rab", calories: 1520, target: targets.calories },
        { day: "Kam", calories: 1650, target: targets.calories },
        { day: "Jum", calories: 1700, target: targets.calories },
        { day: "Sab", calories: 1400, target: targets.calories },
        { day: "Min", calories: 3120, target: targets.calories },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard - siGizi" />

            <div className="space-y-6">

                {/* Greeting & Action Row */}
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-0.5">
                            DASHBOARD
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                            Selamat pagi, {user?.name ?? 'Nadin Aulia Putri'} 👏
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-medium mt-0.5">
                            Minggu, 18 Juni 2025
                        </p>
                    </div>

                    <Link
                        href="/scan"
                        prefetch={["hover", "mount"]}
                        className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-black font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all duration-200 cursor-pointer shrink-0"
                    >
                        <svg className="w-4 h-4 text-white dark:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-16v3m9 8h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Scan Makanan</span>
                    </Link>
                </div>

                {/* 4 Stat Cards Grid 2 Kolom (2x2) dengan Target Harian & Target Program */}
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between space-y-3">
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
                                {stat.icon}
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 dark:text-emerald-100/50 uppercase tracking-wider">{stat.title}</p>
                                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                                    {stat.value}
                                    {stat.unit && <span className="text-xs font-medium text-gray-400 dark:text-emerald-100/60 ml-1">{stat.unit}</span>}
                                </h3>

                                <div className="pt-2 mt-2 border-t border-gray-100 dark:border-[#1a2e22] space-y-0.5">
                                    <p className="text-[11px] sm:text-xs text-gray-600 dark:text-emerald-300 font-semibold">
                                        Target Harian: <span className="font-bold">{stat.dailyTarget}</span>
                                    </p>
                                    <p className="text-[10px] sm:text-[11px] text-gray-400 dark:text-emerald-100/60 font-medium">
                                        Target Program: <span className="font-semibold">{stat.totalTarget}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two Column Layout Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Left Column: Progress Bars (Ubah dari justify-between menjadi flex-col biasa agar ukurannya pas mengikuti isi) */}
                    <div className="lg:col-span-8 bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Nutrisi Hari Ini</h2>
                            <span className="text-[10px] font-bold text-gray-400 dark:text-emerald-100/40 tracking-wider">18 JUN 2025</span>
                        </div>

                        <div className="space-y-6">
                            {progressNutrients.map((nutri, idx) => (
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
                            <Link href={route('riwayat')} prefetch={["hover", "mount"]} className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 hover:underline">
                                Lihat semua
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentHistory.map((item, idx) => (
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
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Bar Chart: Kalori Minggu Ini */}
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Kalori Minggu Ini</h2>
                        <Link href={route('laporan.mingguan')} prefetch={["hover", "mount"]} className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 flex items-center hover:underline">
                            <span>Lihat laporan</span>
                            <span className="ml-1">→</span>
                        </Link>
                    </div>

                    {/* Chart Wrapper */}
                    <div className="flex items-end pt-12 pb-2 px-2 sm:px-4">
                        <div className="grid grid-cols-7 gap-1 sm:gap-6 items-end h-44 w-full relative border-b border-gray-100 dark:border-[#1a2e22] px-2">
                            {weeklyData.map((data, idx) => {
                                const currentHeight = Math.min((data.calories / 3500) * 100, 100);
                                const targetHeight = Math.min((data.target / 3500) * 100, 100);
                                const isActive = activeDay === data.day;

                                return (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => setActiveDay(data.day)}
                                        onMouseLeave={() => setActiveDay(null)}
                                        onClick={() => setActiveDay(isActive ? null : data.day)}
                                        className="flex flex-col items-center group relative w-full pt-4 rounded-2xl px-0.5 pb-1 cursor-pointer"
                                    >
                                        {isActive && (
                                            <div className="absolute -top-14 sm:-top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] sm:text-[11px] font-medium py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-2xl shadow-xl z-40 pointer-events-none transition-all flex flex-col space-y-0.5 min-w-[85px] sm:min-w-[95px] border border-gray-800">
                                                <span className="font-extrabold text-emerald-400 mb-0.5 border-b border-gray-800 pb-0.5 text-center">
                                                    {data.day}
                                                </span>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400">Kalori:</span>
                                                    <span className="font-bold text-white ml-1">{data.calories}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400">Target:</span>
                                                    <span className="font-bold text-white ml-1">{data.target}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex space-x-1 items-end justify-center w-full h-36">
                                            <div
                                                style={{ height: `${currentHeight}%` }}
                                                className={`w-2 sm:w-3.5 rounded-t-sm transition-all duration-200 ${isActive
                                                    ? 'bg-emerald-400 dark:bg-emerald-300 shadow-md'
                                                    : 'bg-[#22c55e]/90 dark:bg-emerald-500/80'
                                                    }`}
                                            ></div>
                                            <div
                                                style={{ height: `${targetHeight}%` }}
                                                className={`w-2 sm:w-3.5 rounded-t-sm transition-all duration-200 ${isActive
                                                    ? 'bg-gray-700 dark:bg-gray-600'
                                                    : 'bg-gray-900 dark:bg-gray-800'
                                                    }`}
                                            ></div>
                                        </div>

                                        <span className={`text-[11px] sm:text-xs font-bold mt-2 block transition-colors ${isActive ? 'text-[#1F7A54] dark:text-emerald-400' : 'text-gray-400 dark:text-emerald-100/40'}`}>
                                            {data.day}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Legenda Indikator Diagram */}
                    <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-100 dark:border-[#1a2e22]">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                            <span className="text-xs font-semibold text-gray-600 dark:text-emerald-100/70">Kalori</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-gray-900 dark:bg-gray-700"></div>
                            <span className="text-xs font-semibold text-gray-600 dark:text-emerald-100/70">Target</span>
                        </div>
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}