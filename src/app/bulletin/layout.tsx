import BulletinLayout from '@/components/bulletin/BulletinLayout';

export default function BulletinPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BulletinLayout>{children}</BulletinLayout>;
} 