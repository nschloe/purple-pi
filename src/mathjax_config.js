const myid = chrome.runtime.id;
MathJax = {
  chtml: {
    fontURL: 'chrome-extension://' + myid + '/fonts'
  }
};
