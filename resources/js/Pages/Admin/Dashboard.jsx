import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard({ stats, weeklyScanData, recentActivities }) {
    // Fallback data kosong jika controller belum selesai memuat
    const currentStats = stats || {
        totalUsers: 0,
        totalScans: 0,
        activeUsers: 0,
        aiAccuracy: '94.2%'
    };

    const currentWeekly = weeklyScanData || [
        { day: "Sen", scans: 0, heightPct: 0 },
        { day: "Sel", scans: 0, heightPct: 0 },
        { day: "Rab", scans: 0, heightPct: 0 },
        { day: "Kam", scans: 0, heightPct: 0 },
        { day: "Jum", scans: 0, heightPct: 0 },
        { day: "Sab", scans: 0, heightPct: 0 },
        { day: "Min", scans: 0, heightPct: 0 },
    ];

    const activities = recentActivities || [];

    // AUTO REFRESH DENGAN INERTIA (REALTIME POLLING 10 DETIK)
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['stats', 'weeklyScanData', 'recentActivities'],
                preserveScroll: true
            });
        }, 10000); // Refresh tiap 10 detik

        return () => clearInterval(interval);
    }, []);

    return (
        <AdminLayout
            activePage="dashboard"
            title="Dashboard Administrator"
            subtitle="Kelola seluruh data dan konten siGizi"
        >
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* 4 Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Pengguna Card */}
                    <div className="bg-white dark:bg-[#0b1f16] p-6 rounded-3xl border border-gray-100 dark:border-emerald-800/20 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-normal">Total Pengguna</p>
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                                {typeof currentStats.totalUsers === 'number' ? currentStats.totalUsers.toLocaleString() : currentStats.totalUsers}
                            </h3>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40">Terdaftar di Supabase</p>
                        </div>
                    </div>

                    {/* Total Scan Card */}
                    <div className="bg-white dark:bg-[#0b1f16] p-6 rounded-3xl border border-gray-100 dark:border-emerald-800/20 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-16v3m9 8h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-normal">Total Scan</p>
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                                {typeof currentStats.totalScans === 'number' ? currentStats.totalScans.toLocaleString() : currentStats.totalScans}
                            </h3>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40">Tersimpan di Supabase</p>
                        </div>
                    </div>

                    {/* Pengguna Aktif Card */}
                    <div className="bg-white dark:bg-[#0b1f16] p-6 rounded-3xl border border-gray-100 dark:border-emerald-800/20 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-normal">Pengguna Aktif</p>
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{currentStats.activeUsers}</h3>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40">Minggu ini</p>
                        </div>
                    </div>

                    {/* Akurasi AI Card */}
                    <div className="bg-white dark:bg-[#0b1f16] p-6 rounded-3xl border border-gray-100 dark:border-emerald-800/20 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-normal">Akurasi AI</p>
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{currentStats.aiAccuracy}</h3>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40">Rata-rata 7 hari</p>
                        </div>
                    </div>
                </div>

                {/* Bar Chart Section: Scan per Hari (Clean Tanpa Angka Sumbu Y) */}
                <div className="bg-white dark:bg-[#122017] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-[#1a2e22]">
                    <h2 className="text-base font-extrabold text-gray-900 dark:text-white mb-6">Scan per Hari (7 Hari Terakhir)</h2>

                    <div className="relative pt-6 pb-2 px-2 sm:px-6">
                        <div className="relative z-10 grid grid-cols-7 gap-2 sm:gap-6 items-end h-56 pt-2">
                            {currentWeekly.map((data, idx) => (
                                <div key={idx} className="flex flex-col items-center group relative w-full h-full justify-end cursor-pointer">
                                    {/* Tooltip detail scan saat hover */}
                                    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 z-30 bg-gray-900 dark:bg-[#07130C] p-2 rounded-xl border border-gray-700 dark:border-emerald-800/40 shadow-xl text-center min-w-[70px]">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">{data.day}</p>
                                        <p className="text-xs text-white font-bold mt-0.5">{data.scans} scan</p>
                                    </div>

                                    {/* Batang Diagram */}
                                    <div
                                        style={{ height: `${data.heightPct}%` }}
                                        className="w-10 bg-[#15803d] dark:bg-[#34D399] rounded-t-lg group-hover:bg-[#1e7e34] dark:group-hover:bg-emerald-400 transition-all duration-300 shadow-sm"
                                    ></div>

                                    {/* Label Hari */}
                                    <span className="text-xs font-bold text-gray-400 dark:text-emerald-100/60 mt-3 pt-1 block h-5">
                                        {data.day}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom row grid: Activities & Kelola Konten */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Log Aktivitas Terbaru (2/3 width) dengan Scroll */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col">
                        <div className="mb-4">
                            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Aktivitas Terkini</h2>
                        </div>

                        {/* Area list aktivitas dinamis */}
                        <div className="max-h-[240px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {activities.length > 0 ? (
                                activities.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-2.5 hover:bg-gray-50 dark:hover:bg-[#16291e]/50 rounded-2xl transition-all duration-200">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#34D399] flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-100/50 dark:border-emerald-800/50">
                                                {item.initial}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.user_name}</h4>
                                                <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-medium mt-0.5">{item.action}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium">
                                            {item.time_ago}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 text-center py-6">Belum ada aktivitas scan terbaru.</p>
                            )}
                        </div>
                    </div>

                    {/* Kelola Konten (1/3 width) */}
                    <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center space-x-2 text-gray-900 dark:text-white mb-6">
                                <svg className="w-5 h-5 text-emerald-600 dark:text-[#34D399]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h2 className="text-base font-extrabold">Kelola Konten</h2>
                            </div>

                            <p className="text-xs text-gray-400 dark:text-emerald-100/50 font-medium mb-6">
                                Konfigurasi dan perbarui konten halaman depan aplikasi siGizi dengan mudah.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Link
                                href={route('admin.kelola-tampilan')}
                                prefetch={["hover", "mount"]}
                                className="w-full block text-center rounded-2xl py-3 px-4 font-bold text-xs tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-[#34D399] border border-emerald-100 dark:border-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition duration-150 cursor-pointer shadow-sm"
                            >
                                EDIT BANNER HOMEPAGE
                            </Link>
                            <Link
                                href={route('admin.kelola-tampilan')}
                                prefetch={["hover", "mount"]}
                                className="w-full block text-center rounded-2xl py-3 px-4 font-bold text-xs tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-[#34D399] border border-emerald-100 dark:border-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition duration-150 cursor-pointer shadow-sm"
                            >
                                KELOLA TIPS GIZI HARIAN
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}