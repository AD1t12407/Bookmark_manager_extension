chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'bookmark-all-tabs',
      title: 'Bookmark All Tabs',
      contexts: ['all']
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'bookmark-all-tabs') {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        tabs.forEach((tab) => {
          chrome.bookmarks.create({
            title: tab.title,
            url: tab.url
          });
        });
      });
    }
  });
  