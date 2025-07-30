// Array utility functions

/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array (new array, original unchanged)
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get next item from array with automatic reshuffling
 * @param {Array} items - Original items array
 * @param {Array} shuffledItems - Current shuffled array
 * @param {number} currentIndex - Current index
 * @returns {Object} - {item, newShuffledItems, newIndex}
 */
export function getNextItem(items, shuffledItems, currentIndex) {
  let newIndex = currentIndex + 1;
  let newShuffledItems = shuffledItems;
  
  // If we've reached the end, reshuffle and start over
  if (newIndex >= shuffledItems.length) {
    newIndex = 0;
    newShuffledItems = shuffle(items);
  }
  
  return {
    item: newShuffledItems[newIndex],
    newShuffledItems,
    newIndex
  };
}