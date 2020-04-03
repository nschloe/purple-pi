var browser = require("webextension-polyfill");

function handleResponse(response) {
  var src = response.isWhitelisted ? "images/logo.svg" : "images/logo-gray.svg";
  document.getElementById("buttonLogo").src = src;
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

var sending = browser.runtime.sendMessage({ type: "checkIfWhitelisted" });
sending.then(handleResponse, handleError);

document.getElementById("myButton").addEventListener("click", () => {
  var sending = browser.runtime.sendMessage({ type: "toggleWhitelist" });
  sending.then(handleResponse, handleError);
});
