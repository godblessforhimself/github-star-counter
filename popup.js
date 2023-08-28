document.addEventListener("DOMContentLoaded", function () {
  const currentDomainSpan = document.getElementById("currentDomain");
  const toggleButton = document.getElementById("toggleButton");

  // Get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    const currentDomain = new URL(currentTab.url).hostname;
    currentDomainSpan.textContent = currentDomain;

    // Load current domain's state from storage
    chrome.storage.sync.get(currentDomain, function (data) {
      const isEnabled = data[currentDomain] !== false;
      updateButtonLabel(isEnabled);

      // Toggle functionality when the button is clicked
      toggleButton.addEventListener("click", function () {
        const newIsEnabled = !isEnabled;
        chrome.storage.sync.set({ [currentDomain]: newIsEnabled }, function () {
          updateButtonLabel(newIsEnabled);
        });
      });
    });
  });

  function updateButtonLabel(isEnabled) {
    toggleButton.textContent = isEnabled ? "Disable" : "Enable";
  }
});
