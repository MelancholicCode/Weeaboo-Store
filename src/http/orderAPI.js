import { $authHost } from "./index";

export const createOrder = async (address) => {
  const {data} = await $authHost.post('api/order', {address});
  return data;
}

export const getOrders = async () => {
  const {data} = await $authHost.get('api/order');
  return data;
}