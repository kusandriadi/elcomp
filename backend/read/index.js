// Main export file for reading backend services

// Data exports
export { getLettersData } from './data/letters.js';
export { getReadingWords, getTypingWords } from './data/words.js';

// Utility exports
export { shuffle, getNextItem } from './utils/arrayUtils.js';

// Service exports
export { playSound, isSpeechSupported } from './services/speechService.js';
export { 
  initializeLetterGame, 
  initializeReadingGame, 
  initializeTypingGame,
  checkTypingAnswer 
} from './services/gameService.js';