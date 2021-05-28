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
  for (element of document.getElementsByTagName("code")) {
    if (
      element.previousSibling !== null &&
      element.previousSibling.textContent.slice(-1) == "$" &&
      element.nextSibling !== null &&
      element.nextSibling.textContent.charAt(0) == "$"
    ) {
      return true;
    }
  }

  // check for <pre lang="math"> tags
  if (document.querySelectorAll("pre[lang='math']").length !== null)
    return true;

  // check for activation link
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
        return true;
      }
    }
  }
  return false;
};

const renderMath = () => {
  // make sure this comes before the explicit <code> loop. <pre> tages contain <code>,
  // too, but are remove here.
  for (let element of document.querySelectorAll("pre[lang='math']")) {
    // render
    katex.render(element.textContent, element.parentNode, {
      displayMode: true,
      throwOnError: false,
    });
  }

  // Using getElementsByTagName("code") doesn't work here since the list is dynamic and
  // the <code> tags are removed in the loop. Instead, use querySelectorAll which is
  // static.
  for (element of document.querySelectorAll('code')) {
    if (
      element.previousSibling !== null &&
      element.previousSibling.textContent.slice(-1) == "$" &&
      element.nextSibling !== null &&
      element.nextSibling.textContent.charAt(0) == "$"
    ) {
      // remove $ before and after
      element.previousSibling.textContent =
        element.previousSibling.textContent.slice(0, -1);
      element.nextSibling.textContent =
        element.nextSibling.textContent.substring(1);

      // render
      katex.render(element.textContent, element, {
        displayMode: false,
        throwOnError: false,
      });

      // remove surrounding <code></code>
      element.outerHTML = element.innerHTML;
    }
  }

  // renderMathInElement(document.body, {
  //   // customised options
  //   // • auto-render specific keys, e.g.:
  //   delimiters: [
  //     // { left: "$$", right: "$$", display: true },
  //     // { left: "$", right: "$", display: false },
  //     // { left: "\\(", right: "\\)", display: false },
  //     // { left: "\\[", right: "\\]", display: true },
  //     { left: '<pre lang="math">', right: "</pre>", display: true },
  //     // { left: "$`", right: "`$", display: false },
  //   ],
  //   throwOnError: false,
  // });
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "get-inject") {
    sendResponse({ inject: getInject() });
  } else if (message === "render-math") {
    renderMath();
  }
});
