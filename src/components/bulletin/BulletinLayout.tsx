import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface BulletinLayoutProps {
  children: React.ReactNode;
}

const BulletinLayout = ({ children }: BulletinLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BulletinLayout; 