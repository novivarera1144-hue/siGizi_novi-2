import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Camera, Pencil, ChevronRight, Target, Bell, ShieldCheck, Star, LogOut, X, Eye, EyeOff, ChevronLeft, Send } from 'lucide-react';

export default function Edit({ auth }) {
    const user = auth.user;

    // --- State Management ---
    // View state: 'main', 'notifikasi', 'keamanan'
    const [activeView, setActiveView] = useState('main');

    // Modal states
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showGoalSettingModal, setShowGoalSettingModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);

    // Data states
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Budi Santoso',
        email: user?.email || 'budi@email.com',
        phone: '+62 812-3456-7890',
    });

    const [healthTarget, setHealthTarget] = useState({
        goal: 'Menjaga Berat Badan',
        targetCalories: '2,000',
        weight: 68,
        height: 170,
    });

    // Toggle states for Notifikasi
    const [notifSettings, setNotifSettings] = useState({
        harian: true,
        mingguan: true,
        artikel: false
    });

    // Security states
    const [showPassword, setShowPassword] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);

    // Review states
    const [rating, setRating] = useState(0);

    // Handlers
    const handleSaveProfile = () => setShowEditProfileModal(false);
    const handleSaveGoal = () => setShowGoalSettingModal(false);
    const handleSaveReview = () => setShowReviewModal(false);

    // Render Views
    const renderMainView = () => (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-300">
            {/* --- HEADER TITLE --- */}
            <div className="mb-8">
                <p className="text-xs font-bold tracking-wider text-gray-400 dark:text-emerald-500/80 uppercase mb-1">Profil</p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Profil & Pengaturan</h1>
            </div>

            {/* --- Kartu Profil Utama --- */}
            <div className="bg-white dark:bg-[#09170F] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 mb-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative overflow-hidden transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-950/30 rounded-bl-full -z-10 opacity-50"></div>

                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-4xl font-bold border-4 border-white dark:border-[#09170F] shadow-sm flex-shrink-0 relative">
                    {profileData.name.charAt(0).toUpperCase()}
                    <button
                        onClick={() => setShowEditProfileModal(true)}
                        className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-[#0C1E14] rounded-full flex items-center justify-center shadow border border-gray-100 dark:border-emerald-800/60 text-gray-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition"
                    >
                        <Pencil size={14} />
                    </button>
                </div>

                {/* Info Profil */}
                <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{profileData.name}</h2>
                    <p className="text-gray-500 dark:text-emerald-500/80 mb-3">{profileData.email}</p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-transparent dark:border-emerald-900/40">
                        Pengguna Aktif
                    </div>
                </div>

                {/* Tombol Edit Profil */}
                <button
                    onClick={() => setShowEditProfileModal(true)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-50 dark:bg-[#0C1E14] border border-gray-100 dark:border-emerald-800/50 text-gray-500 dark:text-emerald-400 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/40 hover:border-emerald-100 dark:hover:border-emerald-700 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors shrink-0 shadow-sm"
                >
                    <Pencil size={18} />
                </button>
            </div>

            {/* --- Kartu Target Kesehatan --- */}
            <div className="bg-white dark:bg-[#09170F] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 mb-8 transition-colors">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Target size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Target Kesehatan</h3>
                    </div>
                    <button
                        onClick={() => setShowGoalSettingModal(true)}
                        className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                    >
                        Edit
                    </button>
                </div>

                {/* Grid Info Target */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-[#0C1E14] p-4 rounded-2xl border border-gray-100 dark:border-emerald-900/40">
                        <p className="text-xs text-gray-400 dark:text-emerald-600/80 font-semibold uppercase tracking-wider mb-1">Tujuan</p>
                        <p className="font-bold text-gray-900 dark:text-white">{healthTarget.goal}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0C1E14] p-4 rounded-2xl border border-gray-100 dark:border-emerald-900/40">
                        <p className="text-xs text-gray-400 dark:text-emerald-600/80 font-semibold uppercase tracking-wider mb-1">Target Kalori</p>
                        <p className="font-bold text-gray-900 dark:text-white">{healthTarget.targetCalories} <span className="text-sm font-medium text-gray-500 dark:text-emerald-500/80">kkal/hari</span></p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0C1E14] p-4 rounded-2xl border border-gray-100 dark:border-emerald-900/40">
                        <p className="text-xs text-gray-400 dark:text-emerald-600/80 font-semibold uppercase tracking-wider mb-1">Berat Badan</p>
                        <p className="font-bold text-gray-900 dark:text-white">{healthTarget.weight} <span className="text-sm font-medium text-gray-500 dark:text-emerald-500/80">kg</span></p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0C1E14] p-4 rounded-2xl border border-gray-100 dark:border-emerald-900/40">
                        <p className="text-xs text-gray-400 dark:text-emerald-600/80 font-semibold uppercase tracking-wider mb-1">Tinggi Badan</p>
                        <p className="font-bold text-gray-900 dark:text-white">{healthTarget.height} <span className="text-sm font-medium text-gray-500 dark:text-emerald-500/80">cm</span></p>
                    </div>
                </div>
            </div>

            {/* --- Daftar Menu Pengaturan --- */}
            <div className="bg-white dark:bg-[#09170F] rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 overflow-hidden mb-8 transition-colors">
                <button onClick={() => setShowEditProfileModal(true)} className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-emerald-950/40 border-b border-gray-50 dark:border-emerald-950/60 transition text-left group">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform"><Pencil size={18} /></div>
                    <div className="flex-grow"><p className="font-bold text-gray-900 dark:text-white">Edit Profil</p></div>
                    <ChevronRight size={20} className="text-gray-300 dark:text-emerald-800" />
                </button>
                <button onClick={() => setShowGoalSettingModal(true)} className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-emerald-950/40 border-b border-gray-50 dark:border-emerald-950/60 transition text-left group">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform"><Target size={18} /></div>
                    <div className="flex-grow"><p className="font-bold text-gray-900 dark:text-white">Goal Setting</p></div>
                    <ChevronRight size={20} className="text-gray-300 dark:text-emerald-800" />
                </button>
                <button onClick={() => setActiveView('notifikasi')} className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-emerald-950/40 border-b border-gray-50 dark:border-emerald-950/60 transition text-left group">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform"><Bell size={18} /></div>
                    <div className="flex-grow"><p className="font-bold text-gray-900 dark:text-white">Notifikasi</p></div>
                    <ChevronRight size={20} className="text-gray-300 dark:text-emerald-800" />
                </button>
                <button onClick={() => setActiveView('keamanan')} className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-emerald-950/40 border-b border-gray-50 dark:border-emerald-950/60 transition text-left group">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform"><ShieldCheck size={18} /></div>
                    <div className="flex-grow"><p className="font-bold text-gray-900 dark:text-white">Keamanan Akun</p></div>
                    <ChevronRight size={20} className="text-gray-300 dark:text-emerald-800" />
                </button>
                <button onClick={() => setShowReviewModal(true)} className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-emerald-950/40 border-b border-gray-50 dark:border-emerald-950/60 transition text-left group">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform"><Star size={18} /></div>
                    <div className="flex-grow"><p className="font-bold text-gray-900 dark:text-white">Beri Ulasan & Rating</p></div>
                    <ChevronRight size={20} className="text-gray-300 dark:text-emerald-800" />
                </button>
                <Link href={route('logout')} method="post" as="button" className="w-full p-5 flex items-center gap-4 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-50 dark:hover:bg-red-950/40 transition text-left group">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-red-950/50 flex items-center justify-center text-red-500 shrink-0 shadow-sm border border-red-100 dark:border-red-900/40 group-hover:scale-105 transition-transform"><LogOut size={18} /></div>
                    <div className="flex-grow"><p className="font-bold text-red-600 dark:text-red-400">Keluar</p></div>
                    <ChevronRight size={20} className="text-red-300 dark:text-red-800" />
                </Link>
            </div>
        </div>
    );

    const renderNotifikasiView = () => (
        <div className="max-w-2xl mx-auto animate-in slide-in-from-right-4 duration-300">
            <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-gray-500 dark:text-emerald-500/80 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium mb-6 transition">
                <ChevronLeft size={20} /> Notifikasi
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Pengaturan Notifikasi</h2>

            <div className="space-y-4 mb-8">
                {/* Item 1 */}
                <div className="bg-white dark:bg-[#09170F] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Pengingat Makan Harian</h4>
                        <p className="text-sm text-gray-500 dark:text-emerald-500/80 mt-1">Kirim notifikasi untuk mencatat sarapan, makan siang, dan makan malam.</p>
                    </div>
                    <button onClick={() => setNotifSettings({ ...notifSettings, harian: !notifSettings.harian })} className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${notifSettings.harian ? 'bg-emerald-600 dark:bg-[#20D080]' : 'bg-gray-200 dark:bg-emerald-950'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white dark:bg-slate-900 absolute top-1 shadow-sm transition-transform ${notifSettings.harian ? 'translate-x-7' : 'translate-x-1'}`}></div>
                    </button>
                </div>
                {/* Item 2 */}
                <div className="bg-white dark:bg-[#09170F] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Laporan Mingguan</h4>
                        <p className="text-sm text-gray-500 dark:text-emerald-500/80 mt-1">Terima ringkasan analisis nutrisi mingguan Anda.</p>
                    </div>
                    <button onClick={() => setNotifSettings({ ...notifSettings, mingguan: !notifSettings.mingguan })} className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${notifSettings.mingguan ? 'bg-emerald-600 dark:bg-[#20D080]' : 'bg-gray-200 dark:bg-emerald-950'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white dark:bg-slate-900 absolute top-1 shadow-sm transition-transform ${notifSettings.mingguan ? 'translate-x-7' : 'translate-x-1'}`}></div>
                    </button>
                </div>
                {/* Item 3 */}
                <div className="bg-white dark:bg-[#09170F] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Tips & Artikel Gizi</h4>
                        <p className="text-sm text-gray-500 dark:text-emerald-500/80 mt-1">Rekomendasi artikel kesehatan harian dari AI.</p>
                    </div>
                    <button onClick={() => setNotifSettings({ ...notifSettings, artikel: !notifSettings.artikel })} className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${notifSettings.artikel ? 'bg-emerald-600 dark:bg-[#20D080]' : 'bg-gray-200 dark:bg-emerald-950'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white dark:bg-slate-900 absolute top-1 shadow-sm transition-transform ${notifSettings.artikel ? 'translate-x-7' : 'translate-x-1'}`}></div>
                    </button>
                </div>
            </div>

            <button onClick={() => setActiveView('main')} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-[#20D080] dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold rounded-2xl transition shadow-sm">
                Simpan Pengaturan
            </button>
        </div>
    );

    const renderKeamananView = () => (
        <div className="max-w-2xl mx-auto animate-in slide-in-from-right-4 duration-300">
            <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-gray-500 dark:text-emerald-500/80 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium mb-6 transition">
                <ChevronLeft size={20} /> Keamanan Akun
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Keamanan Akun</h2>

            <div className="bg-white dark:bg-[#09170F] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white text-center mb-6">Ubah Kata Sandi</h3>

                <div className="space-y-5 max-w-md mx-auto">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Kata Sandi Saat Ini</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-700 focus:ring-0 rounded-xl text-sm outline-none" placeholder="••••••••" />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600 hover:text-gray-600 dark:hover:text-emerald-400">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Kata Sandi Baru</label>
                        <input type="password" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-700 focus:ring-0 rounded-xl text-sm outline-none" placeholder="••••••••" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Konfirmasi Kata Sandi Baru</label>
                        <input type="password" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-700 focus:ring-0 rounded-xl text-sm outline-none" placeholder="••••••••" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#09170F] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 mb-8 flex items-center justify-between">
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Autentikasi 2 Langkah</h4>
                    <p className="text-sm text-gray-500 dark:text-emerald-500/80 mt-1 max-w-sm">Tambahkan lapisan keamanan ekstra ke akun Anda dengan verifikasi dua langkah.</p>
                </div>
                <button onClick={() => setTwoFactor(!twoFactor)} className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${twoFactor ? 'bg-emerald-600 dark:bg-[#20D080]' : 'bg-gray-200 dark:bg-emerald-950'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white dark:bg-slate-900 absolute top-1 shadow-sm transition-transform ${twoFactor ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
            </div>

            <button onClick={() => setActiveView('main')} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-[#20D080] dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold rounded-2xl transition shadow-sm">
                Perbarui Kata Sandi
            </button>
        </div>
    );

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Profil & Pengaturan" />

            <div className="py-8 px-4 md:px-8 min-h-[calc(100vh-4rem)] bg-white dark:bg-transparent transition-colors">
                {activeView === 'main' && renderMainView()}
                {activeView === 'notifikasi' && renderNotifikasiView()}
                {activeView === 'keamanan' && renderKeamananView()}
            </div>

            {/* --- MODAL EDIT PROFIL --- */}
            {showEditProfileModal && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#09170F] border border-transparent dark:border-emerald-900/60 rounded-3xl p-6 md:p-8 w-full max-w-md relative shadow-xl">
                        <button onClick={() => setShowEditProfileModal(false)} className="absolute top-6 right-6 text-gray-400 dark:text-emerald-600 hover:text-gray-600 dark:hover:text-emerald-400 bg-gray-50 dark:bg-emerald-950/60 hover:bg-gray-100 dark:hover:bg-emerald-900/60 rounded-full p-2 transition">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Edit Profil</h3>

                        <div className="flex flex-col items-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-3xl font-bold mb-3 border-4 border-white dark:border-[#09170F] shadow-sm">
                                {profileData.name.charAt(0).toUpperCase()}
                            </div>
                            <button className="px-4 py-1.5 bg-emerald-600 dark:bg-[#20D080] text-white dark:text-slate-950 text-xs font-bold rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-400 transition">
                                Ubah Foto
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Nama Lengkap</label>
                                <input type="text" defaultValue={profileData.name} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Email</label>
                                <input type="email" defaultValue={profileData.email} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Nomor Telepon</label>
                                <input type="text" defaultValue={profileData.phone} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none" />
                            </div>
                        </div>

                        <button onClick={() => { setShowEditProfileModal(false); setActiveView('keamanan'); }} className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-8 transition">
                            <ShieldCheck size={16} /> Ubah Kata Sandi?
                        </button>

                        <div className="flex items-center gap-3">
                            <button onClick={() => setShowEditProfileModal(false)} className="flex-1 py-3.5 bg-white dark:bg-transparent border border-gray-200 dark:border-emerald-900/60 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-emerald-950/40 transition">
                                Batal
                            </button>
                            <button onClick={handleSaveProfile} className="flex-1 py-3.5 bg-emerald-600 dark:bg-[#20D080] text-white dark:text-slate-950 font-bold rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-400 transition shadow-sm">
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL GOAL SETTING --- */}
            {showGoalSettingModal && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#09170F] border border-transparent dark:border-emerald-900/60 rounded-3xl p-6 md:p-8 w-full max-w-md relative shadow-xl">
                        <button onClick={() => setShowGoalSettingModal(false)} className="absolute top-6 right-6 text-gray-400 dark:text-emerald-600 hover:text-gray-600 dark:hover:text-emerald-400 bg-gray-50 dark:bg-emerald-950/60 hover:bg-gray-100 dark:hover:bg-emerald-900/60 rounded-full p-2 transition">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Atur Target & Motivasi Kesehatan</h3>

                        <div className="space-y-5 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Target Personal / Motivasi Kamu</label>
                                <textarea rows="2" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-700 rounded-xl text-sm font-medium resize-none outline-none" placeholder="Tulis target personalmu (Contoh: Biar kuat gendong anak / Persiapan lari 10K)"></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Tinggi Badan</label>
                                    <div className="relative">
                                        <input type="number" defaultValue={healthTarget.height} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none" />
                                        <span className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600/80 text-sm font-bold">cm</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Berat Badan</label>
                                    <div className="relative">
                                        <input type="number" defaultValue={healthTarget.weight} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none" />
                                        <span className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600/80 text-sm font-bold">kg</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Apa yang ingin kamu lakukan dengan berat badanmu?</label>
                                <select className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium appearance-none outline-none">
                                    <option value="Menjaga Berat Badan" className="dark:bg-[#0C1E14]">Menjaga Berat Badan</option>
                                    <option value="Menurunkan Berat Badan" className="dark:bg-[#0C1E14]">Menurunkan Berat Badan</option>
                                    <option value="Menaikkan Berat Badan" className="dark:bg-[#0C1E14]">Menaikkan Berat Badan</option>
                                </select>
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-0.5">Target Kebutuhan Kalori</p>
                                    <p className="text-[10px] font-medium text-emerald-600/80 dark:text-emerald-500/80 leading-tight max-w-[200px]">Dihitung otomatis oleh sistem berdasarkan metrik tubuh Anda.</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-emerald-700 dark:text-emerald-400 text-xl">2,000</p>
                                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500/80 uppercase">kkal/hari</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => setShowGoalSettingModal(false)} className="flex-1 py-3.5 bg-white dark:bg-transparent border border-gray-200 dark:border-emerald-900/60 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-emerald-950/40 transition">
                                Batal
                            </button>
                            <button onClick={handleSaveGoal} className="flex-1 py-3.5 bg-emerald-600 dark:bg-[#20D080] text-white dark:text-slate-950 font-bold rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-400 transition shadow-sm">
                                Terapkan Target
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL ULASAN & RATING --- */}
            {showReviewModal && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#09170F] border border-transparent dark:border-emerald-900/60 rounded-2xl p-6 md:p-8 w-full max-w-md relative shadow-xl">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-emerald-950">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Bagikan Pengalamanmu</h3>
                            <button onClick={() => setShowReviewModal(false)} className="text-gray-400 dark:text-emerald-600 hover:text-gray-600 dark:hover:text-emerald-400 transition">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Interactive Stars */}
                        <div className="mb-6">
                            <label className="block text-[11px] font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-3">PILIH RATING</label>
                            <div className="flex items-center gap-1.5 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-200 dark:text-emerald-950'}`}
                                    >
                                        <Star size={32} fill={rating >= star ? "currentColor" : "none"} strokeWidth={rating >= star ? 0 : 2} />
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs font-medium text-gray-500 dark:text-emerald-500/80">
                                {rating > 0 ? `${rating} dari 5 bintang` : 'Belum ada rating'}
                            </p>
                        </div>

                        <div className="space-y-5 mb-8">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">PEKERJAAN / STATUS</label>
                                <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-700 rounded-xl text-sm font-medium outline-none transition" placeholder="Contoh: Mahasiswa / Ibu Rumah Tangga" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">TULIS ULASANMU</label>
                                <textarea rows="3" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-700 rounded-xl text-sm font-medium resize-none outline-none transition" placeholder="Tulis pendapatmu tentang fitur Scan siGizi di sini..."></textarea>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button onClick={() => setShowReviewModal(false)} className="flex-1 py-3 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-emerald-950/40 rounded-xl transition">
                                Batal
                            </button>
                            <button onClick={handleSaveReview} disabled={rating === 0} className="flex-1 py-3 bg-emerald-600 dark:bg-[#20D080] hover:bg-emerald-700 dark:hover:bg-emerald-400 disabled:bg-emerald-300 dark:disabled:bg-emerald-950/60 text-white dark:text-slate-950 dark:disabled:text-emerald-800 font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2">
                                <Send size={18} className={rating === 0 ? "opacity-50" : ""} />
                                Kirim Ulasan
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AuthenticatedLayout>
    );
}