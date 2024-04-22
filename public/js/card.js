import{bookmarks,refreshDisplay}from"./app.js";import{isValidUrl}from"./form.js";export function renderCard(e,r,o){const t=document.getElementById("card-template").content.cloneNode(!0);t.querySelector(".title.is-6").innerText=e;const n=t.querySelector(".url");n.href=r,n.innerText=r;const a=t.querySelector("#edit"),i=t.querySelector("#delete");return a.addEventListener("click",(()=>editBookmark(o))),i.addEventListener("click",(()=>deleteBookmark(o))),t.firstElementChild}function editBookmark(e){const r=bookmarks.findIndex((r=>r.id===e)),o=bookmarks[r],t=prompt("Enter new bookmark name:",o.name),n=prompt("Enter new bookmark URL:",o.url);isValidUrl(n)?t&&n&&(bookmarks[r]={name:t,url:n},localStorage.setItem("bookmarks",JSON.stringify(bookmarks)),refreshDisplay()):alert("Please enter a valid URL.")}function deleteBookmark(e){if(confirm("Are you sure you want to delete this bookmark?")){const r=bookmarks.findIndex((r=>r.id===e));bookmarks.splice(r,1),localStorage.setItem("bookmarks",JSON.stringify(bookmarks)),refreshDisplay()}}