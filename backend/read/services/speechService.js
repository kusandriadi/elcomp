// Speech synthesis service for text-to-speech functionality

/**
 * Play text using speech synthesis
 * @param {string} text - Text to speak
 * @param {string} lang - Language code (default: 'id-ID')
 * @returns {Promise<void>}
 */
export function playSound(text, lang = 'id-ID') {
  return new Promise((resolve, reject) => {
    if (!text) {
      resolve();
      return;
    }
    
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      resolve();
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
    utterance.lang = lang;
    
    utterance.onend = () => resolve();
    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      reject(error);
    };
    
    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Check if speech synthesis is available
 * @returns {boolean}
 */
export function isSpeechSupported() {
  return 'speechSynthesis' in window;
}