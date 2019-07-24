export const replaceZero = num => {
  // 현재 날짜 / 시각 받아오기
  return num < 10 ? `0${num}` : num;
};
