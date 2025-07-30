// Addition question generator
import { randomInt } from '../../utils/index.js';
import { getLevelConfig } from '../data/levels.js';

/**
 * Generate addition question based on level
 * @param {string} level - Grade level (tk, 1, 2, 3, 4)
 * @returns {Object} - {text, answer}
 */
export function generateAdditionQuestion(level) {
  const config = getLevelConfig('addition', level);
  const maxNum = config?.maxNum || 10;
  
  const a = randomInt(1, maxNum);
  const b = randomInt(1, maxNum);
  const answer = a + b;
  const text = `${a} + ${b} = ?`;
  
  return { text, answer };
}