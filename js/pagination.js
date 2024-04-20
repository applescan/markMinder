import { renderCard } from './card.js';
import { recordsPerPage, bookmarks} from './app.js';

let currentPage = 1; // Tracks the current page

/**
 * Calculates the number of pages based on the total items and records per page.
 * @param {number} totalItems - The total number of bookmarks.
 * @return {number} - The total number of pages.
 */
export function numPages(totalItems) {
  return Math.ceil(totalItems / recordsPerPage);
}

export function loadCurrentPage(page) {
  if (bookmarks.length === 0) {
    document.getElementById('bookmark-list').innerHTML = '<p>No bookmarks stored.</p>';
    updatePaginationLinks(1, 0); // Reset pagination
    return;
  }

  if (page < 1) page = 1;
  else if (page > numPages(bookmarks.length)) page = numPages(bookmarks.length);

  currentPage = page; // Update the current page

  const bookmarkList = document.getElementById('bookmark-list');
  bookmarkList.innerHTML = ''; // Clear previous entries

  const start = (currentPage - 1) * recordsPerPage;
  const end = Math.min(start + recordsPerPage, bookmarks.length); // Ensure not to exceed array

  for (let i = start; i < end; i++) {
    const card = renderCard(bookmarks[i].name, bookmarks[i].url, i);
    bookmarkList.appendChild(card);
  }

  updatePaginationLinks(currentPage, bookmarks.length);
}

/**
 * Initializes pagination controls and loads the initial page of bookmarks on window load.
 */
window.onload = function () {
  setupPaginationControls();
  loadCurrentPage(currentPage);
};

/**
 * Sets up pagination controls by retrieving controls and attaching event listeners.
 */
function setupPaginationControls() {
  const nextButton = document.getElementById('pagination-next');
  const prevButton = document.getElementById('pagination-previous');

  if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => navigatePage('next'));
    prevButton.addEventListener('click', () => navigatePage('prev'));
  }
}

/**
 * Navigates to the next or previous page based on the given direction.
 * @param {string} direction - The navigation direction ('next' or 'prev').
 */
function navigatePage(direction) {
  const totalItems = bookmarks.length;
  const totalPages = numPages(totalItems);
  currentPage = direction === 'next' ? Math.min(currentPage + 1, totalPages) : Math.max(currentPage - 1, 1);
  loadCurrentPage(currentPage);
}

/**
 * Updates pagination controls based on the current state of the bookmarks list.
 * @param {number} currentPage - The currently active page.
 * @param {number} totalItems - Total number of bookmarks.
 */
export function updatePaginationLinks(currentPage, totalItems) {
  const nextButton = document.getElementById('pagination-next');
  const prevButton = document.getElementById('pagination-previous');

  const totalPages = numPages(totalItems);

  // Hide or show pagination buttons based on the page conditions
  nextButton.style.visibility = currentPage >= totalPages || totalPages <= 1 ? 'hidden' : 'visible';
  prevButton.style.visibility = currentPage > 1 ? 'visible' : 'hidden';

  // Adjust pagination list for manual page selection (if applicable)
  const paginationList = document.querySelector('.pagination-list');
  paginationList.innerHTML = ''; // Clear existing links

  if (totalPages <= 1) return; // No need for pagination links if only one page or none

  for (let page = 1; page <= totalPages; page++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'pagination-link';
    a.href = '#';
    a.textContent = page;
    a.onclick = (function (p) {
      return function () {
        loadCurrentPage(p);
      };
    })(page);

    if (page === currentPage) {
      a.classList.add('is-current');
    }

    li.appendChild(a);
    paginationList.appendChild(li);
  }
}

// Navigate to the previous page
export function prevPage() {
  if (currentPage > 1) {
    loadCurrentPage(currentPage - 1);
  }
}

// Navigate to the next page
export function nextPage() {
  if (currentPage < numPages(JSON.parse(localStorage.getItem('bookmarks')).length)) {
    loadCurrentPage(currentPage + 1);
  }
}
