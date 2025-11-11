import React from 'react';
import { Send } from 'lucide-react';

export const ChatInput = ({
                              value,
                              onChange,
                              onSubmit,
                              isLoading,
                              textareaRef
                          }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="relative">
      <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="Message AI assistant..."
          className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="1"
          style={{ maxHeight: '200px' }}
      />
            <button
                onClick={onSubmit}
                disabled={isLoading || !value.trim()}
                className="absolute right-2 bottom-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
            >
                <Send className="w-5 h-5" />
            </button>
        </div>
    );
};