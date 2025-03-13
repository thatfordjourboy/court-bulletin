'use client';

import Footer from '../layout/Footer';
import GazettesHeader from './GazettesHeader';

interface GazetteLayoutProps {
  children: React.ReactNode;
}

const GazetteLayout = ({ children }: GazetteLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GazettesHeader />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default GazetteLayout; 