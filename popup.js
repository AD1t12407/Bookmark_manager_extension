document.getElementById('save-bookmark').addEventListener('click', () => {
    const title = document.getElementById('bookmark-title').value;
    const url = document.getElementById('bookmark-url').value;
    const notes = document.getElementById('bookmark-notes').value;
  
    chrome.bookmarks.create({
      title: title,
      url: url
    }, (newBookmark) => {
      chrome.storage.local.set({ [newBookmark.id]: notes });
      displayBookmark(newBookmark, notes);
    });
  });
  
  function displayBookmark(bookmark, notes) {
    const bookmarksList = document.getElementById('bookmarks-list');
    const bookmarkElement = document.createElement('div');
    bookmarkElement.innerHTML = `<h3>${bookmark.title}</h3><p>${bookmark.url}</p><p>${notes}</p>`;
    bookmarksList.appendChild(bookmarkElement);
  }
  
  function loadBookmarks() {
    chrome.bookmarks.getTree((bookmarks) => {
      bookmarks.forEach((bookmark) => {
        if (bookmark.url) {
          chrome.storage.local.get(bookmark.id, (data) => {
            displayBookmark(bookmark, data[bookmark.id]);
          });
        }
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', loadBookmarks);
  