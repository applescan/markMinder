// when the form is submitted, it will triggers this event
document.getElementById('bookmark-form').addEventListener('submit', function(event) {
  event.preventDefault(); //to prevent reloading page on submit

  const bookmarkName = this.bookmarkName.value.trim();
  const bookmarkUrl = this.bookmarkUrl.value.trim();

  if (!bookmarkName || !isValidUrl(bookmarkUrl)) {
    alert('Please enter a valid URL.');
    return;
  }

  const bookmark = {
    name: bookmarkName,
    url: bookmarkUrl
  };

  saveBookmark(bookmark);
  this.reset(); // Reset the form after saving
  displayLocalStorage()
});

// Function to check if the url is valid or not
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}

// Saving the bookmark object to local storage
function saveBookmark(bookmark) {
  let bookmarks = localStorage.getItem('bookmarks');
  bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Display items from localStorage
function displayLocalStorage() {
    const storageList = document.getElementById('storageList');
    storageList.innerHTML = ''; // Clear existing entries

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    bookmarks.forEach((bookmark, index) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href', bookmark.url);
        link.textContent = bookmark.name + ' ' + bookmark.url;
        li.appendChild(link);

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = function() {
            editBookmark(index);
        };

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            deleteBookmark(index);
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        storageList.appendChild(li);
    });
}

function editBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    let bookmark = bookmarks[index];

    // Prompt for new values
    const newName = prompt('Enter new bookmark name:', bookmark.name);
    const newUrl = prompt('Enter new bookmark URL:', bookmark.url);

    // Update if user made changes
    if (newName && newUrl) {
        bookmarks[index] = {name: newName, url: newUrl};
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        displayLocalStorage(); // Refresh the list
    }
}

function deleteBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1); // Remove the bookmark at the specified index
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayLocalStorage(); // Refresh the list
}

displayLocalStorage(); // Call to display bookmarks initially
