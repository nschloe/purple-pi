chrome.runtime.sendMessage({ type: "inject", url: location.href }, () => {});

// Adding this here in the content script works on Chrome but, again, not on Firefox
// Bug report: <https://github.com/mathjax/MathJax/issues/2399>
// MathJax = {
//   chtml: {
//     fontURL: chrome.runtime.getURL("fonts"),
//   },
// };
// require("mathjax-full/components/src/tex-chtml/tex-chtml.js");
