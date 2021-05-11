// Include the LESS file, it's injected below. This require() call makes sure it's
// picked up by webpack.
require("../node_modules/katex/src/katex.less");

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
    // multiple executeScript: <https://stackoverflow.com/q/21535233/353337>
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["katex.js"],
      })
      .then(() => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["auto-render.js"],
        });
      })
      .then(() => {
        chrome.scripting.insertCSS({
          target: { tabId: tabId },
          // webpack compiles the katex.less to background.css
          files: ["background.css"],
        });
      })
      .then(() => {
        chrome.action.setIcon(
          {
            tabId: tabId,
            path: {
              16: "images/logo16.png",
              32: "images/logo32.png",
              48: "images/logo48.png",
              128: "images/logo128.png",
            },
          },
          () => {
            chrome.tabs.sendMessage(tabId, "render-math");
          }
        );
      });
  });
});
