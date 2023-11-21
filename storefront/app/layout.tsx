import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import LayoutWrapper from './components/layout-wrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Honest Storefront',
  description: 'Example storefront showcasing Honest Reviews',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
