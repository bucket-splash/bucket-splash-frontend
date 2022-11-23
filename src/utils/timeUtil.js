export const timeUtil = (time) => {
  const month = time.split('T')[0].split('-')[1];
  const date = time.split('T')[0].split('-')[2];
  const hour = time.split('T')[1].split(':');

  let today = new Date();
  let todayMonth = today.getMonth() + 1;
  let todayDate = today.getDate();
  let curHour = today.getHours();
  let curMin = today.getMinutes();
  if (month == todayMonth && date == todayDate) {
    console.log(curHour);
    console.log(hour);
    if (curHour == hour[0]) {
      return +curMin - +hour[1] + '분 전';
    }
    return +curHour - +hour[0] + '시간 전';
  }
  return `${month}월 ${date}일`;
};
