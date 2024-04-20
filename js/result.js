const submissionElement = document.getElementById('submission');
const backButton = document.querySelector('#back');

// Handle page load events
window.onload = () => {
    const lastSubmittedBookmark = JSON.parse(localStorage.getItem('lastSubmittedBookmark'));
    if (lastSubmittedBookmark) {
        submissionElement.innerHTML = `Bookmark Name: ${lastSubmittedBookmark.name} <br> URL: <a href="${lastSubmittedBookmark.url}" target="_blank">${lastSubmittedBookmark.url}</a>`;
    } else {
        submissionElement.innerHTML = 'No bookmark data provided.';
    }
};

// Attach event listeners if elements exist
if (backButton) {
    backButton.addEventListener('click', () => {
        localStorage.setItem('lastSubmittedBookmark', JSON.stringify(''));
        window.location.href = 'index.html';
    });
}
