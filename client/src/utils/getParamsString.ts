export const getParamsString = (params: {
  [key: string]: string | number | undefined;
}) => {
  const paramsArr: string[] = [];

  for (const key in params) {
    if (!params[key]) {
      continue;
    }

    paramsArr.push(`${key}=${params[key]}`);
  }

  const result = `?${paramsArr.join('&')}`;

  return result;
};
