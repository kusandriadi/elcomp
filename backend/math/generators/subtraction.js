// Subtraction question generator
import { randomInt } from '../../utils/index.js';
import { getLevelConfig } from '../data/levels.js';

/**
 * Generate subtraction question based on level
 * @param {string} level - Grade level (tk, 1, 2, 3, 4)
 * @returns {Object} - {text, answer}
 */
export function generateSubtractionQuestion(level) {
  const config = getLevelConfig('subtraction', level);
  const maxNum = config?.maxNum || 10;
  
  let a = randomInt(1, maxNum);
  let b = randomInt(1, maxNum);
  
  // Ensure a >= b for positive results
  if (a < b) [a, b] = [b, a];
  
  const answer = a - b;
  const text = `${a} - ${b} = ?`;
  
  return { text, answer };
}