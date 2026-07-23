import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function KelolaPengguna() {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('Semua');

    const users = [
        { name: "Budi Raharjo", email: "budi@gmail.com", role: "Pengguna", status: "Aktif", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400" },
        { name: "Siti Aminah", email: "siti@gmail.com", role: "Pengguna", status: "Aktif", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400" },
        { name: "Administrator Utama", email: "admin@sigizi.com", role: "Admin", status: "Aktif", statusColor: "text-[#1F7A54] bg-emerald-100 dark:bg-[#34D399]/20 dark:text-[#34D399]" },
        { name: "Iwan Setiawan", email: "iwan.s@gmail.com", role: "Pengguna", status: "Ditangguhkan", statusColor: "text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400" },
        { name: "Novi Aulia", email: "novi@sigizi.com", role: "Admin", status: "Aktif", statusColor: "text-[#1F7A54] bg-emerald-100 dark:bg-[#34D399]/20 dark:text-[#34D399]" },
    ];

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              u.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'Semua' || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <AdminLayout
            activePage="kelola-pengguna"
            title="Kelola Pengguna"
            subtitle="Daftar pengguna terdaftar di sistem siGizi."
        >
            <Head title="Kelola Pengguna - Admin" />

            <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-6">
                {/* Control bar: Search, Filter, Add button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                    <div className="flex flex-1 flex-col sm:flex-row gap-3">
                        {/* Search in-table */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Cari nama atau email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-100 dark:border-[#1a2e22] rounded-xl py-2.5 pl-9 pr-4 text-xs font-semibold text-gray-600 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-100/40 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#1F7A54] dark:focus:ring-emerald-500 transition-all"
                            />
                            <svg className="w-4 h-4 text-gray-400 dark:text-emerald-500/70 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Filter by role */}
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="bg-gray-50 dark:bg-[#07130C] border border-gray-100 dark:border-[#1a2e22] rounded-xl py-2.5 px-4 text-xs font-bold text-gray-600 dark:text-emerald-100 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-500 transition-all cursor-pointer"
                        >
                            <option value="Semua">Semua Peran</option>
                            <option value="Pengguna">Pengguna</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <button className="py-2.5 px-4 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] text-xs font-bold rounded-xl transition duration-150 flex items-center justify-center space-x-1.5 cursor-pointer">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Tambah Pengguna</span>
                    </button>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-emerald-950/40 text-[11px] text-gray-400 uppercase font-extrabold">
                                <th className="py-3 px-4">Nama</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Peran</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-emerald-950/20">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((u, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-[#182b1f]/20 transition-colors">
                                        <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{u.name}</td>
                                        <td className="py-3.5 px-4 text-gray-500 dark:text-emerald-100/60 font-medium">{u.email}</td>
                                        <td className="py-3.5 px-4 font-bold">{u.role}</td>
                                        <td className="py-3.5 px-4">
                                            <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full ${u.statusColor}`}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right space-x-3">
                                            <button className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 hover:underline cursor-pointer">
                                                Edit
                                            </button>
                                            <button className="text-xs font-bold text-red-500 hover:underline cursor-pointer">
                                                Tangguhkan
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-xs text-gray-400 dark:text-emerald-100/40 font-bold">
                                        Tidak ada data pengguna ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
