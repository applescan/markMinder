import { updatePaginationLinks, numPages, setupPaginationControls } from './pagination.js';
import { renderCard } from './card.js';
import { recordsPerPage, bookmarks, toggleTheme, refreshDisplay } from './app.js';

let currentPage = 1;
let currentSearchTerm = '';

// Initialize pagination controls and load initial page on window load
window.onload = () => {
  setupPaginationControls();
  refreshDisplay()
};

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

/**
 * Function to filter and display bookmarks based on the search term.
 */
function searchBookmarks() {
  const searchTerm = document.getElementById("search").value.trim().toLowerCase();
  currentSearchTerm = searchTerm; // Update the current search term
  refreshDisplay() // Reset to the first page after search
}