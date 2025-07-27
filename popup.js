const intervalInput = document.getElementById('interval');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

function saveInterval() {
  let minutes = parseInt(intervalInput.value);
  if (isNaN(minutes) || minutes < 1) {
    status.textContent = 'Please enter a valid number greater than 0.';
    return;
  }

  chrome.storage.sync.set({ clearInterval: minutes }, () => {
    status.textContent = `Interval set to ${minutes} minute(s). Starting timer...`;
    chrome.runtime.sendMessage({ action: 'startAlarm', minutes });
  });
}

saveBtn.addEventListener('click', saveInterval);

// Load saved value
chrome.storage.sync.get('clearInterval', data => {
  if (data.clearInterval) {
    intervalInput.value = data.clearInterval;
  }
});
