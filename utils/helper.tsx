export function printDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function printPartialDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
