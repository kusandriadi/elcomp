// Shared backend utilities index

// Array utilities
export { shuffle, getNextItem, getRandomItem, removeItem } from './arrayUtils.js';

// Random utilities
export { randomInt, randomDecimal, randomBoolean, randomChoice } from './randomUtils.js';

// Math utilities
export { 
  roundTo, 
  generateFraction, 
  gcd, 
  reduceFraction, 
  isApproximatelyEqual, 
  clamp 
} from './mathUtils.js';

// Speech utilities
export { 
  playSound, 
  isSpeechSupported, 
  stopSpeech, 
  pauseSpeech, 
  resumeSpeech 
} from './speechService.js';

// Game utilities
export { 
  calculatePercentage, 
  getPerformanceLevel, 
  checkAnswer, 
  updateScore, 
  generateScoreSummary 
} from './gameUtils.js';