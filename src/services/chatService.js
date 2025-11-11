/**
 * ChatService - API communication with backend
 * Based on Angular ChatService from documentation
 */

class ChatService {
  constructor() {
    this.chatUrl = 'http://127.0.0.1:4000/api/chat';
    this.imageUrl = 'http://127.0.0.1:4000/api/analyze';
    this.conversationId = null;
  }

  /**
   * Send text message with conversation context
   * @param {string} message - User's text input
   * @param {Array} history - Last few messages for context (optional)
   * @returns {Promise} - Formatted response
   */
  async sendMessage(message, history = []) {
    const payload = {
      message,
      conversation_id: this.conversationId,
      history: history.slice(-3) // Last 3 messages for context
    };

    const response = await fetch(this.chatUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Store conversation ID for thread continuity
    if (data.conversation_id) {
      this.conversationId = data.conversation_id;
    }

    // Format response to match expected structure
    return this.formatResponse(data);
  }

  /**
   * Send image with optional text for analysis
   * @param {FormData} formData - FormData containing image file and message
   * @returns {Promise} - Formatted response
   */
  async sendImageAndText(formData) {
    const response = await fetch(this.imageUrl, {
      method: 'POST',
      body: formData
      // Note: Don't set Content-Type header, browser will set it with boundary
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Format response
    return {
      replies: [
        {
          intent: data.intent || 'image_analysis',
          reply: data.response || '[Không có nội dung phản hồi]'
        }
      ]
    };
  }

  /**
   * Format backend response into consistent structure
   * @param {Object} res - Backend response
   * @returns {Object} - Formatted response
   */
  formatResponse(res) {
    // Check if response already has replies array
    if (res.replies && Array.isArray(res.replies)) {
      return res;
    }

    // Format single response into replies array
    const formatted = {
      replies: [
        {
          intent: res.agent || 'assistant',
          reply: res.response || '[Không có nội dung phản hồi]'
        }
      ]
    };

    // Include system notes if present
    if (res.system_note) {
      formatted.system_note = res.system_note;
    }

    return formatted;
  }

  /**
   * Reset conversation context for new chat
   */
  resetConversation() {
    this.conversationId = null;
  }

  /**
   * Get current conversation ID
   * @returns {string|null}
   */
  getConversationId() {
    return this.conversationId;
  }
}

// Export singleton instance
export default new ChatService();
