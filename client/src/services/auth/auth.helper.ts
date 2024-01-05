import { IUser } from '@/shared/types/user.interface';

export const getUserFromStorage = (): IUser | null =>
  JSON.parse(localStorage.getItem('user') || 'null');

export const removeUserFromStorage = () => {
  localStorage.removeItem('user');
};
