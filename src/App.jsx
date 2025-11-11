import React, { useRef, useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Message } from './components/Message';
import { ChatInput } from './components/ChatInput';
import { LoadingIndicator } from './components/LoadingIndicator';
import { useChat } from './hooks/useChat';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import { exportChat } from './utils/exportChat';

export default function App() {
    const {
        messages,
        loading,
        selectedImage,
        imagePreviewUrl,
        sendMessage,
        handleImageSelect,
        clearImage,
        resetConversation
    } = useChat();

    const { copiedText, copyToClipboard } = useCopyToClipboard();

    const [input, setInput] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const [darkMode, setDarkMode] = useState(true);
    const [conversationHistory, setConversationHistory] = useState([]);

    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
        }
    }, [input]);

    const handleSubmit = () => {
        if ((!input.trim() && !selectedImage) || loading) return;
        sendMessage(input);
        setInput('');
    };

    const handleNewChat = () => {
        // Save current conversation to history if it has messages
        if (messages.length > 0) {
            const firstUserMessage = messages.find(m => m.role === 'user')?.content || 'New Chat';
            const title = firstUserMessage.substring(0, 50) + (firstUserMessage.length > 50 ? '...' : '');

            setConversationHistory(prev => [
                {
                    id: Date.now(),
                    title,
                    messages: [...messages],
                    timestamp: new Date()
                },
                ...prev
            ]);
        }

        // Reset conversation
        resetConversation();
        setInput('');
        setSidebarOpen(false);
    };

    const handleSelectConversation = (convId) => {
        const conv = conversationHistory.find(c => c.id === convId);
        if (conv) {
            // Save current conversation if it has messages
            if (messages.length > 0) {
                const firstUserMessage = messages.find(m => m.role === 'user')?.content || 'Chat';
                const title = firstUserMessage.substring(0, 50) + (firstUserMessage.length > 50 ? '...' : '');

                setConversationHistory(prev => {
                    // Remove the conversation we're about to load and add current
                    const filtered = prev.filter(c => c.id !== convId);
                    return [
                        {
                            id: Date.now(),
                            title,
                            messages: [...messages],
                            timestamp: new Date()
                        },
                        ...filtered
                    ];
                });
            } else {
                // Just remove the selected conversation from history
                setConversationHistory(prev => prev.filter(c => c.id !== convId));
            }

            // Load the selected conversation (would need to extend resetConversation to accept messages)
            // For now, just show an alert
            alert('Conversation history viewing will be implemented in the next update.');
        }
        setSidebarOpen(false);
    };

    const handleDeleteConversation = (convId) => {
        setConversationHistory(prev => prev.filter(c => c.id !== convId));
    };

    const handleExportChat = () => {
        exportChat(messages);
    };

    return (
        <div className="flex h-screen bg-[#0f172a] p-4 box-border font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
            {/* Sidebar */}
            <Sidebar
                conversations={conversationHistory}
                activeConv={null}
                onSelectConv={handleSelectConversation}
                onNewChat={handleNewChat}
                onDeleteConv={handleDeleteConversation}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Chat Box - ChatGPT Style */}
            <div className="flex-1 flex justify-center items-center">
                <div className="w-full max-w-[800px] h-[90vh] flex flex-col bg-[#020617] rounded-2xl border border-[#1e293b] shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e293b] bg-[#020617]">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.7)]"></div>
                        <h1 className="text-sm font-medium text-[#e5e7eb]">FinChat AI</h1>
                        <div className="ml-auto flex gap-2">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <button
                                onClick={handleExportChat}
                                className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                                title="Export chat"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto scroll-smooth">
                        {messages.length === 0 && (
                            <div className="text-center mt-20">
                                <div className="inline-block p-4 bg-[#020617] rounded-full mb-4 border border-[#1f2937]">
                                    <svg className="w-12 h-12 text-[#e5e7eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-[#e5e7eb] mb-2">FinChat AI Assistant</h2>
                                <p className="text-sm text-gray-400">Start a conversation by typing a message below</p>
                            </div>
                        )}
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                message={message}
                                onCopy={copyToClipboard}
                                isCopied={copiedText === message.content}
                            />
                        ))}
                        {loading && <LoadingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-[#1e293b]">
                        <ChatInput
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onSubmit={handleSubmit}
                            isLoading={loading}
                            textareaRef={textareaRef}
                            onImageSelect={handleImageSelect}
                            imagePreviewUrl={imagePreviewUrl}
                            onClearImage={clearImage}
                        />
                        <p className="text-xs text-gray-500 text-center mt-2">
                            FinChat AI can make mistakes. Check important info.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}