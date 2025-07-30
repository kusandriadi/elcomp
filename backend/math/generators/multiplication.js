// Multiplication question generator
import { randomInt } from '../../utils/index.js';
import { getLevelConfig } from '../data/levels.js';

/**
 * Generate multiplication question based on level
 * @param {string} level - Grade level (tk, 1, 2, 3, 4)
 * @returns {Object} - {text, answer}
 */
export function generateMultiplicationQuestion(level) {
  const config = getLevelConfig('multiplication', level);
  const maxMult = config?.maxMult || 3;
  
  const a = randomInt(1, maxMult);
  const b = randomInt(level === 'tk' ? 0 : 1, maxMult);
  
  const answer = a * b;
  const text = `${a} × ${b} = ?`;
  
  return { text, answer };
}