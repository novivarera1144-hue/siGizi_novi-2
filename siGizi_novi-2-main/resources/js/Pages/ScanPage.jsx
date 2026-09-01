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

    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    // Dynamic scan status text during simulation
    useEffect(() => {
        if (!isScanning) return;

        if (scanProgress < 25) {
            setScanStatus('Mengunggah foto ke server siGizi...');
        } else if (scanProgress < 55) {
            setScanStatus('AI sedang mengidentifikasi jenis makanan...');
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

    // Simulate AI Scan and POST to ScanController
    const startAnalysis = () => {
        if (!imagePreview || !imageFile) return;

        setIsScanning(true);
        setScanProgress(0);

        const interval = setInterval(() => {
            setScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Submit the file using Inertia to route('scan.store')
                    setTimeout(() => {
                        router.post(route('scan.store'), {
                            image: imageFile
                        }, {
                            forceFormData: true,
                            onError: (errors) => {
                                setIsScanning(false);
                                alert('Gagal menganalisis gambar: ' + Object.values(errors).join(', '));
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
    };

    return (
        <AuthenticatedLayout>
            <Head title="Scan Makanan - siGizi" />

            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header Title */}
                <div>
                    <span className="text-[10px] font-extrabold text-[#1F7A54] dark:text-emerald-400 tracking-widest uppercase block mb-1">Fitur Scan</span>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Kenali Gizi Makananmu</h1>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 font-semibold mt-1">Unggah foto makanan Anda atau potret langsung menggunakan kamera untuk analisis AI instan.</p>
                </div>

                {/* Upload Section / Main Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800/80 shadow-sm p-6 sm:p-8 space-y-6">

                    {/* Drag & Drop Area */}
                    <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`w-full aspect-video sm:h-80 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all duration-200 ${isDragActive
                            ? 'border-[#1F7A54] bg-emerald-50/30 dark:bg-zinc-800/40 scale-[0.99]'
                            : imagePreview
                                ? 'border-gray-200 dark:border-zinc-800'
                                : 'border-gray-300 dark:border-zinc-700/80 bg-gray-50/50 dark:bg-zinc-950/20 hover:bg-gray-50 dark:hover:bg-zinc-950/40'
                            }`}
                    >
                        {imagePreview ? (
                            // Image Preview Mode
                            <div className="w-full h-full relative group">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                    <button
                                        onClick={resetImage}
                                        className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-150 transform hover:scale-105 cursor-pointer"
                                        title="Hapus foto"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Upload Placeholder Mode
                            <div className="text-center p-6 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-zinc-800 flex items-center justify-center mx-auto text-[#1F7A54] dark:text-emerald-400">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-gray-700 dark:text-zinc-200">Seret dan letakkan foto di sini</p>
                                    <p className="text-xs text-gray-400 dark:text-zinc-500 font-semibold">Format JPG, PNG, atau WEBP hingga 10MB</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Hidden inputs */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <input
                            ref={cameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* Upload Button */}
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="flex-1 py-3.5 bg-gray-50 hover:bg-gray-100/80 text-gray-700 dark:bg-zinc-950/40 dark:hover:bg-zinc-950/80 dark:text-zinc-200 border border-gray-200 dark:border-zinc-800 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Unggah Foto</span>
                        </button>

                        {/* Camera Button */}
                        <button
                            onClick={() => cameraInputRef.current.click()}
                            className="flex-1 py-3.5 bg-gray-50 hover:bg-gray-100/80 text-gray-700 dark:bg-zinc-950/40 dark:hover:bg-zinc-950/80 dark:text-zinc-200 border border-gray-200 dark:border-zinc-800 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Buka Kamera</span>
                        </button>
                    </div>

                    {/* Bottom Trigger Action */}
                    {imagePreview && (
                        <div className="pt-4 border-t border-gray-100 dark:border-zinc-800/80 flex justify-end">
                            <button
                                onClick={startAnalysis}
                                className="w-full sm:w-auto px-8 py-3.5 bg-[#1F7A54] hover:bg-[#186041] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-[#1F7A54]/15 hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                            >
                                <span>Analisis Sekarang</span>
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                </div>

            </div>

            {/* Immersive Fullscreen AI Scanning Simulation Dialog Overlay */}
            {isScanning && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800/80 shadow-2xl space-y-6 text-center">

                        {/* Scanning Radar/Spinner Animation */}
                        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                            {/* Outer rotating/pulsing ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 dark:border-emerald-400/10 animate-pulse"></div>
                            <div className="absolute inset-2 rounded-full border-4 border-[#1F7A54] border-t-transparent animate-spin"></div>

                            {/* Inner AI Scanner Logo Icon */}
                            <div className="w-16 h-16 bg-[#1F7A54] rounded-full flex items-center justify-center shadow-lg shadow-[#1F7A54]/25">
                                <svg className="w-8 h-8 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            </div>
                        </div>

                        {/* Progress Details */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">AI Sedang Menganalisis</h3>
                            <p className="text-xs font-semibold text-gray-500 min-h-[1.5rem]">{scanStatus}</p>
                        </div>

                        {/* Progress Bar Loader */}
                        <div className="space-y-1">
                            <div className="w-full bg-gray-100 dark:bg-zinc-950 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-[#1F7A54] h-full rounded-full transition-all duration-150"
                                    style={{ width: `${scanProgress}%` }}
                                ></div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-bold text-[#1F7A54] dark:text-emerald-400">{scanProgress}%</span>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
