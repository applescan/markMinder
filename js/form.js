import { refreshDisplay, bookmarks } from './app.js';

/**
 * Sets up the bookmark form submission handler when the document is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookmark-form');
  form.addEventListener('submit', handleBookmarkSubmit);
});

/**
 * Handles the bookmark form submission, validates input, and redirects to the result page.
 * @param {Event} event - The form submission event.
 */
function handleBookmarkSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior.

  //remove whitespace from form value
  const bookmarkName = event.target.bookmarkName.value.trim();
  const bookmarkUrl = event.target.bookmarkUrl.value.trim();

  if (!bookmarkName || !isValidUrl(bookmarkUrl)) {
    alert('Please enter a valid name and URL.');
    return;
  }

  const bookmark = { id: Date.now(), name: bookmarkName, url: bookmarkUrl };
  saveBookmark(bookmark);
  try {
    localStorage.setItem('lastSubmittedBookmark', JSON.stringify(bookmark));
  } catch (error) {
    console.error('Failed to save the last submitted bookmark:', error);
  }
  event.target.reset(); // Reset the form fields.
  redirectTo('/result.html'); // Redirect to the results page.
}

/**
 * Validates if a given string is a valid URL.
 * @param {string} url - The URL to validate.
 * @return {boolean} - True if the URL is valid, false otherwise.
 */
export function isValidUrl(url) {
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
  try {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Failed to save bookmarks:', error);
  }
  refreshDisplay();
}

/**
 * Redirects to a specified URL.
 * @param {string} url - The URL to redirect to.
 */
function redirectTo(url) {
  window.location.href = url;
}
