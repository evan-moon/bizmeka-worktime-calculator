function injectScript(file, node) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}
injectScript(chrome.extension.getURL('/injectScript.bundle.js'), 'body');

window.onmessage = payload => {
  if (payload.data && payload.data.type === 'updateWorkTime') {
    chrome.runtime.sendMessage('', payload.data);
  }
};
