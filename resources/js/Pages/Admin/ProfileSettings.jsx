import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function ProfileSettings() {
    const { auth, flash } = usePage().props;
    const user = auth?.user || { name: 'Administrator', email: 'admin@sigizi.com', avatar: null };

    // Form data untuk update profil & foto profil
    const profileForm = useForm({
        name: user.name,
        email: user.email,
        avatar: null,
        remove_avatar: false, // Tambahan flag untuk menghapus foto di backend jika diperlukan
    });

    // Preview foto profil lokal
    const [avatarPreview, setAvatarPreview] = useState(user.avatar || null);
    const fileInputRef = useRef(null);

    // Form data untuk update password
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // State untuk 2FA Toggle
    const [is2faEnabled, setIs2faEnabled] = useState(user.two_factor_enabled || false);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            profileForm.setData('avatar', file);
            profileForm.setData('remove_avatar', false);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    // Fungsi untuk menghapus foto profil
    const handleRemoveAvatar = () => {
        profileForm.setData('avatar', null);
        profileForm.setData('remove_avatar', true);
        setAvatarPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post(route('admin.profile.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('admin.profile.password'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    const handleLogoutOtherDevices = () => {
        alert('Fitur Log Out perangkat lain berhasil dipicu.');
    };

    const toggle2fa = () => {
        setIs2faEnabled(!is2faEnabled);
    };

    return (
        <AdminLayout
            activePage="settings"
            title="Pengaturan Profil"
            subtitle="Kelola informasi akun, foto profil, keamanan, dan sesi perangkat administrator siGizi."
        >
            <Head title="Pengaturan Profil - Admin siGizi" />

            <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
                {/* NOTIFICATION MESSAGES */}
                {flash?.success && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200/60 dark:bg-[#102A1C]/50 dark:border-[#1E4D34]/50 text-emerald-800 dark:text-emerald-300 rounded-2xl flex items-start gap-3 shadow-sm transition-all duration-300">
                        <svg className="w-5 h-5 text-[#1F7A54] dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-xs font-bold leading-relaxed">{flash.success}</div>
                    </div>
                )}

                {flash?.error && (
                    <div className="p-4 bg-red-50 border border-red-200/60 dark:bg-red-950/20 dark:border-red-900/40 text-red-800 dark:text-red-300 rounded-2xl flex items-start gap-3 shadow-sm transition-all duration-300">
                        <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div className="text-xs font-bold leading-relaxed">{flash.error}</div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* LEFT PANEL: PROFILE CARD & OVERVIEW */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm text-center">
                            <div className="relative w-24 h-24 mx-auto mb-4">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Foto Profil" className="w-24 h-24 rounded-full object-cover shadow-md mx-auto" />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-[#1F7A54] dark:bg-[#34D399] text-white dark:text-[#040C07] flex items-center justify-center font-extrabold text-3xl shadow-md mx-auto">
                                        {profileForm.data.name ? profileForm.data.name.charAt(0).toUpperCase() : 'A'}
                                    </div>
                                )}
                            </div>
                            <h3 className="text-base font-extrabold text-gray-900 dark:text-white truncate">{profileForm.data.name}</h3>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-semibold truncate mt-0.5">{profileForm.data.email}</p>
                            <div className="mt-4 inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                Administrator
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: EDIT FORMS & ADVANCED FEATURES */}
                    <div className="md:col-span-2 space-y-8">
                        {/* FORM 1: INFORMASI PROFIL & UPLOAD FOTO PROFIL */}
                        <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                            <h2 className="text-sm font-extrabold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">Informasi Profil & Foto Profil</h2>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-semibold mb-6">Perbarui informasi profil dasar, email, dan unggah foto profil admin.</p>

                            <form onSubmit={submitProfile} className="space-y-6">
                                <div className="space-y-4">
                                    {/* Upload Foto Profil Input dengan Tombol Hapus */}
                                    <div>
                                        <label className="block text-[10px] font-extrabold text-gray-400 dark:text-emerald-500 uppercase tracking-widest mb-2">Foto Profil</label>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                className="w-full sm:w-auto text-xs text-gray-500 dark:text-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-950/60 dark:file:text-emerald-400 hover:file:bg-emerald-100 cursor-pointer"
                                            />
                                            {avatarPreview && (
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveAvatar}
                                                    className="px-3.5 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl transition duration-150 flex items-center gap-1.5"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Hapus Foto
                                                </button>
                                            )}
                                        </div>
                                        {profileForm.errors.avatar && (
                                            <span className="text-xs text-red-500 font-medium mt-1.5 block">{profileForm.errors.avatar}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-extrabold text-gray-400 dark:text-emerald-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            value={profileForm.data.name}
                                            onChange={(e) => profileForm.setData('name', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 dark:bg-[#071A0E] dark:border-[#1a2e22] text-xs font-semibold text-gray-700 dark:text-emerald-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-500 transition-colors"
                                            required
                                        />
                                        {profileForm.errors.name && (
                                            <span className="text-xs text-red-500 font-medium mt-1.5 block">{profileForm.errors.name}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-extrabold text-gray-400 dark:text-emerald-500 uppercase tracking-widest mb-2">Alamat Email</label>
                                        <input
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={(e) => profileForm.setData('email', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 dark:bg-[#071A0E] dark:border-[#1a2e22] text-xs font-semibold text-gray-700 dark:text-emerald-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-500 transition-colors"
                                            required
                                        />
                                        {profileForm.errors.email && (
                                            <span className="text-xs text-red-500 font-medium mt-1.5 block">{profileForm.errors.email}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end border-t border-gray-50 dark:border-[#1a2e22]/50 pt-5">
                                    <button
                                        type="submit"
                                        disabled={profileForm.processing}
                                        className="py-2.5 px-6 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] text-xs font-bold rounded-xl shadow-sm transition duration-150 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {profileForm.processing && (
                                            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        )}
                                        <span>Simpan Profil</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* FORM 2: UPDATE PASSWORD */}
                        <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm">
                            <h2 className="text-sm font-extrabold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">Perbarui Kata Sandi</h2>
                            <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-semibold mb-6">Pastikan akun Anda menggunakan kata sandi yang kuat dan aman.</p>

                            <form onSubmit={submitPassword} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-extrabold text-gray-400 dark:text-emerald-500 uppercase tracking-widest mb-2">Kata Sandi Saat Ini</label>
                                        <input
                                            type="password"
                                            value={passwordForm.data.current_password}
                                            onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 dark:bg-[#071A0E] dark:border-[#1a2e22] text-xs font-semibold text-gray-700 dark:text-emerald-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-500 transition-colors"
                                            required
                                        />
                                        {passwordForm.errors.current_password && (
                                            <span className="text-xs text-red-500 font-medium mt-1.5 block">{passwordForm.errors.current_password}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-extrabold text-gray-400 dark:text-emerald-500 uppercase tracking-widest mb-2">Kata Sandi Baru</label>
                                        <input
                                            type="password"
                                            value={passwordForm.data.password}
                                            onChange={(e) => passwordForm.setData('password', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 dark:bg-[#071A0E] dark:border-[#1a2e22] text-xs font-semibold text-gray-700 dark:text-emerald-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-500 transition-colors"
                                            required
                                        />
                                        {passwordForm.errors.password && (
                                            <span className="text-xs text-red-500 font-medium mt-1.5 block">{passwordForm.errors.password}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-extrabold text-gray-400 dark:text-emerald-500 uppercase tracking-widest mb-2">Konfirmasi Kata Sandi Baru</label>
                                        <input
                                            type="password"
                                            value={passwordForm.data.password_confirmation}
                                            onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 dark:bg-[#071A0E] dark:border-[#1a2e22] text-xs font-semibold text-gray-700 dark:text-emerald-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-500 transition-colors"
                                            required
                                        />
                                        {passwordForm.errors.password_confirmation && (
                                            <span className="text-xs text-red-500 font-medium mt-1.5 block">{passwordForm.errors.password_confirmation}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end border-t border-gray-50 dark:border-[#1a2e22]/50 pt-5">
                                    <button
                                        type="submit"
                                        disabled={passwordForm.processing}
                                        className="py-2.5 px-6 bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#34D399] dark:hover:bg-emerald-500 text-white dark:text-[#040C07] text-xs font-bold rounded-xl shadow-sm transition duration-150 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {passwordForm.processing && (
                                            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        )}
                                        <span>Ganti Password</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* FITUR: AUTENTIKASI DUA FAKTOR (2FA) */}
                        <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-extrabold text-gray-900 dark:text-white mb-1 uppercase tracking-wider">Autentikasi Dua Faktor (2FA)</h2>
                                <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-semibold">Tambahkan lapisan keamanan ekstra ke akun admin menggunakan verifikasi Google Authenticator.</p>
                            </div>
                            <button
                                onClick={toggle2fa}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${is2faEnabled
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-gray-200 dark:bg-emerald-950/60 text-gray-700 dark:text-emerald-400'
                                    }`}
                            >
                                {is2faEnabled ? 'Aktif' : 'Nonaktif'}
                            </button>
                        </div>

                        {/* FITUR: MANAJEMEN SESI / PERANGKAT AKTIF */}
                        <div className="bg-white dark:bg-[#122017] p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4">
                            <div>
                                <h2 className="text-sm font-extrabold text-gray-900 dark:text-white mb-1 uppercase tracking-wider">Perangkat Aktif & Sesi Browser</h2>
                                <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-semibold">Kelola dan akhiri sesi aktif Anda di browser atau perangkat lain.</p>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#071A0E] rounded-2xl border border-gray-100 dark:border-[#1a2e22]">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-[#1F7A54] dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800 dark:text-emerald-100">Windows • Chrome (Sesi Saat Ini)</p>
                                            <p className="text-[10px] text-gray-400 dark:text-emerald-100/40">IP: 127.0.0.1 • Aktif Sekarang</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">Perangkat Ini</span>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    onClick={handleLogoutOtherDevices}
                                    className="py-2 px-4 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl transition duration-150 cursor-pointer"
                                >
                                    Log Out Dari Perangkat Lain
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}