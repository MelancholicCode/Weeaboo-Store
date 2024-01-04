'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import { ProductList } from '@/components/ProductList/ProductList';

export const FavoriteList = () => {
  const { items } = useAppSelector((state) => state.favorite);
  return <ProductList products={items.map(({ product }) => product)} />;
};
