import { useState, useCallback } from 'react';
import chatService from '../services/chatService';

/**
 * useChat Hook - Manages chat state and interactions
 * Based on Angular HomeComponent functionality
 */
export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  /**
   * Get display name for agent type
   * @param {string} intent - Agent type identifier
   * @returns {string} - Display name
   */
  const getAgentDisplayName = (intent) => {
    const agentNames = {
      'assistant': 'Trợ lý',
      'main': 'Trợ lý chính',
      'faq': 'FAQ',
      'pricing': 'Giá cả',
      'info_usage': 'Thông tin & Sử dụng',
      'image_analysis': 'Phân tích hình ảnh'
    };
    return agentNames[intent] || 'Agent';
  };

  /**
   * Send message to backend
   * @param {string} messageText - User's message
   */
  const sendMessage = useCallback(async (messageText) => {
    // Validate input
    if (!messageText.trim() && !selectedImage) {
      return;
    }

    const userMessageContent = messageText.trim() || '[Hình ảnh]';

    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: userMessageContent
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      let response;

      // If image exists, send image with text
      if (selectedImage) {
        const formData = new FormData();
        formData.append('message', messageText || '');
        formData.append('image', selectedImage);

        response = await chatService.sendImageAndText(formData);

        // Clear image after sending
        setSelectedImage(null);
        setImagePreviewUrl(null);
      } else {
        // Send text only with last 3 messages as context
        const history = messages.slice(-3);
        response = await chatService.sendMessage(messageText, history);
      }

      // Handle successful response
      if (response.replies && Array.isArray(response.replies)) {
        response.replies.forEach(item => {
          const agentName = getAgentDisplayName(item.intent);
          const content = `[${agentName}]: ${item.reply}`;

          setMessages(prev => [...prev, {
            role: 'agent',
            content
          }]);
        });
      } else {
        // Fallback for unexpected format
        setMessages(prev => [...prev, {
          role: 'agent',
          content: response.response || '[Không có phản hồi]'
        }]);
      }
    } catch (error) {
      // Handle errors
      const errorMessage = error.message || 'Đã xảy ra lỗi khi gửi tin nhắn.';
      setMessages(prev => [...prev, {
        role: 'agent',
        content: `Lỗi: ${errorMessage}`
      }]);
    } finally {
      setLoading(false);
    }
  }, [messages, selectedImage]);

  /**
   * Handle image selection
   * @param {File} file - Image file
   */
  const handleImageSelect = useCallback((file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file hình ảnh.');
      return;
    }

    setSelectedImage(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  /**
   * Clear selected image
   */
  const clearImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
  }, []);

  /**
   * Reset conversation (start new chat)
   */
  const resetConversation = useCallback(() => {
    setMessages([]);
    setSelectedImage(null);
    setImagePreviewUrl(null);
    chatService.resetConversation();
  }, []);

  return {
    messages,
    loading,
    selectedImage,
    imagePreviewUrl,
    sendMessage,
    handleImageSelect,
    clearImage,
    resetConversation
  };
};
