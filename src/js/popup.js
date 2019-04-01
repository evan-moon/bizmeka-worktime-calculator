import "../css/popup.css";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'onLoadWorkTimes') {
    onLoadWorkTimes(message, sender);
  }
});

function onLoadWorkTimes(message, sender) {
  console.log('message in popup -> ', message);
  document.getElementById('workingDay').innerText = '이번 달 근무일: ' + message.data.workingDay + '일';
  document.getElementById('haveWorkTime').innerText = '원래 근무해야 하는 시간: ' + message.data.haveWorkTime + '시간';
  document.getElementById('realWorkHours').innerText = '실제 근무 시간: ' + message.data.realWorkHours + '시간 ' + message.data.realWorkMinute + '분';
  document.getElementById('overTime').innerText = '초과된 시간: ' + message.data.overTime.hour + '시간 ' + message.data.overTime.minute + '분';
  // console.log('==============================================');
  // console.log(`이번 달 근무일: ${workingDay}일`);
  // console.log(`원래 근무해야 하는 시간: ${origin}시간`);
  // console.log(`실제 근무시간: ${sumH}시간 ${sumM}분`);
  // console.log(`초과된 시간: ${exceedHour}시간 ${sumM}분`);
  // console.log('==============================================');
}
