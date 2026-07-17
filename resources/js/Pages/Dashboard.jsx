import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth }) {
    const user = auth.user;
    const [selectedDay, setSelectedDay] = useState('Kam');

    // Stat cards values (based on design mock)
    const stats = [
        {
            title: "Kalori Hari Ini",
            value: "1,248",
            unit: "kkal",
            target: "Target: 2,000 kkal",
            color: "text-orange-500 bg-orange-50 dark:bg-orange-950/20",
            icon: (
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.317.766-.599 1.619-.874 2.417-.293.854-.538 1.482-.773 1.968a3.993 3.993 0 01-.58-1.72 1 1 0 00-1.477-.73c-.385.247-.69.595-.919.964-.226.362-.397.77-.524 1.166-.233.729-.33 1.432-.33 1.968 0 3.207 2.5 5.8 5.684 5.8 3.184 0 5.685-2.6 5.685-5.8 0-1.04-.325-1.99-.877-2.777a1 1 0 00-1.428-.15c-.345.257-.665.558-.934.88-.27.323-.497.669-.675 1.01-.229.439-.427.917-.613 1.348-.184.428-.354.767-.525.996a1.996 1.996 0 01-.577-1.417c0-.295.037-.588.11-.874.14-.523.354-1.087.595-1.637.243-.556.518-1.127.795-1.637.279-.516.559-.92.812-1.206a3.99 3.99 0 011.666-1.16z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            title: "Protein",
            value: "68g",
            target: "Target: 90g",
            color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20",
            icon: (
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            )
        },
        {
            title: "Lemak",
            value: "42g",
            target: "Target: 65g",
            color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20",
            icon: (
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: "Karbohidrat",
            value: "156g",
            target: "Target: 250g",
            color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
            icon: (
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
            )
        }
    ];

    // Progress bar nutrients
    const progressNutrients = [
        { name: "Kalori", current: "1248", target: "2000", unit: "kkal", pct: 62, barColor: "bg-orange-500" },
        { name: "Protein", current: "68", target: "90", unit: "g", pct: 76, barColor: "bg-blue-500" },
        { name: "Lemak", current: "42", target: "65", unit: "g", pct: 65, barColor: "bg-amber-500" },
        { name: "Karbohidrat", current: "156", target: "250", unit: "g", pct: 62, barColor: "bg-[#1F7A54]" },
    ];

    // Recent Scans
    const recentHistory = [
        {
            name: "Nasi Goreng Ayam",
            info: "450 kkal • 12:30",
            score: 72,
            scoreColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=100"
        },
        {
            name: "Smoothie Bowl",
            info: "320 kkal • 08:00",
            score: 91,
            scoreColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=100"
        },
        {
            name: "Salad Sayuran",
            info: "210 kkal • 13:00",
            score: 95,
            scoreColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=100"
        }
    ];

    // Weekly Calorie Bar data array (easy to replace with real DB info)
    const weeklyData = [
        { day: "Sen", calories: 1600, target: 2000 },
        { day: "Sel", calories: 1900, target: 2000 },
        { day: "Rab", calories: 1500, target: 2000 },
        { day: "Kam", calories: 1960, target: 2000 },
        { day: "Jum", calories: 2100, target: 2000 },
        { day: "Sab", calories: 1400, target: 2000 },
        { day: "Min", calories: 1200, target: 2000 },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard - siGizi" />

            <div className="space-y-8">

                {/* Greeting & Action Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">Dashboard</span>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
                            Selamat pagi, {user.name} 👏
                        </h1>
                        <p className="text-xs text-gray-400 dark:text-zinc-500 font-semibold mt-1">Minggu, 18 Juni 2025</p>
                    </div>

                    <button className="inline-flex items-center space-x-2 px-5 py-3 bg-[#1F7A54] hover:bg-[#186041] text-white font-bold text-sm rounded-xl shadow-md shadow-[#1F7A54]/10 transition-all duration-200 cursor-pointer">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-16v3m9 8h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Scan Makanan</span>
                    </button>
                </div>

                {/* 4 Stat Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800/80 shadow-sm flex items-start space-x-4 transition-all duration-200 hover:shadow-md">
                            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">{stat.title}</p>
                                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                    {stat.value}
                                    {stat.unit && <span className="text-xs font-bold text-gray-500 ml-1">{stat.unit}</span>}
                                </h3>
                                <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-semibold">{stat.target}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two Column Layout Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column: Progress Bars */}
                    <div className="lg:col-span-8 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Nutrisi Hari Ini</h2>
                            <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-wider">18 JUN 2025</span>
                        </div>

                        <div className="space-y-6">
                            {progressNutrients.map((nutri, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-zinc-300">
                                        <span>{nutri.name}</span>
                                        <span>
                                            {nutri.current}/{nutri.target}{nutri.unit} ({nutri.pct}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-zinc-950 rounded-full h-3 overflow-hidden">
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
                    <div className="lg:col-span-4 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800/80 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Riwayat Terbaru</h2>
                            <Link href="#" className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 hover:underline">
                                Lihat semua
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentHistory.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-zinc-800/40 rounded-xl transition-all duration-200">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-zinc-800/80 shadow-sm"
                                        />
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                            <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-semibold mt-0.5">{item.info}</p>
                                        </div>
                                    </div>

                                    <div className={`w-8 h-8 rounded-full ${item.scoreColor} flex items-center justify-center font-bold text-xs shadow-sm`}>
                                        {item.score}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Bar Chart: Kalori Minggu Ini */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800/80 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Kalori Minggu Ini</h2>
                        <Link href="#" className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 flex items-center hover:underline">
                            <span>Lihat laporan</span>
                            <span className="ml-1">→</span>
                        </Link>
                    </div>

                    {/* Styled Div Bar Chart Container */}
                    <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-64 pt-6 px-2 sm:px-6 relative">
                        {weeklyData.map((data, idx) => {
                            const isSelected = selectedDay === data.day;
                            const currentHeight = (data.calories / 2500) * 100;
                            const targetHeight = (data.target / 2500) * 100;

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedDay(data.day)}
                                    className={`flex flex-col items-center group relative w-full pt-6 cursor-pointer transition-all duration-200 ${isSelected
                                        ? 'bg-[#F4F9F6] dark:bg-zinc-800/35 rounded-2xl px-2 pb-2 scale-[1.03] shadow-sm border border-emerald-50 dark:border-zinc-800/50'
                                        : 'hover:bg-gray-50/50 dark:hover:bg-zinc-800/10 rounded-2xl px-2 pb-2'
                                        }`}
                                >
                                    {/* Tooltip box for selected state */}
                                    {isSelected && (
                                        <div className="absolute bottom-[200px] z-30 bg-white dark:bg-zinc-950 p-3 rounded-xl border border-gray-200/60 dark:border-zinc-800 shadow-xl text-center min-w-[110px] transition-all duration-200">
                                            <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase">{data.day}</p>
                                            <p className="text-xs text-gray-800 dark:text-zinc-200 font-bold mt-1">
                                                kalori : <span className="text-[#1F7A54] dark:text-emerald-400">{data.calories}</span>
                                            </p>
                                            <p className="text-[9px] text-gray-400 dark:text-zinc-500 font-semibold">target : {data.target}</p>
                                        </div>
                                    )}

                                    {/* Graph Columns adjacent */}
                                    <div className="flex space-x-1.5 items-end justify-center w-full h-40">
                                        {/* Left Green Bar: consumed */}
                                        <div
                                            style={{ height: `${currentHeight}%` }}
                                            className={`w-3 sm:w-4 rounded-t-sm transition-all duration-300 ${isSelected
                                                ? 'bg-[#1F7A54] shadow-md shadow-[#1F7A54]/20 scale-x-110'
                                                : 'bg-emerald-600/60 group-hover:bg-emerald-600/80'
                                                }`}
                                        ></div>
                                        {/* Right Light Green/Gray Bar: target */}
                                        <div
                                            style={{ height: `${targetHeight}%` }}
                                            className={`w-3 sm:w-4 rounded-t-sm transition-all duration-300 ${isSelected
                                                ? 'bg-[#EFF7F4] dark:bg-zinc-800'
                                                : 'bg-gray-100 dark:bg-zinc-800/60'
                                                }`}
                                        ></div>
                                    </div>

                                    <span className={`text-xs font-bold mt-3 block transition-colors duration-200 ${isSelected
                                        ? 'text-[#1F7A54] dark:text-emerald-400'
                                        : 'text-gray-400 dark:text-zinc-500'
                                        }`}>
                                        {data.day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}

