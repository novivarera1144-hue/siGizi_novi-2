// app/dashboard/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import EmptyDashboard from '@/resources/js/components/EmptyDashboard';

export default function DashboardPage() {
    const [scanHistory, setScanHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setIsLoading(true);
                // Fetch data dari endpoint yang sudah ditentukan
                const response = await fetch('/api/user/scan-history');

                if (!response.ok) {
                    throw new Error('Gagal mengambil data dari server');
                }

                const data = await response.json();

                // Pastikan data yang diset adalah array
                setScanHistory(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Gagal mengambil riwayat scan:", error);
                // Set empty array jika terjadi error agar jatuh ke empty state
                setScanHistory([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    // KONDISI 1: Loading State (Skeleton / Spinner)
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[75vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-100 border-t-green-600"></div>
            </div>
        );
    }

    // KONDISI 2: Empty State
    if (!scanHistory || scanHistory.length === 0) {
        return <EmptyDashboard userName="Novi" />;
    }

    // KONDISI 3: Dashboard Penuh (Ada Riwayat Scan)
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* --- HEADER --- */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">Dashboard</p>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Selamat pagi, Novi 👋</h1>
                    <p className="text-gray-500 mt-1 text-sm">Minggu, 18 Juni 2025</p>
                </div>
                <Link
                    href="/scan"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm shadow-green-600/20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                    Scan Makanan
                </Link>
            </div>

            {/* --- STATISTIK NUTRISI --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Kalori */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                    <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                        {/* Icon Api / Kalori */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Kalori Hari Ini</p>
                        <div className="flex items-baseline gap-1">
                            <h2 className="text-3xl font-bold text-gray-900">1,248</h2>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Target: 2.000 kkal</p>
                    </div>
                </div>

                {/* Protein */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                        {/* Icon Air / Protein */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Protein</p>
                        <div className="flex items-baseline gap-1">
                            <h2 className="text-3xl font-bold text-gray-900">68g</h2>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Target: 90g</p>
                    </div>
                </div>

                {/* Lemak */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                    <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center mb-4">
                        {/* Icon Lemak */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Lemak</p>
                        <div className="flex items-baseline gap-1">
                            <h2 className="text-3xl font-bold text-gray-900">42g</h2>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Target: 65g</p>
                    </div>
                </div>

                {/* Karbohidrat */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                    <div className="w-11 h-11 rounded-xl bg-green-50 text-green-500 flex items-center justify-center mb-4">
                        {/* Icon Karbohidrat */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Karbohidrat</p>
                        <div className="flex items-baseline gap-1">
                            <h2 className="text-3xl font-bold text-gray-900">156g</h2>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Target: 250g</p>
                    </div>
                </div>
            </div>

            {/* --- GRID KONTEN BAWAH --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Kolom Kiri: Progress Bar Nutrisi */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Nutrisi Hari Ini</h2>
                        <span className="text-xs font-semibold tracking-widest text-gray-400">18 JUN 2025</span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2"><span className="font-semibold text-gray-700">Kalori</span><span className="text-gray-500">1248 / 2000g <span className="font-medium text-gray-800 ml-1">(62%)</span></span></div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2"><span className="font-semibold text-gray-700">Protein</span><span className="text-gray-500">68 / 90g <span className="font-medium text-gray-800 ml-1">(76%)</span></span></div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '76%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2"><span className="font-semibold text-gray-700">Lemak</span><span className="text-gray-500">42 / 65g <span className="font-medium text-gray-800 ml-1">(65%)</span></span></div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2"><span className="font-semibold text-gray-700">Karbohidrat</span><span className="text-gray-500">156 / 250g <span className="font-medium text-gray-800 ml-1">(62%)</span></span></div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan: Riwayat Terbaru */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Riwayat Terbaru</h2>
                        <Link href="/riwayat" className="text-sm font-semibold text-green-600 hover:text-green-700">
                            Lihat semua
                        </Link>
                    </div>

                    <div className="flex-1 space-y-3">
                        {scanHistory.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100 cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center text-gray-400 text-xs">
                                        Img
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{item.food_name}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.calories || 0} kkal • {item.time || '-'}</p>
                                    </div>
                                </div>
                                <div className={`px-2.5 py-1 rounded-md text-xs font-bold ${item.score >= 90 ? 'bg-green-100 text-green-700' :
                                    item.score >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {item.score || 0}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
