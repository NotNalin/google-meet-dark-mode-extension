chrome.runtime.onInstalled.addListener(() => {
  // Set the default dark mode option to 'off'
  chrome.storage.sync.set({ darkMode: "off" });
});
