// https://stackoverflow.com/a/8498668/353337
function url_domain(data) {
  var a = document.createElement("a");
  a.href = data;
  return a.hostname;
}

// initialize default whitelist (if it doesn't have a value yet)
chrome.runtime.onInstalled.addListener(() => {
  const defaultWhitelist = ["github.com", "gitlab.com"];
  chrome.storage.sync.get({ domainWhitelist: undefined }, (result) => {
    // in chrome it's `undefined`, in firefox `null`
    if (
      result.domainWhitelist === undefined ||
      result.domainWhitelist === null
    ) {
      chrome.storage.sync.set({ ["domainWhitelist"]: defaultWhitelist });
    }
  });
});

function isWhitelisted(url, callback) {
  chrome.storage.sync.get("domainWhitelist", (result) => {
    callback(result.domainWhitelist.includes(url_domain(url)));
  });
}

function handleCheck(request, sender, sendResponse) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      // TODO Firefox, for tabs[0].url to work, needs the "tabs" permission.
      // Chrome only (and correctly) needs "activeTab".
      isWhitelisted(tabs[0].url, (response) => {
        sendResponse({ isWhitelisted: response });
      });
    }
  );
}

function handleInject(request, sender, sendResponse) {
  chrome.tabs.executeScript({
    file: "mathjax.js",
  });
}

function handleToggle(request, sender, sendResponse) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      // extract domain
      const domain = url_domain(tabs[0].url);
      // toggle domain from whitelist
      chrome.storage.sync.get("domainWhitelist", (result) => {
        if (result.domainWhitelist.includes(domain)) {
          // it's whitelisted, remove it from the list
          const index = result.domainWhitelist.indexOf(domain);
          if (index > -1) {
            result.domainWhitelist.splice(index, 1);
          }
          chrome.storage.sync.set(
            { domainWhitelist: result.domainWhitelist },
            () => {
              chrome.browserAction.setIcon(
                {
                  path: {
                    16: "images/logo-gray16.png",
                    32: "images/logo-gray32.png",
                    48: "images/logo-gray48.png",
                    128: "images/logo-gray128.png",
                  },
                },
                () => {
                  sendResponse({ isWhitelisted: false });
                }
              );
            }
          );
        } else {
          // it's not whitelisted, add it to the list
          result.domainWhitelist.push(domain);
          chrome.storage.sync.set(
            { domainWhitelist: result.domainWhitelist },
            () => {
              chrome.browserAction.setIcon(
                {
                  path: {
                    16: "images/logo16.png",
                    32: "images/logo32.png",
                    48: "images/logo48.png",
                    128: "images/logo128.png",
                  },
                },
                () => {
                  sendResponse({ isWhitelisted: true });
                }
              );
            }
          );
        }
      });
    }
  );
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

function changeIcon() {
  //query the information on the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // TODO Firefox, for tabs[0].url to work, needs the "tabs" permission.
    // Chrome only (and correctly) needs "activeTab".
    isWhitelisted(tabs[0].url, (response) => {
      if (response) {
        chrome.browserAction.setIcon({
          path: {
            16: "images/logo16.png",
            32: "images/logo32.png",
            48: "images/logo48.png",
            128: "images/logo128.png",
          },
        });
      } else {
        chrome.browserAction.setIcon({
          path: {
            16: "images/logo-gray16.png",
            32: "images/logo-gray32.png",
            48: "images/logo-gray48.png",
            128: "images/logo-gray128.png",
          },
        });
      }
    });
  });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  changeIcon();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  changeIcon();
});
