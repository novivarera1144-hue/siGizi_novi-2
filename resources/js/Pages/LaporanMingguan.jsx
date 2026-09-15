import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

export default function LaporanMingguan({
    auth,
    barData = [],
    lineData = [],
    radarData = [],
    summaryStats = {}
}) {
    const summary = {
        avgCalories: summaryStats?.avgCalories ?? 0,
        avgProtein: summaryStats?.avgProtein ?? 0,
        targetMetDays: summaryStats?.targetMetDays ?? 0,
        avgScore: summaryStats?.avgScore ?? 0,
        totalCalories: summaryStats?.totalCalories ?? 0,
        totalScans: summaryStats?.totalScans ?? 0,
        dateRange: summaryStats?.dateRange ?? 'Minggu Ini'
    };

    const handleBarClick = (data) => {
        if (data && data.activePayload) {
            console.log("Data spesifik yang diklik:", data.activePayload[0].payload);
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Laporan Mingguan" />

            <style>{`
                .recharts-wrapper *:focus,
                .recharts-surface:focus,
                .recharts-layer:focus,
                .recharts-rectangle:focus {
                    outline: none !important;
                    border: none !important;
                    box-shadow: none !important;
                }
            `}</style>

            <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
                <div>
                    <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">
                        LAPORAN MINGGUAN
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Statistik Nutrisi Minggu Ini
                    </h1>
                    <p className="text-gray-500 dark:text-emerald-500/80 mt-1 text-sm font-medium">
                        {summary.dateRange}
                    </p>
                </div>

                {/* Grid 4 Cards Statistik Nutrisi dengan Animasi Interactive & Shimmer Tipis */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* Card 1: Rata-rata Kalori (Oranye) */}
                    <div className="relative group overflow-hidden bg-[#E4866A] border-[#D47458] dark:bg-[#7D3826] dark:border-[#9C4B36] p-4 sm:p-6 rounded-2xl border shadow-sm flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-xl hover:shadow-orange-500/20 active:scale-95 space-y-3 sm:space-y-4 cursor-pointer">
                        {/* Shimmer Effect Soft & Tipis */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                        
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#C9664B] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[11px] sm:text-xs font-extrabold text-slate-950 dark:text-slate-100 uppercase tracking-wider mb-0.5 sm:mb-1 block">Rata-rata Kalori</p>
                            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-950 dark:text-white leading-tight">{summary.avgCalories} <span className="text-[10px] sm:text-sm font-medium text-slate-800/80 dark:text-slate-200/80">kkal/hari</span></h2>
                        </div>
                    </div>

                    {/* Card 2: Avg Protein (Biru) */}
                    <div className="relative group overflow-hidden bg-[#97C3F8] border-[#81B3EE] dark:bg-[#1E4373] dark:border-[#2B5B99] p-4 sm:p-6 rounded-2xl border shadow-sm flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/20 active:scale-95 space-y-3 sm:space-y-4 cursor-pointer">
                        {/* Shimmer Effect Soft & Tipis */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#4B93EA] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[11px] sm:text-xs font-extrabold text-slate-950 dark:text-slate-100 uppercase tracking-wider mb-0.5 sm:mb-1 block">Avg Protein</p>
                            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-950 dark:text-white leading-tight">{summary.avgProtein}g <span className="text-[10px] sm:text-sm font-medium text-slate-800/80 dark:text-slate-200/80">per hari</span></h2>
                        </div>
                    </div>

                    {/* Card 3: Hari Terpenuhi (Kuning/Amber) */}
                    <div className="relative group overflow-hidden bg-[#F8DA89] border-[#E9C772] dark:bg-[#7A5B18] dark:border-[#9C7723] p-4 sm:p-6 rounded-2xl border shadow-sm flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-xl hover:shadow-amber-500/20 active:scale-95 space-y-3 sm:space-y-4 cursor-pointer">
                        {/* Shimmer Effect Soft & Tipis */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#EBAE34] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[11px] sm:text-xs font-extrabold text-slate-950 dark:text-slate-100 uppercase tracking-wider mb-0.5 sm:mb-1 block">Hari Terpenuhi</p>
                            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-950 dark:text-white leading-tight">{summary.targetMetDays}/7 <span className="text-[10px] sm:text-sm font-medium text-slate-800/80 dark:text-slate-200/80">target kalori</span></h2>
                        </div>
                    </div>

                    {/* Card 4: Skor Rata-rata (Hijau/Teal) */}
                    <div className="relative group overflow-hidden bg-[#8AD5BF] border-[#74C5AD] dark:bg-[#1E5C49] dark:border-[#2C7D64] p-4 sm:p-6 rounded-2xl border shadow-sm flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-500/20 active:scale-95 space-y-3 sm:space-y-4 cursor-pointer">
                        {/* Shimmer Effect Soft & Tipis */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#45BA99] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[11px] sm:text-xs font-extrabold text-slate-950 dark:text-slate-100 uppercase tracking-wider mb-0.5 sm:mb-1 block">Skor Rata-rata</p>
                            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-950 dark:text-white leading-tight">{summary.avgScore} <span className="text-[10px] sm:text-sm font-medium text-slate-800/80 dark:text-slate-200/80">dari 100</span></h2>
                        </div>
                    </div>
                </div>

                {/* Card Chart 1: Kalori Harian vs Target */}
                <div className="relative group overflow-hidden bg-white dark:bg-[#122017] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#1a2e22] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1F7A54]/10 dark:hover:shadow-emerald-500/10">
                    {/* Shimmer Effect Soft & Tipis */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/8 dark:via-emerald-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#1F7A54] dark:group-hover:text-emerald-400 transition-colors">Kalori Harian vs Target</h2>
                    </div>
                    <div className="w-full h-[250px] sm:h-[350px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={barData}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                onClick={handleBarClick}
                                style={{ outline: 'none', cursor: 'pointer' }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                                    contentStyle={{ borderRadius: '16px', border: '1px solid #1a2e22', backgroundColor: '#0b140e', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                                    labelStyle={{ color: '#34d399', fontWeight: 'bold', marginBottom: '4px' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Bar dataKey="Aktual" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={32} style={{ outline: 'none' }} />
                                <Bar dataKey="Target" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={32} style={{ outline: 'none' }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Card Chart 2: Tren Nutrisi Minggu Ini */}
                <div className="relative group overflow-hidden bg-white dark:bg-[#122017] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#1a2e22] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10">
                    {/* Shimmer Effect Soft & Tipis */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/8 dark:via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Tren Nutrisi Minggu Ini</h2>
                    </div>
                    <div className="w-full h-[250px] sm:h-[350px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: '1px solid #1a2e22', backgroundColor: '#0b140e', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                                    labelStyle={{ color: '#34d399', fontWeight: 'bold', marginBottom: '4px' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="Protein" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#122017' }} activeDot={{ r: 6 }} name="Protein (g)" />
                                <Line type="monotone" dataKey="Lemak" stroke="#eab308" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#122017' }} activeDot={{ r: 6 }} name="Lemak (g)" />
                                <Line type="monotone" dataKey="Karbo" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#122017' }} activeDot={{ r: 6 }} name="Karbo (g)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Keseimbangan Nutrisi & Ringkasan Minggu Ini */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Card Chart 3: Keseimbangan Nutrisi (Radar) */}
                    <div className="relative group overflow-hidden bg-white dark:bg-[#122017] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#1a2e22] flex flex-col transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1F7A54]/10 dark:hover:shadow-emerald-500/10">
                        {/* Shimmer Effect Soft & Tipis */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/8 dark:via-emerald-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 relative z-10 group-hover:text-[#1F7A54] dark:group-hover:text-emerald-400 transition-colors">Keseimbangan Nutrisi</h2>
                        <div className="w-full h-[280px] sm:h-[320px] flex items-center justify-center relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="currentColor" className="text-gray-200 dark:text-white/30" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 500 }}
                                        className="text-gray-700 dark:text-white"
                                    />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="Skor Nutrisi" dataKey="A" stroke="#22c55e" strokeWidth={2} fill="#22c55e" fillOpacity={0.25} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: '1px solid #1a2e22', backgroundColor: '#0b140e', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                                        itemStyle={{ color: '#fff', fontSize: '12px' }}
                                        labelStyle={{ color: '#34d399', fontWeight: 'bold', marginBottom: '4px' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Card 4: Ringkasan Minggu Ini */}
                    <div className="relative group overflow-hidden bg-[#F0FDF4] border border-[#DCFCE7] dark:bg-[#1b3827] dark:border-[#2d5a3e] p-6 md:p-8 rounded-3xl shadow-sm flex flex-col transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/15">
                        {/* Shimmer Effect Soft & Tipis */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/10 dark:via-emerald-400/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 relative z-10 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Ringkasan Minggu Ini</h2>
                        <div className="flex-1 flex flex-col justify-center space-y-4 relative z-10">
                            <div className="flex justify-between items-center pb-3 pt-1 px-3 rounded-xl transition-all duration-200 hover:bg-emerald-100/60 dark:hover:bg-[#224832] border-b border-emerald-100 dark:border-[#2d5a3e]">
                                <span className="text-sm font-medium text-gray-600 dark:text-emerald-100/80">Total kalori dikonsumsi</span>
                                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    {summary.totalCalories.toLocaleString()} kkal
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-3 pt-1 px-3 rounded-xl transition-all duration-200 hover:bg-emerald-100/60 dark:hover:bg-[#224832] border-b border-emerald-100 dark:border-[#2d5a3e]">
                                <span className="text-sm font-medium text-gray-600 dark:text-emerald-100/80">Hari mencapai target</span>
                                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    {summary.targetMetDays} dari 7 hari
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-3 pt-1 px-3 rounded-xl transition-all duration-200 hover:bg-emerald-100/60 dark:hover:bg-[#224832] border-b border-emerald-100 dark:border-[#2d5a3e]">
                                <span className="text-sm font-medium text-gray-600 dark:text-emerald-100/80">Hari tidak capai/melebihi target</span>
                                <span className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {7 - summary.targetMetDays} hari
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-3 pt-1 px-3 rounded-xl transition-all duration-200 hover:bg-emerald-100/60 dark:hover:bg-[#224832] border-b border-emerald-100 dark:border-[#2d5a3e]">
                                <span className="text-sm font-medium text-gray-600 dark:text-emerald-100/80">Makanan di-scan</span>
                                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    {summary.totalScans} makanan
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-1 pt-1 px-3 rounded-xl transition-all duration-200 hover:bg-emerald-100/60 dark:hover:bg-[#224832]">
                                <span className="text-sm font-medium text-gray-600 dark:text-emerald-100/80">Rata-rata skor makanan</span>
                                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    {summary.avgScore} / 100
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}