chrome.runtime.sendMessage(
  {inject: true, url: location.href},
  function(response) {}
);
