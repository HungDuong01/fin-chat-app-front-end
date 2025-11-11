import { useState, useCallback } from 'react';

/**
 * useCopyToClipboard Hook - Copy text to clipboard with feedback
 * @returns {Object} - { copiedText, copyToClipboard }
 */
export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState(null);

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>} - Success status
   */
  const copyToClipboard = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedText(null);
      }, 2000);

      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  }, []);

  return {
    copiedText,
    copyToClipboard
  };
};
