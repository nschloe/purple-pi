var browser = require("webextension-polyfill");

// never mind then()
browser.runtime
  .sendMessage({ type: "inject", url: location.href })
  .then(() => {});
