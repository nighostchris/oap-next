export const timestampConverter = (d: Date, withTime: boolean) => {
  const monthMapping = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let result = `${d.getDate()} ${monthMapping[d.getMonth()]}, ${d.getFullYear()}`;
  if (withTime) {
    result = result.concat(` ${d.getHours() + 8}:${d.getMinutes()}:${d.getSeconds()}`);
  }

  return result;
};

export const reverseTimestampConverter = (d: Date) => {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d.getHours() - 8}:${d.getMinutes()}:${d.getSeconds()}.000000`;
};

export const differentialTimestampConverter = (d: Date) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = new Date().getTime() - d.getTime() - msPerHour * 8;
    
    if (elapsed < msPerMinute) {
      return Math.round(elapsed/1000) + ' seconds ago';   
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    } else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + ' hours ago';   
    } else if (elapsed < msPerMonth) {
      return 'Around ' + Math.round(elapsed/msPerDay) + ' days ago';   
    } else if (elapsed < msPerYear) {
      return 'Around ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    } else {
      return 'Around ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
};
