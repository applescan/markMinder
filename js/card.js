import { refreshDisplay } from './app.js';

/**
 * Adds a card element to the DOM for each bookmark.
 * @param {string} name - The name of the bookmark.
 * @param {string} url - The URL of the bookmark.
 * @param {number} index - The index of the bookmark in the array.
 * @return {HTMLElement} - The card element.
 */
export function renderCard(name, url, index) {
  const template = document.getElementById("card-template").content.cloneNode(true);
  template.querySelector('.title.is-6').innerText = name;
  const bookmarkItem = template.querySelector('.url');
  bookmarkItem.href = url;
  bookmarkItem.innerText = url;

  const editButton = template.querySelector('#edit');
  const deleteButton = template.querySelector('#delete');

  editButton.addEventListener('click', () => editBookmark(index));
  deleteButton.addEventListener('click', () => deleteBookmark(index));

  return template.firstElementChild;
}

/**
 * Edits a bookmark and updates local storage.
 * @param {number} index - The index of the bookmark to edit.
 */
function editBookmark(index) {
  const bookmark = bookmarks[index];
  const newName = prompt('Enter new bookmark name:', bookmark.name);
  const newUrl = prompt('Enter new bookmark URL:', bookmark.url);
  if (newName && newUrl) {
    bookmarks[index] = { name: newName, url: newUrl };
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    refreshDisplay();
  }
}

/**
 * Deletes a bookmark and updates local storage.
 * @param {number} index - The index of the bookmark to delete.
 */
function deleteBookmark(index) {
  if (confirm("Are you sure you want to delete this bookmark?")) {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    refreshDisplay();
  }
}
