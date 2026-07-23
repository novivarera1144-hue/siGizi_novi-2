import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function KelolaTampilan() {
    const [selectedThemeColor, setSelectedThemeColor] = useState('emerald');

    return (
        <AdminLayout
            activePage="kelola-tampilan"
            title="Kelola Tampilan"
            subtitle="Sesuaikan tata letak, banner, dan visual aplikasi siGizi."
        >
            <Head title="Kelola Tampilan - Admin" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Banner homepage management */}
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4">
                    <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">Banner Utama Homepage</h3>
                    <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium">
                        Gambar promosi atau informasi gizi yang muncul di halaman beranda pengguna.
                    </p>
                    <div className="aspect-[21/9] bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl flex items-center justify-center border border-dashed border-emerald-200 dark:border-emerald-900/50 overflow-hidden relative group">
                        <span className="text-xs font-bold text-gray-400 dark:text-emerald-300/40 group-hover:scale-105 transition-transform duration-200">
                            Preview Banner Aktif (siGizi Banner)
                        </span>
                    </div>
                    <div className="flex space-x-3 pt-2">
                        <button className="flex-1 py-3 px-4 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] text-xs font-bold rounded-xl transition duration-150 flex items-center justify-center space-x-1.5 cursor-pointer">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span>Unggah Gambar Baru</span>
                        </button>
                        <button className="py-3 px-4 text-xs font-bold border border-gray-200 dark:border-emerald-900/50 text-gray-500 hover:bg-gray-50 dark:hover:bg-emerald-950/30 rounded-xl transition duration-150 cursor-pointer">
                            Hapus
                        </button>
                    </div>
                </div>

                {/* Theme selector */}
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4">
                    <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">Pengaturan Warna Tema</h3>
                    <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium">
                        Ubah skema warna dominan untuk seluruh aplikasi siGizi bagi semua pengguna.
                    </p>
                    <div className="flex space-x-4 pt-2">
                        <button 
                            onClick={() => setSelectedThemeColor('emerald')}
                            className={`w-12 h-12 rounded-full bg-[#1F7A54] transition-all duration-200 flex items-center justify-center text-white cursor-pointer ${
                                selectedThemeColor === 'emerald' ? 'border-4 border-emerald-300 ring-2 ring-emerald-500/20 scale-110 shadow-lg' : 'hover:scale-105'
                            }`} 
                            title="Emerald (Default)"
                        >
                            {selectedThemeColor === 'emerald' && (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>

                        <button 
                            onClick={() => setSelectedThemeColor('blue')}
                            className={`w-12 h-12 rounded-full bg-blue-600 transition-all duration-200 flex items-center justify-center text-white cursor-pointer ${
                                selectedThemeColor === 'blue' ? 'border-4 border-blue-300 ring-2 ring-blue-500/20 scale-110 shadow-lg' : 'hover:scale-105'
                            }`} 
                            title="Ocean Blue"
                        >
                            {selectedThemeColor === 'blue' && (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>

                        <button 
                            onClick={() => setSelectedThemeColor('orange')}
                            className={`w-12 h-12 rounded-full bg-orange-500 transition-all duration-200 flex items-center justify-center text-white cursor-pointer ${
                                selectedThemeColor === 'orange' ? 'border-4 border-orange-300 ring-2 ring-orange-500/20 scale-110 shadow-lg' : 'hover:scale-105'
                            }`} 
                            title="Sunset Orange"
                        >
                            {selectedThemeColor === 'orange' && (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
