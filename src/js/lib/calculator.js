import $ from 'jquery';

export function calculator () {
  const date = $('input[name="workYymm"]').val();
  const spro = window.spro;
  let myWorkHours = 0;
  let myWorkMinutes = 0;
  let workingDay = 0;
  let originWorkTime = 8;
  let halfHolidayCount = 0;
  const officeGolvwkQryInstance = spro.officeGolvwkQryInstance;
  const api = officeGolvwkQryInstance.prefixUrl+'officeGolvwkQryList.do'+officeGolvwkQryInstance.getQueryParam();
  fetch(api).then(res => res.text())
  .then(xml => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    for (let i = 0; i < xmlDoc.getElementsByTagName('userdata').length; i++) {
      const string = xmlDoc.getElementsByTagName('userdata')[i].innerHTML;
      const workRegex = /근무시간\s:\s.+/;
      const halfHolidayRegex = /전일\/반일\s:\s반일/
      const workday = workRegex.exec(string);
      const halfHoliday = halfHolidayRegex.exec(string);

      if (workday) {
        const time = workday[0].split(/\s:\s/)[1].trim();
        const hour = parseInt(time.split(':')[0]);
        const min = parseInt(time.split(':')[1]);
        myWorkHours += hour;
        myWorkMinutes += min;
        workingDay++;
      }
      else if (halfHoliday) {
        myWorkHours += (originWorkTime / 2);
        workingDay += 0.5;
        halfHolidayCount++;
      }
    }

    // worktime calculating
    myWorkHours = Math.floor(Number(myWorkHours + (myWorkMinutes / 60)));
    myWorkMinutes = Math.floor(Number(myWorkMinutes % 60));

    const totalMyWorkMinutes = (myWorkHours * 60) + myWorkMinutes;
    const haveWorkMinutes = workingDay * originWorkTime * 60;
    const overTime = totalMyWorkMinutes - haveWorkMinutes;

    const haveWorkTime = Math.floor(haveWorkMinutes / 60);
    const overTimeHours = Math.floor(overTime / 60);
    const overTimeMinutes = Math.floor(overTime % 60);

    window.postMessage({
      type: 'updateWorkTime',
      data: {
        date,
        workingDay,
        halfHolidayCount,
        haveWorkTime,
        myWorkHours,
        myWorkMinutes,
        overTimeHours,
        overTimeMinutes,
      },
    });
  });
}

function convertToMinutes (hour = 0) {
  hour = Number(hour);
  return hour * 60;
}
