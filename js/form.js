import { bookmarks, refreshDisplay } from './app.js';

/**
 * Handles the bookmark form submission, validates input, and redirects to the result page.
 * @param {Event} event - The form submission event.
 */
export function handleBookmarkSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior.

  //remove whitespace from form value
  const bookmarkName = event.target.bookmarkName.value.trim();
  const bookmarkUrl = event.target.bookmarkUrl.value.trim();
  const nameError = document.getElementById('name-error');
  const urlError = document.getElementById('url-error');

  // Clear previous errors
  nameError.textContent = '';
  urlError.textContent = '';

  let hasError = false;

  if (!bookmarkName) {
    nameError.textContent = 'Please enter a valid name.';
    hasError = true;
  }

  if (!isValidUrl(bookmarkUrl)) {
    urlError.textContent = 'Please enter a valid URL.';
    hasError = true;
  }

  //If there's error, return early
  if (hasError) {
    return;
  }

  const bookmark = { id: Date.now(), name: bookmarkName, url: bookmarkUrl };
  saveBookmark(bookmark);
  try {
    localStorage.setItem('lastSubmittedBookmark', JSON.stringify(bookmark));
  } catch (error) {
    console.error('Failed to save the last submitted bookmark:', error);
  }
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
