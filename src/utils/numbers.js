export const sumOfPrice = (arr) => {
  return arr.reduce((acc, cur) => {
    return typeof(acc) === 'number' ? acc + (cur.price * cur.count) : (acc.price * cur.count) + (cur.price * cur.count);
  }, 0);
}

export const sumOfCount = (arr) => {
  return arr.reduce((acc, cur) => {
    return typeof(acc) === 'number' ? acc + cur.count : acc.count + cur.count;
  }, 0);
}