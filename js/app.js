import { loadCurrentPage } from './index.js';

// Default constants and state variables
let currentPage = 1;
export const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
export const recordsPerPage = 20;

// Set up initial page and event listeners on window load
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
});

/**
 * Initializes theme settings based on user's preference.
 */
function initializeTheme() {
  const themeIcon = document.getElementById('theme-icon').querySelector('i');
  const defaultThemeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  document.documentElement.setAttribute('data-theme', defaultThemeDark ? 'dark' : 'light');
  themeIcon.className = defaultThemeDark ? 'fas fa-sun' : 'fas fa-moon';

  document.getElementById('theme-icon').addEventListener('click', toggleTheme);
}

/**
 * Toggles the website's theme between 'dark' and 'light' mode.
 */
export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isDarkMode = currentTheme === 'dark';
  const themeIcon = document.getElementById('theme-icon').querySelector('i');

  document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  themeIcon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
}

/**
 * Refreshes the display of bookmarks on the current page.
 */
export function refreshDisplay() {
  loadCurrentPage(currentPage);
}
