import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, ChevronDown, Bot, Sparkles } from 'lucide-react';
import axios from 'axios';

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
    return (
        <div className="flex items-end gap-3 max-w-[85%] animate-fade-in">
            <BotAvatar size="sm" />
            <div className="bg-emerald-50/80 dark:bg-[#0C1E14] border border-emerald-100/80 dark:border-emerald-900/40 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                <p className="text-sm text-gray-800 dark:text-emerald-100 leading-relaxed whitespace-pre-wrap">{text}</p>
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
export default function AiAssistant() {
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            role: 'ai',
            text: 'Halo! 👋 Saya siGizi AI. Tanya saya seputar nutrisi, kalori, atau pola makan sehat!',
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);

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
        setIsHeaderDropdownOpen(false);
    };

    return (
        <AuthenticatedLayout>
            <Head title="AI Assistant" />

            {/* ── Chat Container Card ─────────────────────────────────── */}
            <div className="h-[calc(100vh-8rem)] flex flex-col bg-white dark:bg-[#09170F] rounded-3xl border border-gray-100 dark:border-emerald-950/80 shadow-sm overflow-hidden transition-colors">

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

                    {/* Header Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsHeaderDropdownOpen(!isHeaderDropdownOpen)}
                            className="p-2 rounded-xl text-gray-400 dark:text-emerald-600 hover:text-gray-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-emerald-950/60 transition-all duration-200"
                        >
                            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isHeaderDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isHeaderDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsHeaderDropdownOpen(false)} />
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0C1E14] rounded-xl border border-gray-100 dark:border-emerald-900/50 shadow-xl z-20 py-1.5 overflow-hidden">
                                    <button
                                        onClick={clearChat}
                                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-emerald-200 hover:bg-gray-50 dark:hover:bg-emerald-950/80 transition-colors flex items-center gap-2.5"
                                    >
                                        <Sparkles className="w-4 h-4 text-amber-500" />
                                        Chat Baru
                                    </button>
                                </div>
                            </>
                        )}
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