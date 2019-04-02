import "../css/popup.css";
import $ from 'jquery';

const port = chrome.extension.connect({ name: 'background' });

port.postMessage({ type: 'fetchWorkTime' });

port.onMessage.addListener(msg => {
  if (msg.type === 'fetchWorkTime') {
    onFetchWorkTime(msg.data);
  }
});

const $doms = {
  workingDay: $(document).find('*[data-name="workingDay"]'),
  haveWorkTime: $(document).find('*[data-name="haveWorkTime"]'),
  myWorkHours: $(document).find('*[data-name="myWorkHours"]'),
  myWorkMinutes: $(document).find('*[data-name="myWorkMinutes"]'),
  overTimeHours: $(document).find('*[data-name="overTimeHours"]'),
  overTimeMinutes: $(document).find('*[data-name="overTimeMinutes"]'),
};

function onFetchWorkTime (payload) {
  const $overTimeDOM = $('#overTime');
  if (payload.overTimeHours > 0 || payload.overTimeMinutes > 0) {
    $overTimeDOM.addClass('over');
  }
  else {
    $overTimeDOM.removeClass('over');
  }
  bindTimeToDOM(payload);
}

function bindTimeToDOM (payload) {
  const keys = Object.keys(payload);
  keys.forEach(key => {
    const $dom = $doms[key];
    const value = payload[key];
    if (value) {
      $dom.text(value);
    }
    else {
      $dom.text('error');
    }
  });
}


