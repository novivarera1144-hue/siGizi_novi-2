import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

const lgAnimStyles = `
    @keyframes lgFadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes lgBarGrow {
        from { transform: scaleY(0); transform-origin: bottom; }
        to   { transform: scaleY(1); transform-origin: bottom; }
    }
    @keyframes lgProgressFill {
        from { width: 0%; }
    }
    @keyframes lgIconPulse {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(1.15); }
    }
`;

export default function LaporanGlobal({ monthlyTrends = [], topFoods = [], foodCategories = [], globalStats = {} }) {
    return (
        <AdminLayout
            activePage="laporan-global"
            title="Laporan Global"
            subtitle="Analisis statistik scan makanan dan aktivitas pengguna secara realtime."
        >
            <Head title="Laporan Global - Admin" />
            <style>{lgAnimStyles}</style>

            <div className="space-y-6">
                {/* 3 KARTU STATISTIK ATAS — colorful like dashboard */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    {/* Kartu 1: Scan Hari Ini — Emerald Green */}
                    <div
                        className="group relative bg-[#8AD5BF] border border-[#74C5AD] dark:bg-[#1E5C49] dark:border-[#2C7D64] p-5 rounded-3xl shadow-sm overflow-hidden flex flex-col space-y-3 transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl cursor-default"
                        style={{ animation: 'lgFadeInUp 0.5s ease-out 0.05s both' }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none z-0" />
                        <div className="flex items-center space-x-3 relative z-10">
                            <div
                                className="w-11 h-11 rounded-full bg-[#45BA99] shadow-sm flex items-center justify-center shrink-0 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                                style={{ animation: 'lgIconPulse 3s ease-in-out 0s infinite' }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[10px] font-extrabold text-slate-950 dark:text-slate-100 uppercase tracking-wider block">SCAN HARI INI</span>
                                <div className="text-2xl font-extrabold text-slate-950 dark:text-white mt-0.5" style={{ animation: 'lgFadeInUp 0.6s ease-out 0.15s both' }}>
                                    {globalStats.scanHariIni ?? 0}
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-black/10 dark:border-white/15 relative z-10">
                            <span className="text-[10px] font-semibold text-slate-800/80 dark:text-slate-200/80">Total scan hari ini</span>
                        </div>
                    </div>

                    {/* Kartu 2: Total Pengguna — Blue */}
                    <div
                        className="group relative bg-[#97C3F8] border border-[#81B3EE] dark:bg-[#1E4373] dark:border-[#2B5B99] p-5 rounded-3xl shadow-sm overflow-hidden flex flex-col space-y-3 transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl cursor-default"
                        style={{ animation: 'lgFadeInUp 0.5s ease-out 0.15s both' }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none z-0" />
                        <div className="flex items-center space-x-3 relative z-10">
                            <div
                                className="w-11 h-11 rounded-full bg-[#4B93EA] shadow-sm flex items-center justify-center shrink-0 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                                style={{ animation: 'lgIconPulse 3s ease-in-out 0.4s infinite' }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[10px] font-extrabold text-slate-950 dark:text-slate-100 uppercase tracking-wider block">TOTAL PENGGUNA</span>
                                <div className="text-2xl font-extrabold text-slate-950 dark:text-white mt-0.5" style={{ animation: 'lgFadeInUp 0.6s ease-out 0.25s both' }}>
                                    {globalStats.totalUsers ?? 0}
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-black/10 dark:border-white/15 relative z-10">
                            <span className="text-[10px] font-semibold text-slate-800/80 dark:text-slate-200/80">
                                {globalStats.totalUsers > 0 ? 'Terdaftar di database' : 'Belum ada pengguna'}
                            </span>
                        </div>
                    </div>

                    {/* Kartu 3: Scan Bulan Ini — Amber */}
                    <div
                        className="group relative bg-[#F8DA89] border border-[#E9C772] dark:bg-[#7A5B18] dark:border-[#9C7723] p-5 rounded-3xl shadow-sm overflow-hidden flex flex-col space-y-3 transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl cursor-default"
                        style={{ animation: 'lgFadeInUp 0.5s ease-out 0.25s both' }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none z-0" />
                        <div className="flex items-center space-x-3 relative z-10">
                            <div
                                className="w-11 h-11 rounded-full bg-[#EBAE34] shadow-sm flex items-center justify-center shrink-0 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                                style={{ animation: 'lgIconPulse 3s ease-in-out 0.8s infinite' }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[10px] font-extrabold text-slate-950 dark:text-slate-100 uppercase tracking-wider block">SCAN BULAN INI</span>
                                <div className="text-2xl font-extrabold text-slate-950 dark:text-white mt-0.5" style={{ animation: 'lgFadeInUp 0.6s ease-out 0.35s both' }}>
                                    {globalStats.scanBulanIni ?? 0}
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-black/10 dark:border-white/15 relative z-10">
                            <span className="text-[10px] font-semibold text-slate-800/80 dark:text-slate-200/80">
                                {globalStats.scanBulanIni > 0 ? `Khusus bulan ${globalStats.namaBulan ?? 'ini'}` : 'Belum ada scan bulan ini'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* SECTION GRAFIK PER BULAN & TOP 5 MAKANAN */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Grafik Tren Scan Per Bulan */}
                    <div
                        className="group relative bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm lg:col-span-2 space-y-4 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/8"
                        style={{ animation: 'lgFadeInUp 0.5s ease-out 0.35s both' }}
                    >
                        <div>
                            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Tren Scan Per Bulan</h3>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">
                                Akumulasi jumlah scan makanan sepanjang tahun berdasarkan data asli.
                            </p>
                        </div>

                        <div className="h-72 flex items-end justify-between gap-3 pt-6 border-b border-gray-100 dark:border-emerald-950/40 pb-2">
                            {(() => {
                                const maxCount = Math.max(...monthlyTrends.map(item => item.count), 1);
                                return monthlyTrends.map((item, idx) => {
                                    const heightPercent = item.count > 0 ? Math.max((item.count / maxCount) * 100, 10) : 0;

                                    return (
                                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                            {item.count > 0 && (
                                                <div className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {item.count}
                                                </div>
                                            )}
                                            <div
                                                className={`w-full rounded-t-lg transition-all duration-300 ${item.count > 0
                                                    ? 'bg-[#1F7A54] dark:bg-emerald-500 hover:bg-[#186041] dark:hover:bg-emerald-400'
                                                    : 'bg-transparent'
                                                    }`}
                                                style={{
                                                    height: item.count > 0 ? `${heightPercent}%` : '0px',
                                                    animation: item.count > 0 ? `lgBarGrow 0.6s ease-out ${0.05 * idx + 0.5}s both` : undefined
                                                }}
                                            ></div>
                                            <span className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60">{item.month}</span>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>

                    {/* Top 5 Makanan Di-scan */}
                    <div
                        className="group relative bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/8"
                        style={{ animation: 'lgFadeInUp 0.5s ease-out 0.45s both' }}
                    >
                        <div>
                            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Top 5 Makanan Di-scan</h3>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">
                                Menu paling sering dipindai pengguna.
                            </p>
                        </div>

                        <div className="space-y-4 pt-2">
                            {topFoods.length > 0 ? (
                                topFoods.map((food, idx) => (
                                    <div
                                        key={idx}
                                        className="space-y-1 transition-all duration-200 hover:translate-x-1"
                                        style={{ animation: `lgFadeInUp 0.4s ease-out ${0.1 * idx + 0.6}s both` }}
                                    >
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-gray-800 dark:text-white flex items-center gap-2">
                                                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[10px] flex items-center justify-center text-[#1F7A54] dark:text-emerald-400 font-extrabold">
                                                    {idx + 1}
                                                </span>
                                                {food.name}
                                            </span>
                                            <span className="text-[#1F7A54] dark:text-emerald-400 font-extrabold">{food.count}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-emerald-950/30 h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-[#1F7A54] to-emerald-400 h-full rounded-full"
                                                style={{
                                                    width: `${topFoods[0]?.count > 0 ? Math.round((food.count / topFoods[0].count) * 100) : 0}%`,
                                                    animation: `lgProgressFill 0.8s ease-out ${0.1 * idx + 0.7}s both`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 text-center py-6">Belum ada data scan makanan.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* SECTION KATEGORI MAKANAN (Persentase Realtime) */}
                <div
                    className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/8"
                    style={{ animation: 'lgFadeInUp 0.5s ease-out 0.6s both' }}
                >
                    <div>
                        <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Kategori Makanan</h3>
                        <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">
                            Persentase jenis makanan yang sering dipindai berdasarkan database.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                        {foodCategories.map((cat, idx) => (
                            <div
                                key={idx}
                                className="group/cat p-4 rounded-2xl bg-gray-50 dark:bg-emerald-950/30 border border-gray-100 dark:border-emerald-900/20 space-y-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800/50"
                                style={{ animation: `lgFadeInUp 0.4s ease-out ${0.1 * idx + 0.65}s both` }}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-700 dark:text-emerald-200">{cat.name}</span>
                                    <span className="text-xs font-extrabold text-[#1F7A54] dark:text-emerald-400 tabular-nums">{cat.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-emerald-950 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-[#1F7A54] to-emerald-400 dark:from-emerald-500 dark:to-emerald-300 h-full rounded-full"
                                        style={{
                                            width: `${cat.percentage}%`,
                                            animation: `lgProgressFill 1s ease-out ${0.1 * idx + 0.8}s both`
                                        }}
                                    ></div>
                                </div>
                                <p className="text-[10px] text-gray-400 dark:text-emerald-100/50">{cat.count} total scan</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}