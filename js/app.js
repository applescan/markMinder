/**
 * Parses stored bookmarks from local storage or initializes an empty array if none exist.
 */
export const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

/**
 * Initializes pagination controls and loads the initial page of bookmarks on window load.
 */
// Pagination control variables
export const recordsPerPage = 5; // Number of records per page

/**
 * Refreshes the display of bookmarks on the current page.
 */
export function refreshDisplay() {
  loadCurrentPage(currentPage);
}
