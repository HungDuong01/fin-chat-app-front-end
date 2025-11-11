import React from 'react';
import { Sparkles } from 'lucide-react';

export const LoadingIndicator = () => {
    return (
        <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
                <div className="inline-block px-4 py-3 rounded-2xl bg-gray-800">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};