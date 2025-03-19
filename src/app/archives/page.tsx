"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArchiveFilters from '@/components/archives/ArchiveFilters';

export default function ArchivesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/archives/cause-lists');
  }, [router]);

  return null;
} 