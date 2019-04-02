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

export function setOverTimeDOMClass (overTimeHours = 0, overTimeMinutes = 0) {
  const $overTimeDOM = $('#overTime');
  const overTimeHourToMinutes = overTimeHours * 60;
  if (overTimeHourToMinutes + overTimeMinutes > 0) {
    $overTimeDOM.addClass('over');
  }
  else {
    $overTimeDOM.removeClass('over');
  }
}

export function DOM (payload) {
  const keys = Object.keys(payload);
  keys.forEach(key => {
    const $dom = $doms[key];
    const value = payload[key];
    if (value) {
      $dom.text(value);
    }
    else {
      $dom.text('0');
    }
  });
}
