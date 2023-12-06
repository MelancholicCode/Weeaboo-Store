import { api } from '../instance';

export const getCategories = async () => {
  const res = await api.get<Category[]>('category');
  return res.data;
};
