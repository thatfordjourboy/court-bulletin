import { useState, useEffect } from 'react';
import { CauseList } from '@/data/mockCauseLists';
import { causeListService, type CauseListParams } from '@/services/api';

// Keep the existing interface but extend it from CauseListParams
export interface UseCauseListsParams extends CauseListParams {}

export interface UseCauseListsResponse {
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

        const result = await causeListService.getCauseLists({
          page,
          limit,
          search,
          date,
          courtType,
          region,
          archived
        });

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