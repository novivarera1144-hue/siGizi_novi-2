import React, { useState, useRef, useEffect, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Camera, Pencil, ChevronRight, Target, Bell, ShieldCheck, Star, LogOut, X, Eye, EyeOff, ChevronLeft, Send, Trash2, Clock, Sparkles, Flame, Beef, Droplets, Wheat, TrendingDown, TrendingUp, Minus, ChevronDown } from 'lucide-react';

export default function Edit({ auth, flash }) {
    const user = auth.user;

    // --- State Management ---
    // View state: 'main', 'keamanan'
    const [activeView, setActiveView] = useState('main');

    // Modal states
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showGoalSettingModal, setShowGoalSettingModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    // Data states
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Nadin Aulia Putri',
        email: user?.email || 'nadinaulia261@gmail.com',
        phone: user?.phone || '+62 812-3456-7890',
    });

    // Photo states
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(user?.photo ? `/storage/${user.photo}` : null);
    const fileInputRef = useRef(null);

    // Temporary states for editing profile in modal
    const [tempProfileData, setTempProfileData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [tempPhotoFile, setTempPhotoFile] = useState(null);
    const [tempPhotoPreview, setTempPhotoPreview] = useState(null);

    // Form untuk Edit Profil via Inertia
    const profileForm = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        photo: null,
        delete_photo: false,
        _method: 'PATCH',
    });

    // Sinkronisasi data ketika user prop berubah
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            });
            setPhotoPreview(user.photo ? `/storage/${user.photo}` : null);
        }
    }, [user]);

    // Sinkronisasi data form profil dengan state modal temporary
    useEffect(() => {
        if (showEditProfileModal) {
            profileForm.setData({
                name: tempProfileData.name,
                email: tempProfileData.email,
                phone: tempProfileData.phone,
                photo: tempPhotoFile,
                delete_photo: tempPhotoFile === null && tempPhotoPreview === null,
                _method: 'PATCH',
            });
        }
    }, [tempProfileData, tempPhotoFile, tempPhotoPreview, showEditProfileModal]);

    // Form untuk Goal Setting
    const goalsForm = useForm({
        personal_motivation: user?.personal_motivation || '',
        height: user?.height || '',
        weight: user?.weight || '',
        weight_goal: user?.weight_goal || 'Menjaga Berat Badan',
        target_weight: user?.target_weight || '',
        duration_weeks: user?.duration_weeks || 12,
        target_calories: user?.target_calories || 0,
        target_protein: user?.target_protein || 0,
        target_fat: user?.target_fat || 0,
        target_carbs: user?.target_carbs || 0,
    });

    // Form untuk Hapus Akun
    const deleteAccountForm = useForm({
        password: '',
    });

    // Form untuk Ubah Kata Sandi
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // Sinkronisasi data ketika user prop berubah
    useEffect(() => {
        if (user) {
            goalsForm.setData({
                personal_motivation: user.personal_motivation || '',
                height: user.height || '',
                weight: user.weight || '',
                weight_goal: user.weight_goal || 'Menjaga Berat Badan',
                target_weight: user.target_weight || '',
                duration_weeks: user.duration_weeks || 12,
                target_calories: user.target_calories || 0,
                target_protein: user.target_protein || 0,
                target_fat: user.target_fat || 0,
                target_carbs: user.target_carbs || 0,
            });
        }
    }, [user]);

    // ─── Kalkulasi Nutrisi Dinamis (untuk modal Goal Setting) ─────
    const goalNutrition = useMemo(() => {
        const w = parseFloat(goalsForm.data.weight);
        const h = parseFloat(goalsForm.data.height);
        if (!w || !h) return { calories: 2000, protein: 90, fat: 56, carbs: 300 };
        const bmr = (10 * w) + (6.25 * h) - 120;
        let tdee = bmr * 1.375;
        if (goalsForm.data.weight_goal === 'Menurunkan Berat Badan') tdee -= 400;
        else if (goalsForm.data.weight_goal === 'Menaikkan Berat Badan') tdee += 400;
        const calories = Math.max(1200, Math.min(4000, Math.round(tdee / 50) * 50));
        return {
            calories,
            protein: Math.round(w * 1.5),
            fat: Math.round((calories * 0.25) / 9),
            carbs: Math.round((calories * 0.60) / 4),
        };
    }, [goalsForm.data.weight, goalsForm.data.height, goalsForm.data.weight_goal]);

    // Sync computed nutrition ke goalsForm
    useEffect(() => {
        goalsForm.setData(prev => ({
            ...prev,
            target_calories: goalNutrition.calories,
            target_protein: goalNutrition.protein,
            target_fat: goalNutrition.fat,
            target_carbs: goalNutrition.carbs,
        }));
    }, [goalNutrition]);

    // ─── Rekomendasi AI durasi (0.5 kg per minggu) ──────────────
    const aiRecommendedWeeks = useMemo(() => {
        const w = parseFloat(goalsForm.data.weight);
        const tw = parseFloat(goalsForm.data.target_weight);
        if (!w || !tw) return null;
        const diff = Math.abs(w - tw);
        if (diff < 0.1) return 4;
        return Math.max(1, Math.ceil(diff / 0.5));
    }, [goalsForm.data.weight, goalsForm.data.target_weight]);

    // ─── Totals selama durasi program ───────────────────────────
    const goalTotalDays = goalsForm.data.duration_weeks * 7;
    const goalTotals = useMemo(() => ({
        calories: goalNutrition.calories * goalTotalDays,
        protein: goalNutrition.protein * goalTotalDays,
        fat: goalNutrition.fat * goalTotalDays,
        carbs: goalNutrition.carbs * goalTotalDays,
    }), [goalNutrition, goalTotalDays]);

    // ─── Helper: tampilkan target kalori di profil utama ────────
    const getCalorieTarget = () => {
        if (user?.target_calories) return user.target_calories;
        const w = parseFloat(user?.weight);
        const h = parseFloat(user?.height);
        if (w && h) {
            const bmr = (10 * w) + (6.25 * h) - 120;
            let tdee = bmr * 1.375;
            if (user?.weight_goal === 'Menurunkan Berat Badan') tdee -= 400;
            else if (user?.weight_goal === 'Menaikkan Berat Badan') tdee += 400;
            return Math.max(1200, Math.min(4000, Math.round(tdee / 50) * 50));
        }
        return 2000;
    };

    const fmt = (n) => n.toLocaleString('id-ID');

    // Security states
    const [showPassword, setShowPassword] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);

    // Review states
    const [rating, setRating] = useState(0);

    // Handlers
    const openEditProfileModal = () => {
        profileForm.clearErrors();
        setTempProfileData({
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
        });
        setTempPhotoFile(photoFile);
        setTempPhotoPreview(photoPreview);
        setShowEditProfileModal(true);
    };

    const handleCloseEditModal = () => {
        if (tempPhotoPreview && tempPhotoPreview.startsWith('blob:') && tempPhotoPreview !== photoPreview) {
            URL.revokeObjectURL(tempPhotoPreview);
        }
        profileForm.clearErrors();
        setShowEditProfileModal(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (tempPhotoPreview && tempPhotoPreview.startsWith('blob:') && tempPhotoPreview !== photoPreview) {
                URL.revokeObjectURL(tempPhotoPreview);
            }
            setTempPhotoFile(file);
            setTempPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleDeletePhoto = () => {
        if (tempPhotoPreview && tempPhotoPreview.startsWith('blob:') && tempPhotoPreview !== photoPreview) {
            URL.revokeObjectURL(tempPhotoPreview);
        }
        setTempPhotoFile(null);
        setTempPhotoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSaveProfile = () => {
        profileForm.post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowEditProfileModal(false);
            },
        });
    };

    const handleSaveGoal = (e) => {
        e.preventDefault();
        goalsForm.post(route('profile.goals.update'), {
            preserveScroll: true,
            onSuccess: () => setShowGoalSettingModal(false)
        });
    };

    const handleDeleteAccount = (e) => {
        e.preventDefault();
        deleteAccountForm.delete(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => setShowDeleteAccountModal(false),
            onFinish: () => deleteAccountForm.reset(),
        });
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
            },
            onError: (errors) => {
                if (errors.password) {
                    passwordForm.reset('password', 'password_confirmation');
                }
                if (errors.current_password) {
                    passwordForm.reset('current_password');
                }
            }
        });
    };

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
                <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-4xl font-bold border-4 border-white dark:border-[#09170F] shadow-sm flex-shrink-0 relative overflow-hidden">
                    {photoPreview ? (
                        <img src={photoPreview} alt="Foto Profil" className="w-full h-full object-cover" />
                    ) : (
                        profileData.name.charAt(0).toUpperCase()
                    )}
                    <button
                        onClick={openEditProfileModal}
                        className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-[#0C1E14] rounded-full flex items-center justify-center shadow border border-gray-100 dark:border-emerald-800/60 text-gray-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition z-10"
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
                    onClick={openEditProfileModal}
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-gray-50 dark:bg-[#0C1E14] p-3.5 sm:p-4 rounded-2xl border border-gray-100 dark:border-emerald-900/40">
                        <p className="text-[10px] sm:text-xs text-gray-400 dark:text-emerald-600/80 font-semibold uppercase tracking-wider mb-1">Tujuan</p>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">{user?.weight_goal || 'Belum Diatur'}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0C1E14] p-3.5 sm:p-4 rounded-2xl border border-gray-100 dark:border-emerald-900/40">
                        <p className="text-[10px] sm:text-xs text-gray-400 dark:text-emerald-600/80 font-semibold uppercase tracking-wider mb-1">Durasi Program</p>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{user?.duration_weeks || 12} <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-emerald-500/80">minggu</span></p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0C1E14] p-3.5 sm:p-4 rounded-2xl border border-gray-100 dark:border-emerald-900/40">
                        <p className="text-[10px] sm:text-xs text-gray-400 dark:text-emerald-600/80 font-semibold uppercase tracking-wider mb-1">Target Kalori</p>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{fmt(getCalorieTarget())} <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-emerald-500/80">kkal/hari</span></p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0C1E14] p-3.5 sm:p-4 rounded-2xl border border-gray-100 dark:border-emerald-900/40">
                        <p className="text-[10px] sm:text-xs text-gray-400 dark:text-emerald-600/80 font-semibold uppercase tracking-wider mb-1">Berat Badan</p>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{user?.weight || '-'} <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-emerald-500/80">kg</span></p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0C1E14] p-3.5 sm:p-4 rounded-2xl border border-gray-100 dark:border-emerald-900/40">
                        <p className="text-[10px] sm:text-xs text-gray-400 dark:text-emerald-600/80 font-semibold uppercase tracking-wider mb-1">Tinggi Badan</p>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{user?.height || '-'} <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-emerald-500/80">cm</span></p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0C1E14] p-3.5 sm:p-4 rounded-2xl border border-gray-100 dark:border-emerald-900/40">
                        <p className="text-[10px] sm:text-xs text-gray-400 dark:text-emerald-600/80 font-semibold uppercase tracking-wider mb-1">Berat Target</p>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{user?.target_weight || '-'} <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-emerald-500/80">kg</span></p>
                    </div>
                </div>
            </div>

            {/* --- Daftar Menu Pengaturan --- */}
            <div className="bg-white dark:bg-[#09170F] rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 overflow-hidden mb-8 transition-colors">
                <button onClick={openEditProfileModal} className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-emerald-950/40 border-b border-gray-50 dark:border-emerald-950/60 transition text-left group">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform"><Pencil size={18} /></div>
                    <div className="flex-grow"><p className="font-bold text-gray-900 dark:text-white">Edit Profil</p></div>
                    <ChevronRight size={20} className="text-gray-300 dark:text-emerald-800" />
                </button>
                <button onClick={() => setShowGoalSettingModal(true)} className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-emerald-950/40 border-b border-gray-50 dark:border-emerald-950/60 transition text-left group">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform"><Target size={18} /></div>
                    <div className="flex-grow"><p className="font-bold text-gray-900 dark:text-white">Goal Setting</p></div>
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
                <button onClick={() => setShowDeleteAccountModal(true)} className="w-full p-5 flex items-center gap-4 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-50 dark:hover:bg-red-950/40 transition text-left group">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-red-950/50 flex items-center justify-center text-red-500 shrink-0 shadow-sm border border-red-100 dark:border-red-900/40 group-hover:scale-105 transition-transform"><Trash2 size={18} /></div>
                    <div className="flex-grow"><p className="font-bold text-red-600 dark:text-red-400">Hapus Akun</p></div>
                    <ChevronRight size={20} className="text-red-300 dark:text-red-800" />
                </button>
            </div>
        </div>
    );

    const renderKeamananView = () => (
        <div className="max-w-2xl mx-auto animate-in slide-in-from-right-4 duration-300">
            <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-gray-500 dark:text-emerald-500/80 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium mb-6 transition">
                <ChevronLeft size={20} /> Keamanan Akun
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Keamanan Akun</h2>

            {flash?.success && (
                <div className="p-4 mb-6 bg-emerald-50 border border-emerald-200/60 dark:bg-[#102A1C]/50 dark:border-[#1E4D34]/50 text-emerald-800 dark:text-emerald-300 rounded-2xl flex items-start gap-3 shadow-sm transition-all duration-300">
                    <svg className="w-5 h-5 text-[#1F7A54] dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-xs font-bold leading-relaxed">{flash.success}</div>
                </div>
            )}

            <form onSubmit={handleUpdatePassword}>
                <div className="bg-white dark:bg-[#09170F] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white text-center mb-6">Ubah Kata Sandi</h3>

                    <div className="space-y-5 max-w-md mx-auto">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Kata Sandi Saat Ini</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={passwordForm.data.current_password}
                                    onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-700 focus:ring-0 rounded-xl text-sm outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600 hover:text-gray-600 dark:hover:text-emerald-400"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {passwordForm.errors.current_password && (
                                <p className="text-rose-500 text-xs mt-1.5 font-medium">{passwordForm.errors.current_password}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Kata Sandi Baru</label>
                            <input
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-700 focus:ring-0 rounded-xl text-sm outline-none"
                                placeholder="••••••••"
                                required
                            />
                            {passwordForm.errors.password && (
                                <p className="text-rose-500 text-xs mt-1.5 font-medium">{passwordForm.errors.password}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Konfirmasi Kata Sandi Baru</label>
                            <input
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-700 focus:ring-0 rounded-xl text-sm outline-none"
                                placeholder="••••••••"
                                required
                            />
                            {passwordForm.errors.password_confirmation && (
                                <p className="text-rose-500 text-xs mt-1.5 font-medium">{passwordForm.errors.password_confirmation}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#09170F] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-emerald-950/80 mb-8 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Autentikasi 2 Langkah</h4>
                        <p className="text-sm text-gray-500 dark:text-emerald-500/80 mt-1 max-w-sm">Tambahkan lapisan keamanan ekstra ke akun Anda dengan verifikasi dua langkah.</p>
                    </div>
                    <button type="button" onClick={() => setTwoFactor(!twoFactor)} className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${twoFactor ? 'bg-emerald-600 dark:bg-[#20D080]' : 'bg-gray-200 dark:bg-emerald-950'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white dark:bg-slate-900 absolute top-1 shadow-sm transition-transform ${twoFactor ? 'translate-x-7' : 'translate-x-1'}`}></div>
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={passwordForm.processing}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-[#20D080] dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold rounded-2xl transition shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {passwordForm.processing && (
                        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    )}
                    <span>Perbarui Kata Sandi</span>
                </button>
            </form>
        </div>
    );

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Profil & Pengaturan" />

            <div className="py-8 px-4 md:px-8 min-h-[calc(100vh-4rem)] bg-white dark:bg-transparent transition-colors">
                {activeView === 'main' && renderMainView()}
                {activeView === 'keamanan' && renderKeamananView()}
            </div>

            {/* --- MODAL EDIT PROFIL --- */}
            {showEditProfileModal && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#09170F] border border-transparent dark:border-emerald-900/60 rounded-3xl p-6 md:p-8 w-full max-w-md relative shadow-xl">
                        <button onClick={handleCloseEditModal} className="absolute top-6 right-6 text-gray-400 dark:text-emerald-600 hover:text-gray-600 dark:hover:text-emerald-400 bg-gray-50 dark:bg-emerald-950/60 hover:bg-gray-100 dark:hover:bg-emerald-900/60 rounded-full p-2 transition">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Edit Profil</h3>

                        <div className="flex flex-col items-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-3xl font-bold mb-3 border-4 border-white dark:border-[#09170F] shadow-sm relative overflow-hidden">
                                {tempPhotoPreview ? (
                                    <img src={tempPhotoPreview} alt="Pratinjau Foto" className="w-full h-full object-cover" />
                                ) : (
                                    tempProfileData.name ? tempProfileData.name.charAt(0).toUpperCase() : 'N'
                                )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="px-4 py-1.5 bg-emerald-600 dark:bg-[#20D080] text-white dark:text-slate-950 text-xs font-bold rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-400 transition"
                                >
                                    Ubah Foto
                                </button>
                                {tempPhotoPreview && (
                                    <button
                                        type="button"
                                        onClick={handleDeletePhoto}
                                        className="px-4 py-1.5 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold rounded-full hover:bg-red-200 dark:hover:bg-red-900/40 transition"
                                    >
                                        Hapus Foto
                                    </button>
                                )}
                            </div>
                            {profileForm.errors.photo && <p className="text-rose-500 text-xs mt-1 text-center">{profileForm.errors.photo}</p>}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={tempProfileData.name}
                                    onChange={(e) => setTempProfileData({ ...tempProfileData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none"
                                />
                                {profileForm.errors.name && <p className="text-rose-500 text-xs mt-1">{profileForm.errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Email</label>
                                <input
                                    type="email"
                                    value={tempProfileData.email}
                                    onChange={(e) => setTempProfileData({ ...tempProfileData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none"
                                />
                                {profileForm.errors.email && <p className="text-rose-500 text-xs mt-1">{profileForm.errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Nomor Telepon</label>
                                <input
                                    type="text"
                                    value={tempProfileData.phone}
                                    onChange={(e) => setTempProfileData({ ...tempProfileData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none"
                                />
                                {profileForm.errors.phone && <p className="text-rose-500 text-xs mt-1">{profileForm.errors.phone}</p>}
                            </div>
                        </div>

                        <button onClick={() => { setShowEditProfileModal(false); setActiveView('keamanan'); }} className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-8 transition">
                            <ShieldCheck size={16} /> Ubah Kata Sandi?
                        </button>

                        <div className="flex items-center gap-3">
                            <button onClick={handleCloseEditModal} className="flex-1 py-3.5 bg-white dark:bg-transparent border border-gray-200 dark:border-emerald-900/60 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-emerald-950/40 transition">
                                Batal
                            </button>
                            <button onClick={handleSaveProfile} disabled={profileForm.processing} className="flex-1 py-3.5 bg-emerald-600 dark:bg-[#20D080] text-white dark:text-slate-950 font-bold rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-400 transition shadow-sm disabled:opacity-50">
                                {profileForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL GOAL SETTING (Comprehensive) --- */}
            {showGoalSettingModal && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <form onSubmit={handleSaveGoal} className="bg-white dark:bg-[#09170F] border border-transparent dark:border-emerald-900/60 rounded-3xl p-6 md:p-8 w-full max-w-2xl relative shadow-xl max-h-[90vh] overflow-y-auto">
                        <button type="button" onClick={() => setShowGoalSettingModal(false)} className="absolute top-6 right-6 text-gray-400 dark:text-emerald-600 hover:text-gray-600 dark:hover:text-emerald-400 bg-gray-50 dark:bg-emerald-950/60 hover:bg-gray-100 dark:hover:bg-emerald-900/60 rounded-full p-2 transition z-10">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Atur Target & Motivasi Kesehatan</h3>

                        <div className="space-y-5 mb-6">
                            {/* Motivasi */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Target Personal / Motivasi Kamu</label>
                                <textarea
                                    rows="2"
                                    value={goalsForm.data.personal_motivation}
                                    onChange={(e) => goalsForm.setData('personal_motivation', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-700 rounded-xl text-sm font-medium resize-none outline-none"
                                    placeholder="Tulis target personalmu (Contoh: Biar kuat gendong anak / Persiapan lari 10K)"
                                    required
                                ></textarea>
                                {goalsForm.errors.personal_motivation && <p className="text-rose-500 text-xs mt-1">{goalsForm.errors.personal_motivation}</p>}
                            </div>

                            {/* Tinggi & Berat Saat Ini */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Tinggi Badan</label>
                                    <div className="relative">
                                        <input type="number" value={goalsForm.data.height} onChange={(e) => goalsForm.setData('height', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none" required />
                                        <span className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600/80 text-sm font-bold">cm</span>
                                    </div>
                                    {goalsForm.errors.height && <p className="text-rose-500 text-xs mt-1">{goalsForm.errors.height}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Berat Badan Sekarang</label>
                                    <div className="relative">
                                        <input type="number" value={goalsForm.data.weight} onChange={(e) => goalsForm.setData('weight', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none" required />
                                        <span className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600/80 text-sm font-bold">kg</span>
                                    </div>
                                    {goalsForm.errors.weight && <p className="text-rose-500 text-xs mt-1">{goalsForm.errors.weight}</p>}
                                </div>
                            </div>

                            {/* Tujuan (Multi-select Card Options) */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2.5">Pilih Tujuan Kesehatan Kamu (Bisa lebih dari 1)</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { id: 'Menjaga Berat & Tinggi Badan', label: 'Menjaga Berat & Tinggi Badan', desc: 'Pertahankan kondisi tubuh saat ini', icon: <Minus size={18} /> },
                                        { id: 'Menurunkan Berat Badan', label: 'Menurunkan Berat Badan', desc: 'Defisit kalori & turunkan berat', icon: <TrendingDown size={18} /> },
                                        { id: 'Menaikkan Berat Badan', label: 'Menaikkan Berat Badan', desc: 'Surplus kalori & tambah massa', icon: <TrendingUp size={18} /> },
                                        { id: 'Meninggikan Badan', label: 'Meninggikan Badan', desc: 'Fokus postur & pertumbuhan tinggi', icon: <Sparkles size={18} /> },
                                    ].map((item) => {
                                        // Asumsi goalsForm.data.weight_goal berupa array di state parent (misal: ['Menurunkan Berat Badan', 'Meninggikan Badan'])
                                        const currentGoals = Array.isArray(goalsForm.data.weight_goal) ? goalsForm.data.weight_goal : [];
                                        const isSelected = currentGoals.includes(item.id);

                                        const handleToggleGoal = () => {
                                            let updated;
                                            if (isSelected) {
                                                updated = currentGoals.filter(g => g !== item.id);
                                            } else {
                                                updated = [...currentGoals, item.id];
                                            }
                                            goalsForm.setData('weight_goal', updated);
                                        };

                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={handleToggleGoal}
                                                className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${isSelected
                                                    ? 'bg-emerald-500/10 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-500 text-gray-900 dark:text-white shadow-sm'
                                                    : 'bg-gray-50 dark:bg-[#0C1E14] border-transparent dark:border-emerald-900/40 text-gray-600 dark:text-emerald-400/70 hover:border-emerald-300 dark:hover:border-emerald-800'
                                                    }`}
                                            >
                                                <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${isSelected ? 'bg-emerald-500 text-white dark:bg-emerald-400 dark:text-slate-950' : 'bg-gray-200/60 dark:bg-emerald-900/50 text-gray-500 dark:text-emerald-400'}`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className={`text-xs font-bold ${isSelected ? 'text-emerald-800 dark:text-emerald-300' : 'text-gray-800 dark:text-emerald-200'}`}>{item.label}</p>
                                                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${isSelected ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-emerald-800'}`}>
                                                            {isSelected && '✓'}
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-gray-400 dark:text-emerald-600/80 mt-0.5">{item.desc}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                                {goalsForm.errors.weight_goal && <p className="text-rose-500 text-xs mt-1">{goalsForm.errors.weight_goal}</p>}
                            </div>

                            {/* Kolom Input Target Berat Badan Bersifat Kondisional */}
                            {((Array.isArray(goalsForm.data.weight_goal) && (goalsForm.data.weight_goal.includes('Menurunkan Berat Badan') || goalsForm.data.weight_goal.includes('Menaikkan Berat Badan'))) || (!Array.isArray(goalsForm.data.weight_goal) && (goalsForm.data.weight_goal === 'Menurunkan Berat Badan' || goalsForm.data.weight_goal === 'Menaikkan Berat Badan'))) && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                    <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Target Angka Berat Badan</label>
                                    <div className="relative">
                                        <input type="number" value={goalsForm.data.target_weight} onChange={(e) => goalsForm.setData('target_weight', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none" required />
                                        <span className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600/80 text-sm font-bold">kg</span>
                                    </div>
                                    {goalsForm.errors.target_weight && <p className="text-rose-500 text-xs mt-1">{goalsForm.errors.target_weight}</p>}
                                </div>
                            )}

                            {/* Kolom Input Target Tinggi Badan Bersifat Kondisional */}
                            {((Array.isArray(goalsForm.data.weight_goal) && goalsForm.data.weight_goal.includes('Meninggikan Badan')) || (!Array.isArray(goalsForm.data.weight_goal) && goalsForm.data.weight_goal === 'Meninggikan Badan')) && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                    <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Target Angka Tinggi Badan</label>
                                    <div className="relative">
                                        <input type="number" value={goalsForm.data.target_height || ''} onChange={(e) => goalsForm.setData('target_height', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none" placeholder="Contoh: 175" required />
                                        <span className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600/80 text-sm font-bold">cm</span>
                                    </div>
                                    {goalsForm.errors.target_height && <p className="text-rose-500 text-xs mt-1">{goalsForm.errors.target_height}</p>}
                                </div>
                            )}

                            {/* ══ DURASI PROGRAM + REKOMENDASI AI ══ */}
                            <div className="bg-gray-50 dark:bg-[#0A1A11] rounded-2xl p-5 border border-gray-100 dark:border-emerald-900/30 space-y-4">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-emerald-500/80 uppercase">Durasi Program</span>
                                    </div>
                                    {aiRecommendedWeeks && (
                                        <button type="button" onClick={() => goalsForm.setData('duration_weeks', aiRecommendedWeeks)}
                                            className="group flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20 border border-violet-200 dark:border-violet-700/40 rounded-full hover:from-violet-500/20 hover:to-purple-500/20 dark:hover:from-violet-500/30 dark:hover:to-purple-500/30 transition-all duration-300 cursor-pointer">
                                            <Sparkles size={12} className="text-violet-500 dark:text-violet-400 group-hover:animate-spin" />
                                            <span className="text-[10px] font-bold text-violet-600 dark:text-violet-300 tracking-wide">Rekomendasi AI: {aiRecommendedWeeks} Minggu</span>
                                        </button>
                                    )}
                                </div>
                                <input type="range" min="1" max="52" value={goalsForm.data.duration_weeks}
                                    onChange={(e) => goalsForm.setData('duration_weeks', parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 dark:bg-emerald-900/40 rounded-full appearance-none cursor-pointer
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                            [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:dark:bg-emerald-400
                            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg
                            [&::-webkit-slider-thumb]:shadow-emerald-500/30 [&::-webkit-slider-thumb]:cursor-grab
                            [&::-webkit-slider-thumb]:active:cursor-grabbing
                            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125
                            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                            [&::-moz-range-thumb]:bg-emerald-500 [&::-moz-range-thumb]:dark:bg-emerald-400
                            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0
                            [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-grab
                            accent-emerald-500" />
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-gray-400 dark:text-emerald-600">1 Minggu</span>
                                    <div className="flex items-center gap-2">
                                        <input type="number" min="1" max="52" value={goalsForm.data.duration_weeks}
                                            onChange={(e) => { const val = Math.max(1, Math.min(52, parseInt(e.target.value) || 1)); goalsForm.setData('duration_weeks', val); }}
                                            className="w-16 text-center px-2 py-1 bg-white dark:bg-[#0C1E14] border border-gray-200 dark:border-emerald-800/60 rounded-lg text-sm font-black text-emerald-700 dark:text-emerald-300 outline-none focus:border-emerald-400 transition" />
                                        <span className="text-xs font-bold text-gray-500 dark:text-emerald-500">Minggu</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400 dark:text-emerald-600">52 Minggu</span>
                                </div>
                                {goalsForm.errors.duration_weeks && <p className="text-rose-500 text-xs mt-1">{goalsForm.errors.duration_weeks}</p>}
                                <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-emerald-500/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 animate-pulse"></div>
                                    Program selama <strong className="text-gray-700 dark:text-emerald-300">{goalsForm.data.duration_weeks} minggu</strong> = <strong className="text-gray-700 dark:text-emerald-300">{goalTotalDays} hari</strong>
                                    {goalsForm.data.duration_weeks >= 4 && <span> ({Math.round(goalsForm.data.duration_weeks / 4.33 * 10) / 10} bulan)</span>}
                                </div>
                            </div>

                            {/* ══ KARTU RINGKASAN TARGET ══ */}
                            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-[#091A10] dark:via-[#0A1D13] dark:to-[#081912] rounded-2xl border border-emerald-100 dark:border-emerald-900/30 p-5 space-y-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                                        <Sparkles size={16} className="text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-gray-800 dark:text-white">Ringkasan Target Program</h4>
                                        <p className="text-[10px] text-gray-500 dark:text-emerald-500/60">Kalkulasi otomatis • {goalsForm.data.duration_weeks} minggu ({goalTotalDays} hari)</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <ProfileNutrientCard icon={<Flame size={14} />} label="Kalori" daily={goalNutrition.calories} dailyUnit="kkal/hari" total={goalTotals.calories} totalUnit="kkal total" accent="orange" />
                                    <ProfileNutrientCard icon={<Beef size={14} />} label="Protein" daily={goalNutrition.protein} dailyUnit="g/hari" total={goalTotals.protein} totalUnit="g total" accent="blue" />
                                    <ProfileNutrientCard icon={<Droplets size={14} />} label="Lemak" daily={goalNutrition.fat} dailyUnit="g/hari" total={goalTotals.fat} totalUnit="g total" accent="amber" />
                                    <ProfileNutrientCard icon={<Wheat size={14} />} label="Karbohidrat" daily={goalNutrition.carbs} dailyUnit="g/hari" total={goalTotals.carbs} totalUnit="g total" accent="emerald" />
                                </div>

                                {/* Weight Journey (Hanya muncul jika tujuan menyangkut turun/naik berat badan) */}
                                {((Array.isArray(goalsForm.data.weight_goal) && (goalsForm.data.weight_goal.includes('Menurunkan Berat Badan') || goalsForm.data.weight_goal.includes('Menaikkan Berat Badan'))) || (!Array.isArray(goalsForm.data.weight_goal) && (goalsForm.data.weight_goal === 'Menurunkan Berat Badan' || goalsForm.data.weight_goal === 'Menaikkan Berat Badan'))) && parseFloat(goalsForm.data.weight) > 0 && parseFloat(goalsForm.data.target_weight) > 0 && (
                                    <div className="flex items-center justify-center gap-3 pt-2 border-t border-emerald-100 dark:border-emerald-900/30">
                                        <div className="text-center">
                                            <p className="text-lg font-black text-gray-700 dark:text-emerald-300">{goalsForm.data.weight}</p>
                                            <p className="text-[9px] font-bold text-gray-400 dark:text-emerald-600 uppercase">kg sekarang</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400">
                                            {goalsForm.data.weight_goal?.includes('Menurunkan Berat Badan') ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                                            <span className="text-[10px] font-bold">{goalsForm.data.duration_weeks} minggu</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">{goalsForm.data.target_weight}</p>
                                            <p className="text-[9px] font-bold text-gray-400 dark:text-emerald-600 uppercase">kg target</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setShowGoalSettingModal(false)} className="flex-1 py-3.5 bg-white dark:bg-transparent border border-gray-200 dark:border-emerald-900/60 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-emerald-950/40 transition">
                                Batal
                            </button>
                            <button type="submit" disabled={goalsForm.processing} className="flex-1 py-3.5 bg-emerald-600 dark:bg-[#20D080] text-white dark:text-slate-950 font-bold rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-400 transition shadow-sm">
                                Terapkan Target
                            </button>
                        </div>
                    </form>
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

            {/* --- MODAL CONFIRM DELETE ACCOUNT --- */}
            {showDeleteAccountModal && (
                <div className="fixed inset-0 bg-black/45 dark:bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <form onSubmit={handleDeleteAccount} className="bg-white dark:bg-[#09170F] border border-transparent dark:border-emerald-900/60 rounded-3xl p-6 md:p-8 w-full max-w-md relative shadow-xl">
                        <button type="button" onClick={() => setShowDeleteAccountModal(false)} className="absolute top-6 right-6 text-gray-400 dark:text-emerald-600 hover:text-gray-600 dark:hover:text-emerald-400 bg-gray-50 dark:bg-emerald-950/60 hover:bg-gray-100 dark:hover:bg-emerald-900/60 rounded-full p-2 transition">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hapus Akun Permanen</h3>
                        <p className="text-xs text-red-500 dark:text-red-400/90 font-semibold mb-6 leading-relaxed">
                            Peringatan: Tindakan ini tidak dapat dibatalkan. Semua data riwayat scan, profil, dan target kesehatan Anda akan dihapus secara permanen dari database.
                        </p>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 dark:text-emerald-600/80 uppercase tracking-wider mb-2">Masukkan Kata Sandi Anda</label>
                                <input
                                    type="password"
                                    value={deleteAccountForm.data.password}
                                    onChange={(e) => deleteAccountForm.setData('password', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0C1E14] border border-transparent dark:border-emerald-900/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-xl text-sm font-medium outline-none transition"
                                    placeholder="••••••••"
                                    required
                                />
                                {deleteAccountForm.errors.password && <p className="text-rose-500 text-xs mt-1.5">{deleteAccountForm.errors.password}</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setShowDeleteAccountModal(false)} className="flex-1 py-3.5 bg-white dark:bg-transparent border border-gray-200 dark:border-emerald-900/60 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-emerald-950/40 transition">
                                Batal
                            </button>
                            <button type="submit" disabled={deleteAccountForm.processing} className="flex-1 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition shadow-sm">
                                Hapus Akun Saya
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </AuthenticatedLayout>
    );
}

/* ─── Reusable Nutrient Summary Card for Profile Goal Setting ─── */
function ProfileNutrientCard({ icon, label, daily, dailyUnit, total, totalUnit, accent }) {
    const accentMap = {
        orange: {
            bg: 'bg-orange-50 dark:bg-orange-950/20',
            border: 'border-orange-100 dark:border-orange-900/30',
            iconBg: 'bg-orange-100 dark:bg-orange-900/40',
            iconText: 'text-orange-500 dark:text-orange-400',
            daily: 'text-orange-600 dark:text-orange-400',
            total: 'text-orange-500/70 dark:text-orange-500/60',
        },
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-950/20',
            border: 'border-blue-100 dark:border-blue-900/30',
            iconBg: 'bg-blue-100 dark:bg-blue-900/40',
            iconText: 'text-blue-500 dark:text-blue-400',
            daily: 'text-blue-600 dark:text-blue-400',
            total: 'text-blue-500/70 dark:text-blue-500/60',
        },
        amber: {
            bg: 'bg-amber-50 dark:bg-amber-950/20',
            border: 'border-amber-100 dark:border-amber-900/30',
            iconBg: 'bg-amber-100 dark:bg-amber-900/40',
            iconText: 'text-amber-500 dark:text-amber-400',
            daily: 'text-amber-600 dark:text-amber-400',
            total: 'text-amber-500/70 dark:text-amber-500/60',
        },
        emerald: {
            bg: 'bg-emerald-50 dark:bg-emerald-950/20',
            border: 'border-emerald-100 dark:border-emerald-900/30',
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
            iconText: 'text-emerald-500 dark:text-emerald-400',
            daily: 'text-emerald-600 dark:text-emerald-400',
            total: 'text-emerald-500/70 dark:text-emerald-500/60',
        },
    };
    const a = accentMap[accent] || accentMap.emerald;
    const fmt = (n) => n.toLocaleString('id-ID');

    return (
        <div className={`${a.bg} border ${a.border} rounded-xl p-3 transition-all duration-200 hover:scale-[1.02]`}>
            <div className="flex items-center gap-1.5 mb-2">
                <div className={`w-6 h-6 rounded-lg ${a.iconBg} ${a.iconText} flex items-center justify-center`}>
                    {icon}
                </div>
                <span className="text-[9px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</span>
            </div>
            <p className={`text-lg font-black ${a.daily} leading-none`}>{fmt(daily)}</p>
            <p className={`text-[9px] font-bold ${a.total} mt-0.5`}>{dailyUnit}</p>
            <div className="my-1.5 h-px bg-gray-200/60 dark:bg-white/5"></div>
            <p className="text-xs font-bold text-gray-600 dark:text-gray-300">{fmt(total)}</p>
            <p className={`text-[8px] font-bold ${a.total} uppercase tracking-wider`}>{totalUnit}</p>
        </div>
    );
}