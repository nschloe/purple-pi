// // https://stackoverflow.com/a/8498668/353337
// function url_domain(data) {
//   var a = document.createElement("a");
//   a.href = data;
//   return a.hostname;
// }
//
// // initialize default whitelist (if it doesn't have a value yet)
// chrome.runtime.onInstalled.addListener(() => {
//   const defaultWhitelist = ["github.com", "gitlab.com"];
//   chrome.storage.sync.get({ domainWhitelist: undefined }, (result) => {
//     // in chrome it's `undefined`, in firefox `null`
//     if (
//       result.domainWhitelist === undefined ||
//       result.domainWhitelist === null
//     ) {
//       chrome.storage.sync.set({ ["domainWhitelist"]: defaultWhitelist });
//     }
//   });
// });
//
// function isWhitelisted(url, callback) {
//   chrome.storage.sync.get("domainWhitelist", (result) => {
//     callback(result.domainWhitelist.includes(url_domain(url)));
//   });
// }

// function handleCheck(request, sender, sendResponse) {
//   chrome.tabs.query(
//     {
//       active: true,
//       currentWindow: true,
//     },
//     (tabs) => {
//       isWhitelisted(tabs[0].url, (response) => {
//         sendResponse({ isWhitelisted: response });
//       });
//     }
//   );
// }

// function handleInject(request, sender, sendResponse) {
//   isWhitelisted(request.url, (response) => {
//     // Send an empty response to avoid warning
//     if (response) {
//       chrome.tabs.executeScript(
//         {
//           file: "mathjax.js",
//         },
//         () => {
//           sendResponse({});
//         }
//       );
//     } else {
//       sendResponse({});
//     }
//   });
// }

// function handleToggle(request, sender, sendResponse) {
//   chrome.tabs.query(
//     {
//       active: true,
//       currentWindow: true,
//     },
//     (tabs) => {
//       // extract domain
//       const domain = url_domain(tabs[0].url);
//       // toggle domain from whitelist
//       chrome.storage.sync.get("domainWhitelist", (result) => {
//         if (result.domainWhitelist.includes(domain)) {
//           const index = result.domainWhitelist.indexOf(domain);
//           if (index > -1) {
//             result.domainWhitelist.splice(index, 1);
//           }
//           chrome.storage.sync.set(
//             { domainWhitelist: result.domainWhitelist },
//             () => {
//               sendResponse({ isWhitelisted: false });
//             }
//           );
//         } else {
//           result.domainWhitelist.push(domain);
//           chrome.storage.sync.set(
//             { domainWhitelist: result.domainWhitelist },
//             () => {
//               sendResponse({ isWhitelisted: true });
//             }
//           );
//         }
//       });
//     }
//   );
// }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // if (request.type === "checkIfWhitelisted") {
  //   handleCheck(request, sender, sendResponse);
  // } else if (request.type === "inject") {
  //   handleInject(request, sender, sendResponse);
  // } else if (request.type === "toggleWhitelist") {
  //   handleToggle(request, sender, sendResponse);
  // }
  chrome.tabs.executeScript(
    {
      // Doesn't work in Firefox, works in Chrome:
      file: "mathjax.js",
      // works:
      // code: 'document.body.style.backgroundColor="green"'
    },
    () => {
      sendResponse({});
    }
  );
  // async sendResponse
  return true;
});
