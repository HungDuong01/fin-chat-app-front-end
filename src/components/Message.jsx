import React from 'react';
import { Copy, Check, Sparkles, User } from 'lucide-react';

export const Message = ({ message, onCopy, isCopied }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'} ${isUser ? 'animate-slide-right' : 'animate-slide-left'}`}>
            <div className={`flex gap-4 max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                    isUser
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/50'
                        : 'bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-violet-500/50'
                }`}>
                    {isUser ? (
                        <User className="w-5 h-5 text-white" />
                    ) : (
                        <Sparkles className="w-5 h-5 text-white" />
                    )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block px-5 py-3 rounded-2xl shadow-lg ${
                        isUser
                            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-indigo-500/30'
                            : 'glass-light text-gray-100 shadow-violet-500/20'
                    }`}>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                        </div>
                    </div>

                    {/* Copy Button for Assistant Messages */}
                    {!isUser && (
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() => onCopy(message.content)}
                                className="text-xs text-gray-400 hover:text-gray-200 transition-all flex items-center gap-1 px-3 py-1 rounded-full hover:bg-white/5"
                            >
                                {isCopied ? (
                                    <>
                                        <Check className="w-3 h-3 text-green-400" />
                                        <span className="text-green-400">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3 h-3" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};