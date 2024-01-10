'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import { ProductList } from '@/components/ProductList/ProductList';
import { LoadingStatesEnum } from '@/store/store.types';
import { Placeholder } from '../Placeholder/Placeholder';

export const FavoriteList = () => {
  const { items, loading, error } = useAppSelector((state) => state.favorite);
  const { loading: userLoading } = useAppSelector((state) => state.auth);

  if (
    userLoading === LoadingStatesEnum.LOADING ||
    loading === LoadingStatesEnum.LOADING
  ) {
    return null; // Return Skeleton
  }

  if (error) {
    return <Placeholder type="error">Something went wrong</Placeholder>;
  }

  return <ProductList products={items.map(({ product }) => product)} />;
};
