import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function KelolaPengguna({ initialUsers }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('Semua');

    const [users, setUsers] = useState(initialUsers || [
        { id: 1, name: "Budi Raharjo", email: "budi@gmail.com", role: "Pengguna", status: "Aktif", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400" },
        { id: 2, name: "Siti Aminah", email: "siti@gmail.com", role: "Pengguna", status: "Aktif", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400" },
        { id: 3, name: "Administrator Utama", email: "admin@sigizi.com", role: "Admin", status: "Aktif", statusColor: "text-[#1F7A54] bg-emerald-100 dark:bg-[#34D399]/20 dark:text-[#34D399]" },
        { id: 4, name: "Iwan Setiawan", email: "iwan.s@gmail.com", role: "Pengguna", status: "Ditangguhkan", statusColor: "text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400" },
        { id: 5, name: "Novi Aulia", email: "novi@sigizi.com", role: "Admin", status: "Aktif", statusColor: "text-[#1F7A54] bg-emerald-100 dark:bg-[#34D399]/20 dark:text-[#34D399]" },
    ]);

    // State untuk Modal Edit
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // State untuk Modal Tambah Pengguna Baru
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Pengguna' });

    // Fungsi Toggle Status Aktif / Ditangguhkan
    const handleToggleStatus = (id) => {
        setUsers(users.map(u => {
            if (u.id === id) {
                const isAktif = u.status === 'Aktif';
                return {
                    ...u,
                    status: isAktif ? 'Ditangguhkan' : 'Aktif',
                    statusColor: isAktif
                        ? 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400'
                        : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400'
                };
            }
            return u;
        }));
    };

    // Handler Edit
    const handleOpenEdit = (user) => {
        setSelectedUser({ ...user });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    // Handler Tambah Pengguna Baru
    const handleAddUser = (e) => {
        e.preventDefault();
        const newEntry = {
            id: users.length + 1,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: 'Aktif',
            statusColor: newUser.role === 'Admin'
                ? 'text-[#1F7A54] bg-emerald-100 dark:bg-[#34D399]/20 dark:text-[#34D399]'
                : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400'
        };
        setUsers([newEntry, ...users]);
        setNewUser({ name: '', email: '', role: 'Pengguna' });
        setIsAddModalOpen(false);
    };

    // Pagination State & Logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Reset page to 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, roleFilter]);

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'Semua' || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <AdminLayout
            activePage="kelola-pengguna"
            title="Kelola Pengguna"
            subtitle="Daftar pengguna terdaftar di sistem siGizi."
        >
            <Head title="Kelola Pengguna - Admin" />

            <div className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-6">
                {/* Control bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                    <div className="flex flex-1 flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Cari nama atau email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-100 dark:border-[#1a2e22] rounded-xl py-2.5 pl-9 pr-4 text-xs font-semibold text-gray-600 dark:text-emerald-100 placeholder-gray-400 focus:outline-none focus:border-[#1F7A54]"
                            />
                            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="bg-gray-50 dark:bg-[#07130C] border border-gray-100 dark:border-[#1a2e22] rounded-xl py-2.5 px-4 text-xs font-bold text-gray-600 dark:text-emerald-100 focus:outline-none focus:border-[#1F7A54] cursor-pointer"
                        >
                            <option value="Semua">Semua Peran</option>
                            <option value="Pengguna">Pengguna</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="py-2.5 px-4 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] text-xs font-bold rounded-xl transition duration-150 flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
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
                            <tr className="border-b border-gray-100 dark:border-emerald-950/40 text-[10px] sm:text-[11px] text-gray-400 uppercase font-extrabold">
                                <th className="py-3 px-2 sm:px-4">Nama</th>
                                <th className="py-3 px-4 hidden md:table-cell">Email</th>
                                <th className="py-3 px-2 sm:px-4">Peran</th>
                                <th className="py-3 px-2 sm:px-4">Status</th>
                                <th className="py-3 px-2 sm:px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-emerald-950/20">
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-[#182b1f]/20 transition-colors text-xs sm:text-sm">
                                        <td className="py-3.5 px-2 sm:px-4 font-bold text-gray-900 dark:text-white">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-900 dark:text-white">{u.name}</span>
                                                <span className="text-[10px] text-slate-400 dark:text-emerald-100/40 font-normal md:hidden mt-0.5 break-all">{u.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-500 dark:text-emerald-100/60 font-medium hidden md:table-cell">{u.email}</td>
                                        <td className="py-3.5 px-2 sm:px-4 font-semibold text-gray-700 dark:text-emerald-100/80">{u.role}</td>
                                        <td className="py-3.5 px-2 sm:px-4">
                                            <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-extrabold rounded-full ${u.statusColor}`}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-2 sm:px-4 text-right">
                                            <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-1.5 sm:gap-3">
                                                <button
                                                    onClick={() => handleOpenEdit(u)}
                                                    className="text-xs font-bold text-[#1F7A54] dark:text-emerald-400 hover:underline cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(u.id)}
                                                    className={`text-xs font-bold hover:underline cursor-pointer ${u.status === 'Aktif' ? 'text-red-500' : 'text-[#1F7A54] dark:text-emerald-400'
                                                        }`}
                                                >
                                                    {u.status === 'Aktif' ? 'Tangguhkan' : 'Aktifkan'}
                                                </button>
                                            </div>
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-100 dark:border-[#1a2e22]/50">
                        <div className="text-[11px] sm:text-xs text-gray-500 dark:text-emerald-100/50 font-medium">
                            Menampilkan <span className="font-semibold text-gray-800 dark:text-emerald-300">{startIndex + 1}</span>-
                            <span className="font-semibold text-gray-800 dark:text-emerald-300">{startIndex + paginatedUsers.length}</span> dari{" "}
                            <span className="font-semibold text-gray-800 dark:text-emerald-300">{totalItems}</span> pengguna
                        </div>
                        <div className="flex items-center gap-1.5">
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={safeCurrentPage === 1}
                                className={`w-8 h-8 text-sm font-extrabold transition flex items-center justify-center ${
                                    safeCurrentPage === 1
                                        ? 'text-gray-300 dark:text-emerald-950/40 cursor-not-allowed'
                                        : 'text-[#1F7A54] dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 cursor-pointer'
                                }`}
                            >
                                ←
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 rounded-full text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                                        page === safeCurrentPage
                                            ? 'bg-[#1F7A54] dark:bg-[#34D399] text-white dark:text-[#040C07]'
                                            : 'text-slate-600 dark:text-emerald-200 hover:bg-gray-100 dark:hover:bg-emerald-950/30'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={safeCurrentPage === totalPages}
                                className={`w-8 h-8 text-sm font-extrabold transition flex items-center justify-center ${
                                    safeCurrentPage === totalPages
                                        ? 'text-gray-300 dark:text-emerald-950/40 cursor-not-allowed'
                                        : 'text-[#1F7A54] dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 cursor-pointer'
                                }`}
                            >
                                →
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL TAMBAH PENGGUNA */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-[#122017] border border-gray-100 dark:border-[#1a2e22] rounded-3xl max-w-md w-full p-6 space-y-5 shadow-xl">
                        <div className="flex justify-between items-center border-b border-gray-100 dark:border-emerald-950/40 pb-3">
                            <h3 className="text-base font-bold text-gray-800 dark:text-white">Tambah Pengguna Baru</h3>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-sm font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-wider uppercase block mb-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Andi Pratama"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs font-semibold text-gray-700 dark:text-emerald-100 focus:outline-none focus:border-[#1F7A54]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-wider uppercase block mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Contoh: andi@gmail.com"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs font-semibold text-gray-700 dark:text-emerald-100 focus:outline-none focus:border-[#1F7A54]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-wider uppercase block mb-1">
                                    Peran (Role)
                                </label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs font-semibold text-gray-700 dark:text-emerald-100 focus:outline-none focus:border-[#1F7A54]"
                                >
                                    <option value="Pengguna">Pengguna</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex justify-end space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 bg-gray-100 dark:bg-[#1a2e22] hover:bg-gray-200 text-gray-600 dark:text-emerald-200 text-xs font-bold rounded-xl transition cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
                                >
                                    Simpan Pengguna
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL EDIT PENGGUNA */}
            {isEditModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-[#122017] border border-gray-100 dark:border-[#1a2e22] rounded-3xl max-w-md w-full p-6 space-y-5 shadow-xl">
                        <div className="flex justify-between items-center border-b border-gray-100 dark:border-emerald-950/40 pb-3">
                            <h3 className="text-base font-bold text-gray-800 dark:text-white">Edit Pengguna</h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-sm font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-wider uppercase block mb-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={selectedUser.name}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs font-semibold text-gray-700 dark:text-emerald-100 focus:outline-none focus:border-[#1F7A54]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-wider uppercase block mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={selectedUser.email}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs font-semibold text-gray-700 dark:text-emerald-100 focus:outline-none focus:border-[#1F7A54]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-wider uppercase block mb-1">
                                    Peran (Role)
                                </label>
                                <select
                                    value={selectedUser.role}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs font-semibold text-gray-700 dark:text-emerald-100 focus:outline-none focus:border-[#1F7A54]"
                                >
                                    <option value="Pengguna">Pengguna</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex justify-end space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 bg-gray-100 dark:bg-[#1a2e22] hover:bg-gray-200 text-gray-600 dark:text-emerald-200 text-xs font-bold rounded-xl transition cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}