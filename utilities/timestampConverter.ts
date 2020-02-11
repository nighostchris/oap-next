export const timestampConverter = (d: Date, withTime: boolean) => {
  const monthMapping = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const result = `${d.getDate()} ${monthMapping[d.getMonth()]}, ${d.getFullYear()}`;
  if (withTime) {
    result.concat(`${d.getHours() + 8}:${d.getMinutes()}:${d.getSeconds()}`);
  }

  return result;
};

export const reverseTimestampConverter = (d: Date) => {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d.getHours() - 8}:${d.getMinutes()}:${d.getSeconds()}.000000`;
}
