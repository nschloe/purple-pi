var browser = require("webextension-polyfill");

// https://stackoverflow.com/a/8498668/353337
function url_domain(data) {
  var a = document.createElement("a");
  a.href = data;
  return a.hostname;
}

// initialize default whitelist (if it doesn't have a value yet)
browser.runtime.onInstalled.addListener(() => {
  const defaultWhitelist = ["github.com", "gitlab.com"];
  browser.storage.sync.get({ domainWhitelist: undefined }).then((result) => {
    // in chrome it's `undefined`, in firefox `null`
    if (
      result.domainWhitelist === undefined ||
      result.domainWhitelist === null
    ) {
      browser.storage.sync.set({ ["domainWhitelist"]: defaultWhitelist });
    }
  });
});

function isWhitelisted(url, callback) {
  browser.storage.sync.get("domainWhitelist").then((result) => {
    callback(result.domainWhitelist.includes(url_domain(url)));
  });
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
    isWhitelisted(tabs[0].url, (response) => {
      sendResponse({ isWhitelisted: response });
    });
  }, handleError);
}

function handleInject(request, sender, sendResponse) {
  isWhitelisted(request.url, (response) => {
    if (response) {
      browser.tabs.executeScript({
        file: "mathjax.js",
      });
    }
    // Send an empty response to avoid warning
    sendResponse({});
  });
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
    browser.storage.sync.get("domainWhitelist").then((result) => {
      if (result.domainWhitelist.includes(domain)) {
        const index = result.domainWhitelist.indexOf(domain);
        if (index > -1) {
          result.domainWhitelist.splice(index, 1);
        }
        browser.storage.sync
          .set({ domainWhitelist: result.domainWhitelist })
          .then(() => {
            sendResponse({ isWhitelisted: false });
          });
      } else {
        result.domainWhitelist.push(domain);
        browser.storage.sync
          .set({ domainWhitelist: result.domainWhitelist })
          .then(() => {
            sendResponse({ isWhitelisted: true });
          });
      }
    });
  }, handleError);
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
