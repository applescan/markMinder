import { loadCurrentPage } from './pagination.js';

// Default constants and state variables
let currentPage = 1;
export const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
export const recordsPerPage = 20;
export const animalMasks = [
  "Fox",
  "Wolf",
  "Bear",
  "Owl",
  "Hawk",
  "Cat",
  "Deer",
  "Rabbit",
  "Dragon",
  "Snake",
  "Tiger",
  "Lion",
  "Monkey",
  "Elephant",
  "Horse",
  "Bat",
  "Shark",
  "Dolphin",
  "Octopus",
  "Butterfly",
  "Spider",
  "Rhinoceros",
  "Hippopotamus",
  "Giraffe",
  "Koala",
  "Kangaroo",
  "Panda",
  "Komodo Dragon",
  "Chameleon",
  "Axolotl",
  "Narwhal",
  "Mantis Shrimp",
  "Seahorse",
  "Platypus",
  "Triceratops",
  "Stegosaurus",
  "Tyrannosaurus Rex",
  "Brachiosaurus",
  "Velociraptor"
];

// Set up initial page and event listeners on window load
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  refreshDisplay();
});

/**
 * Initializes theme settings based on user's preference.
 */
function initializeTheme() {
  const themeIcon = document.getElementById('theme-icon').querySelector('i');
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  document.documentElement.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
  themeIcon.className = prefersDarkMode ? 'fas fa-sun' : 'fas fa-moon';

  document.getElementById('theme-icon').addEventListener('click', toggleTheme);
}

/**
 * Toggles the website's theme between 'dark' and 'light' mode.
 */
export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isDarkMode = currentTheme === 'dark';
  const themeIcon = document.getElementById('theme-icon').querySelector('i');

  document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  themeIcon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
}

/**
 * Refreshes the display of bookmarks on the current page.
 */
export function refreshDisplay() {
  loadCurrentPage(currentPage);
}
