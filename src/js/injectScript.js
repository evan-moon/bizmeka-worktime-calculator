import $ from 'jquery';
import { bizmekaXMLParser } from './lib/bizmekaXMLParser';
import { calcWorkTime } from './lib/calculator';

console.log('Calculator Loaded');

let loadCount = 0;
const maxLoadCount = 150;
const loadInterval = 100;
const fetchInterval = 1000;
const interval = setInterval(function () {
  if (typeof window.spro === 'object' && window.spro !== null) {
    mainInterval();
    clearInterval(interval);
  }
  else if (loadCount > maxLoadCount) {
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
  const officeGolvwkQryInstance = spro.officeGolvwkQryInstance;
  const api = officeGolvwkQryInstance.prefixUrl+'officeGolvwkQryList.do'+officeGolvwkQryInstance.getQueryParam();

  fetch(api)
    .then(res => res.text())
    .then(xml => {
      const workdays = bizmekaXMLParser(xml);
      const data = calcWorkTime(workdays);
      data.date = date;

      window.postMessage({
        type: 'updateWorkTime',
        data,
      });
    });
}

