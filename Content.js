/**
 * Gemini Meet Auto-Notes Content Script
 * Optimized for performance and minimal UI interference.
 */

const CONFIG = {
  SEARCH_INTERVAL: 4000, // Minimalist polling
  INITIAL_DELAY: 6000,   // Wait for UI stabilization
  SIDEBAR_LABELS: ["Take notes with Gemini", "Take notes for me", "Notes"],
  ACTION_TEXTS: ["Continue taking notes", "Start taking notes", "Take notes for me"],
  STOP_TEXTS: ["Stop taking notes", "Stop notes", "Gemini is taking notes", "Notes are being taken"],
  CLOSE_LABELS: ["Close", "Close panel", "Close sidebar", "Dismiss"]
};

let openedByExtension = false;
let lastActionTime = 0;

// Minimalist Floating Status Indicator
const indicator = document.createElement('div');
indicator.id = 'gemini-auto-notes-status';
Object.assign(indicator.style, {
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  zIndex: '2147483647',
  transition: 'all 0.8s ease',
  pointerEvents: 'none',
  backgroundColor: '#22c55e',
  opacity: '0.4'
});
document.body.appendChild(indicator);

async function checkAndEnableNotes() {
  const settings = await chrome.storage.sync.get(['enabled']);
  const isAutoEnabled = settings.enabled !== false;
  indicator.style.backgroundColor = isAutoEnabled ? '#22c55e' : '#ef4444';

  if (!isAutoEnabled) return;

  const now = Date.now();
  if (now - lastActionTime < 3000) return;

  // 1. Check for Active State (Global Text Search)
  // This avoids opening the sidebar if "Stop" text is already present in the DOM
  const allText = document.body.innerText.toLowerCase();
  const isNotesRunning = CONFIG.STOP_TEXTS.some(t => allText.includes(t.toLowerCase()));

  // 2. Locate Sidebar Toggle
  const elements = Array.from(document.querySelectorAll('button, [role="button"], span, div'));
  let sidebarToggle = null;
  for (const el of elements) {
    const label = (el.getAttribute('aria-label') || "").toLowerCase();
    if (CONFIG.SIDEBAR_LABELS.some(l => label.includes(l.toLowerCase()))) {
      sidebarToggle = el;
      break;
    }
  }

  const isSidebarOpen = sidebarToggle && (
    sidebarToggle.getAttribute('aria-pressed') === 'true' || 
    sidebarToggle.getAttribute('aria-expanded') === 'true'
  );

  // 3. Status Handling: If Notes are running, ensure sidebar is closed if we opened it
  if (isNotesRunning) {
    if (isSidebarOpen && openedByExtension) {
      closeSidebar(elements);
      openedByExtension = false;
      lastActionTime = now;
    }
    return;
  }

  // 4. Try to find Action Buttons (Continue/Start)
  let actionTaken = false;
  for (const el of elements) {
    const text = (el.innerText || el.getAttribute('aria-label') || "").trim().toLowerCase();
    if (CONFIG.ACTION_TEXTS.some(t => text === t.toLowerCase())) {
      let clickable = findClickable(el);
      if (clickable && isVisible(clickable)) {
        console.log('Gemini Auto-Notes: Resuming session...');
        clickable.click();
        actionTaken = true;
        lastActionTime = now;
        
        // Auto-close if it was part of a sidebar action
        if (openedByExtension) {
            setTimeout(() => closeSidebar(Array.from(document.querySelectorAll('button'))), 500);
        }
        break;
      }
    }
  }

  // 5. Smart Probing: Only open sidebar if we have no visual confirmation of status
  if (!actionTaken && !isSidebarOpen && !isNotesRunning) {
    const bottomBar = document.querySelector('[data-is-muted]');
    if (bottomBar && sidebarToggle && isVisible(sidebarToggle)) {
        // Double check: is it really inactive? (Sometimes the button label itself says Stop)
        const currentLabel = sidebarToggle.getAttribute('aria-label') || "";
        if (!currentLabel.toLowerCase().includes('stop')) {
            console.log('Gemini Auto-Notes: Probing status...');
            sidebarToggle.click();
            openedByExtension = true;
            lastActionTime = now;
        }
    }
  }
}

function closeSidebar(elements) {
  for (const el of elements) {
    const label = (el.getAttribute('aria-label') || "").toLowerCase();
    if (CONFIG.CLOSE_LABELS.some(l => label.includes(l.toLowerCase())) && isVisible(el)) {
       el.click();
       break;
    }
  }
}

function findClickable(el) {
  let curr = el;
  while (curr && curr.tagName !== 'BUTTON' && curr.getAttribute('role') !== 'button' && !curr.className.includes('VfPpkd-LgbsSe')) {
    curr = curr.parentElement;
  }
  return curr;
}

function isVisible(el) {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

// Initial delay to avoid flickering during Meet bootup
setTimeout(() => {
    setInterval(checkAndEnableNotes, CONFIG.SEARCH_INTERVAL);
    checkAndEnableNotes();
}, CONFIG.INITIAL_DELAY);
