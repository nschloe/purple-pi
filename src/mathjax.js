// This is enough in chrome:
// const fonts_url = "chrome-extension://" + chrome.runtime.id + "/fonts";
const fonts_url = chrome.runtime.getURL("fonts");
MathJax = {
  chtml: {
    fontURL: fonts_url,
  },
};
require("mathjax-full/components/src/tex-chtml/tex-chtml.js");

// (function () {
//   var script = document.createElement("script");
//   script.src = chrome.runtime.getURL("mathjax_config.js");
//   document.head.appendChild(script);
//
//   var script = document.createElement("script");
//   // script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
//   script.src = chrome.runtime.getURL("mathjax_native.js");
//   // script.async = true;
//   document.head.appendChild(script);
// })();
