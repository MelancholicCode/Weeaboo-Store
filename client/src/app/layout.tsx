import type { Metadata } from 'next';
import { inter } from '@/fonts/inter';
import { Header } from '@/components/Header/Header';
import '@/styles/globals.scss';
import '@/styles/variables.scss';
import { AppProvider } from '@/providers/AppProvider/AppProvider';

export const metadata: Metadata = {
  title: 'Weeaboo Store',
  description: 'Japanese goods store',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
