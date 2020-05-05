function handleResponse(response) {
  document.getElementById("buttonLogo").src = response.isWhitelisted
    ? "images/logo.svg"
    : "images/logo-gray.svg";
}

const manifestData = chrome.runtime.getManifest();
document.getElementById("appinfo").textContent =
  manifestData.name + " " + manifestData.version;

chrome.runtime.sendMessage({ type: "checkIfWhitelisted" }, handleResponse);
