import GazettesHeader from '@/components/gazettes/GazettesHeader';

export default function GazettesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GazettesHeader />
      <div className="flex-grow">
        {children}
      </div>
    </>
  );
} 