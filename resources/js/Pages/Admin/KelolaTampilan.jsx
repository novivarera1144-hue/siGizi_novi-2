import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function KelolaTampilan({ testimonials: initialTestimonials = [] }) {
    // 1. Headline & Hero Image state
    const [headline, setHeadline] = useState('Kenali Gizi Makananmu');
    const [heroImage, setHeroImage] = useState('/images/smoothie.jpg');

    // 2. Tentang Kami details state
    const [deskripsiSingkat, setDeskripsiSingkat] = useState(
        'Platform berbasis web yang dirancang untuk membantu masyarakat memahami kandungan nutrisi makanan sehari-hari secara mudah, cepat, dan akurat.'
    );
    const [latarBelakang, setLatarBelakang] = useState(
        'Banyak masyarakat peduli kesehatan namun kesulitan mengetahui kandungan nutrisi lengkap dari makanan yang mereka konsumsi sehari-hari.'
    );
    const [tujuan, setTujuan] = useState(
        'Mengembangkan platform AI berbasis web untuk membantu masyarakat memantau gizi demi gaya hidup sehat berkelanjutan.'
    );
    const [manfaatList, setManfaatList] = useState([
        'Mengetahui kandungan nutrisi makanan secara instan',
        'Memantau asupan nutrisi harian dengan mudah'
    ]);

    // 3. Testimoni/Rating Moderasi — data dari database
    const reviews = initialTestimonials.map((t) => ({
        id: t.id,
        name: t.user?.name || 'Anonim',
        status: t.occupation,
        rating: t.rating,
        content: t.comment,
        visible: t.is_approved,
        created_at: t.created_at,
    }));

    const totalReviews = reviews.length;
    const displayedReviewsCount = reviews.filter((r) => r.visible).length;
    const hiddenReviewsCount = totalReviews - displayedReviewsCount;
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setHeroImage(imageUrl);
        }
    };

    const handleImageDelete = () => {
        setHeroImage(null);
    };

    const handleAddManfaat = () => {
        setManfaatList([...manfaatList, '']);
    };

    const handleRemoveManfaat = (index) => {
        const newList = manfaatList.filter((_, i) => i !== index);
        setManfaatList(newList);
    };

    const handleUpdateManfaat = (index, value) => {
        const newList = [...manfaatList];
        newList[index] = value;
        setManfaatList(newList);
    };

    const handleSetReviewVisibility = (id, visible) => {
        router.patch(route('admin.testimonials.update-status', id), {
            is_approved: visible,
        }, {
            preserveScroll: true,
        });
    };

    const renderStars = (rating) => {
        return (
            <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating
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

    return (
        <AdminLayout
            activePage="kelola-tampilan"
            title="Kelola Tampilan"
            subtitle="Atur tampilan halaman beranda dan moderasi ulasan pengguna."
        >
            <Head title="Kelola Tampilan - Admin" />

            <div className="space-y-6 pb-24">
                {/* 1. STAT CARDS RINGKASAN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1 */}
                    <div className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400 dark:text-emerald-100/60">Total Ulasan</p>
                            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">{totalReviews}</h3>
                            <p className="text-[11px] font-bold text-gray-400 dark:text-emerald-100/50">Semua feedback masuk</p>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400 dark:text-emerald-100/60">Ditampilkan</p>
                            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">{displayedReviewsCount}</h3>
                            <p className="text-[11px] font-bold text-gray-400 dark:text-emerald-100/50">Aktif di beranda</p>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-[#1F7A54] dark:text-emerald-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400 dark:text-emerald-100/60">Disembunyikan</p>
                            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">{hiddenReviewsCount}</h3>
                            <p className="text-[11px] font-bold text-gray-400 dark:text-emerald-100/50">Non-aktif dimoderasi</p>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400 dark:text-emerald-100/60">Rata-rata Rating</p>
                            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">{averageRating}</h3>
                            <p className="text-[11px] font-bold text-gray-400 dark:text-emerald-100/50">Skala dari 5 bintang</p>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-[#1F7A54] dark:text-emerald-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 2. CARD "Manajemen Beranda — Hero Section" */}
                <div className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-6">
                    <div className="flex items-center space-x-2 text-gray-900 dark:text-white border-b border-gray-100 dark:border-emerald-950/40 pb-4">
                        <svg className="w-5 h-5 text-[#1F7A54] dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">Manajemen Beranda — Hero Section</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block mb-2">
                                Headline Utama Homepage
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={headline}
                                    onChange={(e) => setHeadline(e.target.value)}
                                    className="flex-1 bg-gray-50 dark:bg-emerald-950/20 border border-gray-200 dark:border-emerald-900/40 rounded-2xl py-2.5 px-4 text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-400 transition-all"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => alert(`Headline disimpan: ${headline}`)}
                                        className="py-2.5 px-5 bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-xs font-bold rounded-2xl transition duration-150 cursor-pointer shadow-sm"
                                    >
                                        Simpan
                                    </button>
                                    <button
                                        onClick={() => setHeadline('')}
                                        className="py-2.5 px-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-500 dark:text-red-400 hover:bg-red-100 text-xs font-bold rounded-2xl transition duration-150 cursor-pointer"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block mb-2">
                                Gambar Utama Beranda
                            </label>
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="w-48 h-32 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-emerald-900/40 shrink-0 bg-gray-100 dark:bg-emerald-950/20 flex items-center justify-center">
                                    {heroImage ? (
                                        <img
                                            src={heroImage}
                                            alt="Preview Utama"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400 dark:text-emerald-100/40 font-medium">Tidak ada gambar</span>
                                    )}
                                </div>
                                <div className="space-y-3 pt-1">
                                    <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-medium leading-relaxed">
                                        Gambar yang ditampilkan di bagian hero halaman utama.
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            id="heroImageInput"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                        <label
                                            htmlFor="heroImageInput"
                                            className="py-2 px-4 bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-xs font-bold rounded-2xl transition duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                            <span>Unggah Gambar Baru</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleImageDelete}
                                            className="py-2 px-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-500 dark:text-red-400 hover:bg-red-100 text-xs font-bold rounded-2xl transition duration-150 cursor-pointer"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. CARD "Pengaturan Halaman Tentang Kami" */}
                <div className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-6">
                    <div className="flex items-center space-x-2 text-gray-900 dark:text-white border-b border-gray-100 dark:border-emerald-950/40 pb-4">
                        <svg className="w-5 h-5 text-[#1F7A54] dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">Pengaturan Halaman Tentang Kami</h2>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block mb-2">
                                Deskripsi Singkat
                            </label>
                            <textarea
                                value={deskripsiSingkat}
                                onChange={(e) => setDeskripsiSingkat(e.target.value)}
                                rows={3}
                                className="w-full bg-gray-50 dark:bg-emerald-950/20 border border-gray-200 dark:border-emerald-900/40 rounded-2xl py-2.5 px-4 text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-400 transition-all leading-relaxed"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block mb-2">
                                    Latar Belakang
                                </label>
                                <textarea
                                    value={latarBelakang}
                                    onChange={(e) => setLatarBelakang(e.target.value)}
                                    rows={4}
                                    className="w-full bg-gray-50 dark:bg-emerald-950/20 border border-gray-200 dark:border-emerald-900/40 rounded-2xl py-2.5 px-4 text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-400 transition-all leading-relaxed"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block mb-2">
                                    Tujuan
                                </label>
                                <textarea
                                    value={tujuan}
                                    onChange={(e) => setTujuan(e.target.value)}
                                    rows={4}
                                    className="w-full bg-gray-50 dark:bg-emerald-950/20 border border-gray-200 dark:border-emerald-900/40 rounded-2xl py-2.5 px-4 text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-400 transition-all leading-relaxed"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-extrabold text-gray-400 dark:text-emerald-100/60 tracking-wider uppercase block">
                                    Manfaat Platform
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAddManfaat}
                                    className="text-xs font-bold text-[#1F7A54] hover:text-[#186041] dark:text-emerald-400 dark:hover:text-emerald-300 cursor-pointer flex items-center space-x-1"
                                >
                                    <span>+ Tambah Manfaat Baru</span>
                                </button>
                            </div>

                            <div className="space-y-3">
                                {manfaatList.map((manfaatItem, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={manfaatItem}
                                            onChange={(e) => handleUpdateManfaat(idx, e.target.value)}
                                            placeholder="Tuliskan salah satu manfaat platform..."
                                            className="flex-1 bg-gray-50 dark:bg-emerald-950/20 border border-gray-200 dark:border-emerald-900/40 rounded-2xl py-2.5 px-4 text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-[#1F7A54] dark:focus:border-emerald-400 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveManfaat(idx)}
                                            className="p-2.5 bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 hover:bg-red-100 border border-red-100 dark:border-red-900/50 rounded-2xl transition duration-150 cursor-pointer"
                                            title="Hapus manfaat"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => alert('Semua data Tentang Kami berhasil disimpan!')}
                            className="bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white rounded-full py-3 px-8 font-semibold text-sm transition duration-150 cursor-pointer shadow-sm block mx-auto mt-6"
                        >
                            Simpan Perubahan Tentang Kami
                        </button>
                    </div>
                </div>

                {/* 4. CARD "Moderasi Rating & Testimoni" (Dilengkapi overflow-x-auto untuk geser animasi/responsif) */}
                <div className="bg-white dark:bg-[#122017] p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm space-y-6">
                    <div className="flex items-center space-x-2 text-gray-900 dark:text-white border-b border-gray-100 dark:border-emerald-950/40 pb-4">
                        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">Moderasi Rating & Testimoni</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[850px]">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-emerald-950/40 text-xs font-bold text-gray-400 dark:text-emerald-100/60 uppercase tracking-wider">
                                    <th className="py-4 px-4 min-w-[150px]">Nama & Status</th>
                                    <th className="py-4 px-4 min-w-[100px]">Rating</th>
                                    <th className="py-4 px-4 min-w-[350px]">Isi Ulasan</th>
                                    <th className="py-4 px-4 min-w-[200px] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map((review) => (
                                    <tr
                                        key={review.id}
                                        className={`border-b border-gray-50 dark:border-emerald-950/20 text-sm transition duration-150 ${review.visible
                                            ? 'hover:bg-gray-50/50 dark:hover:bg-emerald-950/10'
                                            : 'bg-gray-50/30 dark:bg-emerald-950/30 opacity-70 hover:bg-gray-50/60 dark:hover:bg-emerald-950/20'
                                            }`}
                                    >
                                        <td className="py-4 px-4 min-w-[150px] whitespace-nowrap">
                                            <div className="font-bold text-gray-800 dark:text-white">{review.name}</div>
                                            <div className="text-xs text-gray-400 dark:text-emerald-100/50 mt-0.5 font-medium">{review.status}</div>
                                        </td>
                                        <td className="py-4 px-4 min-w-[100px] whitespace-nowrap">
                                            {renderStars(review.rating)}
                                        </td>
                                        <td className="py-4 px-4 min-w-[350px] text-gray-600 dark:text-emerald-100/80 font-medium italic leading-relaxed">
                                            "{review.content}"
                                        </td>
                                        <td className="py-4 px-4 min-w-[200px] text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleSetReviewVisibility(review.id, true)}
                                                    className={`rounded-full px-4 py-1.5 text-xs font-semibold cursor-pointer transition duration-150 shadow-sm ${review.visible
                                                        ? 'bg-[#1F7A54] hover:bg-[#186041] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white'
                                                        : 'bg-gray-100 dark:bg-emerald-950/60 text-gray-500 dark:text-emerald-300 hover:bg-[#1F7A54] hover:text-white'
                                                        }`}
                                                >
                                                    Tampilkan
                                                </button>
                                                <button
                                                    onClick={() => handleSetReviewVisibility(review.id, false)}
                                                    className={`rounded-full px-4 py-1.5 text-xs font-semibold cursor-pointer transition duration-150 ${!review.visible
                                                        ? 'bg-gray-700 text-white hover:bg-gray-800'
                                                        : 'bg-gray-100 dark:bg-emerald-950/60 text-gray-600 dark:text-emerald-300 hover:bg-gray-200 dark:hover:bg-emerald-900/60'
                                                        }`}
                                                >
                                                    Sembunyikan
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}