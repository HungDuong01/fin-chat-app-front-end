import React, { useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';

export const ChatInput = ({
                              value,
                              onChange,
                              onSubmit,
                              isLoading,
                              textareaRef,
                              onImageSelect,
                              imagePreviewUrl,
                              onClearImage
                          }) => {
    const fileInputRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleFileSelect = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        onImageSelect?.(file);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const hasContent = value.trim() || imagePreviewUrl;

    return (
        <div className="w-full">
            {/* Image Preview */}
            {imagePreviewUrl && (
                <div className="mb-3 flex items-center gap-3 px-4 py-3 bg-[#2f2f2f] rounded-2xl border border-white/10">
                    <img
                        src={imagePreviewUrl}
                        alt="Attached"
                        className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-200 font-medium">Image attached</p>
                        <p className="text-xs text-gray-500">Ready to send</p>
                    </div>
                    <button
                        onClick={onClearImage}
                        className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* ChatGPT Input Box */}
            <div
                className="relative bg-[#2f2f2f] border border-[#565869] rounded-[26px] shadow-[0_0_0_1px_rgba(0,0,0,0.1)] focus-within:border-white/20 transition-all"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                />

                {/* Main Input Area */}
                <div className="flex items-end gap-2 px-4 py-3">
                    {/* Paperclip Button */}
                    <button
                        onClick={triggerFileInput}
                        className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-200 hover:bg-white/10 rounded-lg transition-all mb-1"
                        title="Attach file"
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>

                    {/* Textarea */}
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Message FinChat AI"
                        className="flex-1 max-h-[200px] bg-transparent text-[#ececf1] text-[15px] placeholder-gray-500 leading-6 focus:outline-none resize-none overflow-y-auto"
                        rows="1"
                    />

                    {/* Send Button - ChatGPT Style */}
                    <button
                        onClick={onSubmit}
                        disabled={isLoading || !hasContent}
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all ${
                            hasContent && !isLoading
                                ? 'bg-white text-black hover:bg-gray-200'
                                : 'bg-[#40414f] text-gray-500 cursor-not-allowed'
                        }`}
                        title="Send message"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-gray-500 border-t-gray-300 rounded-full animate-spin"></div>
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};