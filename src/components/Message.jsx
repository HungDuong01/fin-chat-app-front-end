import React from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { formatMessageContent } from '/utils/messageFormatter';

export const Message = ({ message, onCopy, copiedId }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isUser ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-600 to-blue-600'
                }`}>
                    {isUser ? (
                        <span className="text-white text-sm font-medium">U</span>
                    ) : (
                        <Sparkles className="w-5 h-5 text-white" />
                    )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl ${
                        isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'
                    }`}>
                        <div className="text-sm leading-relaxed">
                            {formatMessageContent(message.content, message.id, onCopy, copiedId)}
                        </div>
                    </div>

                    {/* Copy Button for Assistant Messages */}
                    {!isUser && (
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() => onCopy(message.content, `msg-${message.id}`)}
                                className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
                            >
                                {copiedId === `msg-${message.id}` ? (
                                    <>
                                        <Check className="w-3 h-3" />
                                        Copied
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