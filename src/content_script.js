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
    console.log(element);
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
  console.log("RENDER");

  // make sure this comes before the explicit <code> loop. <pre> tages contain <code>,
  // too, but are remove here.
  for (let element of document.querySelectorAll("pre[lang='math']")) {
    // render
    katex.render(element.textContent, element.parentNode, {
      displayMode: true,
      throwOnError: false,
    });
  }

  for (element of document.getElementsByTagName("code")) {
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

      // replace <code> with <span> to code css
      const span = document.createElement("span");
      span.textContent = element.textContent;
      console.log("span", span);
      element.replaceWith(span);

      // render
      katex.render(span.textContent, span, {
        displayMode: false,
        throwOnError: false,
      });
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
