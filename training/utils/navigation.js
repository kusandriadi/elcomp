// Navigation utilities for training components

/**
 * Navigate to a specific page by updating history and dispatching popstate event
 * @param {string} page - Page identifier for history state
 * @param {string} path - URL path to navigate to
 */
export function navigateToPage(page, path) {
  window.history.pushState({ page }, '', path);
  window.dispatchEvent(new PopStateEvent('popstate', { state: { page } }));
}

/**
 * Reading navigation helpers
 */
export const readingNavigation = {
  toLetter: () => navigateToPage('read-letter', '/elcomp/read/letter'),
  toWord: () => navigateToPage('read-word', '/elcomp/read/word'),
  toTyping: () => navigateToPage('read-typing', '/elcomp/read/typing')
};