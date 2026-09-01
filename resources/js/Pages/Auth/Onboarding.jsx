import React, { useState, useEffect, useMemo } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import OnboardingSuccessModal from '@/Components/OnboardingSuccessModal';
import {
    Target, LogOut, Sparkles,
    Clock, Flame, Beef, Droplets, Wheat, TrendingDown,
    TrendingUp, Minus, Activity, CheckCircle2
} from 'lucide-react';

export default function Onboarding() {
    // ─── State & Dark Mode ──────────────────────────────────────
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    // State untuk mengontrol Pop-up Selamat Datang
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const { data, setData, post, processing, errors, transform } = useForm({
        personal_motivation: '',
        height: '',
        weight: '',
        weight_goal: ['Menjaga Berat & Tinggi Badan'],
        target_weight: '',
        target_height: '',
        duration_weeks: 12,
        target_calories: 0,
        target_protein: 0,
        target_fat: 0,
        target_carbs: 0,
    });

    // ─── Kalkulasi Nutrisi Dinamis ───────────────────────────────
    const goalNutrition = useMemo(() => {
        const w = parseFloat(data.weight);
        const h = parseFloat(data.height);

        if (!w || !h) {
            return { calories: 2000, protein: 90, fat: 56, carbs: 300 };
        }

        const bmr = (10 * w) + (6.25 * h) - 120;
        let tdee = bmr * 1.375;

        const goals = Array.isArray(data.weight_goal) ? data.weight_goal : [data.weight_goal];

        if (goals.includes('Menurunkan Berat Badan')) {
            tdee -= 400;
        } else if (goals.includes('Menaikkan Berat Badan')) {
            tdee += 400;
        }

        const calories = Math.max(1200, Math.min(4000, Math.round(tdee / 50) * 50));
        const protein = Math.round(w * 1.5);
        const fat = Math.round((calories * 0.25) / 9);
        const carbs = Math.round((calories * 0.60) / 4);

        return { calories, protein, fat, carbs };
    }, [data.weight, data.height, data.weight_goal]);

    useEffect(() => {
        setData(prev => ({
            ...prev,
            target_calories: goalNutrition.calories,
            target_protein: goalNutrition.protein,
            target_fat: goalNutrition.fat,
            target_carbs: goalNutrition.carbs,
        }));
    }, [goalNutrition]);

    const aiRecommendedWeeks = useMemo(() => {
        const w = parseFloat(data.weight);
        const tw = parseFloat(data.target_weight);
        if (!w || !tw) return null;
        const diff = Math.abs(w - tw);
        if (diff < 0.1) return 4;
        return Math.max(1, Math.ceil(diff / 0.5));
    }, [data.weight, data.target_weight]);

    const goalTotalDays = data.duration_weeks * 7;
    const goalTotals = useMemo(() => ({
        calories: goalNutrition.calories * goalTotalDays,
        protein: goalNutrition.protein * goalTotalDays,
        fat: goalNutrition.fat * goalTotalDays,
        carbs: goalNutrition.carbs * goalTotalDays,
    }), [goalNutrition, goalTotalDays]);

    const submit = (e) => {
        e.preventDefault();

        // Mengubah array weight_goal menjadi string tepat sebelum dikirim ke backend
        transform((latestData) => ({
            ...latestData,
            weight_goal: Array.isArray(latestData.weight_goal)
                ? latestData.weight_goal.join(', ')
                : latestData.weight_goal,
        }));

        post(route('onboarding.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Begitu backend sukses menyimpan data, tampilkan pop-up selamat datang
                setShowWelcomeModal(true);
            },
        });
    };

    const inputClasses = "w-full px-4 py-3.5 bg-gray-50/80 dark:bg-[#0C1E14] border border-gray-200 dark:border-emerald-900/50 focus:border-[#1F7A54] dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#0C1E14] text-gray-900 dark:text-white rounded-2xl text-sm font-medium outline-none transition-all duration-200 shadow-sm";
    const labelClasses = "text-[11px] font-black tracking-wider text-gray-400 dark:text-emerald-500/80 uppercase mb-2 block";

    return (
        <div className="min-h-screen bg-[#F4FAF7] dark:bg-[#05100B] text-gray-800 dark:text-emerald-50 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-x-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-300/20 dark:bg-emerald-950/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-400/15 dark:bg-emerald-950/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            <Head title="Atur Target Kesehatan - siGizi" />

            <div className="w-full max-w-xl mx-auto flex flex-col items-center flex-grow justify-center">

                <div className="mb-6 flex justify-center">
                    <img
                        src="/images/logo-sigizi.png"
                        alt="Logo siGizi"
                        className="w-[160px] h-auto object-contain"
                    />
                </div>

                <div className="w-full bg-white dark:bg-[#08160E] border border-gray-100 dark:border-emerald-900/30 shadow-2xl rounded-3xl p-6 sm:p-8 transition-colors relative">

                    <form onSubmit={submit} className="space-y-8">

                        {/* Bagian 1: Motivasi & Tujuan Kesehatan */}
                        <div className="space-y-5">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                                    <Target size={24} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Atur Target & Motivasi Kesehatan
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-emerald-500/60 mt-1 max-w-sm mx-auto">
                                    Tentukan tujuan dan motivasi pribadimu untuk memulai perjalanan hidup sehat.
                                </p>
                            </div>

                            <div>
                                <label className={labelClasses}>Target Personal / Motivasi Kamu</label>
                                <textarea
                                    rows="2"
                                    value={data.personal_motivation}
                                    onChange={(e) => setData('personal_motivation', e.target.value)}
                                    className={`${inputClasses} resize-none`}
                                    placeholder="Tulis target personalmu (Contoh: Biar kuat gendong anak / Persiapan lari 10K)"
                                    required
                                />
                                <InputError message={errors.personal_motivation} className="mt-1.5 text-xs text-rose-500" />
                            </div>

                            {/* Pilihan Tujuan Kesehatan */}
                            <div>
                                <label className={labelClasses}>Pilih Tujuan Kesehatan Kamu (Bisa lebih dari 1)</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { id: 'Menjaga Berat & Tinggi Badan', label: 'Menjaga Berat & Tinggi Badan', desc: 'Pertahankan kondisi tubuh saat ini', icon: <Minus size={18} /> },
                                        { id: 'Menurunkan Berat Badan', label: 'Menurunkan Berat Badan', desc: 'Defisit kalori & turunkan berat', icon: <TrendingDown size={18} /> },
                                        { id: 'Menaikkan Berat Badan', label: 'Menaikkan Berat Badan', desc: 'Surplus kalori & tambah massa', icon: <TrendingUp size={18} /> },
                                        { id: 'Meninggikan Badan', label: 'Meninggikan Badan', desc: 'Fokus postur & pertumbuhan tinggi', icon: <Sparkles size={18} /> },
                                    ].map((item) => {
                                        const currentGoals = Array.isArray(data.weight_goal) ? data.weight_goal : [];
                                        const isSelected = currentGoals.includes(item.id);

                                        const handleToggleGoal = () => {
                                            let updated;
                                            if (isSelected) {
                                                updated = currentGoals.filter(g => g !== item.id);
                                            } else {
                                                updated = [...currentGoals, item.id];
                                            }
                                            setData('weight_goal', updated);
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
                                <InputError message={errors.weight_goal} className="mt-1.5 text-xs text-rose-500" />
                            </div>

                            {/* Target Angka Berat Badan (Kondisional) */}
                            {((Array.isArray(data.weight_goal) && (data.weight_goal.includes('Menurunkan Berat Badan') || data.weight_goal.includes('Menaikkan Berat Badan'))) || (!Array.isArray(data.weight_goal) && (data.weight_goal === 'Menurunkan Berat Badan' || data.weight_goal === 'Menaikkan Berat Badan'))) && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-200 pt-2">
                                    <label className={labelClasses}>Target Angka Berat Badan</label>
                                    <div className="relative">
                                        <TextInput type="number" value={data.target_weight} onChange={(e) => setData('target_weight', e.target.value)}
                                            className={inputClasses} placeholder="60" required />
                                        <span className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600/80 text-sm font-bold">kg</span>
                                    </div>
                                    <InputError message={errors.target_weight} className="mt-1.5 text-xs text-rose-500" />
                                </div>
                            )}

                            {/* Target Angka Tinggi Badan (Kondisional) */}
                            {((Array.isArray(data.weight_goal) && data.weight_goal.includes('Meninggikan Badan')) || (!Array.isArray(data.weight_goal) && data.weight_goal === 'Meninggikan Badan')) && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-200 pt-2">
                                    <label className={labelClasses}>Target Angka Tinggi Badan</label>
                                    <div className="relative">
                                        <TextInput type="number" value={data.target_height || ''} onChange={(e) => setData('target_height', e.target.value)}
                                            className={inputClasses} placeholder="Contoh: 175" required />
                                        <span className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600/80 text-sm font-bold">cm</span>
                                    </div>
                                    <InputError message={errors.target_height} className="mt-1.5 text-xs text-rose-500" />
                                </div>
                            )}
                        </div>

                        <hr className="border-gray-100 dark:border-emerald-900/40" />

                        {/* Bagian 2: Informasi Fisik */}
                        <div className="space-y-5">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                                    <Activity size={24} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Informasi Fisik Saat Ini
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-emerald-500/60 mt-1 max-w-sm mx-auto">
                                    Masukkan tinggi dan berat badan saat ini untuk perhitungan nutrisi yang dipersonalisasi.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClasses}>Tinggi Badan</label>
                                    <div className="relative">
                                        <TextInput type="number" value={data.height} onChange={(e) => setData('height', e.target.value)}
                                            className={inputClasses} placeholder="170" required />
                                        <span className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600/80 text-sm font-bold">cm</span>
                                    </div>
                                    <InputError message={errors.height} className="mt-1.5 text-xs text-rose-500" />
                                </div>
                                <div>
                                    <label className={labelClasses}>Berat Badan Sekarang</label>
                                    <div className="relative">
                                        <TextInput type="number" value={data.weight} onChange={(e) => setData('weight', e.target.value)}
                                            className={inputClasses} placeholder="65" required />
                                        <span className="absolute right-4 top-3.5 text-gray-400 dark:text-emerald-600/80 text-sm font-bold">kg</span>
                                    </div>
                                    <InputError message={errors.weight} className="mt-1.5 text-xs text-rose-500" />
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100 dark:border-emerald-900/40" />

                        {/* Bagian 3: Durasi & Ringkasan Nutrisi */}
                        <div className="space-y-5">
                            <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-inner">
                                    <Sparkles size={24} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Durasi & Ringkasan Program
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-emerald-500/60 mt-1">
                                    Periksa estimasi kebutuhan nutrisi harian dan total durasi programmu.
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-[#0A1A11] rounded-2xl p-5 border border-gray-100 dark:border-emerald-900/30 space-y-4">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-emerald-500/80 uppercase">Durasi Program</span>
                                    </div>
                                    {aiRecommendedWeeks && (
                                        <button type="button" onClick={() => setData('duration_weeks', aiRecommendedWeeks)}
                                            className="group flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20 border border-violet-200 dark:border-violet-700/40 rounded-full hover:from-violet-500/20 hover:to-purple-500/20 dark:hover:from-violet-500/30 dark:hover:to-purple-500/30 transition-all duration-300 cursor-pointer">
                                            <Sparkles size={12} className="text-violet-500 dark:text-violet-400 group-hover:animate-spin" />
                                            <span className="text-[10px] font-bold text-violet-600 dark:text-violet-300 tracking-wide">Rekomendasi AI: {aiRecommendedWeeks} Minggu</span>
                                        </button>
                                    )}
                                </div>
                                <input type="range" min="1" max="52" value={data.duration_weeks}
                                    onChange={(e) => setData('duration_weeks', parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 dark:bg-emerald-900/40 rounded-full appearance-none cursor-pointer accent-emerald-500" />

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-gray-400 dark:text-emerald-600">1 Minggu</span>
                                    <div className="flex items-center gap-2">
                                        <input type="number" min="1" max="52" value={data.duration_weeks}
                                            onChange={(e) => { const val = Math.max(1, Math.min(52, parseInt(e.target.value) || 1)); setData('duration_weeks', val); }}
                                            className="w-16 text-center px-2 py-1 bg-white dark:bg-[#0C1E14] border border-gray-200 dark:border-emerald-800/60 rounded-lg text-sm font-black text-emerald-700 dark:text-emerald-300 outline-none focus:border-emerald-400 transition" />
                                        <span className="text-xs font-bold text-gray-500 dark:text-emerald-500">Minggu</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400 dark:text-emerald-600">52 Minggu</span>
                                </div>
                                <InputError message={errors.duration_weeks} className="mt-1.5 text-xs text-rose-500" />

                                <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-emerald-500/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 animate-pulse"></div>
                                    Program selama <strong className="text-gray-700 dark:text-emerald-300">{data.duration_weeks} minggu</strong> = <strong className="text-gray-700 dark:text-emerald-300">{goalTotalDays} hari</strong>
                                    {data.duration_weeks >= 4 && <span> ({Math.round(data.duration_weeks / 4.33 * 10) / 10} bulan)</span>}
                                </div>

                                <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-[#091A10] dark:via-[#0A1D13] dark:to-[#081912] rounded-2xl border border-emerald-100 dark:border-emerald-900/30 p-5 space-y-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                                            <Sparkles size={16} className="text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-gray-800 dark:text-white">Ringkasan Target Program</h4>
                                            <p className="text-[10px] text-gray-500 dark:text-emerald-500/60">Kalkulasi otomatis • {data.duration_weeks} minggu ({goalTotalDays} hari)</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <ProfileNutrientCard icon={<Flame size={14} />} label="Kalori" daily={goalNutrition.calories} dailyUnit="kkal/hari" total={goalTotals.calories} totalUnit="kkal total" accent="orange" />
                                        <ProfileNutrientCard icon={<Beef size={14} />} label="Protein" daily={goalNutrition.protein} dailyUnit="g/hari" total={goalTotals.protein} totalUnit="g total" accent="blue" />
                                        <ProfileNutrientCard icon={<Droplets size={14} />} label="Lemak" daily={goalNutrition.fat} dailyUnit="g/hari" total={goalTotals.fat} totalUnit="g total" accent="amber" />
                                        <ProfileNutrientCard icon={<Wheat size={14} />} label="Karbohidrat" daily={goalNutrition.carbs} dailyUnit="g/hari" total={goalTotals.carbs} totalUnit="g total" accent="emerald" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <PrimaryButton
                                    disabled={processing}
                                    className="w-full bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#20D080] dark:hover:bg-emerald-400 py-4 rounded-2xl justify-center font-bold text-sm text-white dark:text-slate-950 shadow-lg shadow-[#1F7A54]/20 transition-all flex items-center gap-2 cursor-pointer"
                                >
                                    <span>Mulai siGizi Sekarang</span>
                                    <Sparkles size={16} />
                                </PrimaryButton>
                            </div>
                        </div>

                    </form>
                </div>

                {/* POP-UP / MODAL SELAMAT DATANG */}
                <OnboardingSuccessModal show={showWelcomeModal} />

                <div className="mt-6">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-rose-500 dark:text-emerald-600/70 dark:hover:text-rose-400 transition"
                    >
                        <LogOut size={14} />
                        <span>Keluar Akun (Logout)</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ProfileNutrientCard({ icon, label, daily, dailyUnit, total, totalUnit, accent }) {
    const colorStyles = {
        orange: 'bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30 text-orange-600 dark:text-orange-400',
        blue: 'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400',
        amber: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30 text-amber-600 dark:text-amber-400',
        emerald: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    };

    return (
        <div className={`p-3 rounded-xl border ${colorStyles[accent]} flex flex-col justify-between`}>
            <div className="flex items-center gap-1.5 mb-1">
                {icon}
                <span className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400">{label}</span>
            </div>
            <div>
                <p className="text-sm font-black leading-none">{daily} <span className="text-[9px] font-normal opacity-85">{dailyUnit}</span></p>
                <p className="text-[9px] font-bold opacity-70 mt-1">{total.toLocaleString('id-ID')} {totalUnit}</p>
            </div>
        </div>
    );
}