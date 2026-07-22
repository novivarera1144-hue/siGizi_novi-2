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

    // Simulate AI Scan and POST to ScanController
    const startAnalysis = () => {
        if (!imagePreview || !imageFile) return;

        setIsScanning(true);
        setScanProgress(0);
        setScanError(null);

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
                            1. Upload
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
                    <div className="bg-red-50 border border-red-200/60 dark:bg-red-950/20 dark:border-red-900/40 text-red-800 dark:text-red-300 px-5 py-4 rounded-3xl flex items-start gap-3.5 shadow-sm animate-fade-in transition-all">
                        <svg className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div className="flex-1 text-sm font-semibold leading-relaxed">
                            {scanError}
                        </div>
                        <button onClick={() => setScanError(null)} className="text-red-400 hover:text-red-600 dark:hover:text-red-300 font-bold text-lg leading-none p-1 transition-colors">
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
                        className={`w-full aspect-video sm:h-80 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all duration-200 ${isDragActive
                                ? 'border-[#1F7A54] bg-emerald-50/30 dark:border-emerald-500 dark:bg-[#182b1f] scale-[0.99]'
                                : imagePreview
                                    ? 'border-gray-200 dark:border-emerald-500/30 dark:bg-[#0b140e]'
                                    : 'border-gray-300 bg-gray-50/50 hover:bg-gray-50 dark:border-emerald-500/20 dark:bg-[#0b140e] dark:hover:border-emerald-500/50 dark:hover:bg-[#0e1a12]'
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
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                    <button
                                        type="button"
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
                            <div className="text-center p-6 space-y-3">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-[#182b1f] border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center mx-auto text-[#1F7A54] dark:text-emerald-400 shadow-inner">
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
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="py-3.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-[#182b1f] dark:hover:bg-[#1f3a2a] dark:text-white font-bold text-sm rounded-2xl border border-gray-200 dark:border-[#244230] flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm"
                        >
                            <svg className="w-5 h-5 text-gray-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Unggah Foto</span>
                        </button>

                        {/* Camera Button */}
                        <button
                            type="button"
                            onClick={() => cameraInputRef.current.click()}
                            className="py-3.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-[#182b1f] dark:hover:bg-[#1f3a2a] dark:text-white font-bold text-sm rounded-2xl border border-gray-200 dark:border-[#244230] flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm"
                        >
                            <svg className="w-5 h-5 text-gray-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Buka Kamera</span>
                        </button>
                    </div>

                    {/* Bottom Trigger Action */}
                    {imagePreview && (
                        <div className="pt-4 border-t border-gray-100 dark:border-[#1a2e22] flex justify-end">
                            <button
                                type="button"
                                onClick={startAnalysis}
                                className="w-full sm:w-auto px-8 py-3.5 bg-[#1F7A54] hover:bg-[#186041] text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-black font-extrabold text-sm rounded-2xl shadow-lg shadow-[#1F7A54]/15 dark:shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                            >
                                <span>Analisis Sekarang</span>
                                <svg className="w-4 h-4 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                </div>

            </div>

            {/* Immersive Fullscreen AI Scanning Simulation Dialog Overlay */}
            {isScanning && (
                <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white dark:bg-[#122017] rounded-3xl p-8 border border-gray-100 dark:border-[#1a2e22] shadow-2xl space-y-6 text-center">

                        {/* Scanning Radar/Spinner Animation */}
                        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                            {/* Outer rotating/pulsing ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-[#1F7A54]/20 dark:border-emerald-500/20 animate-pulse"></div>
                            <div className="absolute inset-2 rounded-full border-4 border-[#1F7A54] dark:border-emerald-500 border-t-transparent animate-spin"></div>

                            {/* Inner AI Scanner Logo Icon */}
                            <div className="w-16 h-16 bg-[#1F7A54] dark:bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-[#1F7A54]/25 dark:shadow-emerald-500/20">
                                <svg className="w-8 h-8 text-white dark:text-black animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            </div>
                        </div>

                        {/* Progress Details */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">AI Sedang Menganalisis</h3>
                            <p className="text-xs font-semibold text-gray-500 dark:text-emerald-100/60 min-h-[1.5rem]">{scanStatus}</p>
                        </div>

                        {/* Progress Bar Loader */}
                        <div className="space-y-1">
                            <div className="w-full bg-gray-100 dark:bg-[#0b140e] rounded-full h-2 overflow-hidden border border-transparent dark:border-[#1a2e22]">
                                <div
                                    className="bg-[#1F7A54] dark:bg-emerald-500 h-full rounded-full transition-all duration-150"
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