// Shared mathematical utility functions
import { randomInt } from './randomUtils.js';

/**
 * Round number to specified decimal places
 * @param {number} num - Number to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} - Rounded number
 */
export function roundTo(num, decimals = 1) {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Generate fraction in reduced form
 * @param {number} maxNum - Maximum numerator/denominator
 * @returns {Object} - {numerator, denominator, decimal}
 */
export function generateFraction(maxNum = 10) {
  let numerator = randomInt(1, maxNum);
  let denominator = randomInt(2, maxNum);
  
  // Ensure denominator is greater than numerator for proper fractions
  if (numerator >= denominator) {
    [numerator, denominator] = [denominator, numerator];
  }
  
  return {
    numerator,
    denominator,
    decimal: roundTo(numerator / denominator, 2)
  };
}

/**
 * Calculate greatest common divisor
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - GCD
 */
export function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Reduce fraction to lowest terms
 * @param {number} numerator - Numerator
 * @param {number} denominator - Denominator
 * @returns {Object} - {numerator, denominator}
 */
export function reduceFraction(numerator, denominator) {
  const divisor = gcd(numerator, denominator);
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor
  };
}

/**
 * Check if two numbers are approximately equal (useful for floating point comparison)
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {number} tolerance - Tolerance for comparison
 * @returns {boolean} - Whether numbers are approximately equal
 */
export function isApproximatelyEqual(a, b, tolerance = 0.01) {
  return Math.abs(a - b) <= tolerance;
}

/**
 * Clamp number between min and max values
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped number
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}