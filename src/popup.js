function handleResponse(response) {
  document.getElementById("buttonLogo").src = response.isWhitelisted
    ? "images/logo.svg"
    : "images/logo-gray.svg";
}

chrome.runtime.sendMessage({ type: "checkIfWhitelisted" }, handleResponse);

document.getElementById("myButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "toggleWhitelist" }, handleResponse);
});
