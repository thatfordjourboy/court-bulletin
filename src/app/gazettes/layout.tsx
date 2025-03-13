import GazetteLayout from '@/components/gazettes/GazetteLayout';

export default function GazettesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GazetteLayout>{children}</GazetteLayout>;
} 