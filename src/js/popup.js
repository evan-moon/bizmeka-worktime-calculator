import "../css/popup.css";

const port = chrome.extension.connect({ name: 'background' });

port.postMessage({ type: 'fetchWorkTime' });

port.onMessage.addListener(msg => {
  if (msg.type === 'fetchWorkTime') {
    onFetchWorkTime(msg.data);
  }
});

function onFetchWorkTime (payload) {
  document.getElementById('workingDay').innerText = '이번 달 근무일: ' + payload.workingDay + '일';
  document.getElementById('haveWorkTime').innerText = '원래 근무해야 하는 시간: ' + payload.haveWorkTime + '시간';
  document.getElementById('realWorkHours').innerText = '실제 근무 시간: ' + payload.realWorkHours + '시간 ' + payload.realWorkMinute + '분';
  document.getElementById('overTime').innerText = '초과된 시간: ' + payload.overTime.hour + '시간 ' + payload.overTime.minute + '분';
}


