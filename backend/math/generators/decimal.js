// Decimal operation question generator
import { randomDecimal, roundTo } from '../../utils/index.js';

/**
 * Generate decimal operation question
 * @returns {Object} - {text, answer}
 */
export function generateDecimalQuestion() {
  const scenarios = ['add', 'subtract', 'multiply'];
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  
  let a, b, answer, text;
  
  switch (scenario) {
    case 'add':
      a = randomDecimal(1, 3.9, 1);
      b = randomDecimal(1, 3.9, 1);
      answer = roundTo(a + b, 1);
      text = `${a} + ${b}`;
      break;
    case 'subtract':
      a = randomDecimal(3, 6.9, 1);
      b = randomDecimal(1, 2.9, 1);
      answer = roundTo(a - b, 1);
      text = `${a} - ${b}`;
      break;
    case 'multiply':
      a = randomDecimal(1, 2.9, 1);
      b = [2, 3][Math.floor(Math.random() * 2)];
      answer = roundTo(a * b, 1);
      text = `${a} × ${b}`;
      break;
  }
  
  return { text, answer };
}