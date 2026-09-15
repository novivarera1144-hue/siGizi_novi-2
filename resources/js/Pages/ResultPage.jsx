import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const resAnimStyles = `
    @keyframes resFadeInUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes resShimmerSweep {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
    }
`;

export default function ResultPage({ data }) {
    // Fallback dummy values jika prop data belum dikirim dari controller
    const foodName = data?.name || "Ayam Goreng Crispy (Paha Bawah)";
    const calories = data?.calories || 250;
    const score = data?.score || 84;
    const image = data?.image || "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=800";
    const insight = data?.insight || "Ayam goreng tepung ini merupakan sumber protein yang baik, namun perhatikan porsi lemak dari proses penggorengan.";
    const badge = data?.badge || "Rendah Kalori — Cocok untuk Diet";

    const nutrients = data?.nutrients || [
        { name: "Protein", current: 18, target: 90, pct: 20, barColor: "bg-blue-500", textColor: "text-blue-500" },
        { name: "Lemak", current: 16, target: 65, pct: 25, barColor: "bg-amber-500", textColor: "text-amber-500" },
        { name: "Karbo", current: 8, target: 250, pct: 5, barColor: "bg-emerald-500", textColor: "text-emerald-500" },
    ];

    const recommendations = data?.recommendations || [
        {
            text: "Tambah sayuran hijau untuk serat",
            lightColor: "bg-gray-50 border-gray-100 text-gray-700",
            darkColor: "dark:bg-[#14281d] dark:border-emerald-800/40 dark:text-emerald-400"
        },
        {
            text: "Kurangi minyak goreng",
            lightColor: "bg-gray-50 border-gray-100 text-gray-700",
            darkColor: "dark:bg-[#282115] dark:border-amber-900/40 dark:text-amber-400"
        },
        {
            text: "Minum 250ml air setelah makan",
            lightColor: "bg-gray-50 border-gray-100 text-gray-700",
            darkColor: "dark:bg-[#14281d] dark:border-emerald-800/40 dark:text-emerald-400"
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Hasil Analisis - siGizi" />

            <style>{resAnimStyles}</style>

            <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">

                {/* Top Section: Breadcrumb / Search & Step Indicators */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                        <div>
                            <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">
                                Scan Makanan
                            </span>
                            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                Hasil Analisis Nutrisi
                            </h1>
                        </div>

                        {/* Search Bar (Sesuaikan Warna Hijau Gelap Dark Mode) */}
                        <div className="relative hidden md:block ml-4">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-emerald-500/70">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="w-48 lg:w-64 pl-9 pr-4 py-2 text-xs font-semibold text-gray-800 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-100/40 bg-gray-100 dark:bg-[#122017] border border-gray-200 dark:border-[#1a2e22] rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Step Pill Indicator */}
                    <div className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs font-bold bg-gray-100 dark:bg-[#122017] p-1.5 rounded-2xl border border-gray-200 dark:border-[#1a2e22] max-w-full overflow-x-auto whitespace-nowrap">
                        <span className="px-3 py-1.5 text-gray-400 dark:text-emerald-100/40 font-medium">1. Upload</span>
                        <span className="text-gray-400 dark:text-emerald-100/30 text-xs">›</span>
                        <span className="px-3 py-1.5 text-gray-400 dark:text-emerald-100/40 font-medium">2. AI Analisis</span>
                        <span className="text-gray-400 dark:text-emerald-100/30 text-xs">›</span>
                        <span className="px-3 py-1.5 bg-[#1F7A54] dark:bg-emerald-500 text-white dark:text-black text-xs font-bold rounded-xl shadow-sm">
                            3. Hasil
                        </span>
                    </div>
                </div>

                {/* Grid Utama */}
                <div className="flex flex-col md:flex-row gap-8 items-stretch">

                    {/* SISI KIRI (Gambar & Health Insight) */}
                    <div className="w-full md:w-5/12 flex flex-col gap-6">
                        {/* Food Image Card */}
                        <div className="bg-white dark:bg-[#122017] rounded-3xl overflow-hidden border border-gray-100 dark:border-[#1a2e22] shadow-sm relative aspect-[4/3] w-full min-h-[240px] sm:min-h-[320px]">
                            <img
                                src={image}
                                alt={foodName}
                                className="w-full h-full object-cover"
                            />

                            {/* Score Tag Overlay */}
                            <div className="absolute top-4 right-4 bg-gray-900 dark:bg-emerald-500 text-white dark:text-black font-extrabold text-xs px-3.5 py-2 rounded-full shadow-md z-10">
                                Skor {score}
                            </div>

                            {/* Title Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                                <h2 className="text-xl font-extrabold text-white leading-tight">{foodName}</h2>
                                <p className="text-[11px] font-semibold text-gray-200 mt-1">1 porsi ~ 250g - ✓ AI Teridentifikasi</p>
                            </div>
                        </div>

                        {/* Health Insight */}
                        <div className="bg-gray-50 dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] space-y-3 flex flex-col justify-center min-h-[140px]">
                            <div className="flex items-center space-x-2 text-gray-900 dark:text-emerald-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h4 className="text-xs font-extrabold uppercase tracking-wider">Health Insight</h4>
                            </div>
                            <p className="text-xs font-semibold text-gray-600 dark:text-emerald-100/90 leading-relaxed">
                                {insight}
                            </p>
                        </div>
                    </div>

                    {/* SISI KANAN (Kalori, Diagram, & Rekomendasi) */}
                    <div className="w-full md:w-7/12 flex flex-col gap-6" style={{ animation: 'resFadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both', animationDelay: '0.15s' }}>
                        {/* Calorie & Nutrients Card — Differentiated Color Background */}
                        <div className="relative group overflow-hidden bg-gradient-to-br from-[#E4F4EC] via-[#ECF7F2] to-[#F4FAF7] dark:from-[#0E281A] dark:via-[#0A1F14] dark:to-[#12241A] p-6 sm:p-8 rounded-3xl border-2 border-[#B6DEC9] dark:border-[#1E4D35] shadow-md flex flex-col justify-between flex-1 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
                            {/* Shimmer Effect */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 uppercase tracking-widest block mb-1">
                                        Hasil Analisis Nutrisi
                                    </span>
                                    <h3 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mt-1 tracking-tight flex items-baseline">
                                        {calories} <span className="text-xl font-bold text-gray-500 dark:text-emerald-200/60 ml-2">kkal</span>
                                    </h3>
                                    <p className="text-[10px] text-gray-500 dark:text-emerald-200/50 font-semibold mt-0.5">Total kalori per porsi</p>
                                </div>

                                {/* Progress Bars */}
                                <div className="space-y-4 bg-white/70 dark:bg-[#07130C]/60 p-4 rounded-2xl border border-emerald-100/80 dark:border-emerald-900/40 shadow-xs backdrop-blur-xs">
                                    {nutrients.map((nutri, idx) => (
                                        <div key={idx} className="space-y-1.5">
                                            <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-emerald-100/90">
                                                <span>{nutri.name}</span>
                                                <span className="text-gray-400 dark:text-emerald-100/50">
                                                    <span className={`${nutri.textColor}`}>{nutri.current}g</span> / {nutri.target}g
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 dark:bg-[#0b140e] rounded-full h-2.5 overflow-hidden border border-gray-200/40 dark:border-[#1a2e22]">
                                                <div
                                                    className={`${nutri.barColor} h-full rounded-full transition-all duration-700`}
                                                    style={{ width: `${nutri.pct}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 mt-6 relative z-10">
                                {/* Badge Tag */}
                                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-700 dark:bg-emerald-500 text-white dark:text-black text-xs font-bold rounded-xl shadow-xs w-fit">
                                    <svg className="w-4 h-4 shrink-0 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="truncate">{badge}</span>
                                </div>

                                {/* Gram Details Grid with Vivid Color Cards */}
                                <div className="grid grid-cols-3 gap-3">
                                    {nutrients.map((nutri, idx) => (
                                        <div key={idx} className={`${nutri.name === 'Protein' ? 'bg-blue-100/80 dark:bg-[#162D44] border-blue-200 dark:border-blue-800/60 shadow-xs' :
                                                nutri.name === 'Lemak' ? 'bg-amber-100/80 dark:bg-[#362B16] border-amber-200 dark:border-amber-800/60 shadow-xs' :
                                                    'bg-emerald-100/80 dark:bg-[#133624] border-emerald-200 dark:border-emerald-800/60 shadow-xs'
                                            } p-3 rounded-2xl text-center border transform hover:-translate-y-0.5 transition-transform duration-200`}>
                                            <p className={`text-base font-extrabold ${nutri.name === 'Protein' ? 'text-blue-700 dark:text-blue-300' :
                                                    nutri.name === 'Lemak' ? 'text-amber-700 dark:text-amber-300' :
                                                        'text-emerald-700 dark:text-emerald-300'
                                                }`}>{nutri.current}g</p>
                                            <p className="text-[10px] text-gray-700 dark:text-slate-200 font-bold uppercase tracking-wider mt-0.5">{nutri.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recommendations List */}
                        <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4">
                            <div className="flex items-center space-x-2 text-amber-500 dark:text-amber-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.25.59 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.17 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.93c-.77-.56-.372-1.81.59-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
                                </svg>
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-amber-400">Rekomendasi</h4>
                            </div>

                            <div className="space-y-2.5">
                                {recommendations.map((rec, idx) => {
                                    const text = rec.text || rec;
                                    const lightClass = rec.lightColor || 'bg-gray-50 border-gray-100 text-gray-700';
                                    const darkClass = rec.darkColor || (idx === 1 ? 'dark:bg-[#282115] dark:border-amber-900/40 dark:text-amber-400' : 'dark:bg-[#14281d] dark:border-emerald-800/40 dark:text-emerald-400');

                                    return (
                                        <div
                                            key={idx}
                                            className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl border ${lightClass} ${darkClass}`}
                                        >
                                            <span className="text-sm font-black leading-none shrink-0">›</span>
                                            <span className="text-xs font-bold leading-relaxed">{text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Action Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 dark:border-[#1a2e22]">
                    <Link
                        href={route('scan')}
                        className="flex-1 sm:flex-initial px-8 py-3.5 bg-white dark:bg-[#122017] border border-gray-200 dark:border-emerald-500/40 hover:bg-gray-50 dark:hover:bg-[#182b1f] text-gray-800 dark:text-emerald-400 font-extrabold text-sm rounded-xl text-center transition-all shadow-sm"
                    >
                        Scan Lagi
                    </Link>
                    <Link
                        href={route('dashboard')}
                        className="flex-1 sm:flex-initial sm:ml-auto px-8 py-3.5 bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-black text-white font-extrabold text-sm rounded-xl text-center shadow-lg transition-all"
                    >
                        Lihat Riwayat
                    </Link>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}