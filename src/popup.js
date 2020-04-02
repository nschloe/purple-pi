document.getElementById("myButton").addEventListener("click", function() {
  console.log('Activation START2');
  chrome.runtime.sendMessage(
    {toggleWhitelist: true, url: location.href},
    function(response) {}
  );
});
