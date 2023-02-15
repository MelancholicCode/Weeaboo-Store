import { $authHost } from "./index";

export const createFavorite = async (productId) => {
  const {data} = await $authHost.post(`api/favorite`, {productId});
  return data;
}

export const getFavorites = async () => {
  const {data} = await $authHost.get('api/favorite');
  return data;
}

export const removeFavorite = async (productId) => {
  const {data} = await $authHost.delete(`api/favorite/${productId}`);
  return data;
}