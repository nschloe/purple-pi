window.MathJax = {
  chtml: {
    fontURL: chrome.runtime.getURL("fonts"),
  },
  tex: {
    inlineMath: [
      ["$", "$"]
    ]
  }
};
require("mathjax-full/components/src/tex-chtml/tex-chtml.js");
