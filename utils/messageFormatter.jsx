import React from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

export const formatMessageContent = (content, messageId, onCopy, copiedId) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
        if (part.startsWith('```')) {
            const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
            if (match) {
                const lang = match[1] || 'plaintext';
                const code = match[2];
                const codeId = `code-${messageId}-${index}`;

                return (
                    <div key={index} className="my-4 rounded-lg overflow-hidden border border-gray-700">
                        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono flex items-center gap-2">
                <Code2 className="w-3 h-3" />
                  {lang}
              </span>
                            <button
                                onClick={() => onCopy(code, codeId)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                {copiedId === codeId ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <pre className="bg-gray-900 p-4 overflow-x-auto">
              <code className="text-sm text-gray-100 font-mono">{code}</code>
            </pre>
                    </div>
                );
            }
        }

        return (
            <div key={index} className="whitespace-pre-wrap">
                {part.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        {i < part.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </div>
        );
    });
};