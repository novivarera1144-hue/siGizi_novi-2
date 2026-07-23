import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    // Mock data for scan per day
    const weeklyScanData = [
        { day: "Sen", scans: 110, heightPct: 42 },
        { day: "Sel", scans: 170, heightPct: 65 },
        { day: "Rab", scans: 135, heightPct: 52 },
        { day: "Kam", scans: 180, heightPct: 69 },
        { day: "Jum", scans: 220, heightPct: 85 },
        { day: "Sab", scans: 150, heightPct: 58 },
        { day: "Min", scans: 125, heightPct: 48 },
    ];

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
                    <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[11px] font-extrabold text-gray-400 dark:text-emerald-100/50 uppercase tracking-wider">Total Pengguna</p>
                            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">1,248</h3>
                            <p className="text-[11px] text-gray-400 dark:text-[#52B788]/60 font-medium">+12 minggu ini</p>
                        </div>
                    </div>

                    {/* Total Scan Card */}
                    <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-16v3m9 8h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[11px] font-extrabold text-gray-400 dark:text-emerald-100/50 uppercase tracking-wider">Total Scan</p>
                            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">8,742</h3>
                            <p className="text-[11px] text-gray-400 dark:text-[#52B788]/60 font-medium">+156 hari ini</p>
                        </div>
                    </div>

                    {/* Pengguna Aktif Card */}
                    <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[11px] font-extrabold text-gray-400 dark:text-emerald-100/50 uppercase tracking-wider">Pengguna Aktif</p>
                            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">342</h3>
                            <p className="text-[11px] text-gray-400 dark:text-[#52B788]/60 font-medium">Hari ini</p>
                        </div>
                    </div>

                    {/* Akurasi AI Card */}
                    <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[11px] font-extrabold text-gray-400 dark:text-emerald-100/50 uppercase tracking-wider">Akurasi AI</p>
                            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">94.2%</h3>
                            <p className="text-[11px] text-gray-400 dark:text-[#52B788]/60 font-medium">Rata-rata 7 hari</p>
                        </div>
                    </div>
                </div>

                {/* Bar Chart Section: Scan per Hari */}
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                    <h2 className="text-base font-extrabold text-gray-900 dark:text-white mb-6">Scan per Hari (7 Hari Terakhir)</h2>
                    
                    {/* Dotted lines + Bar columns custom component */}
                    <div className="relative pt-6 pb-2 px-2 sm:px-6">
                        {/* Dotted background grid lines */}
                        <div className="absolute inset-x-0 top-6 bottom-14 flex flex-col justify-between pointer-events-none px-6">
                            {[260, 195, 130, 65, 0].map((val) => (
                                <div key={val} className="w-full flex items-center relative h-0">
                                    <span className="absolute -left-8 text-[10px] font-bold text-gray-400 dark:text-emerald-100/40 w-6 text-right">
                                        {val}
                                    </span>
                                    <div className="w-full border-b border-dashed border-gray-200 dark:border-emerald-950/40"></div>
                                </div>
                            ))}
                        </div>

                        {/* Flex bars container */}
                        <div className="relative z-10 grid grid-cols-7 gap-2 sm:gap-6 items-end h-56 pt-2">
                            {weeklyScanData.map((data, idx) => (
                                <div key={idx} className="flex flex-col items-center group relative w-full h-full justify-end cursor-pointer">
                                    {/* Tooltip on hover */}
                                    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 z-30 bg-gray-900 dark:bg-[#0b140e] p-2 rounded-xl border border-gray-700 dark:border-[#1a2e22] shadow-xl text-center min-w-[70px]">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">{data.day}</p>
                                        <p className="text-xs text-white font-bold mt-0.5">{data.scans} scan</p>
                                    </div>

                                    {/* Bar itself */}
                                    <div
                                        style={{ height: `${data.heightPct}%` }}
                                        className="w-full max-w-[36px] bg-[#1F7A54] dark:bg-emerald-600 rounded-lg group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-all duration-300 shadow-sm"
                                    ></div>

                                    {/* Label under bar */}
                                    <span className="text-xs font-bold text-gray-400 dark:text-emerald-100/40 mt-3 pt-1 block h-5">
                                        {data.day}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom row grid: Activities & Kelola Konten */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Log Aktivitas Terbaru (2/3 width) */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Aktivitas Terkini</h2>
                            <span className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 cursor-pointer hover:underline">
                                Lihat semua
                            </span>
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: "Budi Raharjo", action: "melakukan scan makanan Nasi Goreng", time: "5 menit yang lalu", avatar: "B" },
                                { name: "Siti Aminah", action: "mendaftar sebagai pengguna baru", time: "1 jam yang lalu", avatar: "S" },
                                { name: "Ahsan Kamil", action: "berkonsultasi dengan AI Assistant", time: "3 jam yang lalu", avatar: "A" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2.5 hover:bg-gray-50 dark:hover:bg-[#182b1f]/30 rounded-2xl transition-all duration-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#1F7A54] dark:text-emerald-400 flex items-center justify-center font-extrabold text-sm">
                                            {item.avatar}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                            <p className="text-[11px] text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">{item.action}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-gray-400 dark:text-emerald-100/40 font-medium">
                                        {item.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Kelola Konten (1/3 width) */}
                    <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center space-x-2 text-gray-900 dark:text-white mb-6">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h2 className="text-base font-extrabold">Kelola Konten</h2>
                            </div>

                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium mb-6">
                                Konfigurasi dan perbarui konten halaman depan aplikasi siGizi dengan mudah.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Link
                                href={route('admin.kelola-tampilan')}
                                className="w-full block py-3 px-4 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl text-left text-xs font-bold text-[#1F7A54] dark:text-emerald-400 transition duration-150 cursor-pointer"
                            >
                                EDIT BANNER HOMEPAGE
                            </Link>
                            <Link
                                href={route('admin.kelola-tampilan')}
                                className="w-full block py-3 px-4 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl text-left text-xs font-bold text-[#1F7A54] dark:text-emerald-400 transition duration-150 cursor-pointer"
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
