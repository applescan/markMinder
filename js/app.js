document.getElementById('bookmark-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page reload

  const bookmarkName = this.bookmarkName.value.trim();
  const bookmarkUrl = this.bookmarkUrl.value.trim();

  if (!bookmarkName || !isValidUrl(bookmarkUrl)) {
    alert('Please enter a valid URL.');
    return;
  }

  const bookmark = { name: bookmarkName, url: bookmarkUrl };
  saveBookmark(bookmark);
  this.reset(); // Reset the form
  window.location.href = '/result.html';
});

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}

// Functions for handling bookmarks
function saveBookmark(bookmark) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  refresh(); // Refresh display after adding a bookmark
}

function refresh() {
  changePage(current_page); // Refresh to the current page
}

function addControlButtons(card, index) {
  const btn_edit = document.createElement('button');
  btn_edit.className = 'button is-link';
  btn_edit.textContent = 'Edit';
  btn_edit.onclick = () => editBookmark(index);
  card.querySelector('.buttons').appendChild(btn_edit);

  const btn_delete = document.createElement('button');
  btn_delete.className = 'button is-danger';
  btn_delete.textContent = 'Delete';
  btn_delete.onclick = () => {
    deleteBookmark(index);
    refresh(); // Refresh the list after deletion
  };
  card.querySelector('.buttons').appendChild(btn_delete);
}

function addCard(name, url) {
  const template = document.getElementById("card-template").content.cloneNode(true);
  template.querySelector('.title.is-6').innerText = name;
  const linkElement = template.querySelector('.url');
  linkElement.href = url;
  linkElement.innerText = url; // Display the URL as the link text
  return template.firstElementChild
}

function editBookmark(index) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  let bookmark = bookmarks[index];

  const newName = prompt('Enter new bookmark name:', bookmark.name);
  const newUrl = prompt('Enter new bookmark URL:', bookmark.url);
  if (newName && newUrl) {
    bookmarks[index] = { name: newName, url: newUrl };
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    refresh(); // Refresh the list
  }
}

function deleteBookmark(index) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.splice(index, 1); // Remove the bookmark
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  refresh(); // Refresh the list
}

// Pagination control variables
let current_page = 1; // Tracks the current page
const records_per_page = 20; // Number of records per page

// Initialize pagination on page load
window.onload = function () {
  document.getElementById("pagination-previous").addEventListener("click", prevPage);
  document.getElementById("pagination-next").addEventListener("click", nextPage);
  changePage(current_page); // Initial page setup
};

// Change page function
function changePage(page) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.reverse()
  
  if (bookmarks.length === 0) {
    document.getElementById("bookmark-list").innerHTML = "<p>No bookmarks stored.</p>";
    updatePaginationLinks(1, 0); // Reset pagination
    return;
  }

  if (page < 1) page = 1;
  else if (page > numPages(bookmarks.length)) page = numPages(bookmarks.length);
  
  current_page = page; // Update the current page
  
  const bookmark_list = document.getElementById("bookmark-list");
  bookmark_list.innerHTML = ""; // Clear previous entries

  let start = (current_page - 1) * records_per_page;
  let end = Math.min(start + records_per_page, bookmarks.length); // Ensure not to exceed array

  for (let i = start; i < end; i++) {
    const card = addCard(bookmarks[i].name, bookmarks[i].url);
    addControlButtons(card, i); // Add control buttons to the card
    bookmark_list.appendChild(card);
  }

  updatePaginationLinks(current_page, bookmarks.length);
}

// Update pagination links dynamically based on the current page and total items
function updatePaginationLinks(currentPage, totalItems) {
  const pagination_list = document.querySelector(".pagination-list");
  pagination_list.innerHTML = ''; // Clear existing links

  let total_pages = numPages(totalItems);

  if (total_pages <= 1) return; // No pagination if 1 or fewer pages

  for (let page = 1; page <= total_pages; page++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'pagination-link';
    a.href = '#';
    a.textContent = page;
    a.onclick = (function (p) { return function () { changePage(p); } })(page);

    if (page === currentPage) {
      a.classList.add('is-current');
    }

    li.appendChild(a);
    pagination_list.appendChild(li);
  }
}

// Calculate the number of pages
function numPages(totalItems) {
  return Math.ceil(totalItems / records_per_page);
}

// Navigate to the previous page
function prevPage() {
  if (current_page > 1) {
    changePage(current_page - 1);
  }
}

// Navigate to the next page
function nextPage() {
  if (current_page < numPages(JSON.parse(localStorage.getItem('bookmarks')).length)) {
    changePage(current_page + 1);
  }
}