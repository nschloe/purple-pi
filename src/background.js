// var glob = require("glob");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const injectMathjax = /.*:\/\/.*github.com\/.*/.test(request.url);

  if (injectMathjax) {
    chrome.tabs.executeScript({
      file: 'mathjax.js'
    });
  }

  // Send an empty response to avoid warning
  sendResponse({});
});
