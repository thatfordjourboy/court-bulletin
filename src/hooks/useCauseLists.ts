import { useState, useEffect } from 'react';
import { CauseList } from '@/data/mockCauseLists';

interface UseCauseListsParams {
  page?: number;
  limit?: number;
  search?: string;
  date?: string;
  courtType?: string;
  region?: string;
  archived?: boolean;
}

interface UseCauseListsResponse {
  data: CauseList[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  totalPages: number;
}

export function useCauseLists({
  page = 1,
  limit = 8,
  search = '',
  date = '',
  courtType = '',
  region = '',
  archived = false
}: UseCauseListsParams): UseCauseListsResponse {
  const [data, setData] = useState<CauseList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCauseLists = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          archived: archived.toString(),
          ...(search && { search }),
          ...(date && { date }),
          ...(courtType && { courtType }),
          ...(region && { region })
        });

        const response = await fetch(`/api/cause-lists?${queryParams}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cause lists');
        }

        const result = await response.json();
        setData(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCauseLists();
  }, [page, limit, search, date, courtType, region, archived]);

  return { data, isLoading, error, total, totalPages };
} 