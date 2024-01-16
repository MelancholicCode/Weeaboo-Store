const slugify = (str: string, sep: string = '-'): string =>
  str
    .trim()
    .toLowerCase()
    .replace(/ /g, sep)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
export default slugify;
