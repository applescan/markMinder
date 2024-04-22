import { bookmarks, refreshDisplay } from './app.js';
import { isValidUrl } from './form.js';

/**
 * Adds a card element to the DOM for each bookmark.
 * @param {string} name - The name of the bookmark.
 * @param {string} url - The URL of the bookmark.
 * @param {number} id - The id of the bookmark in the array.
 * @return {HTMLElement} - The card element.
 */
export function renderCard(name, url, id) {
  const template = document.getElementById("card-template").content.cloneNode(true);
  template.querySelector('.title.is-6').innerText = name;
  const bookmarkItem = template.querySelector('.url');
  bookmarkItem.href = url;
  bookmarkItem.innerText = url;

  const editButton = template.querySelector('#edit');
  const deleteButton = template.querySelector('#delete');

  editButton.addEventListener('click', () => editBookmark(id));
  deleteButton.addEventListener('click', () => deleteBookmark(id));

  return template.firstElementChild;
}

/**
 * Edits a bookmark and updates local storage.
 * @param {number} id - The id of the bookmark to edit.
 */
function editBookmark(id) {
  // Find the index of the bookmark that matches the id
  const index = bookmarks.findIndex(bookmark => bookmark.id === id);
  const bookmark = bookmarks[index];

  const newName = prompt('Enter new bookmark name:', bookmark.name);
  const newUrl = prompt('Enter new bookmark URL:', bookmark.url);

  if (!isValidUrl(newUrl)) {
    alert('Please enter a valid URL.');
    return;
  }

  if (newName && newUrl) {
    bookmarks[index] = { name: newName, url: newUrl };
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    refreshDisplay();
  }
}

/**
 * Deletes a bookmark and updates local storage.
 * @param {number} id - The id of the bookmark to delete.
 */
function deleteBookmark(id) {
  if (confirm("Are you sure you want to delete this bookmark?")) {
    // Find the index of the bookmark that matches the id
    const index = bookmarks.findIndex(bookmark => bookmark.id === id);
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    refreshDisplay();
  }
}
