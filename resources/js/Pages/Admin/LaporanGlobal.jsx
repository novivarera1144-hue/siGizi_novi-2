import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function LaporanGlobal() {
    return (
        <AdminLayout
            activePage="laporan-global"
            title="Laporan Global"
            subtitle="Analisis statistik scan makanan dan aktivitas pengguna."
        >
            <Head title="Laporan Global - Admin" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Food Categories popularity */}
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

                {/* Export Data controls */}
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex flex-col justify-between space-y-6">
                    <div>
                        <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">Unduhan Rekapitulasi Data</h3>
                        <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium mt-0.5">
                            Ekspor data interaksi pengguna dan log AI Assistant untuk keperluan pelaporan instansi/sekolah.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        {/* Option card Excel */}
                        <div className="p-4 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl flex items-center justify-between hover:bg-emerald-50/20 transition-all duration-150">
                            <div className="flex items-center space-x-3">
                                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-[#1F7A54] dark:text-emerald-400 rounded-xl">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Laporan Kinerja (.xlsx)</h4>
                                    <p className="text-[10px] text-gray-400 dark:text-emerald-100/40 font-medium">Data mentah scan history dan rekap kalori bulanan.</p>
                                </div>
                            </div>
                            <button className="py-2 px-3 bg-[#1F7A54] hover:bg-[#186041] text-white text-[11px] font-bold rounded-lg transition duration-150 cursor-pointer">
                                Unduh
                            </button>
                        </div>

                        {/* Option card PDF */}
                        <div className="p-4 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl flex items-center justify-between hover:bg-emerald-50/20 transition-all duration-150">
                            <div className="flex items-center space-x-3">
                                <div className="p-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Infografis & Visual PDF (.pdf)</h4>
                                    <p className="text-[10px] text-gray-400 dark:text-emerald-100/40 font-medium">Brosur laporan grafik interaktif yang mudah dipresentasikan.</p>
                                </div>
                            </div>
                            <button className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-lg transition duration-150 cursor-pointer">
                                Unduh
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
