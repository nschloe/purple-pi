var domainWhitelist = ['github.com'];

// https://stackoverflow.com/a/8498668/353337
function url_domain(data) {
  var a = document.createElement('a');
  a.href = data;
  return a.hostname;
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.hasOwnProperty('inject')) {
    const injectMathjax = domainWhitelist.some(function(domain) {
      let re = new RegExp('.*:\/\/.*' + domain + '\/.*');
      return re.test(request.url);
    });

    if (injectMathjax) {
      chrome.tabs.executeScript({
        file: 'mathjax.js'
      });
    }
    // Send an empty response to avoid warning
    sendResponse({});
  } else if (request.hasOwnProperty('toggleWhitelist')) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      // extract domain
      const domain = url_domain(tabs[0].url);
      // toggle domain from whitelist
      if (domainWhitelist.includes(domain)) {
        const index = domainWhitelist.indexOf(domain);
        if (index > -1) {
          domainWhitelist.splice(index, 1);
        }
      } else {
        domainWhitelist.push(domain);
      }
      // Send an empty response to avoid warning
      sendResponse({});
    });
  }
});
