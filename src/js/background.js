chrome.runtime.onInstalled.addListener(function () {
  console.log(1);
  console.log(chrome.declarativeContent);
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'https://ezhuman.bizmeka.com/product' }
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ])
  });
});
