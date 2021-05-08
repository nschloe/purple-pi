chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.scripting.executeScript(
    {
      target: {tabId: sender.tab.id},
      files: ["mathjax.js"],
    },
    () => {
      chrome.action.setIcon(
        {
          path: {
            16: "images/logo16.png",
            32: "images/logo32.png",
            48: "images/logo48.png",
            128: "images/logo128.png",
          },
          tabId: sender.tab.id,
        },
        () => {
          sendResponse({});
        }
      );
    }
  );
  // async sendResponse
  return true;
});
