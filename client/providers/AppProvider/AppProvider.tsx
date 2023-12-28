import { FC, PropsWithChildren } from 'react';
import { StoreProvider } from '../StoreProvider/StoreProvider';
import { AuthProvider } from '../AuthProvider/AuthProvider';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <AuthProvider>{children}</AuthProvider>
    </StoreProvider>
  );
};
