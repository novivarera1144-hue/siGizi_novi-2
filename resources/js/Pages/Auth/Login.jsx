import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GoogleButton from '@/Components/GoogleButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset, setError } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => reset('password'),
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    setError(key, errors[key]);
                });
            },
        });
    };

    return (
        <GuestLayout
            title="Masuk ke siGizi"
            subtitle="Seluruh pengguna menggunakan satu halaman akses masuk yang sama."
        >
            <Head title="Masuk ke siGizi" />

            {status && (
                <div className="mb-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
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
                        className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:placeholder-emerald-300/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
                        placeholder="contoh@email.com"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
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
                        className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#101F17] dark:border-[#1E4530] dark:text-emerald-100 dark:placeholder-emerald-300/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs" />
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 dark:border-[#1E4530] bg-white dark:bg-[#101F17] text-[#1F7A54] dark:text-emerald-500 focus:ring-[#1F7A54] dark:focus:ring-emerald-500"
                        />
                        <span className="ms-2 text-gray-500 dark:text-[#52B788]/90 font-medium">
                            Ingat saya
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-gray-500 font-semibold hover:text-[#1F7A54] dark:text-[#52B788]/90 dark:hover:text-emerald-400 transition-colors duration-200"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                    <PrimaryButton
                        disabled={processing}
                        className={`w-full bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#42A85F] dark:hover:bg-[#34914F] py-3.5 rounded-xl justify-center font-bold text-sm text-white shadow-md shadow-[#1F7A54]/20 transition-all duration-200 ${processing ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
                            }`}
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Sedang Masuk...</span>
                            </>
                        ) : (
                            'Masuk'
                        )}
                    </PrimaryButton>
                </div>

                <GoogleButton
                    text="Masuk dengan Google"
                    dividerPosition="top"
                    dividerText="atau"
                    action="login"
                />

                {/* Footer Link to Register */}
                <div className="text-center text-xs text-gray-500 dark:text-[#52B788]/80 pt-4">
                    Belum punya akun?{' '}
                    <Link
                        href={route('register')}
                        className="font-bold text-[#1F7A54] hover:text-[#186041] dark:text-emerald-400 transition-colors duration-200"
                    >
                        Daftar sekarang
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}