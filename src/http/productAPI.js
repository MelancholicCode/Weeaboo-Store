import { $host } from "./index";

export const getProducts = async (page, limit, query) => {
  const {data} = await $host.get(`api/product?page=${page}&limit=${limit}${query ? 'q=' + query : ''}`);
  return data;
}

export const getProduct = async (slug) => {
  const {data} = await $host.get(`api/product/${slug}`);
  return data;
}

export const remove = async (id) => {
  const {data} = await $host.post(`api/product/${id}`);
  return data;
}