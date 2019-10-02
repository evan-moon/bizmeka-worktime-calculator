import { WORK_TYPE } from '../constants';
const WORK_TIME_FOR_DAY = 8 * 60; // minutes

function convertToHourMinute (minutes = 0) {
  return {
    h: Math.floor(Math.abs(minutes) / 60),
    m: Math.floor(Math.abs(minutes) % 60),
  };
}

/**
 * @function calcWorkTime
 * @desc 모든 시간 계산은 분단위로 이루어진다.
 */
export function calcWorkTime (workdays) {
  let myTotalWorkMinutes = 0; // minutes
  const counter = {
    work: 0,
    halfHoliday: 0,
    fullHoliday: 0,
  };

  workdays.forEach(day => {
    if (day.type === WORK_TYPE.WORK) {
      counter.work += 1;
      if (!day.workTime) {
        if (day.earlyleaveTime) {
          const earlyleave_hours = Math.floor(day.earlyleaveTime.split(':')[0]);
          const earlyleave_minutes = Math.floor(day.earlyleaveTime.split(':')[1]);
          const earlyleaveMinutes = (earlyleave_minutes + (earlyleave_hours * 60));

          const endAt_hours = Math.floor(day.endAt.split(':')[0]);
          const endAt_minutes = Math.floor(day.endAt.split(':')[1]);
          const endAtMinutes = (endAt_minutes + (endAt_hours * 60));

          const startAt_hours = Math.floor(day.startAt.split(':')[0]);
          const startAt_minutes = Math.floor(day.startAt.split(':')[1]);
          const startAtMinutes = (startAt_minutes + (startAt_hours * 60));

          if (earlyleaveMinutes > endAtMinutes) {
            myTotalWorkMinutes += (earlyleaveMinutes - startAtMinutes);
          } else {
            myTotalWorkMinutes += (endAtMinutes - startAtMinutes);
          }
        }
      } else {
        const hours = Math.floor(day.workTime.split(':')[0]);
        const minutes = Math.floor(day.workTime.split(':')[1]);
        myTotalWorkMinutes += (minutes + (hours * 60));
      }
    }
    else if (day.type === WORK_TYPE.BIZ_TRIP) {
      // 출장은 8시간 근무한 것으로 친다.
      counter.work += 1;
      day.workTime = '08:00';
      myTotalWorkMinutes += WORK_TIME_FOR_DAY;
    }
    else if (day.type === WORK_TYPE.HOLIDAY) {
      if (day.holidayType === '전일') {
        counter.fullHoliday += 1;
      }
      else {
        counter.work += 0.5;
        counter.halfHoliday += 1;
        myTotalWorkMinutes += (WORK_TIME_FOR_DAY / 2);
      }
    }
  });

  const haveWorkMinutes = WORK_TIME_FOR_DAY * counter.work;
  const overtimeMinutes = myTotalWorkMinutes - haveWorkMinutes;

  const convertedHaveWorkTime = convertToHourMinute(haveWorkMinutes);
  const convertedMyWorkTime = convertToHourMinute(myTotalWorkMinutes);
  const convertedOvertime = convertToHourMinute(overtimeMinutes);

  return {
    isOver: overtimeMinutes >= 0,
    workingDay: counter.work,
    halfHolidayCount: counter.halfHoliday,
    fullHolidayCount: counter.fullHoliday,
    haveWorkTime: convertedHaveWorkTime.h,
    myWorkHours: convertedMyWorkTime.h,
    myWorkMinutes: convertedMyWorkTime.m,
    overTimeHours: convertedOvertime.h,
    overTimeMinutes: convertedOvertime.m,
  };
}
