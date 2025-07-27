chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startAlarm') {
    chrome.alarms.clearAll(() => {
      chrome.alarms.create('clearHistoryAlarm', { periodInMinutes: message.minutes });
    });
  }
});

// When alarm fires, clear browsing history
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'clearHistoryAlarm') {
    // Clear browsing history for all time
    chrome.browsingData.removeHistory({}, () => {
      console.log('Browsing history cleared at', new Date().toLocaleTimeString());
    });
  }
});

// Start alarm on extension load if setting exists
chrome.storage.sync.get('clearInterval', data => {
  if (data.clearInterval) {
    chrome.alarms.create('clearHistoryAlarm', { periodInMinutes: data.clearInterval });
  }
});
