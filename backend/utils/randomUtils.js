// Shared random number generation utilities

/**
 * Generate random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random integer
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random decimal with specified decimal places
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} decimals - Number of decimal places
 * @returns {number} - Random decimal
 */
export function randomDecimal(min, max, decimals = 1) {
  const factor = Math.pow(10, decimals);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

/**
 * Generate random boolean with optional probability
 * @param {number} probability - Probability of true (0-1, default 0.5)
 * @returns {boolean} - Random boolean
 */
export function randomBoolean(probability = 0.5) {
  return Math.random() < probability;
}

/**
 * Generate random choice from multiple options
 * @param {Array} options - Array of options to choose from
 * @returns {*} - Random option
 */
export function randomChoice(options) {
  if (!options || options.length === 0) return null;
  return options[Math.floor(Math.random() * options.length)];
}