import React from 'react';
import { Sparkles } from 'lucide-react';

export const LoadingIndicator = () => {
    return (
        <div className="flex gap-4 animate-slide-left">
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/50 animate-pulse">
                <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
                <div className="inline-block px-5 py-4 rounded-2xl glass-light shadow-lg shadow-violet-500/20">
                    <div className="flex gap-2 items-center">
                        <div className="w-2.5 h-2.5 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2.5 h-2.5 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2.5 h-2.5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <span className="ml-2 text-sm text-gray-400 font-medium">Thinking...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};