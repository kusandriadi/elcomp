// Shared game utility functions

/**
 * Calculate score percentage
 * @param {number} score - Current score
 * @param {number} maxScore - Maximum possible score
 * @returns {number} - Percentage (0-100)
 */
export function calculatePercentage(score, maxScore) {
  if (maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
}

/**
 * Get performance level based on score percentage
 * @param {number} percentage - Score percentage (0-100)
 * @returns {Object} - {level, message, emoji}
 */
export function getPerformanceLevel(percentage) {
  if (percentage >= 90) {
    return { level: 'excellent', message: 'Luar biasa!', emoji: '🌟' };
  } else if (percentage >= 80) {
    return { level: 'good', message: 'Bagus sekali!', emoji: '👏' };
  } else if (percentage >= 70) {
    return { level: 'fair', message: 'Cukup baik!', emoji: '👍' };
  } else if (percentage >= 60) {
    return { level: 'needs_improvement', message: 'Perlu latihan lagi!', emoji: '💪' };
  } else {
    return { level: 'poor', message: 'Ayo semangat belajar!', emoji: '🎯' };
  }
}

/**
 * Check if answer is correct with tolerance support
 * @param {number|string} userAnswer - User's answer
 * @param {number} correctAnswer - Correct answer
 * @param {number} tolerance - Tolerance for comparison (default: 0)
 * @returns {boolean} - Whether answer is correct
 */
export function checkAnswer(userAnswer, correctAnswer, tolerance = 0) {
  const userNum = parseFloat(userAnswer);
  const correctNum = parseFloat(correctAnswer);
  
  if (isNaN(userNum) || isNaN(correctNum)) return false;
  
  if (tolerance > 0) {
    return Math.abs(userNum - correctNum) <= tolerance;
  }
  
  return userNum === correctNum;
}

/**
 * Update score based on correct answer
 * @param {number} currentScore - Current score
 * @param {boolean} isCorrect - Whether answer was correct
 * @param {number} points - Points to add for correct answer
 * @returns {number} - New score
 */
export function updateScore(currentScore, isCorrect, points = 1) {
  return isCorrect ? currentScore + points : currentScore;
}

/**
 * Generate score summary
 * @param {number} score - Final score
 * @param {number} totalQuestions - Total number of questions
 * @param {number} pointsPerQuestion - Points per correct answer
 * @returns {Object} - Score summary
 */
export function generateScoreSummary(score, totalQuestions, pointsPerQuestion = 1) {
  const maxScore = totalQuestions * pointsPerQuestion;
  const percentage = calculatePercentage(score, maxScore);
  const performance = getPerformanceLevel(percentage);
  
  return {
    score,
    maxScore,
    totalQuestions,
    percentage,
    performance
  };
}