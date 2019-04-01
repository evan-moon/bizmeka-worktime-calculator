console.log('Calculator Loaded!', window);
var loadCount = 0;
var interval = setInterval(function () {
  if (typeof window.spro === 'object' && window.spro !== null) {
    main();
    clearInterval(interval);
  }
  else if (loadCount > 100) {
    console.log('exit');
    clearInterval(interval);
  }
  else {
    loadCount++;
  }
}, 100);

function main () {
  console.log('excute main');
  var spro = window.spro;
  var sumH = 0;
  var sumM = 0;
  var workingDay = 0;
  var originWorkTime = 8;
  var officeGolvwkQryInstance = spro.officeGolvwkQryInstance;
  var api = officeGolvwkQryInstance.prefixUrl+"officeGolvwkQryList.do"+officeGolvwkQryInstance.getQueryParam();
  fetch(api).then(res => res.text())
    .then(xml => {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xml, "text/xml");
      for (var i = 0; i < xmlDoc.getElementsByTagName('userdata').length; i++) {
        var string = xmlDoc.getElementsByTagName('userdata')[i].innerHTML;
        var workRegex = /근무시간\s:\s.+/;
        var halfHolidayRegex = /전일\/반일\s:\s반일/
        var workday = workRegex.exec(string);
        var halfHoliday = halfHolidayRegex.exec(string);

        if (workday) {
          var time = workday[0].split(/\s:\s/)[1].trim();
          var hour = parseInt(time.split(':')[0]);
          var min = parseInt(time.split(':')[1]);
          sumH += hour;
          sumM += min;
          workingDay++;
        }
        else if (halfHoliday) {
          sumH += (originWorkTime / 2);
          workingDay += 0.5;
        }
      }

      sumH = Math.floor(Number(sumH + (sumM / 60)));
      sumM = Math.floor(Number(sumM % 60));
      var haveWorkTime = workingDay * originWorkTime;
      var overHour = sumH - origin;
      window.postMessage({
        type: 'onLoadWorkTimes',
        data: {
          workingDay: workingDay,
          haveWorkTime: haveWorkTime,
          realWorkHours: sumH,
          realWorkMinute: sumM,
          overTime: { hour: overHour, minute: sumM }
        }
      });
    });
}
(function () {


})();
