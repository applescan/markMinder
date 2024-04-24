import { bookmarks, toggleTheme, refreshDisplay, searchBookmarks } from './app.js';

// Attach event listeners for sorting, search and ordering bookmarks
document.getElementById('sort-a-z').addEventListener('click', () => {
  const currentOrder = window.currentSortOrder || 'asc';
  sortBookmarks(currentOrder);
});
document.getElementById('order').addEventListener('click', orderBookmarks);
document.getElementById("search").addEventListener("input", searchBookmarks);

// Toggle theme between light and dark
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

/**
 * Function to sort bookmarks based on the specified order
 * @param {string} order - Will be passed as 'asc' or 'dsc'.
 */
function sortBookmarks(order) {
  // Update the button text based on the passed order
  const sortText = document.getElementById("sort-a-z");
  if (order === 'asc') {
    sortText.innerHTML = 'Sort Alphabetically Z-A';
    window.currentSortOrder = 'desc';
  } else {
    sortText.innerHTML = 'Sort Alphabetically A-Z';
    window.currentSortOrder = 'asc';
  }

  // Sort the bookmarks array
  bookmarks.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (order === 'asc') {
      return nameA > nameB ? 1 : nameB > nameA ? -1 : 0;
    } else {
      return nameA > nameB ? -1 : nameB > nameA ? 1 : 0;
    }
  });

  // Reload the current page with the sorted bookmarks
  refreshDisplay()
}


// Function to reverse the order of bookmarks
function orderBookmarks() {
  bookmarks.reverse();
  const orderText = document.querySelector(".order_text");
  if (orderText.innerHTML === 'Order by earliest to latest') {
    orderText.innerHTML = 'Order by latest to earliest';
  } else {
    orderText.innerHTML = 'Order by earliest to latest';
  }
  refreshDisplay() // Reload the current page with the sorted bookmarks
}
