import { FC, PropsWithChildren } from 'react';
import { StoreProvider } from '@/providers/StoreProvider/StoreProvider';
import { AuthProvider } from '@/providers/AuthProvider/AuthProvider';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <AuthProvider>{children}</AuthProvider>
    </StoreProvider>
  );
};
