import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats, progressNutrients, recentHistory }) {
    const user = auth?.user;

    // Fungsi untuk menentukan salam berdasarkan jam saat ini
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 3 && hour < 11) return 'Selamat pagi';
        if (hour >= 11 && hour < 15) return 'Selamat siang';
        if (hour >= 15 && hour < 18) return 'Selamat sore';
        return 'Selamat malam';
    };

    // Helper Icon SVG, Background Color & Progress Bar Color sesuai Nutrisi
    const getNutriTheme = (title) => {
        const t = (title || '').toLowerCase();

        if (t.includes('kalori') || t.includes('calor')) {
            return {
                label: 'KALORI HARI INI',
                cardBg: 'bg-[#E4866A] border-[#D47458] dark:bg-[#7D3826] dark:border-[#9C4B36]',
                labelColor: 'text-slate-950 dark:text-slate-100 font-extrabold',
                dividerBorder: 'border-black/10 dark:border-white/15',
                bg: 'bg-[#C9664B] shadow-sm',
                barColor: 'bg-[#C9664B] dark:bg-[#E4866A]', // Warna khusus Kalori
                icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9.879z" />
                    </svg>
                )
            };
        }

        if (t.includes('protein')) {
            return {
                label: 'PROTEIN HARI INI',
                cardBg: 'bg-[#97C3F8] border-[#81B3EE] dark:bg-[#1E4373] dark:border-[#2B5B99]',
                labelColor: 'text-slate-950 dark:text-slate-100 font-extrabold',
                dividerBorder: 'border-black/10 dark:border-white/15',
                bg: 'bg-[#4B93EA] shadow-sm',
                barColor: 'bg-[#4B93EA] dark:bg-[#97C3F8]', // Warna khusus Protein
                icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                )
            };
        }

        if (t.includes('lemak') || t.includes('fat')) {
            return {
                label: 'LEMAK HARI INI',
                cardBg: 'bg-[#F8DA89] border-[#E9C772] dark:bg-[#7A5B18] dark:border-[#9C7723]',
                labelColor: 'text-slate-950 dark:text-slate-100 font-extrabold',
                dividerBorder: 'border-black/10 dark:border-white/15',
                bg: 'bg-[#EBAE34] shadow-sm',
                barColor: 'bg-[#EBAE34] dark:bg-[#F8DA89]', // Warna khusus Lemak
                icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                    </svg>
                )
            };
        }

        if (t.includes('karbo') || t.includes('carb')) {
            return {
                label: 'KARBOHIDRAT HARI INI',
                cardBg: 'bg-[#8AD5BF] border-[#74C5AD] dark:bg-[#1E5C49] dark:border-[#2C7D64]',
                labelColor: 'text-slate-950 dark:text-slate-100 font-extrabold',
                dividerBorder: 'border-black/10 dark:border-white/15',
                bg: 'bg-[#45BA99] shadow-sm',
                barColor: 'bg-[#45BA99] dark:bg-[#8AD5BF]', // Warna khusus Karbohidrat
                icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3m15.364-6.364l-12.728 12.728m0-12.728l12.728 12.728" />
                    </svg>
                )
            };
        }

        return {
            label: `${(title || 'NUTRISI').toUpperCase()} HARI INI`,
            cardBg: 'bg-white border-gray-100 dark:bg-[#122017] dark:border-[#1a2e22]',
            labelColor: 'text-gray-900 dark:text-white font-extrabold',
            dividerBorder: 'border-gray-100 dark:border-[#1a2e22]/80',
            bg: 'bg-[#1F7A54]',
            barColor: 'bg-emerald-500',
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
                            {getGreeting()}, {user?.name ?? 'User'} 👋👋
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-medium mt-1">
                            {todayFormatted}
                        </p>
                    </div>

                    <Link
                        href="/scan"
                        prefetch={["hover", "mount"]}
                        className="inline-flex items-center space-x-2 px-5 py-3 bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-black font-bold text-sm rounded-2xl shadow-lg transform hover:-translate-y-1 hover:scale-105 hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer"
                    >
                        <svg className="w-4 h-4 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
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

                        return (
                            <div
                                key={idx}
                                className={`${theme.cardBg} p-6 rounded-3xl border shadow-sm flex flex-col justify-between space-y-4 transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 ease-out cursor-default`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className={`w-11 h-11 rounded-full ${theme.bg} flex items-center justify-center shrink-0 transform transition-transform duration-300 hover:rotate-12`}>
                                        {theme.icon}
                                    </div>
                                    <div>
                                        <span className={`text-[10px] ${theme.labelColor} uppercase tracking-wider block`}>
                                            {theme.label}
                                        </span>
                                        <div className="text-2xl font-extrabold text-slate-950 dark:text-white mt-0.5">
                                            {currentValueDisplay}
                                        </div>
                                    </div>
                                </div>

                                <div className={`space-y-2 pt-3 border-t ${theme.dividerBorder}`}>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-800/80 dark:text-slate-200/80 font-semibold">Target per hari:</span>
                                        <span className="font-extrabold text-slate-950 dark:text-white">
                                            {stat.dailyTarget || stat.target || '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-800/80 dark:text-slate-200/80 font-semibold">Total sementara:</span>
                                        <span className="font-extrabold text-slate-950 dark:text-white">
                                            {stat.total_sementara || '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-800/80 dark:text-slate-200/80 font-semibold">Total target:</span>
                                        <span className="font-extrabold text-slate-950 dark:text-white">
                                            {stat.totalTarget || '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress Nutrisi & Riwayat */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Progress Bars with Distinct Colors */}
                    <div className="lg:col-span-8 bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Nutrisi Hari Ini</h2>
                            <span className="text-[10px] font-bold text-gray-400 dark:text-emerald-100/40 tracking-wider">
                                {todayShortFormatted}
                            </span>
                        </div>

                        <div className="space-y-6">
                            {defaultProgress.map((nutri, idx) => {
                                // Memanggil helper tema agar warna progress bar otomatis menyesuaikan dengan Kalori, Protein, Lemak, atau Karbohidrat
                                const nutriTheme = getNutriTheme(nutri.name);

                                return (
                                    <div key={idx} className="space-y-2 group">
                                        <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-emerald-100/80 transition-colors group-hover:text-[#1F7A54] dark:group-hover:text-emerald-400">
                                            <span>{nutri.name}</span>
                                            <span>
                                                {nutri.current}/{nutri.target}{nutri.unit} ({nutri.pct}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-[#0b140e] rounded-full h-3.5 overflow-hidden p-0.5 border border-gray-200/50 dark:border-[#1a2e22]">
                                            <div
                                                className={`${nutriTheme.barColor} h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110 shadow-sm`}
                                                style={{ width: `${Math.min(nutri.pct || 0, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Riwayat Scan */}
                    <div className="lg:col-span-4 bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Riwayat Terbaru</h2>
                            <Link href="/riwayat" prefetch={["hover", "mount"]} className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 hover:underline">
                                Lihat semua
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {defaultHistory.length > 0 ? (
                                defaultHistory.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-[#182b1f]/40 hover:bg-emerald-50/80 dark:hover:bg-[#182b1f] rounded-2xl border border-transparent hover:border-emerald-500/30 transform hover:translate-x-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-2xl object-cover border border-gray-200 dark:border-[#1a2e22] shadow-sm transform transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#1F7A54] dark:group-hover:text-emerald-300">{item.name}</h4>
                                                <p className="text-[10px] text-gray-400 dark:text-emerald-100/50 font-medium mt-0.5">{item.info}</p>
                                            </div>
                                        </div>

                                        <div className={`w-9 h-9 rounded-full ${item.scoreColor} flex items-center justify-center font-extrabold text-xs shadow-md shrink-0 transform transition-transform duration-300 hover:scale-110 hover:rotate-6`}>
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
            </div>
        </AuthenticatedLayout>
    );
}