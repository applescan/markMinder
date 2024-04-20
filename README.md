# Technical Design Document (TDD) for Bookmark Manager Web App

## 1. Overview
This document outlines the design and architecture of a JavaScript-based web application that allows users to manage a list of bookmarks (links). The application is purely front-end, utilizing client-side technologies to store, retrieve, edit, and delete bookmarks.

## 2. Application Features

### 2.1 Overview Page
- **Form Submission**: A form at the top allows users to submit new bookmarks. The form validates the URL using URL() constructor to ensure it is properly formatted and checks if the URL actually exists.
- **Bookmark Display with Pagination**: Displays the list of bookmarks with a pagination mechanism, showing a maximum of 20 links per page. Pagination controls include previous, numbered pages, and next links.

### 2.2 Results Page
- **Submission Acknowledgment**: A message thanking the user for their submission.
- **Display Submission**: Shows the link that was just added.
- **Navigation Link**: Provides a link back to the Overview page.

## 3. Technologies
- **HTML/CSS**: For structuring and styling the application interface.
- **JavaScript**: For client-side logic including DOM manipulation, event handling, and local storage interaction.

## 4. Design Considerations

### 4.1 Data Storage
- **Local Storage**: Utilizes the browser's localStorage to persist bookmark data across sessions. Each bookmark entry includes the URL and name.

### 4.2 Pagination
- **Client-side Pagination**: Handles pagination on the client side by dividing the list of bookmarks into chunks and displaying them as per the page selection.

## 5. Limitations
- **No Backend**: Without a backend, data persistence is limited to the storage capacity and lifetime of local storage, which can be cleared by the user or browser settings.
- **Performance**: As the number of bookmarks grows, the client-side operations for sorting, paginating, and validating could become slow.
- **Security**: Since all operations are client-side, manipulations by the user can't be controlled or validated beyond the client's capabilities.
- **Scalability**: Scalability is limited due to reliance on client-side technologies and local storage. Not suitable for storing large quantities of data.
- **No Real-time Data Validation**: The URL existence check might not always be reliable due to cross-origin HTTP requests limitations (CORS).
- **No Date on Bookmarks**: The application does not track or display the date when a bookmark was added or last modified.
- **Form Validation on Edit**: Using alert dialogs to update bookmark details prevents the form validation from working correctly during edits.
- **Order of Bookmarks**: Bookmark items will always display from earliest to newest as the array is not reversed on load.
- **Sorting Issue**: Sorting of numeric values does not work correctly, e.g., sorting "1, 11, 12, 2" instead of "1, 2, 11, 12" due to lexicographical sorting of strings instead of numeric sorting.