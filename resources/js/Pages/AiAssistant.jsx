import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, ChevronDown, Bot, Sparkles, Copy, Check } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ─── Bot Avatar Component ─────────────────────────────────────────────────────
function BotAvatar({ size = 'md' }) {
    const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-11 h-11';
    const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

    return (
        <div className={`${sizeClasses} rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/10 flex-shrink-0`}>
            <Bot className={`${iconSize} text-white`} />
        </div>
    );
}

// ─── Typing Indicator Component ────────────────────────────────────────────────
function TypingIndicator() {
    return (
        <div className="flex items-end gap-3 max-w-[85%]">
            <BotAvatar size="sm" />
            <div className="bg-emerald-50 dark:bg-[#0C1E14] border border-emerald-100/80 dark:border-emerald-900/40 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                <div className="flex items-center gap-1.5">
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium ml-2">AI sedang mengetik...</span>
                </div>
            </div>
        </div>
    );
}

// ─── Chat Bubble Components ────────────────────────────────────────────────────
function AiBubble({ text }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-start sm:items-end gap-3 max-w-[92%] sm:max-w-[85%] animate-fade-in group">
            <BotAvatar size="sm" />
            <div className="relative bg-emerald-50/90 dark:bg-[#0C1E14] border border-emerald-100/90 dark:border-emerald-900/50 rounded-2xl rounded-tl-sm sm:rounded-tl-2xl sm:rounded-bl-sm px-4 sm:px-5 py-3.5 sm:py-4 shadow-sm transition-all">
                <div className="text-sm text-gray-800 dark:text-emerald-50 leading-relaxed break-words">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ node, ...props }) => <p className="mb-2.5 last:mb-0 leading-relaxed" {...props} />,
                            strong: ({ node, ...props }) => <strong className="font-bold text-emerald-950 dark:text-emerald-200" {...props} />,
                            em: ({ node, ...props }) => <em className="italic text-gray-700 dark:text-emerald-200" {...props} />,
                            h1: ({ node, ...props }) => <h1 className="text-base sm:text-lg font-bold text-emerald-950 dark:text-emerald-100 mt-3 mb-1.5 first:mt-0 pb-1 border-b border-emerald-200/50 dark:border-emerald-900/50" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-sm sm:text-base font-bold text-emerald-900 dark:text-emerald-200 mt-3 mb-1.5 first:mt-0" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mt-2.5 mb-1 first:mt-0" {...props} />,
                            h4: ({ node, ...props }) => <h4 className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 mt-2 mb-1 first:mt-0" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-4 sm:ml-5 space-y-1.5 my-2.5 text-gray-800 dark:text-emerald-100" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-4 sm:ml-5 space-y-1.5 my-2.5 text-gray-800 dark:text-emerald-100" {...props} />,
                            li: ({ node, ...props }) => <li className="leading-relaxed pl-0.5" {...props} />,
                            hr: ({ node, ...props }) => <hr className="my-3 border-emerald-200/70 dark:border-emerald-900/70" {...props} />,
                            blockquote: ({ node, ...props }) => (
                                <blockquote className="border-l-3 border-emerald-500 bg-emerald-100/40 dark:bg-emerald-950/40 pl-3 pr-2 py-1.5 rounded-r-lg my-2 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 italic" {...props} />
                            ),
                            code: ({ node, inline, className, children, ...props }) => {
                                return inline ? (
                                    <code className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 font-mono text-xs font-medium" {...props}>
                                        {children}
                                    </code>
                                ) : (
                                    <pre className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto my-2.5 border border-slate-800">
                                        <code {...props}>{children}</code>
                                    </pre>
                                );
                            },
                            table: ({ node, ...props }) => (
                                <div className="overflow-x-auto my-3 rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 shadow-xs">
                                    <table className="min-w-full divide-y divide-emerald-200/70 dark:divide-emerald-900/70 text-xs" {...props} />
                                </div>
                            ),
                            thead: ({ node, ...props }) => <thead className="bg-emerald-100/70 dark:bg-emerald-950/70 font-semibold" {...props} />,
                            th: ({ node, ...props }) => <th className="px-3 py-2 text-left font-bold text-emerald-950 dark:text-emerald-200" {...props} />,
                            td: ({ node, ...props }) => <td className="px-3 py-2 border-t border-emerald-100/60 dark:border-emerald-900/40" {...props} />,
                            a: ({ node, ...props }) => (
                                <a
                                    className="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...props}
                                />
                            ),
                        }}
                    >
                        {text}
                    </ReactMarkdown>
                </div>

                {/* Copy Button */}
                <div className="flex justify-end items-center gap-2 mt-2 pt-1.5 border-t border-emerald-100/60 dark:border-emerald-900/30">
                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700/80 dark:text-emerald-400/80 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors"
                        title="Salin Pesan"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Tersalin!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-3 h-3" />
                                <span>Salin</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function UserBubble({ text }) {
    return (
        <div className="flex justify-end animate-fade-in">
            <div className="max-w-[80%] bg-emerald-600 dark:bg-[#15803D] text-white rounded-2xl rounded-br-md px-5 py-4 shadow-md shadow-emerald-900/10">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
            </div>
        </div>
    );
}

