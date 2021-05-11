// https://stackoverflow.com/a/1414175/353337
function stringToBoolean(string) {
  switch (string.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(string);
  }
}

const getInject = () => {
  var activate = false;
  for (link of document.getElementsByTagName("a")) {
    var url;
    try {
      url = new URL(link.href);
    } catch (err) {
      url = null;
    }
    if (
      url &&
      url.hostname == "github.com" &&
      url.pathname == "/nschloe/purple-pi"
    ) {
      // collect activation switch
      if (url.searchParams.has("activate")) {
        activate = true;
        break;
      }
    }
  }
  return activate;
};

const renderMath = () => {
  renderMathInElement(document.body, {
    // customised options
    // • auto-render specific keys, e.g.:
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    throwOnError: false,
  });
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "get-inject") {
    sendResponse({ inject: getInject() });
  } else if (message === "render-math") {
    renderMath();
  }
});
