export const calcPages = (res, limit) => {
  return Math.ceil(res.headers['x-total-count'] / limit);
}