import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Weeaboo Store',
  description: 'Japanese goods store',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
