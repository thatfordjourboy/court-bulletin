interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="min-h-screen bg-white">
      {children}
    </main>
  );
};

export default MainLayout; 