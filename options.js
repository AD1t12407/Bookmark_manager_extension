document.addEventListener('DOMContentLoaded', () => {
    loadOptions();
  
    document.getElementById('options-form').addEventListener('submit', (e) => {
      e.preventDefault();
      saveOptions();
    });
  });
  
  function loadOptions() {
    chrome.storage.sync.get(['syncEnabled', 'syncService'], (items) => {
      document.getElementById('sync-enabled').checked = items.syncEnabled || false;
      document.getElementById('sync-service').value = items.syncService || 'google_drive';
    });
  }
  
  function saveOptions() {
    const syncEnabled = document.getElementById('sync-enabled').checked;
    const syncService = document.getElementById('sync-service').value;
    chrome.storage.sync.set({
      syncEnabled: syncEnabled,
      syncService: syncService
    }, () => {
      alert('Options saved.');
    });
  }
  