// Percentage question generator
import { randomInt } from '../../utils/index.js';

/**
 * Generate percentage question
 * @returns {Object} - {text, answer}
 */
export function generatePercentageQuestion() {
  const scenarios = ['percentage_of', 'what_percent', 'find_whole'];
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  
  let answer, text;
  
  switch (scenario) {
    case 'percentage_of':
      const percent = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
      const number = randomInt(20, 200);
      answer = (percent / 100) * number;
      text = `${percent}% dari ${number}`;
      break;
    case 'what_percent':
      const part = randomInt(5, 50);
      const whole = part * randomInt(2, 10);
      answer = (part / whole) * 100;
      text = `${part} adalah berapa % dari ${whole}?`;
      break;
    case 'find_whole':
      const pct = [20, 25, 50][Math.floor(Math.random() * 3)];
      const value = randomInt(10, 100);
      answer = (value / pct) * 100;
      text = `${pct}% dari suatu bilangan adalah ${value}, bilangan tersebut adalah?`;
      break;
  }
  
  return { text, answer };
}