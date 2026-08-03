import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth }) {
    const user = auth.user;
    const [hoveredDay, setHoveredDay] = useState(null);

    // State untuk mengontrol visibilitas panel pop-up notifikasi
    const [showNotifications, setShowNotifications] = useState(true);

    // State untuk daftar notifikasi dan status dibaca
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Waktunya Makan Siang!",
            description: "Jangan lupa catat dan scan menu makan siangmu hari ini agar target gizi tercapai.",
            time: "Baru saja",
            unread: true,
            dotColor: "bg-emerald-500"
        },
        {
            id: 2,
            title: "Target Kalori Terpenuhi",
            description: "Hebat! Target nutrisi mingguanmu menunjukkan tren positif yang konsisten.",
            time: "Kemarin",
            unread: true,
            dotColor: "bg-emerald-500"
        },
        {
            id: 3,
            title: "Pengingat Minum Air",
            description: "Jangan biarkan tubuhmu dehidrasi. Yuk, minum satu gelas air sekarang!",
            time: "2 jam lalu",
            unread: true,
            dotColor: "bg-emerald-500"
        },
        {
            id: 4,
            title: "Mingguan Evaluasi Gizi",
            description: "Laporan mingguanmu sudah siap dilihat. Cek perkembangan kalorimu minggu ini.",
            time: "3 hari lalu",
            unread: false,
            dotColor: "bg-red-500"
        },
        {
            id: 5,
            title: "Tips Kesehatan Baru",
            description: "Pelajari cara menjaga berat badan ideal tanpa harus menyiksa diri dengan diet ekstrem.",
            time: "4 hari lalu",
            unread: false,
            dotColor: "bg-red-500"
        }
    ]);

    // Fungsi untuk menandai semua notifikasi telah dibaca
    const markAllAsRead = () => {
        setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
    };

    // Hitung jumlah notifikasi yang belum dibaca
    const unreadCount = notifications.filter(n => n.unread).length;

    // Stat cards values
    const stats = [
        {
            title: "KALORI HARI INI",
            value: "1,248",
            unit: "kkal",
            target: "Target: 2,000 kkal",
            color: "bg-orange-500 text-white",
            icon: (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.317.766-.599 1.619-.874 2.417-.293.854-.538 1.482-.773 1.968a3.993 3.993 0 01-.58-1.72 1 1 0 00-1.477-.73c-.385.247-.69.595-.919.964-.226.362-.397.77-.524 1.166-.233.729-.33 1.432-.33 1.968 0 3.207 2.5 5.8 5.684 5.8 3.184 0 5.685-2.6 5.685-5.8 0-1.04-.325-1.99-.877-2.777a1 1 0 00-1.428-.15c-.345.257-.665.558-.934.88-.27.323-.497.669-.675 1.01-.229.439-.427.917-.613 1.348-.184.428-.354.767-.525.996a1.996 1.996 0 01-.577-1.417c0-.295.037-.588.11-.874.14-.523.354-1.087.595-1.637.243-.556.518-1.127.795-1.637.279-.516.559-.92.812-1.206a3.99 3.99 0 011.666-1.16z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            title: "PROTEIN",
            value: "68g",
            target: "Target: 90g",
            color: "bg-blue-500 text-white",
            icon: (
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            )
        },
        {
            title: "LEMAK",
            value: "42g",
            target: "Target: 65g",
            color: "bg-amber-400 text-black",
            icon: (
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: "KARBOHIDRAT",
            value: "156g",
            target: "Target: 250g",
            color: "bg-emerald-500 text-white",
            icon: (
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
        { name: "Karbohidrat", current: "156", target: "250", unit: "g", pct: 62, barColor: "bg-emerald-500" },
    ];

    // Recent Scans
    const recentHistory = [
        {
            name: "Nasi Goreng Ayam",
            info: "450 kkal • 12:30",
            score: 72,
            scoreColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=100"
        },
        {
            name: "Smoothie Bowl",
            info: "320 kkal • 08:00",
            score: 91,
            scoreColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/50",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=100"
        },
        {
            name: "Salad Sayuran",
            info: "210 kkal • 13:00",
            score: 95,
            scoreColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/50",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=100"
        }
    ];

    // Weekly Calorie Bar data
    const weeklyData = [
        { day: "Sen", calories: 1850, target: 2000 },
        { day: "Sel", calories: 2100, target: 2000 },
        { day: "Rab", calories: 1720, target: 2000 },
        { day: "Kam", calories: 1950, target: 2000 },
        { day: "Jum", calories: 2250, target: 2000 },
        { day: "Sab", calories: 1248, target: 2000 },
        { day: "Min", calories: 1248, target: 2000 },
    ];

    const MAX_VAL = 2400;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard - siGizi" />

            {/* Tombol lonceng notifikasi */}
            <div className="fixed top-4 right-20 z-40 flex items-center h-10">
                <button
                    onClick={() => setShowNotifications(prev => !prev)}
                    className="relative p-2 text-gray-600 dark:text-emerald-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center focus:outline-none"
                    title="Buka/Tutup Notifikasi"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#122017]"></span>
                    )}
                </button>
            </div>

            {/* Bagian Panel Pop-up Notifikasi */}
            {showNotifications && (
                <div className="fixed top-20 right-8 z-50 w-80 bg-white dark:bg-[#122017] rounded-3xl shadow-xl border border-gray-100 dark:border-[#1a2e22] p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-3 px-1">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-extrabold text-gray-900 dark:text-white">Notifikasi</span>
                            {unreadCount > 0 && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                                    {unreadCount} Baru
                                </span>
                            )}
                        </div>
                        <button
                            onClick={markAllAsRead}
                            className="text-[10px] font-bold text-[#1F7A54] dark:text-emerald-400 hover:underline cursor-pointer"
                        >
                            Tandai semua dibaca
                        </button>
                    </div>

                    {/* Kontainer Daftar Notifikasi yang Bisa Di-scroll */}
                    <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                        {notifications.map((notif) => (
                            <div key={notif.id} className="flex items-start justify-between p-2.5 hover:bg-gray-50 dark:hover:bg-[#182b1f] rounded-2xl transition-all duration-200">
                                <div className="flex items-start space-x-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-[#1F7A54] dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{notif.title}</h4>
                                        <p className="text-[11px] text-gray-500 dark:text-emerald-100/60 mt-0.5 leading-relaxed">{notif.description}</p>
                                        <span className="text-[9px] text-gray-400 dark:text-emerald-100/40 block mt-1">{notif.time}</span>
                                    </div>
                                </div>

                                {notif.unread && (
                                    <div className={`w-2 h-2 rounded-full ${notif.dotColor} shrink-0 mt-1.5`}></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Tombol Tutup Interaktif */}
                    <div className="mt-3 pt-2 border-t border-gray-100 dark:border-[#1a2e22] text-center">
                        <button
                            onClick={() => setShowNotifications(false)}
                            className="w-full py-2 bg-gray-50 hover:bg-gray-100 dark:bg-[#182b1f] dark:hover:bg-[#1e3626] text-gray-600 dark:text-emerald-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-8">

                {/* Greeting & Action Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">
                            DASHBOARD
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                            Selamat pagi, {user?.name ?? 'Nadin Aulia Putri'} 👏
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-medium mt-1">
                            Rabu, 22 Juli 2026
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
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between space-y-4">
                            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
                                {stat.icon}
                            </div>
                            <div className="space-y-1">
                                <p className="text-[11px] font-extrabold text-gray-400 dark:text-emerald-100/50 uppercase tracking-wider">{stat.title}</p>
                                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                    {stat.value}
                                    {stat.unit && <span className="text-xs font-medium text-gray-400 dark:text-emerald-100/60 ml-1">{stat.unit}</span>}
                                </h3>
                                <p className="text-[11px] text-gray-400 dark:text-emerald-100/40 font-medium">{stat.target}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two Column Layout Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column: Progress Bars */}
                    <div className="lg:col-span-8 bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Nutrisi Hari Ini</h2>
                            <span className="text-[10px] font-bold text-gray-400 dark:text-emerald-100/40 tracking-wider">22 JUL 2026</span>
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
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Kalori Minggu Ini</h2>
                        <Link href={route('laporan.mingguan')} prefetch={["hover", "mount"]} className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 flex items-center hover:underline">
                            <span>Lihat laporan</span>
                            <span className="ml-1">→</span>
                        </Link>
                    </div>

                    <div className="flex items-end pt-2 pb-1 px-1 sm:px-2">
                        <div className="flex flex-col justify-between h-48 text-[10px] font-bold text-gray-400 dark:text-emerald-100/50 pr-3 text-right select-none shrink-0 translate-y-2">
                            <span className="leading-none">2400</span>
                            <span className="leading-none">1800</span>
                            <span className="leading-none">1200</span>
                            <span className="leading-none">600</span>
                            <span className="leading-none">0</span>
                        </div>

                        <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-48 w-full relative border-b border-gray-200 dark:border-[#1a2e22] px-2">
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                <div className="w-full border-t border-dashed border-gray-200 dark:border-[#1a2e22]/80"></div>
                                <div className="w-full border-t border-dashed border-gray-200 dark:border-[#1a2e22]/80"></div>
                                <div className="w-full border-t border-dashed border-gray-200 dark:border-[#1a2e22]/80"></div>
                                <div className="w-full border-t border-dashed border-gray-200 dark:border-[#1a2e22]/80"></div>
                                <div className="w-full"></div>
                            </div>

                            {weeklyData.map((data, idx) => {
                                const currentHeight = (data.calories / MAX_VAL) * 100;
                                const targetHeight = (data.target / MAX_VAL) * 100;
                                const isHovered = hoveredDay === data.day;

                                return (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => setHoveredDay(data.day)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                        className="flex flex-col items-center group relative w-full pt-2 rounded-2xl px-1 pb-1 cursor-pointer z-10"
                                    >
                                        {isHovered && (
                                            <div className="absolute -top-20 bg-gray-900 text-white text-[11px] font-medium py-2 px-3 rounded-2xl shadow-xl z-30 pointer-events-none transition-all flex flex-col space-y-0.5 min-w-[95px] border border-gray-800">
                                                <span className="font-extrabold text-emerald-400 mb-0.5 border-b border-gray-800 pb-0.5">
                                                    {data.day}
                                                </span>
                                                <div className="flex justify-between items-center text-[10px]">
                                                    <span className="text-gray-400">Aktual :</span>
                                                    <span className="font-bold text-white ml-2">{data.calories}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px]">
                                                    <span className="text-gray-400">Target :</span>
                                                    <span className="font-bold text-white ml-2">{data.target}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex space-x-1 items-end justify-center w-full h-48">
                                            <div
                                                style={{ height: `${currentHeight}%` }}
                                                className={`w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-200 ${isHovered
                                                    ? 'bg-emerald-400 dark:bg-emerald-300 shadow-md'
                                                    : 'bg-[#22c55e]/90 dark:bg-emerald-500/80'
                                                    }`}
                                            ></div>
                                            <div
                                                style={{ height: `${targetHeight}%` }}
                                                className={`w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-200 ${isHovered
                                                    ? 'bg-gray-700 dark:bg-gray-600'
                                                    : 'bg-gray-900 dark:bg-gray-800'
                                                    }`}
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

                    <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-100 dark:border-[#1a2e22]">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                            <span className="text-xs font-semibold text-gray-600 dark:text-emerald-100/70">Aktual</span>
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