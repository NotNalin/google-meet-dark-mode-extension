document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const radioButtons = document.querySelectorAll('input[name="darkModeType"]');

  // Load saved state from storage
  chrome.storage.sync.get(["enabled", "darkMode"], (data) => {
    if (data.enabled) {
      toggle.checked = true;
      document.body.classList.add("dark-body");
    }

    if (data.darkMode) {
      const selectedRadio = document.querySelector(
        `input[value="${data.darkMode}"]`
      );
      if (selectedRadio) selectedRadio.checked = true;
    }
  });

  // Toggle switch behavior
  toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    const mode = document.querySelector(
      'input[name="darkModeType"]:checked'
    ).value;

    // Save settings
    chrome.storage.sync.set({ enabled, darkMode: mode });

    // Reflect in popup UI
    document.body.classList.toggle("dark-body", enabled);

    // Apply to tab
    updateTabTheme(enabled, mode);
  });

  // Radio button change behavior
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      const mode = radio.value;
      const enabled = toggle.checked;

      // Save the selected mode
      chrome.storage.sync.set({ darkMode: mode });

      if (enabled) {
        updateTabTheme(enabled, mode);
      }
    });
  });
});

// Send message to content script
function updateTabTheme(enabled, mode) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { enabled, mode });
  });
}
