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

// input options
const booleanOptionsTex = [
  "processEscapes",
  "processEnvironments",
  "processRefs",
  "useLabelIds",
];
const stringOptionsTex = [
  "inlineMath",
  "tags",
  "tagSide",
  "tagIndent",
  "multlineWidth",
];
const numberOptionsTex = ["maxMacros", "maxBuffer"];
// output options
const booleanOptionsChtml = [
  "matchFontHeight",
  "mtextInheritFont",
  "merrorInheritFont",
  "mathmlSpacing",
  "adaptiveCSS",
];
const stringOptionsChtml = ["displayAlign", "displayIndent"];
const numberOptionsChtml = ["scale", "minScale", "exFactor"];

const getInject = () => {
  var activate = false;
  var params = {};
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
      // https://docs.mathjax.org/en/latest/options/input/tex.html
      // collect Boolean options
      booleanOptionsTex.concat(booleanOptionsChtml).forEach((item) => {
        if (url.searchParams.has(item)) {
          params[item] = stringToBoolean(url.searchParams.get(item));
        }
      });
      // collect string options
      stringOptionsTex.concat(stringOptionsChtml).forEach((item) => {
        if (url.searchParams.has(item)) {
          const value = url.searchParams.get(item);
          if (item === "inlineMath") {
            params[item] = [[value, value]];
          } else {
            params[item] = value;
          }
        }
      });
      numberOptionsTex.concat(numberOptionsChtml).forEach((item) => {
        if (url.searchParams.has(item)) {
          params[item] = Number(url.searchParams.get(item));
        }
      });
      // collect activation
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
    // • rendering keys, e.g.:
    throwOnError: false,
  });
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "get-inject") {
    sendResponse({ inject: getInject() });
  } else if (message === "render-math") {
    renderMath();
  }

  // // mathjax config
  // window.MathJax = {
  //   tex: {},
  //   chtml: {
  //     fontURL: chrome.runtime.getURL("fonts"),
  //   },
  // };
  // // set options
  // booleanOptionsTex
  //   .concat(stringOptionsTex)
  //   .concat(numberOptionsTex)
  //   .forEach((item) => {
  //     if (params.hasOwnProperty(item)) {
  //       window.MathJax.tex[item] = params[item];
  //     }
  //   });
  // booleanOptionsChtml
  //   .concat(stringOptionsChtml)
  //   .concat(numberOptionsChtml)
  //   .forEach((item) => {
  //     if (params.hasOwnProperty(item)) {
  //       window.MathJax.chtml[item] = params[item];
  //     }
  //   });
  // chrome.runtime.sendMessage({ params: params }, (response) => {});
  // sendResponse({ inject: true });
});
