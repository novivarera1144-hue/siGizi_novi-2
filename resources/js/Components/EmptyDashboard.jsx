// components/EmptyDashboard.js
import Link from 'next/link';

export default function EmptyDashboard({ userName = "Budi" }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 animate-in fade-in duration-500">
            {/* Ilustrasi Center dengan Efek Modern */}
            <div className="relative w-56 h-56 mb-8 flex items-center justify-center">
                {/* Lingkaran Background Beranimasi */}
                <div className="absolute inset-0 bg-green-50 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute inset-6 bg-green-100 rounded-full opacity-80"></div>

                {/* Ikon Utama */}
                <div className="relative z-10 text-green-600 bg-white p-6 rounded-full shadow-md">
                    <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center tracking-tight">
                Selamat datang di siGizi, {userName}! 👋
            </h2>

            <p className="text-gray-500 mb-10 text-center max-w-md leading-relaxed text-sm md:text-base">
                Sepertinya piring nutrisimu masih kosong hari ini. Yuk, mulai scan makanan pertamamu untuk melihat analisis gizi harianmu di sini!
            </p>

            {/* Tombol CTA dengan Hover State */}
            <Link
                href="/scan"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-green-600 rounded-full overflow-hidden transition-all hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/30 hover:-translate-y-1"
            >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v4m-2-2h4" /> {/* Icon Plus ditambahkan di lensa */}
                </svg>
                <span>Mulai Scan Makanan</span>
            </Link>
        </div>
    );
}
