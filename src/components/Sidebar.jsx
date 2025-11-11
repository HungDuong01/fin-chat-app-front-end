import React from 'react';
import { Plus, MessageSquare, Settings, Trash2 } from 'lucide-react';

export const Sidebar = ({
                            conversations,
                            activeConv,
                            onSelectConv,
                            onNewChat,
                            onDeleteConv,
                            isOpen,
                        }) => {
    return (
        <div className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 glass border-r border-white/10 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
            <div className="flex flex-col h-full">
                {/* New Chat Button */}
                <div className="p-6 border-b border-white/10">
                    <button
                        onClick={onNewChat}
                        className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-semibold">New Conversation</span>
                    </button>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-transparent">
                    {conversations.length === 0 ? (
                        <div className="text-center py-12 px-4">
                            <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
                                <MessageSquare className="w-8 h-8 text-gray-500" />
                            </div>
                            <p className="text-sm text-gray-500">No conversations yet</p>
                            <p className="text-xs text-gray-600 mt-2">Start a new chat to begin</p>
                        </div>
                    ) : (
                        conversations.map((conv) => (
                            <div
                                key={conv.id}
                                className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all group ${
                                    activeConv === conv.id
                                        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-white shadow-lg'
                                        : 'text-gray-400 hover:bg-white/5 border border-transparent'
                                }`}
                                onClick={() => onSelectConv(conv.id)}
                            >
                                <div className="p-2 bg-white/5 rounded-xl">
                                    <MessageSquare className="w-4 h-4 flex-shrink-0" />
                                </div>
                                <span className="flex-1 truncate text-sm font-medium">{conv.title}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteConv(conv.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                >
                                    <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Settings Button */}
                <div className="p-6 border-t border-white/10">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};