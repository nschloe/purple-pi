var params = {};
for (link of document.getElementsByTagName("a")) {
  const url = new URL(link.href);
  if (url.hostname == "github.com" && url.pathname == "/nschloe/green-pi") {
    if (url.searchParams.has("activate")) {
        params["activate"] = true;
    }
    if (url.searchParams.has("inlineMath")) {
        params["inlineMath"] = url.searchParams.get("inlineMath");;
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
    inlineMath: [["$", "$"]],
  };
}

chrome.runtime.sendMessage({ params: params }, (response) => {});
