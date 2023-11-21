'use client';

import { SwellProvider } from '@/app/swell/context';
import LayoutHeader from './layout-header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen">
      <SwellProvider>
        <LayoutHeader />
        <div className="">{children}</div>
      </SwellProvider>
    </main>
  );
}
