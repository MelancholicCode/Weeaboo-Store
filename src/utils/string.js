export const stringTrim = (str, maxLength) => {
  if (str.length > maxLength) {
    return `${str.slice(0, maxLength)}...`
  }
  return str
}

// Склонение числительных - массив строк ['товар', 'товара', 'товаров']
export const declOfNum = (num, titles) => {  
  const cases = [2, 0, 1, 1, 1, 2];  
  return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];  
}