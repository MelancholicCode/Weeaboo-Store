import Cookies from 'js-cookie';
import {
  IAuthResponse,
  ITokens,
  TokensEnum,
} from '@/store/user/user.interface';

export const getAccessToken = () =>
  Cookies.get(TokensEnum.ACCESS_TOKEN) || null;

export const getUserFromStorage = () =>
  JSON.parse(localStorage.getItem('user') || '{}');

export const saveTokensInStorage = (data: ITokens) => {
  Cookies.set(TokensEnum.ACCESS_TOKEN, data.accessToken);
  Cookies.set(TokensEnum.REFRESH_TOKEN, data.refreshToken);
};

export const removeFromStorage = () => {
  Cookies.remove(TokensEnum.ACCESS_TOKEN);
  Cookies.remove(TokensEnum.REFRESH_TOKEN);
  localStorage.removeItem('user');
};

export const saveInStorage = (data: IAuthResponse) => {
  saveTokensInStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
