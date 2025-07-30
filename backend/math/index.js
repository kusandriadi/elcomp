// Main export file for math backend services

// Data exports
export { OPERATIONS, LEVEL_OPERATIONS, getOperationsForLevel, getAllOperations } from './data/operations.js';
export { LEVEL_CONFIG, getLevelConfig } from './data/levels.js';

// Utility exports
export { 
  randomInt, 
  randomDecimal, 
  roundTo, 
  generateFraction, 
  gcd, 
  reduceFraction 
} from '../utils/index.js';

// Generator exports
export { generateAdditionQuestion } from './generators/addition.js';
export { generateSubtractionQuestion } from './generators/subtraction.js';
export { generateMultiplicationQuestion } from './generators/multiplication.js';
export { generateDivisionQuestion } from './generators/division.js';
export { generateMixedQuestion } from './generators/mixed.js';
export { generateDecimalQuestion } from './generators/decimal.js';
export { generatePercentageQuestion } from './generators/percentage.js';
export { generateFractionQuestion } from './generators/fraction.js';

// Service exports
export { generateQuestion, generateQuestions } from './services/questionService.js';

export { 
  initializeMathGame, 
  checkAnswer, 
  updateScore, 
  isGameOver, 
  calculateFinalScore, 
  getPerformanceLevel 
} from './services/gameService.js';