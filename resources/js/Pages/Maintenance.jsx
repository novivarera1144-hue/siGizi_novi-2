import { Head, Link } from '@inertiajs/react';

export default function Maintenance() {
    return (
        <div className="min-h-screen bg-[#040C07] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            <Head title="Mode Pemeliharaan - siGizi" />

            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1F7A54]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-md w-full bg-[#122017] border border-[#1a2e22] rounded-3xl p-8 shadow-2xl text-center relative z-10 space-y-6">
                {/* Logo & Icon */}
                <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-[#34D399] shadow-inner">
                    <svg className="w-10 h-10 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l5.654-4.654m0 0a2.7 2.7 0 01.765-1.208l3.03-2.496M12 9V3m0 0l-3 3m3-3l3 3" />
                    </svg>
                </div>

                <div className="space-y-2">
                    <span className="px-3 py-1 bg-[#34D399]/20 text-[#34D399] text-[10px] font-extrabold uppercase tracking-wider rounded-full border border-[#34D399]/30">
                        Mode Pemeliharaan Aktif
                    </span>
                    <h1 className="text-2xl font-black tracking-tight text-white pt-2">
                        Sistem Sedang Ditingkatkan
                    </h1>
                    <p className="text-xs text-emerald-100/60 leading-relaxed">
                        Kami sedang melakukan pemeliharaan rutin untuk meningkatkan kualitas layanan siGizi. Silakan kembali beberapa saat lagi.
                    </p>
                </div>

                <div className="pt-4 border-t border-[#1a2e22] flex flex-col gap-3">
                    <Link
                        href="/login"
                        className="w-full py-3 px-4 bg-[#34D399] hover:bg-emerald-500 text-[#040C07] font-bold text-xs rounded-xl shadow-lg transition duration-200"
                    >
                        Masuk sebagai Administrator
                    </Link>
                </div>
            </div>

            <p className="text-[11px] text-emerald-100/30 mt-8 relative z-10">
                &copy; {new Date().getFullYear()} siGizi Platform. All rights reserved.
            </p>
        </div>
    );
}
