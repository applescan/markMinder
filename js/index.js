import { updatePaginationLinks, nextPage, prevPage } from './pagination.js';
import { renderCard } from './card.js';
import { recordsPerPage, bookmarks, toggleTheme, animalMasks } from './app.js';

let currentPage = 1; // Tracks the current page
let currentSearchTerm = '';

// Initialize pagination on page load
window.onload = function () {
  // Retrieve pagination controls
  const nextButton = document.getElementById("pagination-next");
  const prevButton = document.getElementById("pagination-previous");

  // Setup pagination event listeners if elements exist
  if (nextButton && prevButton) {
    nextButton.addEventListener("click", nextPage);
    prevButton.addEventListener("click", prevPage);
  }
  //localStorage.setItem('bookmarks', JSON.stringify(demoData));

  // Load the initial page
  loadCurrentPage(currentPage);
};

// Attach event listeners for sorting, search and ordering bookmarks
document.getElementById('sort_a_z').addEventListener('click', () => {
  const currentOrder = window.currentSortOrder || 'asc';
  sortBookmarks(currentOrder);
});
document.getElementById('order').addEventListener('click', orderBookmarks);
document.getElementById("search").addEventListener("input", searchBookmarks);

// Toggle theme between light and dark
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

/**
 * Loads bookmarks for the current page and updates pagination.
 * @param {number} page - The current page number.
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

  // Pagination bounds check
  const numPages = Math.ceil(filteredBookmarks.length / recordsPerPage);
  if (page < 1) page = 1;
  else if (page > numPages) page = numPages;

  currentPage = page; // Update the current page

  const bookmarkList = document.getElementById("bookmark-list");
  bookmarkList.innerHTML = ""; // Clear previous entries

  let start = (currentPage - 1) * recordsPerPage;
  let end = Math.min(start + recordsPerPage, filteredBookmarks.length);

  // Render bookmarks for the current page
  for (let i = start; i < end; i++) {
    const card = renderCard(filteredBookmarks[i].name, filteredBookmarks[i].url, i);
    bookmarkList.appendChild(card);
  }

  updatePaginationLinks(currentPage, filteredBookmarks.length);
}


/**
 * Function to sort bookmarks based on the specified order
 * @param {string} order - Will be passed as 'asc' or 'dsc'.
 */
function sortBookmarks(order) {
  // Update the button text based on the passed order
  const sortText = document.getElementById("sort_a_z");
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
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  // Reload the current page with the sorted bookmarks
  loadCurrentPage(currentPage);
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
  loadCurrentPage(currentPage); // Reload the current page with the sorted bookmarks
}

/**
 * Function to filter and display bookmarks based on the search term.
 */
function searchBookmarks() {
  const searchTerm = document.getElementById("search").value.trim().toLowerCase();
  currentSearchTerm = searchTerm; // Update the current search term

  loadCurrentPage(1); // Reset to the first page after search
}