import React, { useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import { Message } from './components/Message/Message';
import { ChatInput } from './components/ChatInput/ChatInput';
import { LoadingIndicator } from './components/LoadingIndicator/LoadingIndicator';
import { useChat } from './hooks/useChat';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import { exportChat } from './utils/exportChat';

export default function App() {
    const {
        conversations,
        activeConvId,
        isLoading,
        setActiveConvId,
        sendMessage,
        createNewConversation,
        deleteConversation
    } = useChat();

    const { copiedId, copyToClipboard } = useCopyToClipboard();

    const [input, setInput] = React.useState('');
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(true);

    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const activeConv = conversations.find(c => c.id === activeConvId);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeConv?.messages]);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
        }
    }, [input]);

    const handleSubmit = () => {
        if (!input.trim() || isLoading) return;
        sendMessage(activeConvId, input);
        setInput('');
    };

    const handleNewChat = () => {
        createNewConversation();
        setSidebarOpen(false);
    };

    const handleSelectConv = (id) => {
        setActiveConvId(id);
        setSidebarOpen(false);
    };

    const handleExportChat = () => {
        exportChat(activeConv.messages, activeConv.title);
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Sidebar */}
            <Sidebar
                conversations={conversations}
                activeConv={activeConvId}
                onSelectConv={handleSelectConv}
                onNewChat={handleNewChat}
                onDeleteConv={deleteConversation}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    onExport={handleExportChat}
                    darkMode={darkMode}
                    onToggleTheme={() => setDarkMode(!darkMode)}
                />

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {activeConv?.messages.map((message) => (
                            <Message
                                key={message.id}
                                message={message}
                                onCopy={copyToClipboard}
                                copiedId={copiedId}
                            />
                        ))}
                        {isLoading && <LoadingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm px-4 py-4">
                    <div className="max-w-4xl mx-auto">
                        <ChatInput
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            textareaRef={textareaRef}
                        />
                        <p className="text-xs text-gray-500 text-center mt-2">
                            AI can make mistakes. Verify important information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
```

---

// ## 🎯 Final Project Structure
// ```
// src/
// ├── components/
// │   ├── Sidebar/
// │   │   └── Sidebar.jsx
// │   ├── Message/
// │   │   └── Message.jsx
// │   ├── ChatInput/
// │   │   └── ChatInput.jsx
// │   ├── Header/
// │   │   └── Header.jsx
// │   └── LoadingIndicator/
// │       └── LoadingIndicator.jsx
// ├── hooks/
// │   ├── useChat.js
// │   └── useCopyToClipboard.js
// ├── utils/
// │   ├── messageFormatter.jsx
// │   ├── responseGenerator.js
// │   └── exportChat.js
// ├── App.jsx (NEW - Much cleaner!)
// ├── main.jsx
// └── index.css