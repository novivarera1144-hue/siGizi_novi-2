import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    // Step aktif: 1 = Masukkan Email, 2 = Masukkan Kode Verifikasi, 3 = Password Baru
    const [step, setStep] = useState(1);
    const [verifiedEmail, setVerifiedEmail] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        otp: '',
        password: '',
        password_confirmation: '',
    });

    // Handle perpindahan antar step secara interaktif (Mockup UI)
    const handleNextStep = (e) => {
        e.preventDefault();

        if (step === 1) {
            if (!data.email) return;
            setVerifiedEmail(data.email);
            setStep(2); // Lanjut ke input kode verifikasi
        } else if (step === 2) {
            if (!data.otp) {
                alert('Silakan masukkan kode verifikasi terlebih dahulu!');
                return;
            }
            setStep(3); // Lanjut ke form password baru
        } else if (step === 3) {
            if (!data.password || !data.password_confirmation) {
                alert('Semua kolom password harus diisi!');
                return;
            }
            if (data.password !== data.password_confirmation) {
                alert('Konfirmasi password tidak cocok!');
                return;
            }

            // Simulasi sukses ubah password total
            alert('Kata sandi berhasil diubah! Silakan masuk kembali dengan kata sandi baru Anda.');
            window.location.href = route('login');
        }
    };

    return (
        <GuestLayout
            title={
                step === 1 ? "Lupa Password" :
                    step === 2 ? "Verifikasi Kode" : "Reset Password Baru"
            }
            subtitle={
                step === 1 ? "Masukkan email akunmu untuk reset password" :
                    step === 2 ? `Kode verifikasi telah dikirim ke ${verifiedEmail}` :
                        "Buat kata sandi baru untuk akun kamu"
            }
        >
            <Head title="Lupa Password" />

            {/* Indikator Langkah (Step Indicator ala UI Modern) */}
            <div className="flex items-center justify-center gap-2 mb-6">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'w-10 bg-[#1F7A54]' : 'w-4 bg-gray-200 dark:bg-[#1E4530]'}`} />
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'w-10 bg-[#1F7A54]' : 'w-4 bg-gray-200 dark:bg-[#1E4530]'}`} />
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? 'w-10 bg-[#1F7A54]' : 'w-4 bg-gray-200 dark:bg-[#1E4530]'}`} />
            </div>

            {status && (
                <div className="mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-[#102A1C]/50 border border-emerald-200 dark:border-[#1E4D34]/50 flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#1F7A54] dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                        {status}
                    </div>
                </div>
            )}

            <form onSubmit={handleNextStep} className="space-y-5">
                {/* STEP 1: Masukkan Email */}
                {step === 1 && (
                    <div>
                        <div className="mb-4 text-sm text-gray-500 dark:text-[#52B788]/80 leading-relaxed">
                            Lupa kata sandi Anda? Cukup masukkan alamat email terdaftar Anda di bawah ini untuk melanjutkan proses pemulihan akun.
                        </div>

                        <InputLabel
                            htmlFor="email"
                            value="EMAIL AKUN"
                            className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-[#52B788]/80"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:placeholder-emerald-300/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
                            placeholder="contoh@email.com"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-1.5 text-xs" />
                    </div>
                )}

                {/* STEP 2: Masukkan Kode Verifikasi / OTP */}
                {step === 2 && (
                    <div>
                        <div className="mb-4 text-sm text-gray-500 dark:text-[#52B788]/80 leading-relaxed">
                            Masukkan 6 digit kode verifikasi yang telah dikirimkan ke email Anda untuk melanjutkan.
                        </div>

                        <InputLabel
                            htmlFor="otp"
                            value="KODE VERIFIKASI (OTP)"
                            className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-[#52B788]/80"
                        />

                        <TextInput
                            id="otp"
                            type="text"
                            maxLength={6}
                            name="otp"
                            value={data.otp}
                            className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-center tracking-[0.5em] font-bold text-lg text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm"
                            placeholder="••••••"
                            isFocused={true}
                            onChange={(e) => setData('otp', e.target.value)}
                            required
                        />
                    </div>
                )}

                {/* STEP 3: Password Baru */}
                {step === 3 && (
                    <div className="space-y-4">
                        <div className="mb-2 text-sm text-gray-500 dark:text-[#52B788]/80 leading-relaxed">
                            Silakan buat kata sandi baru yang aman untuk akun siGizi Anda.
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="PASSWORD BARU"
                                className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-[#52B788]/80"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
                                placeholder="••••••••"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="KONFIRMASI PASSWORD BARU"
                                className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-[#52B788]/80"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
                                placeholder="••••••••"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}

                {/* Tombol Aksi Navigasi Multi-Step */}
                <div className="pt-2">
                    <PrimaryButton
                        className="w-full bg-[#1F7A54] hover:bg-[#164D2B] dark:bg-[#1F7A54] dark:hover:bg-[#164D2B] py-3.5 rounded-xl justify-center font-bold text-sm text-white shadow-md shadow-[#1F7A54]/20 transition-all duration-200 cursor-pointer border-none normal-case tracking-normal"
                        disabled={processing}
                    >
                        {step === 1 ? 'Selanjutnya (Kirim Kode)' :
                            step === 2 ? 'Verifikasi Kode' : 'Simpan Password Baru'}
                    </PrimaryButton>
                </div>

                {/* Tombol Kembali / Ganti Step */}
                {step > 1 && (
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="text-xs font-semibold text-gray-400 hover:text-gray-600 dark:text-[#52B788]/60 dark:hover:text-emerald-400 transition-colors"
                        >
                            ← Kembali ke langkah sebelumnya
                        </button>
                    </div>
                )}

                <div className="text-center text-xs text-gray-500 dark:text-[#52B788]/80 pt-4 mt-6 border-t border-gray-100 dark:border-[#1E4530]">
                    Kembali ke{' '}
                    <Link
                        href={route('login')}
                        prefetch={["hover", "mount"]}
                        className="font-bold text-[#1F7A54] hover:text-[#164D2B] dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200"
                    >
                        Halaman Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}