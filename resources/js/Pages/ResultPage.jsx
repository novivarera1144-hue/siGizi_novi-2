import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ResultPage({ data }) {
    // Fallback dummy values if data prop is not provided by backend ScanController
    const foodName = data?.name || "Nasi Goreng Ayam";
    const calories = data?.calories || 450;
    const score = data?.score || 72;
    const image = data?.image || "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800";
    const insight = data?.insight || "Kalori sedang, protein cukup, lemak normal. Cocok untuk makan siang aktif.";
    const badge = data?.badge || "Nutrisi Seimbang — Cocok untuk Makan Siang";

    const nutrients = data?.nutrients || [
        { name: "Protein", current: 18, target: 90, pct: 20, barColor: "bg-blue-500", textColor: "text-blue-500" },
        { name: "Lemak", current: 12, target: 65, pct: 18, barColor: "bg-amber-500", textColor: "text-amber-500" },
        { name: "Karbo", current: 62, target: 250, pct: 25, barColor: "bg-emerald-500", textColor: "text-emerald-500" },
    ];

    const recommendations = data?.recommendations || [
        { text: "Tambah sayuran hijau untuk serat", color: "bg-emerald-50/40 border-emerald-100/50 text-[#1F7A54]" },
        { text: "Kurangi minyak goreng", color: "bg-amber-50/40 border-amber-100/50 text-amber-700" },
        { text: "Minum 250ml air setelah makan", color: "bg-emerald-50/40 border-emerald-100/50 text-[#1F7A54]" },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Hasil Analisis - siGizi" />

            <div className="max-w-6xl mx-auto p-6 space-y-8">

                {/* Top Section: Breadcrumb & Step Indicators */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">Scan Makanan</span>
                        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Hasil Analisis Nutrisi</h1>
                    </div>

                    {/* 3 Step Pill Indicator */}
                    <div className="flex items-center space-x-2 text-xs font-bold">
                        <span className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 rounded-full">1. Upload</span>
                        <span className="text-gray-300 dark:text-zinc-700">&gt;</span>
                        <span className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 rounded-full">2. AI Analisis</span>
                        <span className="text-gray-300 dark:text-zinc-700">&gt;</span>
                        <span className="px-3 py-1.5 bg-[#1F7A54] text-white rounded-full shadow-sm">3. Hasil</span>
                    </div>
                </div>

                {/* Main Split Grid (3 columns total: 1/3 Left, 2/3 Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Pane (1/3 width): Food Image Card */}
                    <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-zinc-800/80 shadow-sm relative group aspect-[4/3] md:h-[400px]">
                        <img
                            src={image}
                            alt={foodName}
                            className="w-full h-full object-cover"
                        />

                        {/* Score Tag Overlay */}
                        <div className="absolute top-4 right-4 bg-[#1F7A54] text-white font-extrabold text-xs px-3.5 py-2 rounded-full shadow-md">
                            Skor {score}
                        </div>

                        {/* Title and details gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                            <h2 className="text-2xl font-extrabold text-white">{foodName}</h2>
                            <p className="text-xs font-semibold text-gray-300 mt-1">1 porsi ~ 250g - ✓ AI Teridentifikasi</p>
                        </div>
                    </div>

                    {/* Right Pane (2/3 width): Calorie & Nutrients Card */}
                    <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">

                        <div className="space-y-4">
                            <div>
                                <span className="text-[10px] font-extrabold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block">Hasil Analisis Nutrisi</span>
                                <h3 className="text-6xl sm:text-7xl font-extrabold text-gray-900 dark:text-white mt-1 tracking-tight">
                                    {calories} <span className="text-2xl font-bold text-gray-400 dark:text-zinc-500 ml-2">kkal</span>
                                </h3>
                                <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-semibold mt-0.5">Total kalori per porsi</p>
                            </div>

                            {/* Progress Bars */}
                            <div className="space-y-3.5">
                                {nutrients.map((nutri, idx) => (
                                    <div key={idx} className="space-y-1.5">
                                        <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-zinc-300">
                                            <span>{nutri.name}</span>
                                            <span className="text-gray-400 dark:text-zinc-500">
                                                <span className={`${nutri.textColor}`}>{nutri.current}g</span> / {nutri.target}g
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-zinc-950 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`${nutri.barColor} h-full rounded-full`}
                                                style={{ width: `${nutri.pct}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nutrition Balanced Pill & Boxes */}
                        <div className="space-y-4 mt-6">

                            {/* Balanced Badge Tag */}
                            <div className="inline-flex items-center space-x-2 px-3.5 py-2.5 bg-[#EFF7F4] dark:bg-emerald-950/20 text-[#1F7A54] dark:text-emerald-400 text-xs font-bold rounded-xl border border-emerald-100/50 dark:border-emerald-900/30">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{badge}</span>
                            </div>

                            {/* Gram Details Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                {nutrients.map((nutri, idx) => (
                                    <div key={idx} className={`${nutri.name === 'Protein' ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-100/20 dark:border-blue-900/10' :
                                            nutri.name === 'Lemak' ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-100/20 dark:border-amber-900/10' :
                                                'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-100/20 dark:border-emerald-900/10'
                                        } p-3 rounded-xl text-center border`}>
                                        <p className={`text-base font-extrabold ${nutri.name === 'Protein' ? 'text-blue-600 dark:text-blue-400' :
                                                nutri.name === 'Lemak' ? 'text-amber-600 dark:text-amber-400' :
                                                    'text-emerald-600 dark:text-emerald-400'
                                            }`}>{nutri.current}g</p>
                                        <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase mt-0.5">{nutri.name}</p>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                    {/* Left Pane (Under Photo): Health Insight */}
                    <div className="lg:col-span-5 bg-[#EFF7F4] dark:bg-emerald-950/10 p-6 rounded-3xl border border-emerald-100/50 dark:border-emerald-900/20 space-y-3 flex flex-col justify-center min-h-[160px]">
                        <div className="flex items-center space-x-2 text-[#1F7A54] dark:text-emerald-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h4 className="text-sm font-extrabold uppercase tracking-wider">Health Insight</h4>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-zinc-300 leading-relaxed">
                            {insight}
                        </p>
                    </div>

                    {/* Right Pane (Under Stats): Recommendations List */}
                    <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800/80 shadow-sm space-y-4">
                        <div className="flex items-center space-x-2 text-orange-500">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.25.59 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.17 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.93c-.77-.56-.372-1.81.59-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
                            </svg>
                            <h4 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">Rekomendasi</h4>
                        </div>

                        <div className="space-y-2">
                            {recommendations.map((rec, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl border ${rec.color}`}
                                >
                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    <span className="text-xs font-bold leading-none">{rec.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Action Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 dark:border-zinc-800/80">
                        <Link
                            href={route('scan')}
                            className="flex-1 sm:flex-initial px-8 py-3.5 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-850 hover:bg-gray-50 text-[#1F7A54] dark:text-emerald-400 font-extrabold text-sm rounded-xl text-center transition-all shadow-sm"
                        >
                            Scan Lagi
                        </Link>
                        <Link
                            href={route('dashboard')}
                            className="flex-1 sm:flex-initial ml-auto px-8 py-3.5 bg-[#1F7A54] hover:bg-[#186041] text-white font-extrabold text-sm rounded-xl text-center shadow-lg shadow-[#1F7A54]/10 transition-all"
                        >
                            Lihat Riwayat
                        </Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

