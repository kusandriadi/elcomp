// Game logic services

/**
 * Initialize game state for letter learning
 * @param {Array} letters - Array of letters
 * @returns {Object} - Initial game state
 */
export function initializeLetterGame(letters) {
  const shuffled = [...letters];
  // Simple shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return {
    shuffledLetters: shuffled,
    currentIndex: 0,
    currentLetter: shuffled[0]
  };
}

/**
 * Initialize reading game state
 * @param {Object} wordsByLevel - Words organized by level
 * @param {string} initialLevel - Starting level
 * @returns {Object} - Initial game state
 */
export function initializeReadingGame(wordsByLevel, initialLevel = 'level1') {
  const shuffledWords = {};
  const wordIndices = {};
  
  for (const level in wordsByLevel) {
    const words = [...wordsByLevel[level]];
    // Shuffle words for each level
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    shuffledWords[level] = words;
    wordIndices[level] = 0;
  }
  
  return {
    shuffledWords,
    wordIndices,
    currentLevel: initialLevel,
    currentWord: shuffledWords[initialLevel][0]
  };
}

/**
 * Initialize typing game state
 * @param {Array} words - Array of words for typing
 * @param {number} totalQuestions - Total number of questions
 * @returns {Object} - Initial game state
 */
export function initializeTypingGame(words, totalQuestions = 10) {
  const shuffled = [...words];
  // Shuffle words
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return {
    shuffledWords: shuffled,
    wordIndex: 0,
    currentWord: shuffled[0],
    score: 0,
    questionNumber: 1,
    totalQuestions,
    isGameOver: false
  };
}

import { checkAnswer, updateScore } from '../../utils/index.js';

/**
 * Check typing answer and update score
 * @param {string} userInput - User's typed input
 * @param {string} correctAnswer - Correct answer
 * @param {number} currentScore - Current score
 * @returns {Object} - {isCorrect, newScore}
 */
export function checkTypingAnswer(userInput, correctAnswer, currentScore) {
  const isCorrect = userInput.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  const newScore = updateScore(currentScore, isCorrect, 1);
  
  return {
    isCorrect,
    newScore
  };
}