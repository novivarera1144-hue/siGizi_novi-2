import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GoogleButton from '@/Components/GoogleButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Register({ googleData: propGoogleData }) {
    const { flash, googleData: pageGoogleData } = usePage().props;
    const googleData = flash?.googleData || pageGoogleData || propGoogleData;

    const { data, setData, post, processing, errors, reset, setError } = useForm({
        name: googleData?.name || '',
        email: googleData?.email || '',
        google_id: googleData?.google_id || '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (googleData) {
            setData((prev) => ({
                ...prev,
                name: googleData.name || prev.name,
                email: googleData.email || prev.email,
                google_id: googleData.google_id || prev.google_id,
            }));
        }
    }, [googleData]);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => reset('password', 'password_confirmation'),
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    setError(key, errors[key]);
                });
            },
        });
    };

    return (
        <GuestLayout
            title="Buat Akun Baru"
            subtitle="Bergabung dan mulai hidup sehat"
        >
            <Head title="Daftar Akun Baru" />

            {/* Indikator Visual Google Register */}
            {googleData && (
                <div className="mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 shadow-sm flex items-start gap-3">
                    <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/60 rounded-lg text-emerald-600 dark:text-emerald-400 mt-0.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold text-sm text-emerald-900 dark:text-emerald-100">
                            Terhubung dengan akun Google: <span className="underline">{googleData.email}</span>
                        </p>
                        <p className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-300">
                            Data nama dan email telah diisi otomatis. Silakan tentukan kata sandi Anda untuk menyelesaikan pendaftaran.
                        </p>
                    </div>
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <input type="hidden" name="google_id" value={data.google_id || ''} />

                {!googleData && (
                    <GoogleButton
                        text="Daftar dengan Google"
                        dividerPosition="bottom"
                        dividerText="atau isi form"
                        action="register"
                    />
                )}

                {/* Name Field */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="NAMA LENGKAP"
                        className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-emerald-600/80"
                    />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:placeholder-emerald-300/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
                        placeholder="Budi Santoso"
                        autoComplete="name"
                        isFocused={!googleData}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-1.5 text-xs" />
                </div>

                {/* Email Field */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="EMAIL"
                        className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-emerald-600/80"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        readOnly={!!googleData?.email}
                        className={`mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:placeholder-emerald-300/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm ${googleData?.email ? 'opacity-80 cursor-not-allowed bg-emerald-100/50 dark:bg-emerald-900/30' : ''
                            }`}
                        placeholder="budi@email.com"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs" />
                </div>

                {/* Password Field */}
                <div>
                    <InputLabel
                        htmlFor="password"
                        value="PASSWORD"
                        className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-emerald-600/80"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        isFocused={!!googleData}
                        className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:placeholder-emerald-300/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
                        placeholder="Min. 8 karakter"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs" />
                </div>

                {/* Confirm Password Field */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="KONFIRMASI PASSWORD"
                        className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-emerald-600/80"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:placeholder-emerald-300/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-1.5 text-xs" />
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                    <PrimaryButton
                        disabled={processing}
                        className={`w-full bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#42A85F] dark:hover:bg-[#34914F] py-3.5 rounded-xl justify-center font-bold text-sm text-white shadow-md transition-all duration-200 ${processing ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
                            }`}
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Sedang Mendaftarkan...</span>
                            </>
                        ) : (
                            'Daftar'
                        )}
                    </PrimaryButton>
                </div>

                {/* Footer Link to Login */}
                <div className="text-center text-xs text-gray-500 dark:text-[#52B788]/80 pt-2">
                    Sudah memiliki akun?{' '}
                    <Link
                        href={route('login')}
                        className="font-bold text-[#1F7A54] hover:text-[#186041] dark:text-emerald-400 transition-colors duration-200"
                    >
                        Masuk sekarang
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
