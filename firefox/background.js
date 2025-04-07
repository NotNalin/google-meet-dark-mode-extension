browser.runtime.onInstalled.addListener(() => {
    // Set the default dark mode option to 'off'
    browser.storage.sync.set({ darkMode: 'off' });
  });