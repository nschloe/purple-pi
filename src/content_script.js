chrome.runtime.sendMessage({ type: "checkIfWhitelisted" }, (response) => {
  if (response.isWhitelisted) {
    chrome.runtime.sendMessage({ type: "inject" });
  }
});
