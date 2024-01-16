export const getParamsString = (params: {
  [key: string]: string | number | undefined;
}) => {
  let result = '?';

  for (const key in params) {
    result += params[key] ? `${key}=${params[key]}` : '';
  }

  return result;
};
