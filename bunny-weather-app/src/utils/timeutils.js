// Add this to your src/utils/weatherMapping.js or a new timeUtils.js
export const isDaytime = (dt, sunrise, sunset) => {
  return dt > sunrise && dt < sunset;
};