'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import { ProductList } from '@/components/ProductList/ProductList';
import { LoadingStatesEnum } from '@/store/store.types';
import { Placeholder } from '../../shared/components/Placeholder/Placeholder';
import ProductListSkeleton from '@/shared/skeletons/ProductListSkeleton/ProductListSkeleton';

export const FavoriteList = () => {
  const { items, loading, error } = useAppSelector((state) => state.favorite);

  if (loading === LoadingStatesEnum.LOADING) {
    return <ProductListSkeleton />;
  }

  if (error) {
    return <Placeholder type="error">Something went wrong</Placeholder>;
  }

  return <ProductList products={items.map(({ product }) => product)} />;
};
