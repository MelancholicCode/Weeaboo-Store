'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import { ProductList } from '@/components/ProductList/ProductList';

const FavoriteList = () => {
  const { items } = useAppSelector((state) => state.favorite);
  return <ProductList products={items.map(({ product }) => product)} />;
};

export default FavoriteList;
