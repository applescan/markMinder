import { refreshDisplay } from './app.js';

/**
 * Sets up the bookmark form submission handler when the document is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('bookmark-form').addEventListener('submit', handleBookmarkSubmit);
});

/**
 * Handles the bookmark form submission, validates input, and redirects to the result page.
 * @param {Event} event - The form submission event.
 */
function handleBookmarkSubmit(event) {
  event.preventDefault();  // Prevent default form submission behavior.

  const bookmarkName = event.target.bookmarkName.value.trim();
  const bookmarkUrl = event.target.bookmarkUrl.value.trim();

  if (!bookmarkName || !isValidUrl(bookmarkUrl)) {
    alert('Please enter a valid URL.');
    return;
  }

  const bookmark = { name: bookmarkName, url: bookmarkUrl };
  saveBookmark(bookmark);
  localStorage.setItem('lastSubmittedBookmark', JSON.stringify(bookmark));
  event.target.reset();  // Reset the form fields.
  window.location.href = '/result.html';  // Redirect to the results page.
}

/**
 * Validates if a given string is a valid URL.
 * @param {string} url - The URL to validate.
 * @return {boolean} - True if the URL is valid, false otherwise.
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Saves a bookmark to local storage and refreshes the bookmarks display.
 * @param {Object} bookmark - The bookmark to save.
 */
function saveBookmark(bookmark) {
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  refreshDisplay();
}
