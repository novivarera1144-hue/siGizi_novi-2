import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function LaporanGlobal({ monthlyTrends: initialTrends, topFoods: initialFoods, globalStats }) {
    // Data untuk diagram per bulan
    const monthlyTrends = initialTrends || [
        { month: 'Jan', count: 3200 },
        { month: 'Feb', count: 4100 },
        { month: 'Mar', count: 3800 },
        { month: 'Apr', count: 4500 },
        { month: 'Mei', count: 5200 },
        { month: 'Jun', count: 4800 },
        { month: 'Jul', count: 5100 },
        { month: 'Agu', count: 4600 },
        { month: 'Sep', count: 4900 },
        { month: 'Okt', count: 5400 },
        { month: 'Nov', count: 4700 },
        { month: 'Des', count: 4821 },
    ];

    const topFoods = initialFoods || [
        { name: 'Nasi Goreng', count: '1,240' },
        { name: 'Mie Ayam', count: '930' },
        { name: 'Gado-gado', count: '742' },
        { name: 'Soto Ayam', count: '688' },
        { name: 'Ayam Geprek', count: '620' },
    ];

    return (
        <AdminLayout
            activePage="laporan-global"
            title="Laporan Global"
            subtitle="Analisis statistik scan makanan dan aktivitas pengguna."
        >
            <Head title="Laporan Global - Admin" />

            <div className="space-y-6">
                {/* 4 KARTU STATISTIK ATAS (Sesuai Gambar 1 yang dicentang) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                            <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">156</h4>
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+12% dari kemarin</span>
                        </div>
                    </div>

                    {/* Kartu 2: Pengguna Aktif */}
                    <div className="bg-white dark:bg-[#122017] p-5 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 dark:text-emerald-100/60">Pengguna Aktif</p>
                            <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">342</h4>
                            <span className="text-[11px] font-bold text-gray-400 dark:text-emerald-100/50">24 jam terakhir</span>
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
                            <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">4,821</h4>
                            <span className="text-[11px] font-bold text-gray-400 dark:text-emerald-100/50">Target: 5.000</span>
                        </div>
                    </div>

                    {/* Kartu 4: Rata-rata Skor Gizi */}
                    <div className="bg-white dark:bg-[#122017] p-5 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-[#1F7A54] dark:text-emerald-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 dark:text-emerald-100/60">Rata-rata Skor Gizi</p>
                            <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">82.4</h4>
                            <span className="text-[11px] font-bold text-gray-400 dark:text-emerald-100/50">Dari semua scan</span>
                        </div>
                    </div>
                </div>

                {/* SECTION GRAFIK PER BULAN & TOP 5 MAKANAN */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Grafik Tren Scan Per Bulan (2 Kolom) */}
                    <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm lg:col-span-2 space-y-4">
                        <div>
                            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Tren Scan Per Bulan</h3>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">
                                Akumulasi jumlah scan makanan sepanjang tahun.
                            </p>
                        </div>

                        {/* Diagram Batang Bulanan */}
                        <div className="h-64 flex items-end justify-between gap-2 pt-6 border-b border-gray-100 dark:border-emerald-950/40 pb-2">
                            {monthlyTrends.map((item, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                    <div className="text-[9px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.count}
                                    </div>
                                    <div
                                        className="w-full bg-[#1F7A54] dark:bg-emerald-500 hover:bg-[#186041] dark:hover:bg-emerald-400 rounded-t-lg transition-all"
                                        style={{ height: `${(item.count / 6000) * 100}%` }}
                                    ></div>
                                    <span className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60">{item.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top 5 Makanan Di-scan (1 Kolom) */}
                    <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4">
                        <div>
                            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Top 5 Makanan Di-scan</h3>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">
                                Menu paling sering dipindai pengguna.
                            </p>
                        </div>

                        <div className="space-y-4 pt-2">
                            {topFoods.map((food, idx) => (
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
                                    <div className="w-full bg-gray-100 dark:bg-emerald-950/40 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="bg-[#1F7A54] dark:bg-emerald-500 h-full rounded-full"
                                            style={{ width: `${100 - (idx * 12)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Kategori Makanan Terpopuler (Dari kode aslimu) */}
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-6">
                    <div>
                        <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">Kategori Makanan Terpopuler</h3>
                        <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">
                            Persentase jenis makanan yang sering di-scan oleh pengguna.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {[
                            { category: "Makanan Berat (Nasi, Lauk, dll)", pct: 45, color: "bg-emerald-500", rawVal: "3,934 scan" },
                            { category: "Camilan & Roti", pct: 30, color: "bg-orange-500", rawVal: "2,622 scan" },
                            { category: "Minuman", pct: 15, color: "bg-blue-500", rawVal: "1,311 scan" },
                            { category: "Buah & Sayuran", pct: 10, color: "bg-yellow-500", rawVal: "875 scan" },
                        ].map((c, idx) => (
                            <div key={idx} className="space-y-1.5">
                                <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-emerald-100/80">
                                    <span>{c.category}</span>
                                    <span className="text-gray-400 font-semibold">{c.rawVal} ({c.pct}%)</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-emerald-950/20 rounded-full h-2.5 overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${c.color}`} style={{ width: `${c.pct}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}