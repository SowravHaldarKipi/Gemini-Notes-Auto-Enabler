/**
 * Gemini Auto-Notes Popup Script
 */
const toggle = document.getElementById('toggle');
const indicator = document.getElementById('status-indicator');
const dot = document.getElementById('status-dot');
const msg = document.getElementById('status-msg');

function updateUI(enabled) {
  if (enabled) {
    if (indicator) indicator.style.background = '#22c55e';
    if (dot) dot.className = 'dot';
    if (msg) msg.innerText = 'SYSTEM OPERATIONAL';
  } else {
    if (indicator) indicator.style.background = '#ef4444';
    if (dot) dot.className = 'dot off';
    if (msg) msg.innerText = 'PAUSED BY USER';
  }
}

// Initialize state
chrome.storage.sync.get(['enabled'], (result) => {
  const isEnabled = result.enabled !== false;
  if (toggle) toggle.checked = isEnabled;
  updateUI(isEnabled);
});

// Listener for toggle changes
if (toggle) {
  toggle.addEventListener('change', () => {
    chrome.storage.sync.set({ enabled: toggle.checked });
    updateUI(toggle.checked);
  });
}
