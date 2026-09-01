import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function ScanPage() {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanStatus, setScanStatus] = useState('');
    const [scanError, setScanError] = useState(null);

    // State untuk Form Detail Makanan Tambahan
    const [foodName, setFoodName] = useState('');
    const [cookingMethod, setCookingMethod] = useState('');
    const [customCookingMethod, setCustomCookingMethod] = useState('');
    const [portion, setPortion] = useState('1 Porsi Normal');

    // State untuk Modal Kamera Webcam
    const [isWebcamOpen, setIsWebcamOpen] = useState(false);
    const [facingMode, setFacingMode] = useState('environment'); // 'environment' = belakang, 'user' = depan
    const videoRef = useRef(null);
    const mediaStreamRef = useRef(null);

    const fileInputRef = useRef(null);

    // Dynamic scan status text during simulation
    useEffect(() => {
        if (!isScanning) return;

        if (scanProgress < 25) {
            setScanStatus('Mengunggah foto & data ke server siGizi...');
        } else if (scanProgress < 55) {
            setScanStatus('AI sedang mencocokkan input & jenis makanan...');
        } else if (scanProgress < 85) {
            setScanStatus('Menganalisis kandungan nutrisi & kalori...');
        } else {
            setScanStatus('Menghitung Health Score & rekomendasi...');
        }
    }, [scanProgress, isScanning]);

    // Handle File Drop & Selection
    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setScanError(null);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    // Buka Webcam dengan dukungan dynamic facingMode
    const openWebcam = async (mode = facingMode) => {
        setIsWebcamOpen(true);
        setScanError(null);

        // Hentikan stream sebelumnya jika ada (untuk fitur ganti kamera)
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: mode },
                audio: false
            });
            mediaStreamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            setIsWebcamOpen(false);
            setScanError('Tidak dapat mengakses kamera. Pastikan izin kamera diizinkan oleh browser.');
        }
    };

    // Fungsi untuk Switch Kamera Depan/Belakang
    const switchCamera = () => {
        const newMode = facingMode === 'user' ? 'environment' : 'user';
        setFacingMode(newMode);
        openWebcam(newMode);
    };

    // Tutup Webcam
    const closeWebcam = () => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
        setIsWebcamOpen(false);
    };

    // Ambil Foto dari Webcam
    const captureWebcam = () => {
        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
                handleFile(file);
                closeWebcam();
            }
        }, 'image/jpeg', 0.9);
    };

    // Simulate AI Scan and POST to ScanController with additional fields
    const startAnalysis = () => {
        if (!imagePreview || !imageFile) return;
        if (!foodName.trim()) {
            setScanError('Nama makanan wajib diisi untuk melanjutkan analisis.');
            return;
        }

        setIsScanning(true);
        setScanProgress(0);
        setScanError(null);

        const finalCookingMethod = cookingMethod === 'Lainnya' ? customCookingMethod : cookingMethod;

        const interval = setInterval(() => {
            setScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        router.post(route('scan.store'), {
                            image: imageFile,
                            nama_makanan: foodName,
                            food_name: foodName,
                            cooking_method: finalCookingMethod,
                            portion: portion
                        }, {
                            forceFormData: true,
                            onError: (errors) => {
                                setIsScanning(false);
                                setScanError(Object.values(errors).join(', '));
                            }
                        });
                    }, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 120);
    };

    const resetImage = () => {
        setImagePreview(null);
        setImageFile(null);
        setScanError(null);
        setFoodName('');
        setCookingMethod('');
        setCustomCookingMethod('');
        setPortion('1 Porsi Normal');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Scan Makanan - siGizi" />

            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header Title & Stepper */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">
                            SCAN MAKANAN
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Kenali Gizi Makananmu
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-emerald-100/60 font-semibold mt-1">
                            Unggah foto makanan Anda atau potret langsung menggunakan kamera untuk analisis AI instan.
                        </p>
                    </div>

                    {/* Stepper Indicator */}
                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-[#122017] p-1.5 rounded-2xl border border-gray-200 dark:border-[#1a2e22]">
                        <span className="px-3 py-1.5 bg-[#1F7A54] dark:bg-emerald-500 text-white dark:text-black text-xs font-bold rounded-xl shadow-sm">
                            1. Upload & Detail
                        </span>
                        <span className="text-gray-400 dark:text-emerald-100/30 text-xs">›</span>
                        <span className="px-3 py-1.5 text-gray-400 dark:text-emerald-100/40 text-xs font-medium">
                            2. AI Analisis
                        </span>
                        <span className="text-gray-400 dark:text-emerald-100/30 text-xs">›</span>
                        <span className="px-3 py-1.5 text-gray-400 dark:text-emerald-100/40 text-xs font-medium">
                            3. Hasil
                        </span>
                    </div>
                </div>

                {/* Error Banner */}
                {scanError && (
                    <div className="bg-red-50 border border-red-200/60 dark:bg-red-950/20 dark:border-red-900/40 text-red-800 dark:text-red-300 px-5 py-4 rounded-3xl flex items-start gap-3.5 shadow-sm">
                        <div className="flex-1 text-sm font-semibold leading-relaxed">
                            {scanError}
                        </div>
                        <button onClick={() => setScanError(null)} className="text-red-400 hover:text-red-600 font-bold text-lg leading-none">
                            &times;
                        </button>
                    </div>
                )}

                {/* Main Card Container */}
                <div className="bg-white dark:bg-[#122017] rounded-3xl border border-gray-100 dark:border-[#1a2e22] shadow-sm p-6 sm:p-8 space-y-6">

                    {/* Drag & Drop Area */}
                    <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`w-full aspect-video sm:h-80 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all duration-200 ${imagePreview ? 'border-gray-200 dark:border-emerald-500/30 dark:bg-[#0b140e]' : 'border-gray-300 bg-gray-50/50 dark:border-emerald-500/20 dark:bg-[#0b140e]'
                            }`}
                    >
                        {imagePreview ? (
                            <div className="w-full h-full relative group">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={resetImage}
                                        className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all cursor-pointer"
                                        title="Hapus foto"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-6 space-y-3">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-[#182b1f] border border-emerald-100 flex items-center justify-center mx-auto text-[#1F7A54] dark:text-emerald-400">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-gray-700 dark:text-white">Seret dan letakkan foto di sini</p>
                                    <p className="text-xs text-gray-400 dark:text-emerald-100/40 font-semibold">Format JPG, PNG, atau WEBP hingga 10MB</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                        {/* Upload Button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="py-3.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-[#182b1f] dark:hover:bg-[#1f3a2a] dark:text-white font-bold text-sm rounded-2xl border border-gray-200 dark:border-[#244230] flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                        >
                            <svg className="w-5 h-5 text-gray-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Unggah Foto</span>
                        </button>

                        {/* Camera Button */}
                        <button
                            type="button"
                            onClick={() => openWebcam('environment')}
                            className="py-3.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-[#182b1f] dark:hover:bg-[#1f3a2a] dark:text-white font-bold text-sm rounded-2xl border border-gray-200 dark:border-[#244230] flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                        >
                            <svg className="w-5 h-5 text-gray-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Buka Kamera</span>
                        </button>
                    </div>

                    {/* Form Detail Makanan Tambahan */}
                    {imagePreview && (
                        <div className="pt-6 border-t border-gray-100 dark:border-[#1a2e22] space-y-5 animate-fade-in">
                            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                💡 Detail Makanan :
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-bold text-gray-700 dark:text-emerald-100/80 flex justify-between">
                                        <span>Nama Makanan</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">(wajib diisi)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={foodName}
                                        onChange={(e) => setFoodName(e.target.value)}
                                        placeholder="Contoh: Tahu Kupat Magelang"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0b140e] border border-gray-200 dark:border-[#244230] rounded-xl text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-[#1F7A54] focus:outline-none"
                                    />
                                </div>

                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-bold text-gray-700 dark:text-emerald-100/80 flex justify-between">
                                        <span>Metode Memasak</span>
                                        <span className="text-gray-400 font-normal">(opsional)</span>
                                    </label>
                                    <div className="flex flex-wrap gap-3 pt-1">
                                        {['Digoreng', 'Direbus', 'Dikukus', 'Lainnya'].map((method) => (
                                            <label key={method} className="flex items-center space-x-2 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer bg-gray-50 dark:bg-[#0b140e] px-3.5 py-2 rounded-xl border border-gray-200 dark:border-[#244230]">
                                                <input
                                                    type="radio"
                                                    name="cookingMethod"
                                                    value={method}
                                                    checked={cookingMethod === method}
                                                    onChange={(e) => setCookingMethod(e.target.value)}
                                                    className="text-[#1F7A54] focus:ring-[#1F7A54]"
                                                />
                                                <span>{method}{method === 'Lainnya' ? '...' : ''}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {cookingMethod === 'Lainnya' && (
                                        <input
                                            type="text"
                                            value={customCookingMethod}
                                            onChange={(e) => setCustomCookingMethod(e.target.value)}
                                            placeholder="Ketik metode memasak..."
                                            className="w-full mt-2 px-4 py-2.5 bg-gray-50 dark:bg-[#0b140e] border border-gray-200 dark:border-[#244230] rounded-xl text-xs text-gray-800 dark:text-white focus:ring-2 focus:ring-[#1F7A54] focus:outline-none"
                                        />
                                    )}
                                </div>

                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-bold text-gray-700 dark:text-emerald-100/80 flex justify-between">
                                        <span>Porsi</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">(wajib diisi)</span>
                                    </label>
                                    <select
                                        value={portion}
                                        onChange={(e) => setPortion(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0b140e] border border-gray-200 dark:border-[#244230] rounded-xl text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-[#1F7A54] focus:outline-none"
                                    >
                                        <option value="1/2 Porsi (Kecil)">1/2 Porsi (Kecil)</option>
                                        <option value="1 Porsi Normal">1 Porsi Normal</option>
                                        <option value="1.5 Porsi">1.5 Porsi</option>
                                        <option value="Porsi Jumbo / Besar">Porsi Jumbo / Besar</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {imagePreview && (
                        <div className="pt-4 border-t border-gray-100 dark:border-[#1a2e22] flex justify-end">
                            <button
                                type="button"
                                onClick={startAnalysis}
                                className="w-full sm:w-auto px-8 py-3.5 bg-[#1F7A54] hover:bg-[#186041] text-white dark:bg-emerald-500 dark:text-black font-extrabold text-sm rounded-2xl shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                            >
                                <span>Analisis Sekarang</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Live Webcam dengan Tombol Switch Kamera */}
            {isWebcamOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-xl bg-white dark:bg-[#122017] rounded-3xl p-6 border border-gray-200 dark:border-[#1a2e22] shadow-2xl space-y-4 text-center">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Ambil Foto Makanan</h3>
                            <button onClick={closeWebcam} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
                        </div>
                        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center">
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            {/* Tombol Ganti Kamera */}
                            <button
                                onClick={switchCamera}
                                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded-xl font-bold text-sm flex items-center gap-2 transition"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Kamera: {facingMode === 'environment' ? 'Belakang' : 'Depan'}
                            </button>

                            <div className="flex gap-3">
                                <button onClick={closeWebcam} className="px-5 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded-xl font-bold text-sm">Batal</button>
                                <button onClick={captureWebcam} className="px-6 py-2.5 bg-[#1F7A54] text-white dark:bg-emerald-500 dark:text-black rounded-xl font-bold text-sm">Potret Foto</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Simulasi Loading AI */}
            {isScanning && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white dark:bg-[#122017] rounded-3xl p-8 shadow-2xl space-y-6 text-center">
                        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-4 border-[#1F7A54]/20 animate-pulse"></div>
                            <div className="absolute inset-2 rounded-full border-4 border-[#1F7A54] border-t-transparent animate-spin"></div>
                            <div className="w-16 h-16 bg-[#1F7A54] text-white rounded-full flex items-center justify-center font-bold">AI</div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">AI Sedang Menganalisis</h3>
                            <p className="text-xs font-semibold text-gray-500 dark:text-emerald-100/60">{scanStatus}</p>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-[#0b140e] rounded-full h-2 overflow-hidden">
                            <div className="bg-[#1F7A54] dark:bg-emerald-500 h-full transition-all duration-150" style={{ width: `${scanProgress}%` }}></div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}