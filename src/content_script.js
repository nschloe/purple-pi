chrome.runtime.sendMessage(
  {type: 'inject', url: location.href},
  function(response) {}
);
