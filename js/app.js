
import { updatePaginationLinks, numPages } from './pagination.js';
import { renderCard } from './card.js';
import { handleBookmarkSubmit } from './form.js';

// Default constants and state variables
let currentPage = 1;
let currentSearchTerm = '';
export const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
export const recordsPerPage = 20;

// Set up initial page and event listeners on window load
// Sets up the bookmark form submission handler when the document is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  const form = document.getElementById('bookmark-form');
  form.addEventListener('submit', handleBookmarkSubmit);
  refreshDisplay();
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
 * Loads the bookmarks for the specified page.
 * @param {number} page - The page number to load.
 */
export function loadCurrentPage(page) {

  let filteredBookmarks = bookmarks;

  // Filter bookmarks based on the current search term, if any
  if (currentSearchTerm) {
    filteredBookmarks = bookmarks.filter(bookmark =>
      bookmark.name.toLowerCase().includes(currentSearchTerm)
    );
  }

  if (filteredBookmarks.length === 0) {
    // Display a message if no bookmarks match the search or no bookmarks are stored
    document.getElementById("bookmark-list").innerHTML = "<p>No bookmarks</p>";
    updatePaginationLinks(1, 0); // Reset pagination
    return;
  }

  // Ensure page is within bounds
  if (page < 1) page = 1;
  else if (page > numPages(bookmarks.length)) page = numPages(bookmarks.length);

  currentPage = page; // Update the current page

  const bookmarkList = document.getElementById('bookmark-list');
  bookmarkList.innerHTML = ''; // Clear previous entries

  const start = (currentPage - 1) * recordsPerPage;
  const end = Math.min(start + recordsPerPage, bookmarks.length); // Ensure not to exceed array

  // Render bookmarks for the current page
  for (let i = start; i < end; i++) {
    if (filteredBookmarks[i]) { // Check if the bookmark is defined
      const card = renderCard(filteredBookmarks[i].name, filteredBookmarks[i].url, filteredBookmarks[i].id);
      bookmarkList.appendChild(card);
    }
  }

  updatePaginationLinks(currentPage, filteredBookmarks.length);
}

/**
 * Refreshes the display of bookmarks on the current page.
 */
export function refreshDisplay() {
  loadCurrentPage(currentPage);
}
