import AdminLayout from '../../Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function PengaturanSistem() {
    return (
        <AdminLayout
            activePage="pengaturan-sistem"
            title="Pengaturan Sistem"
            subtitle="Konfigurasi parameter inti dan layanan backend siGizi."
        >
            <Head title="Pengaturan Sistem - Admin" />

            <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6 max-w-2xl">
                    {/* App Name field */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-600/80 uppercase tracking-widest block">Nama Aplikasi</label>
                        <input
                            type="text"
                            defaultValue="siGizi"
                            className="w-full px-4 py-3 rounded-xl border border-emerald-100 dark:border-[#164D2B] bg-[#EFF7F4] dark:bg-[#071A0E] text-gray-800 dark:text-emerald-300 focus:outline-none focus:border-[#1F7A54] focus:ring-1 focus:ring-[#1F7A54] text-sm font-semibold"
                        />
                    </div>

                    {/* Sender Email field */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-600/80 uppercase tracking-widest block">Email Pengirim Sistem (SMTP)</label>
                        <input
                            type="email"
                            defaultValue="noreply@sigizi.com"
                            className="w-full px-4 py-3 rounded-xl border border-emerald-100 dark:border-[#164D2B] bg-[#EFF7F4] dark:bg-[#071A0E] text-gray-800 dark:text-emerald-300 focus:outline-none focus:border-[#1F7A54] focus:ring-1 focus:ring-[#1F7A54] text-sm font-semibold"
                        />
                    </div>

                    {/* Gemini integration state */}
                    <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">API Gemini AI</h4>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 mt-0.5">Integrasi kecerdasan buatan untuk analisis gizi makanan.</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-[#34D399]/20 text-[#1F7A54] dark:text-[#34D399] text-xs font-bold rounded-full border border-emerald-200 dark:border-[#34D399]/30">
                            Terhubung (Aktif)
                        </span>
                    </div>

                    {/* Maintenance mode toggle switch */}
                    <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-[#1a2e22] rounded-2xl">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Mode Pemeliharaan (Maintenance Mode)</h4>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 mt-0.5">Batasi akses aplikasi hanya untuk administrator saat pembaruan sistem.</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 dark:bg-[#071A0E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1F7A54]"></div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button className="py-3 px-6 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] font-bold text-sm rounded-xl shadow-md transition duration-150 cursor-pointer">
                            Simpan Pengaturan
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
