// Division question generator
import { randomInt } from '../../utils/index.js';
import { getLevelConfig } from '../data/levels.js';

/**
 * Generate division question based on level
 * @param {string} level - Grade level (tk, 1, 2, 3, 4)
 * @returns {Object} - {text, answer}
 */
export function generateDivisionQuestion(level) {
  const config = getLevelConfig('division', level);
  const maxDiv = config?.maxDiv || 10;
  
  // Generate divisor first, then dividend to ensure clean division
  const b = randomInt(2, Math.min(maxDiv, 12)); // Keep divisor reasonable
  const quotient = randomInt(1, Math.floor(maxDiv / b));
  const a = b * quotient; // This ensures clean division
  
  const answer = quotient;
  const text = `${a} ÷ ${b} = ?`;
  
  return { text, answer };
}