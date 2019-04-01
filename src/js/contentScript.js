function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}
injectScript( chrome.extension.getURL('/calculator.bundle.js'), 'body');

window.onmessage = function (payload) {
  console.log('message -> ', payload);
  if (payload.data && payload.data.type === 'onLoadWorkTimes') {
    console.log('post message to extension', payload.data);
    chrome.runtime.sendMessage('', payload.data);
  }
};
