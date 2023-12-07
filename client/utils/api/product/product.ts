import { api } from '../instance';

export const getProducts = async (params?: string) => {
  const products = await api.get<Product[]>(`/product${params || ''}`);
  return products.data;
};
