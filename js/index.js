import { updatePaginationLinks, nextPage, prevPage, numPages } from './pagination.js';
import { renderCard } from './card.js';
import { recordsPerPage, bookmarks } from './app.js';


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

  // Load the initial page
  loadCurrentPage(currentPage);
};


// Attach event listeners
document.getElementById('sort_a_z').addEventListener("click", function () {
  sort_bookmarks('asc');
});

document.getElementById('sort_z_a').addEventListener("click", function () {
  sort_bookmarks('desc');
});

document.getElementById('order').addEventListener("click", function () {
  order_bookmarks()
});


document.getElementById('theme-toggle').addEventListener('click', function () {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const themeIcon = document.getElementById('theme-icon').querySelector('i'); // More reliable selector
  const bgLottieLight = document.getElementById('bg-lottie-light');
  const bgLottieDark = document.getElementById('bg-lottie-dark');
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    bgLottieDark.style.display = 'none';
    bgLottieLight.style.display = 'block';
    themeIcon.className = 'fas fa-sun';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    bgLottieLight.style.display = 'none';
    bgLottieDark.style.display = 'block';
    themeIcon.className = 'fas fa-moon';
  }
});

/**
 * Loads bookmarks for the current page and updates pagination.
 * @param {number} page - The current page number.
 */
export function loadCurrentPage(page) {
  if (bookmarks.length === 0) {
    document.getElementById("bookmark-list").innerHTML = "<p>No bookmarks stored.</p>";
    updatePaginationLinks(1, 0); // Reset pagination
    return;
  }

  if (page < 1) page = 1;
  else if (page > numPages(bookmarks.length)) page = numPages(bookmarks.length);

  currentPage = page; // Update the current page

  const bookmark_list = document.getElementById("bookmark-list");
  bookmark_list.innerHTML = ""; // Clear previous entries

  let start = (currentPage - 1) * recordsPerPage;
  let end = Math.min(start + recordsPerPage, bookmarks.length); // Ensure not to exceed array

  for (let i = start; i < end; i++) {
    const card = renderCard(bookmarks[i].name, bookmarks[i].url, i);
    bookmark_list.appendChild(card);
  }

  updatePaginationLinks(currentPage, bookmarks.length);
}


// Function to sort bookmarks based on the specified order
function sort_bookmarks(order) {
  bookmarks.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // normalize case
    const nameB = b.name.toUpperCase(); // normalize case
    if (nameA < nameB) {
      return order === 'asc' ? -1 : 1;
    }
    if (nameA > nameB) {
      return order === 'asc' ? 1 : -1;
    }
    return 0; // names must be equal
  });
  loadCurrentPage(currentPage); // reload the current page with the sorted bookmarks
}

function order_bookmarks() {
  bookmarks.reverse()
  const order_text = document.querySelector(".order_text");
  if (order_text.innerHTML === 'Order by earliest to latest') {
    order_text.innerHTML = 'Order by latest to earliest'
  } else {
    order_text.innerHTML = 'Order by earliest to latest';
  }
  loadCurrentPage(currentPage); // reload the current page with the sorted bookmarks
}

