const submissionElement = document.getElementById("submission");

window.onload = function () {
    const lastSubmittedBookmark = JSON.parse(localStorage.getItem('lastSubmittedBookmark'));

    if (lastSubmittedBookmark) {
        submissionElement.innerHTML = `Bookmark Name: ${lastSubmittedBookmark.name}, URL: <a href="${lastSubmittedBookmark.url}" target="_blank">${lastSubmittedBookmark.url}</a>`;
    } else {
        submissionElement.innerHTML = "No bookmark data provided.";
    }
};

const back_btn = document.querySelector('#back');

// Attach event listeners to buttons
back_btn.addEventListener('click', function () {
    localStorage.setItem('lastSubmittedBookmark', JSON.stringify(""));
    window.location.href = 'index.html'
});