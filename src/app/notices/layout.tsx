import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface NoticesLayoutProps {
  children: React.ReactNode;
}

const NoticesLayout = ({ children }: NoticesLayoutProps) => {
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

export default NoticesLayout; 