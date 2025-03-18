import CauseListLayout from '@/components/cause-lists/CauseListLayout';

export default function CauseListsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CauseListLayout>{children}</CauseListLayout>;
} 