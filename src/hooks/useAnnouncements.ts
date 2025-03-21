import { useState, useEffect } from 'react';
import { Announcement } from '@/data/mockAnnouncements';
import { NoticeType } from '@/types/notice';

interface UseAnnouncementsParams {
  page?: number;
  limit?: number;
  search?: string;
  date?: string;
  type?: NoticeType | string;
  court?: string;
  archived?: boolean;
}

interface UseAnnouncementsResult {
  data: Announcement[];
  isLoading: boolean;
  error: Error | null;
  total: number;
}

export function useAnnouncements({
  page = 1,
  limit = 5,
  search = '',
  date = '',
  type = '',
  court = '',
  archived = false
}: UseAnnouncementsParams = {}): UseAnnouncementsResult {
  const [data, setData] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          archived: archived.toString()
        });

        if (search) params.append('search', search);
        if (date) params.append('date', date);
        if (type) params.append('type', type);
        if (court) params.append('court', court);

        const response = await fetch(`/api/announcements?${params}`);
        if (!response.ok) throw new Error('Failed to fetch announcements');
        
        const data = await response.json();
        setData(data.announcements);
        setTotal(data.total);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setData([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, [page, limit, search, date, type, court, archived]);

  return { data, isLoading, error, total };
} 