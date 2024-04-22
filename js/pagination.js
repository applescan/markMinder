import { recordsPerPage, bookmarks, loadCurrentPage } from './app.js';

let currentPage = 1;

/**
 * Calculates the number of pages based on the total items and records per page.
 * @param {number} totalItems - The total number of bookmarks.
 * @return {number} - The total number of pages.
 */
export function numPages(totalItems) {
  return Math.ceil(totalItems / recordsPerPage);
}

/**
 * Sets up pagination controls by attaching event listeners.
 */
export function setupPaginationControls() {
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

  // Update button visibility based on current and total pages
  updateButtonVisibility(nextButton, currentPage >= totalPages || totalPages <= 1);
  updateButtonVisibility(prevButton, currentPage <= 1);

  const paginationList = document.querySelector('.pagination-list');
  paginationList.innerHTML = ''; // Clear existing links before updating

  if (totalPages <= 1) return; // Exit if no pagination is needed

  // Append new pagination links
  for (let page = 1; page <= totalPages; page++) {
    const li = document.createElement('li');
    const link = createPaginationLink(page, currentPage);
    li.appendChild(link);
    paginationList.appendChild(li);
  }
}

/**
 * Updates the visibility of a given button based on a condition.
 * @param {HTMLElement} button - The button element to update.
 * @param {boolean} condition - If true, hide the button; otherwise, show it.
 */
function updateButtonVisibility(button, condition) {
  button.style.visibility = condition ? 'hidden' : 'visible';
}

/**
 * Creates a single pagination link element.
 * @param {number} page - The page number for the link.
 * @param {number} currentPage - The current page number to check if it's the active page.
 * @returns {HTMLElement} - The anchor element configured for pagination.
 */
function createPaginationLink(page, currentPage) {
  const link = document.createElement('a');
  link.className = 'pagination-link';
  link.href = `#page${page}`; // Ideally, should be updated to use proper routing
  link.textContent = page;
  link.onclick = () => loadCurrentPage(page); // Setup the click handler to load the specified page

  // Highlight the link as current if it matches the current page
  if (page === currentPage) {
    link.classList.add('is-current');
  }
  return link;
}
