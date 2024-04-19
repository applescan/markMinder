window.onload = function() {
    console.log("Script loaded.");
    const lastSubmittedBookmark = JSON.parse(localStorage.getItem('lastSubmittedBookmark'));

    console.log("Retrieved Bookmark:", lastSubmittedBookmark);

    const submissionElement = document.getElementById("submission");
    if (lastSubmittedBookmark) {
        submissionElement.innerHTML = `Bookmark Name: ${lastSubmittedBookmark.name}, URL: <a href="${lastSubmittedBookmark.url}" target="_blank">${lastSubmittedBookmark.url}</a>`;
    } else {
        submissionElement.innerHTML = "No bookmark data provided.";
    }
};