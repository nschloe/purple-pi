chrome.runtime.sendMessage({ type: "checkIfWhitelisted" }, (response) => {
  var src = response.isWhitelisted ? "images/logo.svg" : "images/logo-gray.svg";
  document.getElementById("buttonLogo").src = src;
});

document.getElementById("myButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "toggleWhitelist" }, (response) => {
    var src = response.isWhitelisted
      ? "images/logo.svg"
      : "images/logo-gray.svg";
    document.getElementById("buttonLogo").src = src;
  });
});
