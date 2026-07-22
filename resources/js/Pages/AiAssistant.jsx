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
        <div className={`${sizeClasses} rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-200/50 flex-shrink-0`}>
            <Bot className={`${iconSize} text-white`} />
        </div>
    );
}

// ─── Typing Indicator Component ────────────────────────────────────────────────
function TypingIndicator() {
    return (
        <div className="flex items-end gap-3 max-w-[85%]">
            <BotAvatar size="sm" />
            <div className="bg-emerald-50 border border-emerald-100/60 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                <div className="flex items-center gap-1.5">
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-emerald-600/70 font-medium ml-2">AI sedang mengetik...</span>
                </div>
            </div>
        </div>
    );
}

// ─── Chat Bubble Components ────────────────────────────────────────────────────
function AiBubble({ text, isFirst = false }) {
    return (
        <div className="flex items-end gap-3 max-w-[85%] animate-fade-in">
            <BotAvatar size="sm" />
            <div className="bg-emerald-50 border border-emerald-100/60 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{text}</p>
            </div>
        </div>
    );
}

function UserBubble({ text }) {
    return (
        <div className="flex justify-end animate-fade-in">
            <div className="max-w-[80%] bg-gradient-to-br from-[#1F7A54] to-[#166040] text-white rounded-2xl rounded-br-md px-5 py-4 shadow-md shadow-emerald-200/30">
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 rounded-full hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-sm active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            <div className="h-[calc(100vh-8rem)] flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800/80 shadow-xl shadow-gray-100/50 dark:shadow-zinc-950/50 overflow-hidden">

                {/* ── Chat Header ─────────────────────────────────────── */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                    <div className="flex items-center gap-3.5">
                        <BotAvatar />
                        <div>
                            <h2 className="text-base font-bold text-gray-800 dark:text-zinc-100 tracking-tight">
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
                            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-200"
                        >
                            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isHeaderDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isHeaderDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsHeaderDropdownOpen(false)} />
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-xl z-20 py-1.5 overflow-hidden">
                                    <button
                                        onClick={clearChat}
                                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors flex items-center gap-2.5"
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
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-5 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent' }}>
                    {messages.map((msg) =>
                        msg.role === 'ai' ? (
                            <AiBubble key={msg.id} text={msg.text} isFirst={msg.id === 'welcome'} />
                        ) : (
                            <UserBubble key={msg.id} text={msg.text} />
                        )
                    )}
                    {isLoading && <TypingIndicator />}
                    <div ref={chatEndRef} />
                </div>

                {/* ── Bottom Input Area ───────────────────────────────── */}
                <div className="border-t border-gray-100 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-4 sm:px-6 py-4 space-y-3">
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
                                className="w-full resize-none rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 px-5 py-3.5 pr-4 text-sm text-gray-700 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#1F7A54] focus:ring-2 focus:ring-[#1F7A54]/20 transition-all duration-200 disabled:opacity-50"
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
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-200/50 hover:shadow-orange-300/60 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none flex-shrink-0"
                        >
                            <Send className="w-5 h-5 -ml-0.5" />
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
