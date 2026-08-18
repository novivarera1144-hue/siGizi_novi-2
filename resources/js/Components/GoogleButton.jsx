export default function GoogleButton({
    text = 'Lanjutkan dengan Google',
    dividerPosition = 'none', // 'top' | 'bottom' | 'none'
    dividerText = 'atau',
    className = '',
    action = 'login', // 'login' | 'register'
    href
}) {
    const targetUrl = href || (action === 'register' ? '/auth/google/register' : '/auth/google/login');

    const dividerEl = (
        <div className="relative flex items-center justify-center my-5 py-2">
            <div className="absolute w-full border-t border-gray-100 dark:border-[#1E4530]"></div>
            <span className="relative bg-white dark:bg-[#0B2B18] px-3 text-xs text-gray-400 dark:text-[#52B788]/60 font-semibold tracking-wider">
                {dividerText}
            </span>
        </div>
    );

    return (
        <div className={className}>
            {dividerPosition === 'top' && dividerEl}

            <a
                href={targetUrl}
                className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all duration-200 shadow-sm cursor-pointer bg-white dark:bg-transparent dark:hover:bg-[#164D2B]/20 dark:border-[#164D2B] dark:text-gray-200"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span>{text}</span>
            </a>

            {dividerPosition === 'bottom' && dividerEl}
        </div>
    );
}