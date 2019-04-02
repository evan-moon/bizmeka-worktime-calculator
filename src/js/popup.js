import "../css/popup.css";
import $ from 'jquery';
import { $timeViewer, $noData, DOM, setOverTimeDOMClass } from './lib/DOM';

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
  if (payload.date) {
    payload.date = payload.date.replace('.', '년 ');
    payload.date += '월';
  }
  $timeViewer.show();
  $noData.hide();
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
