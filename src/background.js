var browser = require("webextension-polyfill");

var domainWhitelist = ["github.com"];

// https://stackoverflow.com/a/8498668/353337
function url_domain(data) {
  var a = document.createElement("a");
  a.href = data;
  return a.hostname;
}

function isWhitelisted(url) {
  return domainWhitelist.includes(url_domain(url));
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function handleCheck(request, sender, sendResponse) {
  var querying = browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  querying.then((tabs) => {
    sendResponse({ isWhitelisted: isWhitelisted(tabs[0].url) });
  }, handleError);
}

function handleInject(request, sender, sendResponse) {
  if (isWhitelisted(request.url)) {
    browser.tabs.executeScript({
      file: "mathjax.js",
    });
  }
  // Send an empty response to avoid warning
  sendResponse({});
}

function handleToggle(request, sender, sendResponse) {
  var querying = browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  querying.then((tabs) => {
    // extract domain
    const domain = url_domain(tabs[0].url);
    // toggle domain from whitelist
    if (domainWhitelist.includes(domain)) {
      const index = domainWhitelist.indexOf(domain);
      if (index > -1) {
        domainWhitelist.splice(index, 1);
      }
      sendResponse({ isWhitelisted: false });
    } else {
      domainWhitelist.push(domain);
      sendResponse({ isWhitelisted: true });
    }
  }, handleError);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "checkIfWhitelisted") {
    handleCheck(request, sender, sendResponse);
  } else if (request.type === "inject") {
    handleInject(request, sender, sendResponse);
  } else if (request.type === "toggleWhitelist") {
    handleToggle(request, sender, sendResponse);
  }
  // async sendResponse
  return true;
});
