import { $authHost } from "./index";

export const createGood = async (productId) => {
  const {data} = await $authHost.post(`api/cart`, {productId});
  return data;
}

export const getGoods = async () => {
  const {data} = await $authHost.get('api/cart');
  return data;
}

export const changeGoodCount = async (id, count) => {
  const {data} = await $authHost.patch(`api/cart/${id}`, {count});
  return data;
}

export const removeGood = async (id) => {
  const {data} = await $authHost.delete(`api/cart/${id}`);
  return data;
}