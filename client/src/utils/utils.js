import moment from 'moment';

export const getDateNow = () => {
  // 현재 날짜 / 시각 받아오기
  return moment().format('YYYY-MM-DD [/] H:mm:ss');
};
