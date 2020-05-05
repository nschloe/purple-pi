var params = {};
for (link of document.getElementsByTagName("a")) {
  const url = new URL(link.href);
  if (url.hostname == "github.com" && url.pathname == "/nschloe/green-pi") {
    for(pair of url.searchParams.entries()) {
      if (pair[0] === "activate") {
        params[pair[0]] = true;
      } else {
        params[pair[0]] = pair[1];
      }
    }
  }
}

// mathjax config
window.MathJax = {
  chtml: {
    fontURL: chrome.runtime.getURL("fonts"),
  },
};
if (params["inlineMath"] === "$") {
  window.MathJax.tex = {
    inlineMath: [
      ["$", "$"]
    ]
  };
}

chrome.runtime.sendMessage({ params: params }, (response) => {});
