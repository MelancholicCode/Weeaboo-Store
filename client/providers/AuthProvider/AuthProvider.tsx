'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { getMe } from '@/store/auth/auth.slice';
import { getCartItems } from '@/store/cart/cart.slice';
import { useAppDispatch } from '@/store/hooks/hooks';
import { getFavorites } from '@/store/favorite/favorite.slice';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe())
      .then(async () => {
        await dispatch(getCartItems());
        await dispatch(getFavorites());
      })
      .catch((error: any) => console.log(error));
  }, []);

  return <>{children}</>;
};
