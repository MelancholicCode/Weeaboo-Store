'use client';

import { getMe } from '@/store/auth/auth.slice';
import { AppDispatch } from '@/store/store';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getMe());
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <>{children}</>;
};
