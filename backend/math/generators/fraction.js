// Fraction question generator
import { randomInt, generateFraction, roundTo } from '../../utils/index.js';

/**
 * Generate fraction question
 * @returns {Object} - {text, answer}
 */
export function generateFractionQuestion() {
  const operations = ['add', 'subtract', 'multiply'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  const frac1 = generateFraction(8);
  const frac2 = generateFraction(8);
  
  let answer, text;
  
  switch (operation) {
    case 'add':
      // Simple addition with same denominator
      const denom = randomInt(3, 8);
      const num1 = randomInt(1, denom - 1);
      const num2 = randomInt(1, denom - num1);
      answer = roundTo((num1 + num2) / denom, 2);
      text = `${num1}/${denom} + ${num2}/${denom}`;
      break;
    case 'subtract':
      const denom2 = randomInt(4, 8);
      const num3 = randomInt(3, denom2);
      const num4 = randomInt(1, num3 - 1);
      answer = roundTo((num3 - num4) / denom2, 2);
      text = `${num3}/${denom2} - ${num4}/${denom2}`;
      break;
    case 'multiply':
      answer = roundTo(frac1.decimal * frac2.decimal, 2);
      text = `${frac1.numerator}/${frac1.denominator} × ${frac2.numerator}/${frac2.denominator}`;
      break;
  }
  
  return { text, answer };
}