import{updatePaginationLinks}from"./pagination.js";import{renderCard}from"./card.js";import{handleBookmarkSubmit}from"./form.js";let currentPage=1,currentSearchTerm="";export const bookmarks=JSON.parse(localStorage.getItem("bookmarks"))||[];export const recordsPerPage=20;const totalItems=bookmarks?bookmarks.length:0;export const totalPages=numPages(totalItems);export function numPages(e){return Math.ceil(e/recordsPerPage)}function initializeTheme(){const e=document.getElementById("theme-icon").querySelector("i"),t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",t?"dark":"light"),e.className=t?"fas fa-sun":"fas fa-moon",document.getElementById("theme-icon").addEventListener("click",toggleTheme)}document.addEventListener("DOMContentLoaded",(()=>{initializeTheme(),document.getElementById("bookmark-form").addEventListener("submit",handleBookmarkSubmit),refreshDisplay()}));export function toggleTheme(){const e="dark"===document.documentElement.getAttribute("data-theme"),t=document.getElementById("theme-icon").querySelector("i");document.documentElement.setAttribute("data-theme",e?"light":"dark"),t.className=e?"fas fa-moon":"fas fa-sun"}export function loadCurrentPage(e){let t=bookmarks;if(currentSearchTerm&&(t=bookmarks.filter((e=>e.name.toLowerCase().includes(currentSearchTerm)))),0===t.length){const e=0===bookmarks.length?"<p>No bookmarks available.</p>":"<p>No bookmarks match your search.</p>";return document.getElementById("bookmark-list").innerHTML=e,void updatePaginationLinks(1)}e<1?e=1:e>numPages(bookmarks.length)&&(e=numPages(bookmarks.length)),currentPage=e;const o=document.getElementById("bookmark-list");o.innerHTML="";const r=(currentPage-1)*recordsPerPage,a=Math.min(r+recordsPerPage,bookmarks.length);for(let e=r;e<a;e++)if(t[e]){const r=renderCard(t[e].name,t[e].url,t[e].id);o.appendChild(r)}updatePaginationLinks(currentPage)}export function refreshDisplay(){loadCurrentPage(currentPage)}export function searchBookmarks(){const e=document.getElementById("search").value.trim().toLowerCase();currentSearchTerm=e,refreshDisplay()}