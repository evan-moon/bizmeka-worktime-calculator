import "../css/popup.css";
import $ from 'jquery';
import { $timeViewer, $noData, DOM, setOverTimeDOMClass, setTooMuchOverWork } from './lib/DOM';
import { TOO_MUCH_OVER_WORK_TIME } from './constants';

const port = chrome.extension.connect({ name: 'background' });
port.onMessage.addListener(msg => {
  if (msg.type === 'fetchWorkTime') {
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

  if (!payload.workingDay) {
    $timeViewer.hide();
    $noData.show();
  }
  else {
    $timeViewer.show();
    $noData.hide();
  }
  setOverTimeDOMClass(payload.isOver);
  DOM(payload);

  setTooMuchOverWork(payload.overTimeHours >= TOO_MUCH_OVER_WORK_TIME);
}

function init () {
  fetchWorkTime();
  $('#refresh-button').click(() => {
    fetchWorkTime();
  });
}
init();
