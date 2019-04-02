import '../img/icon-128.png';
import '../img/icon-34.png';

function checkForValidUrl(tabId, changeInfo, tab) {
  chrome.pageAction.hide(tabId);
  if (tab.url.indexOf('https://ezhuman.bizmeka.com/product/golvwkmng/officegolvwkqry') === 0) {
    chrome.pageAction.show(tabId);
  }
}
chrome.tabs.onUpdated.addListener(checkForValidUrl);

(function () {
  let workTimeData = {};
  // popup message
  chrome.extension.onConnect.addListener(port => {
    port.onMessage.addListener(msg => {
      if (msg.type === 'fetchWorkTime') {
        port.postMessage({
          type: msg.type,
          data: workTimeData,
        });
      }
    });
  });

// content message
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'updateWorkTime') {
      console.log('Received WorkTime', msg.data);
      workTimeData = msg.data;
    }
  });
})();


