// Mixed operation question generator
import { randomInt } from '../../utils/index.js';
import { getLevelConfig } from '../data/levels.js';

/**
 * Generate mixed operation question based on level
 * @param {string} level - Grade level (tk, 1, 2, 3, 4)
 * @returns {Object} - {text, answer}
 */
export function generateMixedQuestion(level) {
  const config = getLevelConfig('mixed', level);
  const maxMult = config?.maxMult || 3;
  const allowDivision = config?.allowDivision || false;
  
  const templates = [
    '(a+b)*c', 'a*(b+c)', '(a*b)+c', 'a+(b*c)', 
    '(a-b)*c', 'a*(b-c)', 'c*(a-b)', '(a*b)-c', 'a-(b*c)'
  ];
  
  if (allowDivision) {
    templates.push('a/(b-c)', '(a+b)/c');
  }
  
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  let a = randomInt(1, maxMult);
  let b = randomInt(1, maxMult);
  let c = randomInt(level === '3' ? 1 : 2, maxMult);
  let answer, text;
  
  switch (template) {
    case '(a+b)*c':
      answer = (a + b) * c;
      text = `(${a} + ${b}) × ${c}`;
      break;
    case 'a*(b+c)':
      answer = a * (b + c);
      text = `${a} × (${b} + ${c})`;
      break;
    case '(a*b)+c':
      answer = (a * b) + c;
      text = `(${a} × ${b}) + ${c}`;
      break;
    case 'a+(b*c)':
      answer = a + (b * c);
      text = `${a} + (${b} × ${c})`;
      break;
    case '(a-b)*c':
      if (a < b) [a, b] = [b, a];
      answer = (a - b) * c;
      text = `(${a} - ${b}) × ${c}`;
      break;
    case 'a*(b-c)':
      if (b < c) [b, c] = [c, b];
      answer = a * (b - c);
      text = `${a} × (${b} - ${c})`;
      break;
    case 'c*(a-b)':
      if (a < b) [a, b] = [b, a];
      answer = c * (a - b);
      text = `${c} × (${a} - ${b})`;
      break;
    case '(a*b)-c':
      answer = (a * b) - c;
      text = `(${a} × ${b}) - ${c}`;
      break;
    case 'a-(b*c)':
      const product = b * c;
      if (a < product) a = product + randomInt(1, 5);
      answer = a - (b * c);
      text = `${a} - (${b} × ${c})`;
      break;
    case 'a/(b-c)':
      if (b <= c) b = c + randomInt(2, 5);
      const divisor = b - c;
      a = divisor * randomInt(2, 5); // Ensure clean division
      answer = a / divisor;
      text = `${a} ÷ (${b} - ${c})`;
      break;
    case '(a+b)/c':
      const sum = a + b;
      if (sum % c !== 0) {
        // Adjust to make it divisible
        a = (Math.floor(sum / c) + 1) * c - b;
      }
      answer = (a + b) / c;
      text = `(${a} + ${b}) ÷ ${c}`;
      break;
    default:
      return generateMixedQuestion(level); // Fallback
  }
  
  return { text, answer };
}