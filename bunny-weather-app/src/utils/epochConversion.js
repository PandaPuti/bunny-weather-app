export const convertEpoch = (timeStamp) => {
  const date = new Date(timeStamp * 1000);
  
  return date.toLocaleTimeString();
}