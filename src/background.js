// Check when/if a page has finished loading, and take events from there.
// In a previous version, we just had content_script.js loaded and check the contents of
// the page, but that doesn't always trigger. For example, it triggers when loading a
// new page, but not when changing from github/issues to github/code. onUpdated()
// triggers on every iframe update, so sometimes that's one or two too many, but better
// than not at all.
// Alternatively, we could wait for events like webNavigation.onHistoryStateUpdated or
// webNavigation.onCompleted.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status !== "complete") {
    return;
  }

  // Only the content_script knows the DOM, so let's ask it if we need to inject
  // MathJax.
  // Use tabs.sendMessage, not runtime.sendMessage
  // https://stackoverflow.com/a/14245504/353337
  chrome.tabs.sendMessage(tabId, "get-inject", (response) => {
    if (!response.inject) {
      return;
    }
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["mathjax.js"],
      },
      () => {
        chrome.action.setIcon({
          path: {
            16: "images/logo16.png",
            32: "images/logo32.png",
            48: "images/logo48.png",
            128: "images/logo128.png",
          },
          tabId: tabId,
        });
      }
    );
  });
});
