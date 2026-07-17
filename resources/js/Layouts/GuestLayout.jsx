import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F4F9F6] pt-12 sm:justify-center sm:pt-0 dark:bg-zinc-950 transition-colors duration-300">
            <div className="mb-6">
                <Link href="/" className="flex flex-col items-center justify-center space-y-1 group">
                    <div className="flex items-center space-x-2">
                        <div className="bg-[#1F7A54] p-1.5 rounded-xl flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        </div>
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            <span className="text-[#1F7A54]">si</span>
                            <span className="text-orange-500">Gizi</span>
                        </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Nutrisi Untuk Hidup Lebih Baik</span>
                </Link>
            </div>

            <div className="w-full sm:max-w-md bg-white dark:bg-zinc-900 px-8 py-10 shadow-sm border border-emerald-100/50 dark:border-zinc-800/80 rounded-3xl overflow-hidden transition-all duration-300">
                {children}
            </div>
        </div>
    );
}

