import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function KelolaTampilan({ settings, testimonials = [], stats }) {
    const { flash } = usePage().props;

    const resolveHeroPreview = (img) => {
        if (!img) return null;
        if (img.startsWith('http') || img.startsWith('/storage/') || img.startsWith('/images/')) {
            return img;
        }
        return `/storage/${img}`;
    };

    // 1. Hero Section Form
    const heroForm = useForm({
        hero_headline: settings?.hero_headline || '',
        hero_image: null,
        delete_image: false,
    });

    const [heroImagePreview, setHeroImagePreview] = useState(
        settings?.hero_image ? resolveHeroPreview(settings.hero_image) : null
    );

    // Sync state if settings prop changes
    useEffect(() => {
        if (settings) {
            heroForm.setData((data) => ({
                ...data,
                hero_headline: settings.hero_headline || '',
                hero_image: null,
                delete_image: false,
            }));
            setHeroImagePreview(settings.hero_image ? resolveHeroPreview(settings.hero_image) : null);
        }
    }, [settings]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            heroForm.setData((data) => ({
                ...data,
                hero_image: file,
                delete_image: false,
            }));
            setHeroImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageDelete = () => {
        heroForm.setData((data) => ({
            ...data,
            hero_image: null,
            delete_image: true,
        }));
        setHeroImagePreview(null);
        const fileInput = document.getElementById('heroImageInput');
        if (fileInput) fileInput.value = '';
    };

    const submitHero = (e) => {
        e.preventDefault();
        heroForm.post(route('admin.kelola-tampilan.update-hero'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: (page) => {
                const freshSettings = page.props.settings;
                if (freshSettings) {
                    setHeroImagePreview(freshSettings.hero_image ? resolveHeroPreview(freshSettings.hero_image) : null);
                }
                const fileInput = document.getElementById('heroImageInput');
                if (fileInput) fileInput.value = '';
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: page.props.flash?.success || 'Hero section berhasil diperbarui!',
                    confirmButtonColor: '#1F7A54',
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
            onError: (errors) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Menyimpan',
                    text: Object.values(errors)[0] || 'Terjadi kesalahan saat menyimpan pengaturan beranda.',
                    confirmButtonColor: '#d33',
                });
            }
        });
    };

    // 2. Tentang Kami Details Form
    const aboutForm = useForm({
        about_short_description: settings?.about_short_description || '',
        about_background: settings?.about_background || '',
        about_goal: settings?.about_goal || '',
        about_benefits: settings?.about_benefits || [],
        about_target_users: settings?.about_target_users || [],
    });

    // Sync state if settings prop changes
    useEffect(() => {
        if (settings) {
            aboutForm.setData({
                about_short_description: settings.about_short_description || '',
                about_background: settings.about_background || '',
                about_goal: settings.about_goal || '',
                about_benefits: settings.about_benefits || [],
                about_target_users: settings.about_target_users || [],
            });
        }
    }, [settings]);

    const handleAddManfaat = () => {
        aboutForm.setData('about_benefits', [...aboutForm.data.about_benefits, '']);
    };

    const handleRemoveManfaat = (index) => {
        const newList = aboutForm.data.about_benefits.filter((_, i) => i !== index);
        aboutForm.setData('about_benefits', newList);
    };

    const handleUpdateManfaat = (index, value) => {
        const newList = [...aboutForm.data.about_benefits];
        newList[index] = value;
        aboutForm.setData('about_benefits', newList);
    };

    const handleAddTargetUser = () => {
        aboutForm.setData('about_target_users', [...aboutForm.data.about_target_users, '']);
    };

    const handleRemoveTargetUser = (index) => {
        const newList = aboutForm.data.about_target_users.filter((_, i) => i !== index);
        aboutForm.setData('about_target_users', newList);
    };

    const handleUpdateTargetUser = (index, value) => {
        const newList = [...aboutForm.data.about_target_users];
        newList[index] = value;
        aboutForm.setData('about_target_users', newList);
    };

    const submitAbout = (e) => {
        e.preventDefault();
        aboutForm.post(route('admin.kelola-tampilan.update-about'), {
            preserveScroll: true,
        });
    };

    // 3. Testimoni/Rating Moderasi — data dari database
    const reviews = testimonials.map((t) => ({
        id: t.id,
        name: t.name,
        status: t.role,
        rating: t.rating,
        content: t.comment,
        visible: t.is_visible,
        created_at: t.created_at,
    }));

    const totalReviews = stats?.total_reviews ?? reviews.length;
    const displayedReviewsCount = stats?.active_reviews ?? reviews.filter((r) => r.visible).length;
    const hiddenReviewsCount = stats?.hidden_reviews ?? (totalReviews - displayedReviewsCount);
    const averageRating = stats?.average_rating ?? '0.0';

    const handleSetReviewVisibility = (id, targetVisible, currentVisible) => {
        if (targetVisible === currentVisible) return;
        router.patch(route('admin.testimonials.update-status', id), {}, {
            preserveScroll: true,
        });
    };

    const renderStars = (rating) => {
        return (
            <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating
                            ? 'text-amber-500 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    // Stat cards data array untuk mengurangi duplikasi markup
    const statCards = [
        {
            label: 'Total Ulasan',
            value: totalReviews,
            sub: 'Total masuk',
            iconBg: 'bg-amber-50 dark:bg-amber-950/50',
            iconColor: 'text-amber-600 dark:text-amber-400',
            icon: (
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            ),
            iconFill: true,
        },
        {
            label: 'Ditampilkan',
            value: displayedReviewsCount,
            sub: 'Aktif di beranda',
            iconBg: 'bg-emerald-50 dark:bg-emerald-950/50',
            iconColor: 'text-[#1F7A54] dark:text-emerald-400',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            ),
            iconFill: false,
            strokeWidth: 3,
        },
        {
            label: 'Disembunyikan',
            value: hiddenReviewsCount,
            sub: 'Non-aktif',
            iconBg: 'bg-gray-100 dark:bg-gray-800',
            iconColor: 'text-gray-600 dark:text-gray-300',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            ),
            iconFill: false,
            strokeWidth: 2.5,
        },
        {
            label: 'Rating',
            value: averageRating,
            sub: 'Skala 5',
            iconBg: 'bg-emerald-50 dark:bg-emerald-950/50',
            iconColor: 'text-[#1F7A54] dark:text-emerald-400',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            ),
            iconFill: false,
            strokeWidth: 2.5,
        },
    ];

    return (
        <AdminLayout
            activePage="kelola-tampilan"
            title="Kelola Tampilan"
            subtitle="Atur tampilan halaman beranda dan moderasi ulasan pengguna."
        >
            <Head title="Kelola Tampilan - Admin" />

            <div className="w-full overflow-x-hidden space-y-4 pb-24">

                {/* NOTIFICATION MESSAGES */}
                {flash?.success && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200/60 dark:bg-[#102A1C]/50 dark:border-[#1E4D34]/50 text-emerald-800 dark:text-emerald-300 rounded-2xl flex items-start gap-3 shadow-sm transition-all duration-300 animate-in fade-in duration-300">
                        <svg className="w-5 h-5 text-[#1F7A54] dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-xs font-bold leading-relaxed">{flash.success}</div>
                    </div>
                )}

                {/* 1. STAT CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                    {statCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-[#122017] p-2.5 rounded-2xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex items-center justify-between gap-1.5 min-w-0"
                        >
                            <div className="min-w-0 space-y-0.5">
                                <p className="text-[9px] sm:text-xs font-bold text-gray-400 dark:text-emerald-100/60 uppercase tracking-tight truncate">
                                    {card.label}
                                </p>
                                <h3 className="text-sm sm:text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                    {card.value}
                                </h3>
                                <p className="text-[9px] sm:text-[11px] font-semibold text-gray-400 dark:text-emerald-100/50 truncate">
                                    {card.sub}
                                </p>
                            </div>
                            <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor} shrink-0`}>
                                <svg
                                    className="w-3.5 h-3.5 sm:w-5 sm:h-5"
                                    fill={card.iconFill ? 'currentColor' : 'none'}
                                    viewBox={card.iconFill ? '0 0 20 20' : '0 0 24 24'}
                                    stroke={card.iconFill ? undefined : 'currentColor'}
                                    strokeWidth={card.iconFill ? undefined : card.strokeWidth}
                                >
                                    {card.icon}
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2. MANAJEMEN BERANDA — Hero Section */}
                <form onSubmit={submitHero} className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 border-b border-gray-100 dark:border-emerald-950/40 pb-3">
                        <svg className="w-5 h-5 text-[#1F7A54] dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">Manajemen Beranda — Hero Section</h2>
                    </div>

                    <div>
                        <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block mb-1.5">
                            Headline Utama Homepage
                        </label>
                        <input
                            type="text"
                            value={heroForm.data.hero_headline}
                            onChange={(e) => heroForm.setData('hero_headline', e.target.value)}
                            placeholder="Contoh: Kenali Gizi Makananmu Dalam Detik"
                            className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] transition-all"
                            required
                        />
                        {heroForm.errors.hero_headline && (
                            <p className="text-red-500 text-xs mt-1 font-semibold">{heroForm.errors.hero_headline}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block mb-1.5">
                            Gambar Utama Beranda
                        </label>
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                            <div className="w-full max-w-[200px] h-32 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-emerald-900/40 shrink-0 bg-gray-100 dark:bg-emerald-950/20 flex items-center justify-center">
                                {heroImagePreview ? (
                                    <img
                                        src={heroImagePreview}
                                        alt="Preview Utama"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = '/images/sayuran1.webp'; }}
                                    />
                                ) : (
                                    <span className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium">Gambar default (sayuran1.webp)</span>
                                )}
                            </div>
                            <div className="space-y-2 text-center sm:text-left">
                                <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-medium leading-relaxed">
                                    Pilih gambar latar yang ditampilkan pada hero section halaman utama. Ukuran maksimal 2MB (JPG, PNG, WebP).
                                </p>
                                <div className="flex justify-center sm:justify-start gap-2">
                                    <input
                                        id="heroImageInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <label
                                        htmlFor="heroImageInput"
                                        className="py-2 px-3 bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-xs font-bold rounded-xl transition duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span>{heroForm.data.hero_image ? 'Ganti Pilihan' : 'Pilih Gambar'}</span>
                                    </label>
                                    {(heroImagePreview || heroForm.data.hero_image) && (
                                        <button
                                            type="button"
                                            onClick={handleImageDelete}
                                            className="py-2 px-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-500 dark:text-red-400 hover:bg-red-100 text-xs font-bold rounded-xl transition duration-150 cursor-pointer"
                                        >
                                            Hapus Foto
                                        </button>
                                    )}
                                </div>
                                {heroForm.data.hero_image && (
                                    <p className="text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                                        ✓ File dipilih: {heroForm.data.hero_image.name} (klik tombol simpan di bawah)
                                    </p>
                                )}
                                {heroForm.errors.hero_image && (
                                    <p className="text-red-500 text-xs mt-1 font-semibold">{heroForm.errors.hero_image}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={heroForm.processing}
                        className="w-full sm:w-auto bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white rounded-xl py-2.5 px-6 font-semibold text-xs sm:text-sm transition duration-150 cursor-pointer shadow-sm block mx-auto disabled:opacity-50"
                    >
                        {heroForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Beranda'}
                    </button>
                </form>

                {/* 3. PENGATURAN HALAMAN TENTANG KAMI */}
                <form onSubmit={submitAbout} className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 border-b border-gray-100 dark:border-emerald-950/40 pb-3">
                        <svg className="w-5 h-5 text-[#1F7A54] dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">Pengaturan Halaman Tentang Kami</h2>
                    </div>

                    <div>
                        <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block mb-1.5">
                            Deskripsi Singkat
                        </label>
                        <textarea
                            value={aboutForm.data.about_short_description}
                            onChange={(e) => aboutForm.setData('about_short_description', e.target.value)}
                            rows={3}
                            className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs sm:text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] transition-all leading-relaxed"
                        />
                        {aboutForm.errors.about_short_description && (
                            <p className="text-red-500 text-xs mt-1 font-semibold">{aboutForm.errors.about_short_description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block mb-1.5">
                                Latar Belakang
                            </label>
                            <textarea
                                value={aboutForm.data.about_background}
                                onChange={(e) => aboutForm.setData('about_background', e.target.value)}
                                rows={4}
                                className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs sm:text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] transition-all leading-relaxed"
                            />
                            {aboutForm.errors.about_background && (
                                <p className="text-red-500 text-xs mt-1 font-semibold">{aboutForm.errors.about_background}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block mb-1.5">
                                Tujuan
                            </label>
                            <textarea
                                value={aboutForm.data.about_goal}
                                onChange={(e) => aboutForm.setData('about_goal', e.target.value)}
                                rows={4}
                                className="w-full bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs sm:text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] transition-all leading-relaxed"
                            />
                            {aboutForm.errors.about_goal && (
                                <p className="text-red-500 text-xs mt-1 font-semibold">{aboutForm.errors.about_goal}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase">
                                Manfaat Platform
                            </label>
                            <button
                                type="button"
                                onClick={handleAddManfaat}
                                className="text-xs font-bold text-[#1F7A54] hover:text-[#186041] dark:text-emerald-400 dark:hover:text-emerald-300 cursor-pointer"
                            >
                                + Tambah Baru
                            </button>
                        </div>
                        <div className="space-y-2">
                            {aboutForm.data.about_benefits.map((manfaatItem, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={manfaatItem}
                                        onChange={(e) => handleUpdateManfaat(idx, e.target.value)}
                                        placeholder="Tuliskan manfaat platform..."
                                        className="flex-1 min-w-0 bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs sm:text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveManfaat(idx)}
                                        className="p-2 bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 hover:bg-red-100 border border-red-100 dark:border-red-900/50 rounded-xl transition duration-150 cursor-pointer shrink-0"
                                        title="Hapus manfaat"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        {aboutForm.errors.about_benefits && (
                            <p className="text-red-500 text-xs mt-1 font-semibold">{aboutForm.errors.about_benefits}</p>
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase">
                                Target Pengguna
                            </label>
                            <button
                                type="button"
                                onClick={handleAddTargetUser}
                                className="text-xs font-bold text-[#1F7A54] hover:text-[#186041] dark:text-emerald-400 dark:hover:text-emerald-300 cursor-pointer"
                            >
                                + Tambah Baru
                            </button>
                        </div>
                        <div className="space-y-2">
                            {aboutForm.data.about_target_users.map((targetItem, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={targetItem}
                                        onChange={(e) => handleUpdateTargetUser(idx, e.target.value)}
                                        placeholder="Tuliskan target pengguna..."
                                        className="flex-1 min-w-0 bg-gray-50 dark:bg-[#07130C] border border-gray-200 dark:border-[#1a2e22] rounded-xl py-2 px-3 text-xs sm:text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTargetUser(idx)}
                                        className="p-2 bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 hover:bg-red-100 border border-red-100 dark:border-red-900/50 rounded-xl transition duration-150 cursor-pointer shrink-0"
                                        title="Hapus target pengguna"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        {aboutForm.errors.about_target_users && (
                            <p className="text-red-500 text-xs mt-1 font-semibold">{aboutForm.errors.about_target_users}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={aboutForm.processing}
                        className="w-full sm:w-auto bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white rounded-xl py-2.5 px-6 font-semibold text-xs sm:text-sm transition duration-150 cursor-pointer shadow-sm block mx-auto disabled:opacity-50"
                    >
                        {aboutForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Tentang Kami'}
                    </button>
                </form>

                {/* 4. MODERASI RATING & TESTIMONI */}
                <div className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 border-b border-gray-100 dark:border-emerald-950/40 pb-3">
                        <svg className="w-5 h-5 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">Moderasi Rating & Testimoni</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-emerald-950/40 text-[10px] sm:text-[11px] text-gray-400 uppercase font-extrabold">
                                    <th className="py-3 px-2 sm:px-4">Nama</th>
                                    <th className="py-3 px-2 sm:px-4">Rating</th>
                                    <th className="py-3 px-2 sm:px-4 hidden md:table-cell">Isi Ulasan</th>
                                    <th className="py-3 px-2 sm:px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-emerald-950/20">
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <tr
                                            key={review.id}
                                            className={`hover:bg-gray-50/50 dark:hover:bg-[#182b1f]/20 transition-colors text-xs sm:text-sm ${!review.visible ? 'opacity-60' : ''
                                                }`}
                                        >
                                            <td className="py-3.5 px-2 sm:px-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
                                                    <span className="text-[10px] text-slate-400 dark:text-emerald-100/40 font-normal mt-0.5">{review.status}</span>
                                                    <span className="text-[10px] text-gray-500 dark:text-emerald-100/60 font-medium italic mt-1 line-clamp-2 md:hidden">
                                                        "{review.content}"
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-2 sm:px-4 whitespace-nowrap">
                                                {renderStars(review.rating)}
                                            </td>
                                            <td className="py-3.5 px-4 text-gray-600 dark:text-emerald-100/80 font-medium italic leading-relaxed hidden md:table-cell">
                                                "{review.content}"
                                            </td>
                                            <td className="py-3.5 px-2 sm:px-4 text-right">
                                                <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSetReviewVisibility(review.id, true, review.visible)}
                                                        className={`rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-semibold cursor-pointer transition duration-150 shadow-sm ${review.visible
                                                            ? 'bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white'
                                                            : 'bg-gray-100 dark:bg-emerald-950/60 text-gray-500 dark:text-emerald-300 hover:bg-[#1F7A54] hover:text-white'
                                                            }`}
                                                    >
                                                        Tampilkan
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSetReviewVisibility(review.id, false, review.visible)}
                                                        className={`rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-semibold cursor-pointer transition duration-150 ${!review.visible
                                                            ? 'bg-gray-700 text-white hover:bg-gray-800'
                                                            : 'bg-gray-100 dark:bg-emerald-950/60 text-gray-600 dark:text-emerald-300 hover:bg-gray-200 dark:hover:bg-emerald-900/60'
                                                            }`}
                                                    >
                                                        Sembunyikan
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-xs text-gray-400 dark:text-emerald-100/40 font-bold">
                                            Belum ada ulasan dari pengguna.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}