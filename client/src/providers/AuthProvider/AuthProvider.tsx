'use client';

import { FC, PropsWithChildren } from 'react';
import { useGetUserData } from '@/hooks/useGetUserData';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  useGetUserData();

  return children;
};
