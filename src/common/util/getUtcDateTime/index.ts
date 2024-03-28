export const getUtcDateTime = (date?: Date) => {
  const _date = date ?? new Date();

  return Date.UTC(
    _date.getFullYear(),
    _date.getMonth(),
    _date.getDate(),
    _date.getHours(),
    _date.getMinutes(),
    _date.getSeconds(),
    _date.getMilliseconds(),
  );
};
