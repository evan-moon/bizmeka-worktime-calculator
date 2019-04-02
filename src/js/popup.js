import "../css/popup.css";
import $ from 'jquery';
import { DOM, setOverTimeDOMClass } from './lib/DOM';

const port = chrome.extension.connect({ name: 'background' });
port.onMessage.addListener(msg => {
  if (msg.type === 'fetchWorkTime') {
    console.log('fetched WorkTime');
    onFetchWorkTime(msg.data);
  }
});

function fetchWorkTime () {
  port.postMessage({ type: 'fetchWorkTime' });
}
function onFetchWorkTime (payload) {
  setOverTimeDOMClass(payload.overTimeHours, payload.overTimeMinutes);
  DOM(payload);
}

function init () {
  fetchWorkTime();
  $('#refresh-button').click(() => {
    fetchWorkTime();
  });
}
init();
