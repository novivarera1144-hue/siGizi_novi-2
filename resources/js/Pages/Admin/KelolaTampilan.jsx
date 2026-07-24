import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function KelolaTampilan() {
    // 1. Headline state
    const [headline, setHeadline] = useState('Kenali Gizi Makananmu');

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

    // 3. Testimoni/Rating Moderasi state
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: 'Rizki Pratama',
            status: 'Mahasiswa',
            rating: 5,
            content: 'siGizi bantu aku ngerti kandungan nasi kos harianku. Sekarang lebih terkontrol makannya!',
            visible: true
        },
        {
            id: 2,
            name: 'Sari Dewi',
            status: 'Ibu Rumah Tangga',
            rating: 5,
            content: 'Fitur scan-nya sangat praktis! Tinggal foto, langsung tahu kalori dan nutrisinya.',
            visible: true
        },
        {
            id: 3,
            name: 'Ahmad Fauzi',
            status: 'Karyawan Swasta',
            rating: 4,
            content: 'Rekomendasi menunya cukup bervariasi. Sangat membantu menjaga pola makan sehat saya.',
            visible: true
        },
        {
            id: 4,
            name: 'Ahsan Kamil',
            status: 'Pekerja Kreatif',
            rating: 5,
            content: 'AI Assistant-nya responsif sekali saat ditanya soal alternatif menu diet.',
            visible: true
        },
        {
            id: 5,
            name: 'Budi Santoso',
            status: 'PNS',
            rating: 4,
            content: 'UI-nya bersih dan ramah untuk pemula. Scan makanan tergolong cepat.',
            visible: false
        }
    ]);

    // Dynamic stats computation from states
    const totalReviews = reviews.length;
    const displayedReviewsCount = reviews.filter((r) => r.visible).length;
    const averageRating = (
        reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
    ).toFixed(1);

    // Handlers for Platform Benefits list
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

    // Review Visibility Toggles
    const handleSetReviewVisibility = (id, visible) => {
        setReviews(
            reviews.map((r) => (r.id === id ? { ...r, visible } : r))
        );
    };

    const renderStars = (rating) => {
        return (
            <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating
                                ? 'text-amber-500 fill-current'
                                : 'text-gray-200'
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

            <div className="space-y-8">
                {/* 1. STAT CARDS RINGKASAN (3 Card Atas) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Total Ulasan */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500 font-normal">Total Ulasan</p>
                            <h3 className="text-3xl font-bold text-gray-800">{totalReviews}</h3>
                            <p className="text-xs text-gray-400">Dari semua pengguna</p>
                        </div>
                    </div>

                    {/* Card 2: Ditampilkan */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500 font-normal">Ditampilkan</p>
                            <h3 className="text-3xl font-bold text-gray-800">{displayedReviewsCount}</h3>
                            <p className="text-xs text-gray-400">Di halaman beranda</p>
                        </div>
                    </div>

                    {/* Card 3: Rata-rata Rating */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h3l2-6 3 12 2-8 1 2h5" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500 font-normal">Rata-rata Rating</p>
                            <h3 className="text-3xl font-bold text-gray-800">{averageRating}</h3>
                            <p className="text-xs text-gray-400">Dari 5 bintang</p>
                        </div>
                    </div>
                </div>

                {/* 2. CARD "Manajemen Beranda — Hero Section" */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-2 text-gray-900 border-b border-gray-100 pb-4">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <h2 className="text-base font-extrabold text-gray-800">Manajemen Beranda — Hero Section</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-extrabold text-emerald-700 tracking-wider uppercase block mb-2">
                                Headline Utama Homepage
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={headline}
                                    onChange={(e) => setHeadline(e.target.value)}
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => alert(`Headline disimpan: ${headline}`)}
                                        className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition duration-150 cursor-pointer shadow-sm"
                                    >
                                        Simpan
                                    </button>
                                    <button
                                        onClick={() => setHeadline('')}
                                        className="py-2.5 px-5 bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 text-xs font-bold rounded-xl transition duration-150 cursor-pointer"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-extrabold text-emerald-700 tracking-wider uppercase block mb-2">
                                Gambar Utama Beranda
                            </label>
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="w-48 h-32 rounded-xl overflow-hidden shadow-sm border border-gray-150 shrink-0">
                                    <img
                                        src="/images/smoothie.jpg"
                                        alt="Preview Utama"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="space-y-3 pt-1">
                                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                        Gambar yang ditampilkan di bagian hero halaman utama.
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                            <span>Unggah Gambar Baru</span>
                                        </button>
                                        <button className="py-2 px-4 bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 text-xs font-bold rounded-xl transition duration-150 cursor-pointer">
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. CARD "Pengaturan Halaman Tentang Kami" */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-2 text-gray-900 border-b border-gray-100 pb-4">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-base font-extrabold text-gray-800">Pengaturan Halaman Tentang Kami</h2>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="text-[10px] font-extrabold text-emerald-700 tracking-wider uppercase block mb-2">
                                Deskripsi Singkat
                            </label>
                            <textarea
                                value={deskripsiSingkat}
                                onChange={(e) => setDeskripsiSingkat(e.target.value)}
                                rows={3}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all leading-relaxed"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-extrabold text-emerald-700 tracking-wider uppercase block mb-2">
                                    Latar Belakang
                                </label>
                                <textarea
                                    value={latarBelakang}
                                    onChange={(e) => setLatarBelakang(e.target.value)}
                                    rows={4}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all leading-relaxed"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-extrabold text-emerald-700 tracking-wider uppercase block mb-2">
                                    Tujuan
                                </label>
                                <textarea
                                    value={tujuan}
                                    onChange={(e) => setTujuan(e.target.value)}
                                    rows={4}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all leading-relaxed"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-extrabold text-emerald-700 tracking-wider uppercase block">
                                    Manfaat Platform
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAddManfaat}
                                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center space-x-1"
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
                                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveManfaat(idx)}
                                            className="p-2.5 bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 rounded-xl transition duration-150 cursor-pointer"
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
                            className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full py-3 px-8 font-semibold text-sm transition duration-150 cursor-pointer shadow-sm block mx-auto mt-6"
                        >
                            Simpan Perubahan Tentang Kami
                        </button>
                    </div>
                </div>

                {/* 4. CARD "Moderasi Rating & Testimoni" */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-2 text-gray-900 border-b border-gray-100 pb-4">
                        <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <h2 className="text-base font-extrabold text-gray-800">Moderasi Rating & Testimoni</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    <th className="py-4 px-4">Nama & Status</th>
                                    <th className="py-4 px-4">Rating</th>
                                    <th className="py-4 px-4 w-1/2">Isi Ulasan</th>
                                    <th className="py-4 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map((review) => (
                                    <tr
                                        key={review.id}
                                        className={`border-b border-gray-50 text-sm transition duration-150 ${review.visible ? 'hover:bg-gray-50/50' : 'bg-gray-50/30 opacity-70 hover:bg-gray-50/60'
                                            }`}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="font-bold text-gray-800">{review.name}</div>
                                            <div className="text-xs text-gray-400 mt-0.5 font-medium">{review.status}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            {renderStars(review.rating)}
                                        </td>
                                        <td className="py-4 px-4 text-gray-600 font-medium italic leading-relaxed">
                                            "{review.content}"
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="inline-flex space-x-2">
                                                <button
                                                    onClick={() => handleSetReviewVisibility(review.id, true)}
                                                    className={`rounded-full px-4 py-1.5 text-xs font-semibold cursor-pointer transition duration-150 shadow-sm ${review.visible
                                                            ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                                                            : 'bg-gray-100 text-gray-500 hover:bg-emerald-700 hover:text-white'
                                                        }`}
                                                >
                                                    Tampilkan
                                                </button>
                                                <button
                                                    onClick={() => handleSetReviewVisibility(review.id, false)}
                                                    className={`rounded-full px-4 py-1.5 text-xs font-semibold cursor-pointer transition duration-150 ${!review.visible
                                                            ? 'bg-gray-700 text-white hover:bg-gray-800'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
