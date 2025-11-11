import React from 'react';
import { Menu, Download, Sun, Moon, Sparkles } from 'lucide-react';

export const Header = ({
                           onToggleSidebar,
                           onExport,
                           darkMode,
                           onToggleTheme
                       }) => {
    return (
        <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
            <div className="flex items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleSidebar}
                        className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white">AI Assistant</h1>
                            <p className="text-xs text-gray-400">Always here to help</p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex gap-2">
                    <button
                        onClick={onExport}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        title="Export chat"
                    >
                        <Download className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onToggleTheme}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        title="Toggle theme"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </header>
    );
};