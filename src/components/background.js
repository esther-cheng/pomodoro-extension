let isFocusMode = false;
let blockedSites = ["facebook.com", "youtube.com", "twitter.com"];

chrome.storage.sync.get(["focusMode"], (data) => {
  isFocusMode = data.focusMode || false;
});

chrome.storage.sync.get(["blockedSites"], (data) => {
  if (data.blockedSites) blockedSites = data.blockedSites;
});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (isFocusMode) {
      return { cancel: true };
    }
  },
  { urls: blockedSites.map(site => "*://*." + site + "/*") },
  ["blocking"]
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleFocusMode") {
    isFocusMode = message.focusMode;
    chrome.storage.sync.set({ focusMode: isFocusMode });
    sendResponse({ success: true });
  }
});
