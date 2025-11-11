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
        <div className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
            <div className="flex flex-col h-full">
                {/* New Chat Button */}
                <div className="p-4 border-b border-gray-700">
                    <button
                        onClick={onNewChat}
                        className="w-full flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">New Chat</span>
                    </button>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all group ${
                                activeConv === conv.id
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                            onClick={() => onSelectConv(conv.id)}
                        >
                            <MessageSquare className="w-4 h-4 flex-shrink-0" />
                            <span className="flex-1 truncate text-sm">{conv.title}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteConv(conv.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Settings Button */}
                <div className="p-4 border-t border-gray-700">
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};