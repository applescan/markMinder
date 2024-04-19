// variables
const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

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
    // Save the last submitted bookmark to localStorage for access on the results page
    localStorage.setItem('lastSubmittedBookmark', JSON.stringify(bookmark));

    this.reset(); // Reset the form
    window.location.href = '/result.html';
});

//validate form inputs 
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
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  refresh(); // Refresh display after adding a bookmark
}

function refresh() {
  load_current_page(current_page); // Refresh to the current page
}

function addControlButtons(card, index) {
//   const btn_edit = document.createElement('button');
  btn_edit.className = 'button is-link';
  btn_edit.textContent = 'Edit';
  btn_edit.onclick = () => editBookmark(index);
  card.querySelector('.buttons').appendChild(btn_edit);

//   const btn_delete = document.createElement('button');
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
  bookmarks.splice(index, 1); // Remove the bookmark
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  refresh(); // Refresh the list
}

// Pagination control variables
let current_page = 1; // Tracks the current page
const records_per_page = 5; // Number of records per page

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
    load_current_page(current_page);
};

// Change page function
function load_current_page(page) {
  
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
    load_current_page(current_page); // reload the current page with the sorted bookmarks
}

function order_bookmarks() {
  bookmarks.reverse()
    const order_text = document.querySelector(".order_text");
  if (order_text.innerHTML === 'Order by earliest to latest' ) {
    order_text.innerHTML = 'Order by latest to earliest'
  } else {
    order_text.innerHTML = 'Order by earliest to latest'; 
  }
  load_current_page(current_page); // reload the current page with the sorted bookmarks
}

// Attach event listeners
document.getElementById('sort_a_z').addEventListener("click", function() {
    sort_bookmarks('asc');
});

document.getElementById('sort_z_a').addEventListener("click", function() {
    sort_bookmarks('desc');
});

document.getElementById('order').addEventListener("click", function() {
    order_bookmarks()
});

// Update pagination links dynamically based on the current page and total items
function updatePaginationLinks(currentPage, totalItems) {
  const nextButton = document.getElementById("pagination-next");
  const prevButton = document.getElementById("pagination-previous");

  const total_pages = numPages(totalItems);
  
  // Hide or show pagination buttons based on the page conditions
  nextButton.style.visibility = (currentPage >= total_pages || total_pages <= 1) ? "hidden" : "visible";
  prevButton.style.visibility = (currentPage > 1) ? "visible" : "hidden";

  // Adjust pagination list for manual page selection (if applicable)
  const pagination_list = document.querySelector(".pagination-list");
  pagination_list.innerHTML = ''; // Clear existing links

  if (total_pages <= 1) return; // No need for pagination links if only one page or none

  for (let page = 1; page <= total_pages; page++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'pagination-link';
    a.href = '#';
    a.textContent = page;
    a.onclick = (function (p) { return function () { load_current_page(p); } })(page);

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
    load_current_page(current_page - 1);
  }
}

// Navigate to the next page
function nextPage() {
  if (current_page < numPages(JSON.parse(localStorage.getItem('bookmarks')).length)) {
    load_current_page(current_page + 1);
  }
}

