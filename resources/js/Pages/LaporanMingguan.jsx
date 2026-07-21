import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

export default function LaporanMingguan({ auth }) {
    // Data untuk Kalori Harian vs Target
    const barData = [
        { name: 'Sen', Aktual: 1850, Target: 2000 },
        { name: 'Sel', Aktual: 2100, Target: 2000 },
        { name: 'Rab', Aktual: 1720, Target: 2000 },
        { name: 'Kam', Aktual: 1950, Target: 2000 },
        { name: 'Jum', Aktual: 2250, Target: 2000 },
        { name: 'Sab', Aktual: 1640, Target: 2000 },
        { name: 'Min', Aktual: 1248, Target: 2000 },
    ];

    // Data untuk Tren Nutrisi Minggu Ini
    const lineData = [
        { name: 'Sen', Protein: 70, Lemak: 65, Karbo: 230 },
        { name: 'Sel', Protein: 85, Lemak: 70, Karbo: 270 },
        { name: 'Rab', Protein: 65, Lemak: 50, Karbo: 210 },
        { name: 'Kam', Protein: 78, Lemak: 60, Karbo: 250 },
        { name: 'Jum', Protein: 90, Lemak: 75, Karbo: 280 },
        { name: 'Sab', Protein: 60, Lemak: 45, Karbo: 200 },
        { name: 'Min', Protein: 68, Lemak: 42, Karbo: 156 },
    ];

    // Data untuk Keseimbangan Nutrisi (Radar)
    const radarData = [
        { subject: 'Kalori', A: 85, fullMark: 100 },
        { subject: 'Protein', A: 76, fullMark: 100 },
        { subject: 'Lemak', A: 65, fullMark: 100 },
        { subject: 'Karbohidrat', A: 90, fullMark: 100 },
        { subject: 'Serat', A: 60, fullMark: 100 },
        { subject: 'Vitamin', A: 70, fullMark: 100 },
    ];

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Laporan Mingguan" />

            <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
                {/* Header */}
                <div>
                    <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">Laporan Mingguan</p>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Statistik Nutrisi Minggu Ini</h1>
                    <p className="text-gray-500 mt-1 text-sm">12 Jun - 18 Jun 2025</p>
                </div>

                {/* Grid 4 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Rata-rata Kalori */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                        <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Rata-rata Kalori</p>
                            <h2 className="text-3xl font-bold text-gray-900">1824 <span className="text-sm font-medium text-gray-500">kkal/hari</span></h2>
                        </div>
                    </div>
                    {/* Avg Protein */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Avg Protein</p>
                            <h2 className="text-3xl font-bold text-gray-900">76g <span className="text-sm font-medium text-gray-500">per hari</span></h2>
                        </div>
                    </div>
                    {/* Hari Terpenuhi */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                        <div className="w-11 h-11 rounded-xl bg-green-50 text-green-500 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Hari Terpenuhi</p>
                            <h2 className="text-3xl font-bold text-gray-900">5/7 <span className="text-sm font-medium text-gray-500">target kalori</span></h2>
                        </div>
                    </div>
                    {/* Skor Rata-rata */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                        <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Skor Rata-rata</p>
                            <h2 className="text-3xl font-bold text-gray-900">83 <span className="text-sm font-medium text-gray-500">dari 100</span></h2>
                        </div>
                    </div>
                </div>

                {/* Kalori Harian vs Target */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Kalori Harian vs Target</h2>
                    </div>
                    <div className="w-full h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} ticks={[0, 600, 1200, 1800, 2400]} />
                                <Tooltip
                                    cursor={{ fill: '#f9fafb' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Bar dataKey="Aktual" fill="#1F7A54" radius={[4, 4, 0, 0]} barSize={40} />
                                <Bar dataKey="Target" fill="#f3f4f6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tren Nutrisi Minggu Ini */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Tren Nutrisi Minggu Ini</h2>
                    </div>
                    <div className="w-full h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} ticks={[0, 70, 140, 210, 280]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="Protein" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} name="Protein (g)" />
                                <Line type="monotone" dataKey="Lemak" stroke="#eab308" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} name="Lemak (g)" />
                                <Line type="monotone" dataKey="Karbo" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} name="Karbo (g)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Keseimbangan Nutrisi & Ringkasan */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Keseimbangan Nutrisi */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition">
                        <h2 className="text-lg font-bold text-gray-900 mb-2">Keseimbangan Nutrisi</h2>
                        <div className="flex-1 w-full flex items-center justify-center min-h-[300px]">
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="Skor Nutrisi" dataKey="A" stroke="#1F7A54" strokeWidth={2} fill="#1F7A54" fillOpacity={0.2} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Ringkasan Minggu Ini */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Minggu Ini</h2>
                        <div className="flex-1 flex flex-col justify-center space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                <span className="text-sm font-medium text-gray-500">Total kalori dikonsumsi</span>
                                <span className="text-sm font-bold text-[#1F7A54] flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    12,768 kkal
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                <span className="text-sm font-medium text-gray-500">Hari mencapai target</span>
                                <span className="text-sm font-bold text-[#1F7A54] flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    5 dari 7 hari
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                <span className="text-sm font-medium text-gray-500">Hari kelebihan kalori</span>
                                <span className="text-sm font-bold text-yellow-500 flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    2 hari (Sel & Jum)
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                <span className="text-sm font-medium text-gray-500">Makanan di-scan</span>
                                <span className="text-sm font-bold text-[#1F7A54] flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    14 makanan
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-500">Rata-rata skor makanan</span>
                                <span className="text-sm font-bold text-[#1F7A54] flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    83 / 100
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
