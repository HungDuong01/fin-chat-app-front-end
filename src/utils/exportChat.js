/**
 * Export chat conversation to a text file
 * @param {Array} messages - Array of message objects with role and content
 * @param {string} filename - Optional filename (defaults to timestamped name)
 */
export const exportChat = (messages, filename = null) => {
  if (!messages || messages.length === 0) {
    alert('Không có tin nhắn để xuất.');
    return;
  }

  // Generate filename with timestamp if not provided
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const exportFilename = filename || `chat-export-${timestamp}.txt`;

  // Format messages as text
  const chatText = messages
    .map(msg => {
      const roleLabel = msg.role === 'user' ? 'Bạn' : 'Trợ lý';
      return `${roleLabel}:\n${msg.content}\n`;
    })
    .join('\n---\n\n');

  // Add header
  const header = `FinChat Conversation Export\nDate: ${new Date().toLocaleString('vi-VN')}\nTotal Messages: ${messages.length}\n\n${'='.repeat(50)}\n\n`;
  const fullContent = header + chatText;

  // Create blob and download
  const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = exportFilename;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export chat conversation as Markdown
 * @param {Array} messages - Array of message objects
 * @param {string} filename - Optional filename
 */
export const exportChatAsMarkdown = (messages, filename = null) => {
  if (!messages || messages.length === 0) {
    alert('Không có tin nhắn để xuất.');
    return;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const exportFilename = filename || `chat-export-${timestamp}.md`;

  // Format messages as markdown
  const chatMarkdown = messages
    .map(msg => {
      const roleLabel = msg.role === 'user' ? '👤 **Bạn**' : '🤖 **Trợ lý**';
      return `${roleLabel}\n\n${msg.content}\n`;
    })
    .join('\n---\n\n');

  // Add markdown header
  const header = `# FinChat Conversation Export\n\n**Date:** ${new Date().toLocaleString('vi-VN')}  \n**Total Messages:** ${messages.length}\n\n---\n\n`;
  const fullContent = header + chatMarkdown;

  // Create blob and download
  const blob = new Blob([fullContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = exportFilename;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default exportChat;
