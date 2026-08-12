import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function PengaturanSistem() {
    const { data, setData, put, processing, errors } = useForm({
        app_name: 'siGizi',
        admin_email: 'noreply@sigizi.com',
        enable_2fa: true,
        maintenance_mode: false,
        session_timeout: 15,
    });

    // State interaktif untuk Daftar Admin & Modal
    const [admins, setAdmins] = useState([
        { id: 1, name: 'Novi', email: 'novi@sigizi.com', role: 'Admin Konten' },
        { id: 2, name: 'Nadin', email: 'nadin@sigizi.com', role: 'Super Admin' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null); // null artinya mode Tambah, jika ada isinya berarti mode Edit
    const [adminForm, setAdminForm] = useState({ name: '', email: '', role: 'Admin Konten', password: '' });

    const handleToggle = (name) => {
        setData(name, !data[name]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.pengaturan-update'), {
            preserveScroll: true,
            onSuccess: () => alert('Pengaturan berhasil disimpan.'),
            onError: () => alert('Terjadi kesalahan, silakan periksa kembali inputan.'),
        });
    };

    const handleResetData = () => {
        if (window.confirm("APAKAH ANDA YAKIN? Tindakan ini akan menghapus SEMUA data sistem secara permanen dan tidak dapat dibatalkan.")) {
            alert("Fitur Reset Data akan dijalankan.");
        }
    };

    // Fungsi interaktif buka modal Tambah
    const openAddModal = () => {
        setEditingAdmin(null);
        setAdminForm({ name: '', email: '', role: 'Admin Konten', password: '' });
        setIsModalOpen(true);
    };

    // Fungsi interaktif buka modal Edit
    const openEditModal = (admin) => {
        setEditingAdmin(admin);
        setAdminForm({ name: admin.name, email: admin.email, role: admin.role, password: '' });
        setIsModalOpen(true);
    };

    // Fungsi simpan data admin (Tambah / Edit)
    const handleSaveAdmin = (e) => {
        e.preventDefault();
        if (editingAdmin) {
            // Update admin
            setAdmins(admins.map(item => item.id === editingAdmin.id ? { ...item, ...adminForm } : item));
            alert(`Admin ${adminForm.name} berhasil diperbarui!`);
        } else {
            // Tambah admin baru
            const newAdmin = {
                id: Date.now(),
                ...adminForm,
            };
            setAdmins([...admins, newAdmin]);
            alert(`Admin ${adminForm.name} berhasil ditambahkan!`);
        }
        setIsModalOpen(false);
    };

    // Fungsi hapus admin
    const handleDeleteAdmin = (id, name) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus admin ${name}?`)) {
            setAdmins(admins.filter(item => item.id !== id));
            alert(`Admin ${name} berhasil dihapus.`);
        }
    };

    const ToggleSwitch = ({ checked, onChange, label, description }) => (
        <div
            onClick={onChange}
            className="flex items-center justify-between p-4 border border-gray-100 dark:border-[#1a2e22] rounded-2xl gap-4 cursor-pointer hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors"
        >
            <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">{label}</h4>
                {description && <p className="text-[10px] text-gray-400 dark:text-emerald-100/40 mt-0.5">{description}</p>}
            </div>
            <div
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${checked ? 'bg-[#1F7A54] dark:bg-[#34D399]' : 'bg-gray-300 dark:bg-[#071A0E]'
                    }`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </div>
        </div>
    );

    return (
        <AdminLayout
            activePage="pengaturan-sistem"
            title="Pengaturan Sistem"
            subtitle="Konfigurasi parameter inti, keamanan, dan notifikasi platform siGizi."
        >
            <Head title="Pengaturan Sistem - Admin" />

            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-10">

                {/* CARD 1: APLIKASI */}
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                    <h2 className="text-sm font-extrabold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">APLIKASI</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <div className="space-y-1 pt-1">
                                <label className="text-xs font-bold text-gray-900 dark:text-emerald-100">Nama Platform</label>
                                <p className="text-[10px] text-gray-400 dark:text-emerald-100/40 font-medium">Nama aplikasi yang ditampilkan ke pengguna</p>
                            </div>
                            <div className="md:col-span-2">
                                <input
                                    type="text"
                                    value={data.app_name}
                                    onChange={(e) => setData('app_name', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-emerald-100 dark:border-[#164D2B] bg-[#EFF7F4] dark:bg-[#071A0E] text-gray-800 dark:text-emerald-300 focus:outline-none focus:border-[#1F7A54] focus:ring-1 focus:ring-[#1F7A54] text-sm font-semibold"
                                    required
                                />
                                {errors.app_name && <p className="text-red-500 text-xs mt-1">{errors.app_name}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <div className="space-y-1 pt-1">
                                <label className="text-xs font-bold text-gray-900 dark:text-emerald-100">Email Pengirim Sistem (SMTP)</label>
                                <p className="text-[10px] text-gray-400 dark:text-emerald-100/40 font-medium">Email yang digunakan untuk mengirim notifikasi otomatis.</p>
                            </div>
                            <div className="md:col-span-2">
                                <input
                                    type="email"
                                    value={data.admin_email}
                                    onChange={(e) => setData('admin_email', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-emerald-100 dark:border-[#164D2B] bg-[#EFF7F4] dark:bg-[#071A0E] text-gray-800 dark:text-emerald-300 focus:outline-none focus:border-[#1F7A54] focus:ring-1 focus:ring-[#1F7A54] text-sm font-semibold"
                                    required
                                />
                                {errors.admin_email && <p className="text-red-500 text-xs mt-1">{errors.admin_email}</p>}
                            </div>
                        </div>

                        <ToggleSwitch
                            label="Mode Pemeliharaan"
                            description="Saat aktif, pengguna selain administrator tidak bisa mengakses aplikasi."
                            checked={data.maintenance_mode}
                            onChange={() => handleToggle('maintenance_mode')}
                        />

                        <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl">
                            <div>
                                <h4 className="text-xs font-bold text-gray-900 dark:text-white">API Gemini AI</h4>
                                <p className="text-[10px] text-gray-400 dark:text-emerald-100/40 mt-0.5">Integrasi kecerdasan buatan untuk analisis gizi makanan.</p>
                            </div>
                            <span className="px-3 py-1 bg-emerald-100 dark:bg-[#34D399]/20 text-[#1F7A54] dark:text-[#34D399] text-[10px] font-bold rounded-full border border-emerald-200 dark:border-[#34D399]/30">
                                Terhubung (Aktif)
                            </span>
                        </div>
                    </div>
                </div>

                {/* CARD 2: KEAMANAN */}
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                    <h2 className="text-sm font-extrabold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">KEAMANAN</h2>
                    <div className="space-y-6">
                        <ToggleSwitch
                            label="2FA untuk Admin"
                            description="Wajibkan autentikasi dua faktor (2FA) untuk login admin."
                            checked={data.enable_2fa}
                            onChange={() => handleToggle('enable_2fa')}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <div className="space-y-1 pt-1">
                                <label className="text-xs font-bold text-gray-900 dark:text-emerald-100">Session Timeout</label>
                                <p className="text-[10px] text-gray-400 dark:text-emerald-100/40 font-medium">Otomatis logout setelah admin tidak aktif sekian menit.</p>
                            </div>
                            <div className="md:col-span-2">
                                <select
                                    value={data.session_timeout}
                                    onChange={(e) => setData('session_timeout', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-emerald-100 dark:border-[#164D2B] bg-[#EFF7F4] dark:bg-[#071A0E] text-gray-800 dark:text-emerald-300 focus:outline-none focus:border-[#1F7A54] focus:ring-1 focus:ring-[#1F7A54] text-sm font-semibold cursor-pointer"
                                >
                                    <option value="5">5 menit</option>
                                    <option value="15">15 menit</option>
                                    <option value="30">30 menit</option>
                                    <option value="60">1 jam</option>
                                    <option value="1440">24 jam</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CARD 3: KELOLA AKUN ADMIN (INTERAKTIF) */}
                <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <h2 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">KELOLA AKUN ADMIN</h2>
                        <button
                            type="button"
                            onClick={openAddModal}
                            className="py-2 px-4 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] text-xs font-bold rounded-xl shadow-sm transition duration-150 cursor-pointer flex items-center gap-1.5"
                        >
                            <span>+ Tambah Admin Baru</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-[#1a2e22] text-[11px] text-gray-400 dark:text-emerald-100/40 uppercase">
                                    <th className="py-3 px-4 font-bold">Nama Admin</th>
                                    <th className="py-3 px-4 font-bold">Email</th>
                                    <th className="py-3 px-4 font-bold">Peran / Role</th>
                                    <th className="py-3 px-4 font-bold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-[#1a2e22]/50 text-xs">
                                {admins.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-4 text-center text-gray-400">Belum ada akun admin terdaftar.</td>
                                    </tr>
                                ) : (
                                    admins.map((admin) => (
                                        <tr key={admin.id} className="hover:bg-gray-50/50 dark:hover:bg-[#16291e]/40 transition-colors">
                                            <td className="py-3.5 px-4 font-bold text-gray-800 dark:text-emerald-200">{admin.name}</td>
                                            <td className="py-3.5 px-4 text-gray-500 dark:text-emerald-100/60">{admin.email}</td>
                                            <td className="py-3.5 px-4">
                                                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${admin.role === 'Super Admin'
                                                        ? 'bg-emerald-100 dark:bg-[#34D399]/20 text-[#1F7A54] dark:text-[#34D399] border-emerald-200 dark:border-[#34D399]/30'
                                                        : 'bg-gray-100 dark:bg-emerald-950/60 text-gray-600 dark:text-emerald-300 border-gray-200 dark:border-emerald-800'
                                                    }`}>
                                                    {admin.role}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 text-right space-x-3">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(admin)}
                                                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteAdmin(admin.id, admin.name)}
                                                    className="text-red-600 dark:text-red-400 font-semibold hover:underline cursor-pointer"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tombol Simpan Utama */}
                <div className="pt-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`py-3 px-6 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] font-bold text-sm rounded-xl shadow-md transition duration-150 cursor-pointer ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>

                {/* ZONA BERBAHAYA */}
                <div className="bg-red-50/50 dark:bg-red-950/10 p-6 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm mt-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl shrink-0">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-extrabold text-red-600 dark:text-red-400">Zona Berbahaya</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Reset data bersifat permanen dan tidak dapat dibatalkan.</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleResetData}
                            className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition duration-150 cursor-pointer shrink-0"
                        >
                            Reset Data
                        </button>
                    </div>
                </div>

            </form>

            {/* MODAL INTERAKTIF TAMBAH / EDIT ADMIN */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#122017] border border-gray-100 dark:border-[#1a2e22] w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#1a2e22] pb-4">
                            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                                {editingAdmin ? 'Edit Akun Admin' : 'Tambah Admin Baru'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold text-lg"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSaveAdmin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-emerald-100 mb-1">Nama Admin</label>
                                <input
                                    type="text"
                                    value={adminForm.name}
                                    onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-100 dark:border-[#164D2B] bg-[#EFF7F4] dark:bg-[#071A0E] text-gray-800 dark:text-emerald-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#1F7A54]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-emerald-100 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={adminForm.email}
                                    onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-100 dark:border-[#164D2B] bg-[#EFF7F4] dark:bg-[#071A0E] text-gray-800 dark:text-emerald-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#1F7A54]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-emerald-100 mb-1">Peran / Role</label>
                                <select
                                    value={adminForm.role}
                                    onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-100 dark:border-[#164D2B] bg-[#EFF7F4] dark:bg-[#071A0E] text-gray-800 dark:text-emerald-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#1F7A54]"
                                >
                                    <option value="Admin Konten">Admin Konten</option>
                                    <option value="Super Admin">Super Admin</option>
                                </select>
                            </div>

                            {!editingAdmin && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-emerald-100 mb-1">Password Sementara</label>
                                    <input
                                        type="password"
                                        value={adminForm.password}
                                        onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-100 dark:border-[#164D2B] bg-[#EFF7F4] dark:bg-[#071A0E] text-gray-800 dark:text-emerald-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#1F7A54]"
                                        required
                                    />
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-[#1a2e22]">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="py-2 px-4 bg-gray-200 dark:bg-[#16291e] hover:bg-gray-300 dark:hover:bg-[#1a3827] text-gray-700 dark:text-emerald-200 text-xs font-bold rounded-xl transition cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-5 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                                >
                                    {editingAdmin ? 'Simpan Perubahan' : 'Tambah Admin'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}