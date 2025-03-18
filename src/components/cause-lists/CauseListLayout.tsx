import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface CauseListLayoutProps {
  children: React.ReactNode;
}

const CauseListLayout = ({ children }: CauseListLayoutProps) => {
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

export default CauseListLayout; 