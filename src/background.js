var domainWhitelist = ["github.com"];

// https://stackoverflow.com/a/8498668/353337
function url_domain(data) {
  var a = document.createElement("a");
  a.href = data;
  return a.hostname;
}

function isWhitelisted(url, callback) {
  return (isWhitelistedjectMathjax = domainWhitelist.some(function (domain) {
    let re = new RegExp(".*://.*" + domain + "/.*");
    callback(re.test(url));
  }));
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "checkIfWhitelisted") {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        const domain = url_domain(tabs[0].url);
        sendResponse({ isWhitelisted: domainWhitelist.includes(domain) });
      }
    );
  } else if (request.type === "inject") {
    isWhitelisted(request.url, function (response) {
      if (response) {
        chrome.tabs.executeScript({
          file: "mathjax.js",
        });
      }
      // Send an empty response to avoid warning
      sendResponse({ lol: true });
    });
  } else if (request.type === "toggleWhitelist") {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
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
      }
    );
  }

  // async sendResponse
  return true;
});
