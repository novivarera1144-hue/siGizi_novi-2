import React from 'react';
import { router } from '@inertiajs/react';
import { Check } from 'lucide-react';

export default function OnboardingSuccessModal({ show }) {
    if (!show) return null;

    const handleNavigate = () => {
        router.visit(route('dashboard'));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white dark:bg-[#08160E] border border-emerald-100 dark:border-emerald-900/40 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6 transition-all transform scale-100">
                {/* Ikon Atas */}
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-10 h-10 stroke-[2.5]" />
                </div>

                {/* Judul & Deskripsi */}
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                        🎉 Selamat Datang di siGizi!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Target program sehatmu berhasil disimpan. Mari mulai perjalanan hidup sehatmu hari ini!
                    </p>
                </div>

                {/* Tombol Utama */}
                <button
                    type="button"
                    onClick={handleNavigate}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 cursor-pointer text-sm sm:text-base"
                >
                    Masuk ke Dashboard
                </button>
            </div>
        </div>
    );
}
