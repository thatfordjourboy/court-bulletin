'use client';

import Footer from './Footer';
import Header from './Header';
import GazettesHeader from '../gazettes/GazettesHeader';

interface MainLayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'gazettes';
}

const MainLayout = ({ children, variant = 'default' }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {variant === 'gazettes' ? <GazettesHeader /> : <Header />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 