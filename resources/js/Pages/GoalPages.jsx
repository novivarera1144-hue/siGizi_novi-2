import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function GoalPage({ userGoal }) {
    const [isOpen, setIsOpen] = useState(false);
    // Menangkap pesan sukses dari backend Laravel (flash message)
    const { flash } = usePage().props;

    useEffect(() => {
        // 1. Notifikasi Berhasil Simpan/Perbarui Target (Dari Backend)
        if (flash?.success) {
            MySwal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: flash.success,
                confirmButtonColor: '#1F7A54',
            });
        }

        // Logika Pengecekan Target & Durasi Program di Frontend
        if (userGoal && userGoal.end_date) {
            const today = new Date();
            const endDate = new Date(userGoal.end_date);

            // Hitung selisih waktu dalam hari
            const diffTime = endDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Simulasi data pendukung (bisa disesuaikan dengan data dari backend/props)
            // Contoh: lastScanDate untuk mengecek konsistensi (apakah sudah 4 hari tidak scan)
            const lastScanDate = userGoal.last_scan_date ? new Date(userGoal.last_scan_date) : today;
            const diffDaysWithoutScan = Math.floor((today - lastScanDate) / (1000 * 60 * 60 * 24));

            // Asumsi target pencapaian gizi (misal: target tercapai atau tidak)
            const isTargetAchieved = userGoal.is_achieved ?? true;

            // --- SKENARIO 1: Peringatan Tidak Konsisten (Sudah 3-5 hari tidak scan) ---
            if (diffDaysWithoutScan >= 3 && userGoal.status === 'active') {
                MySwal.fire({
                    icon: 'warning',
                    title: '👋 Kangen Catatan Gizimu!',
                    text: 'Sudah beberapa hari kamu tidak melakukan scan makanan. Yuk, kembali aktif catat pola makanmu agar target tetap terjaga!',
                    confirmButtonColor: '#1F7A54',
                    confirmButtonText: 'Mulai Scan Sekarang',
                });
            }
            // --- SKENARIO 2: Peringatan H-7 Menjelang Akhir Program ---
            else if (diffDays === 7 && userGoal.status === 'active') {
                MySwal.fire({
                    icon: 'info',
                    title: '⏳ Waktu Program Tinggal 7 Hari Lagi!',
                    text: 'Ayo pertahankan konsistensi pola makan sehatmu di minggu penutup ini hingga garis akhir!',
                    confirmButtonColor: '#1F7A54',
                });
            }
            // --- SKENARIO 3 & 4: Program Selesai (Melewati Batas Waktu) ---
            else if (diffDays <= 0 && userGoal.status === 'active') {

                if (isTargetAchieved) {
                    // Skenario 3: Program Berhasil Sempurna
                    MySwal.fire({
                        icon: 'success',
                        title: '🎉 Luar Biasa! Program Selesai Sempurna',
                        text: 'Selamat! Kamu telah menyelesaikan durasi program gizi ini dan mencapai target dengan sangat baik.',
                        confirmButtonColor: '#1F7A54',
                        confirmButtonText: 'Lihat Evaluasi Akhir',
                    });
                } else {
                    // Skenario 4: Program Selesai Tapi Belum Sesuai Target
                    MySwal.fire({
                        icon: 'warning',
                        title: '💪 Durasi Program Selesai',
                        text: 'Kamu sudah berjuang menyelesaikan durasi program ini! Meskipun target utama belum sepenuhnya tercapai, jangan berkecil hati. Yuk, sesuaikan target baru yang lebih pas!',
                        confirmButtonColor: '#1F7A54',
                        confirmButtonText: 'Buat Program Baru',
                    });
                }
            }
        }
    }, [userGoal, flash]);

    return (
        <AuthenticatedLayout>
            <Head title="Goal Setting - siGizi" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white dark:bg-[#122017] rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-[#1a2e22] space-y-4">
                    <div>
                        <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">
                            PENGATURAN PROGRAM
                        </span>
                        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                            Target & Durasi Gizi Seimbang
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-emerald-100/60 mt-1">
                            Pantau sisa waktu program dan evaluasi pencapaian target kesehatanmu di sini.
                        </p>
                    </div>

                    {/* Informasi Status Program Aktif */}
                    {userGoal ? (
                        <div className="p-5 bg-emerald-50 dark:bg-[#182b1f] rounded-2xl border border-emerald-100 dark:border-[#244230] space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-extrabold text-[#1F7A54] dark:text-emerald-400">
                                    {userGoal.name || 'Program Target Gizi Harian'}
                                </span>
                                <span className="px-2.5 py-1 bg-emerald-200/60 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded-lg uppercase">
                                    {userGoal.status || 'Aktif'}
                                </span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-emerald-100/80 font-medium">
                                Berakhir pada tanggal: <span className="font-bold">{userGoal.end_date}</span>
                            </p>
                        </div>
                    ) : (
                        <div className="p-6 bg-gray-50 dark:bg-[#0b140e] rounded-2xl text-center space-y-2 border border-gray-100 dark:border-[#1a2e22]">
                            <p className="text-xs font-bold text-gray-700 dark:text-white">Belum ada program target gizi yang diatur.</p>
                            <p className="text-[11px] text-gray-400">Atur durasi dan target programmu sekarang untuk mulai memantau perkembangan kesehatan.</p>
                        </div>
                    )}

                    {/* Trigger Button */}
                    <div className="pt-2 flex justify-end">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#42A85F] dark:hover:bg-[#34914F] text-white text-[10px] font-extrabold tracking-widest py-3.5 px-6 rounded-xl shadow-md transition-all duration-200 cursor-pointer uppercase"
                        >
                            Atur Target Baru
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Pop-up */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-[#122017] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-[#1a2e22] transform scale-100 transition-transform duration-300 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white text-lg font-bold cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className="space-y-4">
                            <div>
                                <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">
                                    PENGATURAN TARGET
                                </span>
                                <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                                    Atur Ulang Target Gizi
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-emerald-100/60">
                                    Silakan masukkan target harian baru Anda untuk memantau asupan gizi harian.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-emerald-600/80 block mb-1">
                                        TARGET KALORI (KKAL)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Contoh: 2000"
                                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:placeholder-emerald-300/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 text-xs font-semibold"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-emerald-600/80 block mb-1">
                                        TARGET PROTEIN (GRAM)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Contoh: 60"
                                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:placeholder-emerald-300/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 text-xs font-semibold"
                                    />
                                </div>
                            </div>

                            <div className="pt-2 flex space-x-3">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-[#0b140e] dark:hover:bg-[#15271b] text-gray-700 dark:text-emerald-300 text-xs font-bold py-3 rounded-xl transition-all duration-200 cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#42A85F] dark:hover:bg-[#34914F] text-white text-xs font-bold py-3 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                                >
                                    Simpan Target
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}