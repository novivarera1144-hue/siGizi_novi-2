import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout
            title="Buat Akun Baru"
            subtitle="Bergabung dan mulai hidup sehat"
        >
            <Head title="Daftar Akun Baru" />

            <form onSubmit={submit} className="space-y-5">
                {/* Google Sign-in Alternative */}
                <div>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-gray-200 dark:border-[#164D2B] bg-white hover:bg-gray-50 dark:bg-[#071A0E] dark:hover:bg-[#092213] text-gray-700 dark:text-white font-semibold text-sm transition-all duration-200 shadow-sm cursor-pointer"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                        <span>Daftar dengan Google</span>
                    </button>
                </div>

                {/* Divider Line */}
                <div className="relative flex items-center justify-center my-4 py-1">
                    <div className="absolute w-full border-t border-gray-100 dark:border-[#164D2B]"></div>
                    <span className="relative bg-white dark:bg-[#0B2B18] px-3 text-xs text-gray-400 dark:text-[#52B788]/60 font-semibold tracking-wider">atau isi form</span>
                </div>

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
                        className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#0D2617] dark:border-[#1E5631] dark:text-emerald-100 dark:placeholder-emerald-700/60 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
                        placeholder="Budi Santoso"
                        autoComplete="name"
                        isFocused={true}
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
                        className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#0D2617] dark:border-[#1E5631] dark:text-emerald-100 dark:placeholder-emerald-700/60 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
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
                        className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#0D2617] dark:border-[#1E5631] dark:text-emerald-100 dark:placeholder-emerald-700/60 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
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
                        className="mt-1.5 block w-full px-4 py-3 rounded-xl border border-emerald-100 bg-[#EFF7F4] text-gray-800 placeholder-gray-400 focus:border-[#1F7A54] focus:ring-[#1F7A54] dark:bg-[#0D2617] dark:border-[#1E5631] dark:text-emerald-100 dark:placeholder-emerald-700/60 dark:focus:border-emerald-400 dark:focus:ring-emerald-400 transition-all duration-200 shadow-sm text-sm"
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
                        className="w-full bg-[#1F7A54] hover:bg-[#186041] dark:bg-[#42A85F] dark:hover:bg-[#34914F] py-3.5 rounded-xl justify-center font-bold text-sm text-white shadow-md transition-all duration-200 cursor-pointer"
                        disabled={processing}
                    >
                        Daftar
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