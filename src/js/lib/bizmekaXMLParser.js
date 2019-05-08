import { BIZ_WORK_TYPES, WORK_TYPE } from '../constants';

/**
 * @function bizmekaXMLParser
 * @desc 비즈메카 XML API 응답을 파싱
 */
export function bizmekaXMLParser (xml) {
  if (typeof xml !== 'string') {
    throw new TypeError('Unexpected type of xml', 'bizmekaXMLParser');
  }
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');
  const workdays = [];

  for (let i = 0; i < xmlDoc.getElementsByTagName('userdata').length; i++) {
    const string = xmlDoc.getElementsByTagName('userdata')[i].innerHTML;
    if (!string || string.includes('CDATA')) {
      continue;
    }

    /**
     * @desc 문자열 안에 "전일/반일" 글자가 들어가있으면 휴가임
     */
    let workType = WORK_TYPE.WORK;
    if (string.includes(BIZ_WORK_TYPES.HOLIDAY_TYPE.bizmeka)) {
      workType = WORK_TYPE.HOLIDAY;
    }
    else if (string.includes(BIZ_WORK_TYPES.BIZ_TRIP.bizmeka)) {
      workType = WORK_TYPE.BIZ_TRIP;
    }

    const result = { type: workType };
    const parsed = string.trim().split(/\n/);
    parsed.forEach(el => {
      const data = el.replace(/○/gi, '').split(' : ');
      const key = data[0].trim();
      const value = data[1].trim();

      switch (key) {
        case BIZ_WORK_TYPES.HOLIDAY_TYPE.bizmeka:
          result[BIZ_WORK_TYPES.HOLIDAY_TYPE.eng] = value;
          break;
        case BIZ_WORK_TYPES.START_DATE.bizmeka:
          result[BIZ_WORK_TYPES.START_DATE.eng] = value;
          break;
        case BIZ_WORK_TYPES.END_DATE.bizmeka:
          result[BIZ_WORK_TYPES.END_DATE.eng] = value;
          break;
        case BIZ_WORK_TYPES.START_WORK_TIME.bizmeka:
          result[BIZ_WORK_TYPES.START_WORK_TIME.eng] = value;
          break;
        case BIZ_WORK_TYPES.END_WORK_TIME.bizmeka:
          result[BIZ_WORK_TYPES.END_WORK_TIME.eng] = value;
          break;
        case BIZ_WORK_TYPES.WORK_TIME.bizmeka:
          result[BIZ_WORK_TYPES.WORK_TIME.eng] = value;
          break;
      }
    });

    workdays.push(result);
  }

  return workdays;
}
