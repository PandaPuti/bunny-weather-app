// src/utils/conversions.js
export const convertTemp = (celsius, unit = 'C') => {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
};