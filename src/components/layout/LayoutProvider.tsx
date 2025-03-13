'use client';

import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isGazettesPage = pathname.startsWith('/gazettes');

  return (
    <MainLayout variant={isGazettesPage ? 'gazettes' : 'default'}>
      {children}
    </MainLayout>
  );
} 