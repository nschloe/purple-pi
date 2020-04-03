chrome.runtime.sendMessage(
  {type: 'checkIfWhitelisted'},
  function(response) {
    var src = response.isWhitelisted ? "images/logo.svg" : "images/logo-gray.svg";
    document.getElementById("buttonLogo").src = src;
  }
);

document.getElementById("myButton").addEventListener("click", function() {
  chrome.runtime.sendMessage(
    {type: 'toggleWhitelist'},
    function(response) {
      var src = response.isWhitelisted ? "images/logo.svg" : "images/logo-gray.svg";
      document.getElementById("buttonLogo").src = src;
    }
  );
});
