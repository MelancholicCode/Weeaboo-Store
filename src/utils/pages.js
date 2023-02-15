export const calcPages = (count, limit) => {
  return Math.ceil(count / limit);
}