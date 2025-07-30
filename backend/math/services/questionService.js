// Question generation service
import { generateAdditionQuestion } from '../generators/addition.js';
import { generateSubtractionQuestion } from '../generators/subtraction.js';
import { generateMultiplicationQuestion } from '../generators/multiplication.js';
import { generateDivisionQuestion } from '../generators/division.js';
import { generateMixedQuestion } from '../generators/mixed.js';
import { generateDecimalQuestion } from '../generators/decimal.js';
import { generatePercentageQuestion } from '../generators/percentage.js';
import { generateFractionQuestion } from '../generators/fraction.js';

/**
 * Generate question based on operation type and level
 * @param {string} operation - Operation type
 * @param {string} level - Grade level
 * @returns {Object} - {text, answer}
 */
export function generateQuestion(operation, level) {
  switch (operation) {
    case 'penjumlahan':
      return generateAdditionQuestion(level);
    case 'pengurangan':
      return generateSubtractionQuestion(level);
    case 'perkalian':
      return generateMultiplicationQuestion(level);
    case 'pembagian':
      return generateDivisionQuestion(level);
    case 'campuran':
      return generateMixedQuestion(level);
    case 'desimal':
      return generateDecimalQuestion();
    case 'persen':
      return generatePercentageQuestion();
    case 'pecahan':
      return generateFractionQuestion();
    default:
      return generateAdditionQuestion('tk'); // Fallback
  }
}

/**
 * Generate multiple questions for a game session
 * @param {string} operation - Operation type
 * @param {string} level - Grade level
 * @param {number} count - Number of questions to generate
 * @returns {Array} - Array of question objects
 */
export function generateQuestions(operation, level, count = 10) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(operation, level));
  }
  return questions;
}