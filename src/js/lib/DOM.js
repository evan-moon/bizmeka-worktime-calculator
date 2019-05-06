import $ from 'jquery';

const $doms = {
  date: $(document).find('*[data-name="date"]'),
  workingDay: $(document).find('*[data-name="workingDay"]'),
  haveWorkTime: $(document).find('*[data-name="haveWorkTime"]'),
  myWorkHours: $(document).find('*[data-name="myWorkHours"]'),
  myWorkMinutes: $(document).find('*[data-name="myWorkMinutes"]'),
  overTimeHours: $(document).find('*[data-name="overTimeHours"]'),
  overTimeMinutes: $(document).find('*[data-name="overTimeMinutes"]'),
  halfHolidayCount: $(document).find('*[data-name="halfHolidayCount"]'),
};

export const $timeViewer = $('#time-viewer');
export const $noData = $('#no-data');

export function setOverTimeDOMClass (isOver = false) {
  const $overTimeDOM = $('#overTime');
  if (isOver) {
    $overTimeDOM.addClass('over');
    $overTimeDOM.find('label').text('초과된 시간');
  }
  else {
    $overTimeDOM.removeClass('over');
    $overTimeDOM.find('label').text('모자란 시간');
  }
}

export function DOM (payload) {
  const keys = Object.keys(payload);
  keys.forEach(key => {
    const $dom = $doms[key];
    const value = payload[key];
    if (!$dom) {
      return;
    }
    if (value) {
      $dom.text(value);
    }
    else {
      $dom.text('0');
    }
  });
}
