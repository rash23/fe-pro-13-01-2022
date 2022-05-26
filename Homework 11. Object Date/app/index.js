const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
const MS_IN_A_HOUR = 1000 * 60 * 60;
const MS_IN_A_MINUTE = 1000 * 60;
const MS_IN_A_SECOND = 1000;

const difference = (from, to) => {
  from = new Date(from);
  to = new Date(to);

  const diffInTime = from.getTime() - to.getTime();
  const diffInYears = from.getFullYear() - to.getFullYear();

  const months = from.getMonth() - to.getMonth() + 12 * diffInYears;

  const Difference = {};

  Difference.ms = diffInTime;
  Difference.s = Math.ceil(diffInTime / MS_IN_A_SECOND);
  Difference.m = Math.ceil(diffInTime / MS_IN_A_MINUTE);
  Difference.h = Math.ceil(diffInTime / MS_IN_A_HOUR);
  Difference.d = Math.ceil(diffInTime / MS_IN_A_DAY);
  Difference.M = months;
  Difference.y = diffInYears;

  return Difference;
};

console.log(difference("2022-02-19T19:14:00", "2021-01-19T19:14:00"));
console.log(difference("2022-12-19T19:14:00", "2021-02-19T19:14:00"));
