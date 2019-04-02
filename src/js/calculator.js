import $ from 'jquery';

console.log('Calculator Loaded');

let loadCount = 0;
const loadInterval = 100;
const fetchInterval = 1000;
const interval = setInterval(function () {
  if (typeof window.spro === 'object' && window.spro !== null) {
    mainInterval();
    clearInterval(interval);
  }
  else if (loadCount > 100) {
    clearInterval(interval);
  }
  else {
    loadCount++;
  }
}, loadInterval);

function mainInterval () {
  setInterval(function () {
    main();
  }, fetchInterval);
}

function main () {
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

      myWorkHours = Math.floor(Number(myWorkHours + (myWorkMinutes / 60)));
      myWorkMinutes = Math.floor(Number(myWorkMinutes % 60));
      const haveWorkTime = workingDay * originWorkTime;
      const overTimeHours = myWorkHours - haveWorkTime;
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
          overTimeMinutes: myWorkMinutes,
        },
      });
    });
}
