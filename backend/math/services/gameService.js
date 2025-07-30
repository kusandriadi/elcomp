// Math game service for managing game state and logic

/**
 * Initialize math game state
 * @param {string} operation - Operation type
 * @param {string} level - Grade level
 * @param {number} totalQuestions - Total number of questions
 * @param {boolean} useTimer - Whether to use timer
 * @returns {Object} - Initial game state
 */
export function initializeMathGame(operation, level, totalQuestions = 10, useTimer = true) {
  return {
    operation,
    level,
    totalQuestions,
    useTimer,
    score: 0,
    questionNumber: 1,
    isGameOver: false,
    currentQuestion: null,
    userAnswer: '',
    isCorrect: null
  };
}

import { checkAnswer as baseCheckAnswer, updateScore as baseUpdateScore } from '../../utils/index.js';

/**
 * Check if answer is correct (with tolerance for decimal operations)
 * @param {number|string} userAnswer - User's answer
 * @param {number} correctAnswer - Correct answer
 * @param {string} operation - Operation type for tolerance settings
 * @returns {boolean} - Whether answer is correct
 */
export function checkAnswer(userAnswer, correctAnswer, operation = '') {
  // For decimal and percentage operations, allow small tolerance
  if (operation === 'desimal' || operation === 'persen' || operation === 'pecahan') {
    return baseCheckAnswer(userAnswer, correctAnswer, 0.01);
  }
  
  // For other operations, require exact match
  return baseCheckAnswer(userAnswer, correctAnswer, 0);
}

/**
 * Update game score based on correct answer
 * @param {number} currentScore - Current score
 * @param {boolean} isCorrect - Whether answer was correct
 * @param {number} basePoints - Base points for correct answer
 * @returns {number} - New score
 */
export function updateScore(currentScore, isCorrect, basePoints = 10) {
  return baseUpdateScore(currentScore, isCorrect, basePoints);
}

/**
 * Check if game is over
 * @param {number} questionNumber - Current question number
 * @param {number} totalQuestions - Total questions in game
 * @returns {boolean} - Whether game is over
 */
export function isGameOver(questionNumber, totalQuestions) {
  return questionNumber > totalQuestions;
}

import { generateScoreSummary, getPerformanceLevel as baseGetPerformanceLevel } from '../../utils/index.js';

/**
 * Calculate final score percentage
 * @param {number} score - Total score achieved
 * @param {number} totalQuestions - Total number of questions
 * @param {number} pointsPerQuestion - Points per correct answer
 * @returns {Object} - {score, maxScore, percentage}
 */
export function calculateFinalScore(score, totalQuestions, pointsPerQuestion = 10) {
  const summary = generateScoreSummary(score, totalQuestions, pointsPerQuestion);
  return {
    score: summary.score,
    maxScore: summary.maxScore,
    percentage: summary.percentage
  };
}

/**
 * Get performance level based on score percentage
 * @param {number} percentage - Score percentage
 * @returns {Object} - {level, message, emoji}
 */
export function getPerformanceLevel(percentage) {
  return baseGetPerformanceLevel(percentage);
}