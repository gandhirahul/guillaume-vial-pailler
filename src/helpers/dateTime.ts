export const formatTimestamp = (timestamp: number): string => {
  const timestampDate = new Date(timestamp);
  const currentDate = new Date(Date.now());

  const dateDiffInMilliSeconds =
    currentDate.getTime() - timestampDate.getTime();
  const dateDiffInSecond = dateDiffInMilliSeconds / 1000;

  if (dateDiffInSecond < 60) {
    return `${Math.trunc(dateDiffInSecond)}s`;
  }

  const dateDiffInMinutes = dateDiffInSecond / 60;
  if (dateDiffInMinutes < 60) {
    return `${Math.trunc(dateDiffInMinutes)}m`;
  }

  const dateDiffInHours = dateDiffInMinutes / 60;

  if (dateDiffInHours < 24) {
    return `${Math.trunc(dateDiffInHours)}h`;
  }
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formattedMonth = months[timestampDate.getMonth()];
  const date = timestampDate.getDate();
  const year = timestampDate.getFullYear();

  return `${formattedMonth} ${date}, ${year}`;
};
