// Reading words data organized by levels
export const READING_WORDS = {
  level1: ["ba", "bi", "bu", "be", "bo", "ca", "ci", "cu", "ce", "co", "da", "di", "du", "de", "do"],
  level2: ["baca", "budi", "bola", "dasi", "dadu", "sapi", "kuda", "meja", "roti", "susu"],
  level3: ["sekolah", "bermain", "belajar", "membaca", "menulis", "berhitung", "selamat pagi", "terima kasih"]
};

// Typing game words
export const TYPING_WORDS = ["baca", "budi", "bola", "dasi", "dadu", "sapi", "kuda", "meja", "roti", "susu"];

export function getReadingWords(level = null) {
  if (level) {
    return [...(READING_WORDS[level] || [])];
  }
  return { ...READING_WORDS };
}

export function getTypingWords() {
  return [...TYPING_WORDS];
}