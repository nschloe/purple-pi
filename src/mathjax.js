window.MathJax = {
  chtml: {
    fontURL: chrome.runtime.getURL("fonts"),
  },
};
// Note that, for Firefox, in the file https://github.com/mathjax/MathJax/issues/2399
// the line `import '../ui/menu/menu.js';` must be commented out,
// cf. <https://github.com/mathjax/MathJax/issues/2399>.
require("mathjax-full/components/src/tex-chtml/tex-chtml.js");
