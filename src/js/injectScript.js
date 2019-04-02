import { calculator } from './lib/calculator';

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
  calculator();
}

