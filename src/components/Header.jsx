import React from 'react';
import { Menu, Download, Sun, Moon, Sparkles } from 'lucide-react';

export const Header = ({
                           onToggleSidebar,
                           onExport,
                           darkMode,
                           onToggleTheme
                       }) => {
    return (
        <header className="glass border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className="lg:hidden p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-md opacity-50"></div>
                            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl shadow-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold gradient-text">FinChat AI</h1>
                            <p className="text-xs text-gray-400 font-medium">Powered by GPT-4</p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex gap-2">
                    <button
                        onClick={onExport}
                        className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all hover:scale-105"
                        title="Export chat"
                    >
                        <Download className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onToggleTheme}
                        className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all hover:scale-105"
                        title="Toggle theme"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </header>
    );
};