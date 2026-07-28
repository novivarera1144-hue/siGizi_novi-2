import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout
            title="Lupa Password"
            subtitle="Masukkan email akunmu untuk reset password"
        >
            <Head title="Lupa Password" />

            <div className="mb-5 text-sm text-gray-500 dark:text-[#52B788]/80 leading-relaxed">
                Lupa kata sandi Anda? Tidak masalah. Cukup beri tahu kami alamat email Anda dan kami akan mengirimkan tautan pengaturan ulang kata sandi melalui email yang memungkinkan Anda memilih yang baru.
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

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="EMAIL"
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

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full bg-[#1F7A54] hover:bg-[#164D2B] dark:bg-[#1F7A54] dark:hover:bg-[#164D2B] py-3.5 rounded-xl justify-center font-bold text-sm text-white shadow-md shadow-[#1F7A54]/20 transition-all duration-200 cursor-pointer border-none normal-case tracking-normal"
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Mengirim...
                            </span>
                        ) : (
                            'Kirim Tautan Reset Password'
                        )}
                    </PrimaryButton>
                </div>

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

