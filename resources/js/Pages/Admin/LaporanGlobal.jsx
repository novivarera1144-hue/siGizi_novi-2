import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function LaporanGlobal({ monthlyTrends = [], topFoods = [], foodCategories = [], globalStats = {} }) {
    return (
        <AdminLayout
            activePage="laporan-global"
            title="Laporan Global"
            subtitle="Analisis statistik scan makanan dan aktivitas pengguna secara realtime."
        >
            <Head title="Laporan Global - Admin" />

            <div className="space-y-6">
                {/* 3 KARTU STATISTIK ATAS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Kartu 1: Scan Hari Ini */}
                    <div className="bg-white dark:bg-[#122017] p-5 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-[#1F7A54] dark:text-emerald-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 dark:text-emerald-100/60">Scan Hari Ini</p>
                            <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">{globalStats.scanHariIni ?? 0}</h4>
                            <span className="text-[11px] font-bold text-gray-400 dark:text-emerald-100/50">Total scan hari ini</span>
                        </div>
                    </div>

                    {/* Kartu 2: Total Pengguna */}
                    <div className="bg-white dark:bg-[#122017] p-5 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 dark:text-emerald-100/60">Total Pengguna</p>
                            <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">{globalStats.totalUsers ?? 0}</h4>
                            {globalStats.totalUsers > 0 ? (
                                <span className="text-[11px] font-bold text-gray-400 dark:text-emerald-100/50">Terdaftar di database</span>
                            ) : null}
                        </div>
                    </div>

                    {/* Kartu 3: Scan Bulan Ini */}
                    <div className="bg-white dark:bg-[#122017] p-5 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 dark:text-emerald-100/60">Scan Bulan Ini</p>
                            <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">{globalStats.scanBulanIni ?? 0}</h4>
                            {globalStats.scanBulanIni > 0 ? (
                                <span className="text-[11px] font-bold text-gray-400 dark:text-emerald-100/50">
                                    Khusus bulan {globalStats.namaBulan ?? 'ini'}
                                </span>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* SECTION GRAFIK PER BULAN & TOP 5 MAKANAN */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Grafik Tren Scan Per Bulan */}
                    <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm lg:col-span-2 space-y-4">
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
                                                className={`w-full rounded-t-lg transition-all ${item.count > 0
                                                    ? 'bg-[#1F7A54] dark:bg-emerald-500 hover:bg-[#186041] dark:hover:bg-emerald-400'
                                                    : 'bg-transparent'
                                                    }`}
                                                style={{ height: item.count > 0 ? `${heightPercent}%` : '0px' }}
                                            ></div>
                                            <span className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60">{item.month}</span>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>

                    {/* Top 5 Makanan Di-scan */}
                    <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4">
                        <div>
                            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Top 5 Makanan Di-scan</h3>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">
                                Menu paling sering dipindai pengguna.
                            </p>
                        </div>

                        <div className="space-y-4 pt-2">
                            {topFoods.length > 0 ? (
                                topFoods.map((food, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-gray-800 dark:text-white flex items-center gap-2">
                                                <span className="w-4 h-4 rounded-full bg-gray-100 dark:bg-emerald-950/60 text-[10px] flex items-center justify-center text-gray-500 dark:text-emerald-400">
                                                    {idx + 1}
                                                </span>
                                                {food.name}
                                            </span>
                                            <span className="text-gray-500 dark:text-emerald-100/60">{food.count}</span>
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
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4">
                    <div>
                        <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Kategori Makanan</h3>
                        <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">
                            Persentase jenis makanan yang sering dipindai berdasarkan database.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                        {foodCategories.map((cat, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-gray-50 dark:bg-emerald-950/30 border border-gray-100 dark:border-emerald-900/20 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-700 dark:text-emerald-200">{cat.name}</span>
                                    <span className="text-xs font-extrabold text-[#1F7A54] dark:text-emerald-400">{cat.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-emerald-950 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-[#1F7A54] dark:bg-emerald-500 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${cat.percentage}%` }}
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