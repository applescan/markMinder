import{setupPaginationControls}from"./pagination.js";import{bookmarks,toggleTheme,refreshDisplay}from"./app.js";function sortBookmarks(e){const r=document.getElementById("sort-a-z");"asc"===e?(r.innerHTML="Sort Alphabetically Z-A",window.currentSortOrder="desc"):(r.innerHTML="Sort Alphabetically A-Z",window.currentSortOrder="asc"),bookmarks.sort(((r,t)=>{const o=r.name.toUpperCase(),n=t.name.toUpperCase();return"asc"===e?o>n?1:n>o?-1:0:o>n?-1:n>o?1:0})),refreshDisplay()}function orderBookmarks(){bookmarks.reverse();const e=document.querySelector(".order_text");"Order by earliest to latest"===e.innerHTML?e.innerHTML="Order by latest to earliest":e.innerHTML="Order by earliest to latest",refreshDisplay()}function searchBookmarks(){let e="";e=document.getElementById("search").value.trim().toLowerCase(),refreshDisplay()}window.onload=()=>{setupPaginationControls(),refreshDisplay()},document.getElementById("sort-a-z").addEventListener("click",(()=>{sortBookmarks(window.currentSortOrder||"asc")})),document.getElementById("order").addEventListener("click",orderBookmarks),document.getElementById("search").addEventListener("input",searchBookmarks),document.getElementById("theme-toggle").addEventListener("click",toggleTheme);