// ─── Quick Prompt Chips ────────────────────────────────────────────────────────
function QuickPrompts({ onSelect, disabled }) {
    const prompts = [
        { label: 'Kebutuhan kalori?', icon: '🔥' },
        { label: 'Makanan tinggi protein?', icon: '🥩' },
        { label: 'Tips diet sehat', icon: '🥗' },
    ];

    return (
        <div className="flex flex-wrap gap-2 px-1">
            {prompts.map((prompt) => (
                <button
                    key={prompt.label}
                    onClick={() => onSelect(prompt.label)}
                    disabled={disabled}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-[#0C1E14] border border-emerald-200/80 dark:border-emerald-900/40 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-950/80 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <span>{prompt.icon}</span>
                    <span>{prompt.label}</span>
                </button>
            ))}
        </div>
    );
}

// ─── Main AiAssistant Page ─────────────────────────────────────────────────────
export default function AiAssistant({ initialHistory = [] }) {
    const [messages, setMessages] = useState(() => {
        const welcomeMsg = {
            id: 'welcome',
            role: 'ai',
            text: 'Halo! 👋 Saya siGizi AI. Tanya saya seputar nutrisi, kalori, atau pola makan sehat!',
        };

        if (initialHistory && initialHistory.length > 0) {
            const historyMsgs = [];
            initialHistory.forEach((item, index) => {
                if (item.pesan_user) {
                    historyMsgs.push({
                        id: `hist-user-${item.id || index}`,
                        role: 'user',
                        text: item.pesan_user,
                    });
                }
                if (item.respon_ai) {
                    historyMsgs.push({
                        id: `hist-ai-${item.id || index}`,
                        role: 'ai',
                        text: item.respon_ai,
                    });
                }
            });
            return [welcomeMsg, ...historyMsgs];
        }

        return [welcomeMsg];
    });
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to newest message
    const scrollToBottom = useCallback(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, scrollToBottom]);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // ── Send Message Handler ───────────────────────────────────────────────────
    const sendMessage = useCallback(
        async (text) => {
            const trimmed = (text || inputValue).trim();
            if (!trimmed || isLoading) return;

            // Add user message immediately
            const userMsg = {
                id: `user-${Date.now()}`,
                role: 'user',
                text: trimmed,
            };
            setMessages((prev) => [...prev, userMsg]);
            setInputValue('');
            setIsLoading(true);

            try {
                // Build history from current messages (exclude welcome and current)
                const history = messages
                    .filter((m) => m.id !== 'welcome')
                    .map((m) => ({
                        role: m.role,
                        text: m.text,
                    }));

                const response = await axios.post(route('ai.chat'), {
                    message: trimmed,
                    history: history,
                });

                const aiReply = {
                    id: `ai-${Date.now()}`,
                    role: 'ai',
                    text: response.data.reply,
                };
                setMessages((prev) => [...prev, aiReply]);
            } catch (error) {
                const errorText =
                    error.response?.data?.reply ||
                    'Maaf, terjadi kesalahan koneksi. Silakan coba lagi. 🙏';

                const errorMsg = {
                    id: `ai-error-${Date.now()}`,
                    role: 'ai',
                    text: errorText,
                };
                setMessages((prev) => [...prev, errorMsg]);
            } finally {
                setIsLoading(false);
                inputRef.current?.focus();
            }
        },
        [inputValue, isLoading, messages]
    );

    // ── Handle Keyboard Submit ─────────────────────────────────────────────────
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // ── Quick Prompt Handler ───────────────────────────────────────────────────
    const handleQuickPrompt = (promptText) => {
        sendMessage(promptText);
    };

    // ── Clear Chat ─────────────────────────────────────────────────────────────
    const clearChat = () => {
        setMessages([
            {
                id: 'welcome',
                role: 'ai',
                text: 'Halo! 👋 Saya siGizi AI. Tanya saya seputar nutrisi, kalori, atau pola makan sehat!',
            },
        ]);
    };

    return (
        <AuthenticatedLayout>
            <Head title="AI Assistant" />

            {/* ── Chat Container Card ─────────────────────────────────── */}
            <div className="h-[calc(100vh-14rem)] sm:h-[calc(100vh-8rem)] flex flex-col bg-white dark:bg-[#09170F] rounded-3xl border border-gray-100 dark:border-emerald-950/80 shadow-sm overflow-hidden transition-colors">

                {/* ── Chat Header ─────────────────────────────────────── */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 dark:border-emerald-950/80 bg-gray-50/50 dark:bg-[#0C1E14]">
                    <div className="flex items-center gap-3.5">
                        <BotAvatar />
                        <div>
                            <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                                AI Assistant
                            </h2>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                    Online
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Header Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={clearChat}
                            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200/40 dark:border-emerald-800/20 active:scale-95 transition-all duration-200"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Chat Baru</span>
                        </button>
                    </div>
                </div>

                {/* ── Chat Messages Area ──────────────────────────────── */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-5 scroll-smooth bg-gray-50/20 dark:bg-[#09170F]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#052e16 transparent' }}>
                    {messages.map((msg) =>
                        msg.role === 'ai' ? (
                            <AiBubble key={msg.id} text={msg.text} />
                        ) : (
                            <UserBubble key={msg.id} text={msg.text} />
                        )
                    )}
                    {isLoading && <TypingIndicator />}
                    <div ref={chatEndRef} />
                </div>

                {/* ── Bottom Input Area ───────────────────────────────── */}
                <div className="border-t border-gray-100 dark:border-emerald-950/80 bg-white dark:bg-[#09170F] px-4 sm:px-6 py-4 space-y-3">
                    {/* Quick Prompts */}
                    <QuickPrompts onSelect={handleQuickPrompt} disabled={isLoading} />

                    {/* Input Bar */}
                    <div className="flex items-end gap-3">
                        <div className="flex-1 relative">
                            <textarea
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Tanya tentang nutrisi..."
                                rows={1}
                                disabled={isLoading}
                                className="w-full resize-none rounded-2xl border border-gray-200 dark:border-emerald-900/50 bg-gray-50 dark:bg-[#0C1E14] px-5 py-3.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-emerald-700/80 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-0 transition-all duration-200 disabled:opacity-50"
                                style={{ maxHeight: '120px', minHeight: '48px' }}
                                onInput={(e) => {
                                    e.target.style.height = '48px';
                                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                                }}
                            />
                        </div>
                        <button
                            onClick={() => sendMessage()}
                            disabled={!inputValue.trim() || isLoading}
                            className="w-12 h-12 rounded-2xl bg-amber-600 hover:bg-amber-700 dark:bg-[#B45309] dark:hover:bg-amber-600 text-white flex items-center justify-center shadow-md transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Inline Animations ─────────────────────────────────── */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}