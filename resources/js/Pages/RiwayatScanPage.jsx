import { useState, useEffect } from 'react';
import { Search, ChevronRight, AlertCircle, ImageIcon } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function RiwayatScanPage({ scanHistory }) {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Semua');

    const tabs = ['Semua', 'Hari Ini', 'Minggu Ini', 'Bulan Ini'];

    useEffect(() => {
        // Murni mengambil data dari backend Laravel (Supabase) tanpa fallback ke MOCK_DATA
        if (scanHistory && Array.isArray(scanHistory)) {
            setHistory(scanHistory);
        } else {
            setHistory([]);
        }
        setIsLoading(false);
    }, [scanHistory]);

    // Helper untuk mewarnai badge skor sesuai aturan desain (#1F7A54) & Dark Mode
    const getScoreStyle = (score) => {
        if (score >= 90) return 'bg-[#1F7A54]/15 text-[#1F7A54] dark:bg-emerald-950/80 dark:text-emerald-400';
        if (score >= 70) return 'bg-yellow-100 text-yellow-700 dark:bg-amber-950/60 dark:text-amber-400';
        return 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400';
    };

    // Logika Filter (Search & Tabs)
    const filteredHistory = history.filter(item => {
        const matchSearch = item.food_name.toLowerCase().includes(searchQuery.toLowerCase());

        let matchTab = true;
        if (activeTab === 'Hari Ini') {
            matchTab = item.date === '18 Jun'; // Sesuaikan logika filter tanggal jika diperlukan
        } else if (activeTab === 'Minggu Ini') {
            matchTab = true; // Bisa disesuaikan dengan range tanggal asli
        } else if (activeTab === 'Bulan Ini') {
            matchTab = true;
        }

        return matchSearch && matchTab;
    });

    return (
        <AuthenticatedLayout>
            <Head title="Riwayat Scan" />
            {/* Memastikan background root menutupi seluruh layar dan menyatu sempurna dengan layout bawah */}
            <div className="-m-4 md:-m-8 min-h-[calc(100vh+4rem)] bg-slate-50 dark:bg-[#07110B] text-gray-900 dark:text-white transition-colors pb-32">
                <div className="p-4 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-500">

                    {/* --- HEADER --- */}
                    <div className="mb-8">
                        <p className="text-xs font-bold tracking-wider text-gray-400 dark:text-emerald-500/80 uppercase mb-1">
                            Riwayat
                        </p>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Riwayat Scan Makanan
                        </h1>
                    </div>

                    {/* --- FILTER & PENCARIAN --- */}
                    <div className="space-y-6 mb-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400 dark:text-emerald-600/70" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari makanan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#0C1E14] border border-gray-200 dark:border-emerald-900/50 rounded-2xl text-sm focus:border-[#1F7A54] dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] focus:ring-4 focus:ring-[#1F7A54]/10 dark:focus:ring-emerald-500/10 transition-all outline-none text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-600/70 shadow-sm"
                            />
                        </div>

                        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab
                                        ? 'bg-[#1F7A54] text-white shadow-md shadow-[#1F7A54]/20 dark:bg-[#20D080] dark:text-slate-950 dark:shadow-none'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 shadow-sm dark:bg-[#0C1E14] dark:text-gray-300 dark:border-emerald-900/60 dark:hover:bg-emerald-950/40'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- LIST ITEMS --- */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1F7A54]/20 border-t-[#1F7A54] dark:border-emerald-500/20 dark:border-t-emerald-500"></div>
                        </div>
                    ) : filteredHistory.length > 0 ? (
                        <div className="space-y-4">
                            {filteredHistory.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex items-center justify-between p-4 bg-white dark:bg-[#09170F] rounded-2xl shadow-sm border border-gray-100 dark:border-emerald-950/80 hover:border-[#1F7A54]/30 dark:hover:border-emerald-800/60 hover:shadow-md transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-emerald-950/40 flex items-center justify-center shrink-0 overflow-hidden border border-gray-100 dark:border-emerald-900/30">
                                            {item.image ? (
                                                <img src={item.image} alt={item.food_name} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-6 h-6 text-gray-300 dark:text-emerald-700" />
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-[#1F7A54] dark:group-hover:text-emerald-400 transition-colors">
                                                {item.food_name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-emerald-500/80 font-medium">
                                                <svg className="w-3.5 h-3.5 text-gray-400 dark:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{item.date}, {item.time}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-sm font-bold text-gray-700 dark:text-emerald-400">
                                                {item.calories} <span className="text-xs font-medium text-gray-400 dark:text-emerald-600">kkal</span>
                                            </p>
                                            <div className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold mt-1 ${getScoreStyle(item.score)}`}>
                                                {item.score}
                                            </div>
                                        </div>

                                        <div className="text-right sm:hidden">
                                            <p className="text-xs font-bold text-gray-700 dark:text-emerald-400 mb-1">
                                                {item.calories} <span className="text-[10px] text-gray-400 dark:text-emerald-600">kkal</span>
                                            </p>
                                            <div className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-bold ${getScoreStyle(item.score)}`}>
                                                {item.score}
                                            </div>
                                        </div>

                                        <ChevronRight className="w-5 h-5 text-gray-300 dark:text-emerald-800 group-hover:text-[#1F7A54] dark:group-hover:text-emerald-400 transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-white dark:bg-[#09170F] rounded-2xl border border-gray-100 dark:border-emerald-950/80 shadow-sm">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="w-8 h-8 text-gray-400 dark:text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Belum Ada Riwayat Scan</h3>
                            <p className="text-sm text-gray-500 dark:text-emerald-500/80 max-w-sm">
                                Kamu belum melakukan scan makanan apa pun. Yuk, mulai scan makanan pertamamu sekarang!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}