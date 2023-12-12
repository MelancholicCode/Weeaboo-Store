import { AxiosError } from 'axios';

export const getContentType = () => ({ 'Content-Type': 'application/json' });

export const errorCatch = (
  error: AxiosError<{ message: string | string[] }>
): string => {
  const message = error.response?.data.message;

  return message
    ? typeof message === 'object'
      ? message[0]
      : message
    : error.message;
};
