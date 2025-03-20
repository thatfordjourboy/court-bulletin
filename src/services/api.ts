import { CauseList } from '@/data/mockCauseLists';

// API Response types
export interface ApiResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  code?: string;
}

// Parameters expected by the API
export interface CauseListParams {
  page?: number;
  limit?: number;
  search?: string;
  date?: string;
  courtType?: string;
  region?: string;
  archived?: boolean;
}

// Backend cause list structure (can be adjusted when real backend is implemented)
export interface BackendCauseList {
  id: string;
  title: string;
  location: string;
  division?: string;
  date: string; // Expected in ISO format from backend
  description: string;
  court_type: string; // Backend might use snake_case
  // Add any additional fields that might come from backend
}

// Date formatting helper
function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();
}

// Court type mapping (in case backend uses different values)
const courtTypeMapping: Record<string, CauseList['courtType']> = {
  'supreme_court': 'Supreme Court',
  'high_court': 'High Court',
  'court_of_appeal': 'Court of Appeal',
  'circuit_court': 'Circuit Court',
  'district_court': 'District Court',
  // Add direct mappings as well
  'Supreme Court': 'Supreme Court',
  'High Court': 'High Court',
  'Court of Appeal': 'Court of Appeal',
  'Circuit Court': 'Circuit Court',
  'District Court': 'District Court'
};

// Adapter function to convert backend data to frontend format
export function adaptBackendCauseList(backendData: BackendCauseList): CauseList {
  return {
    id: backendData.id,
    title: backendData.title,
    location: backendData.location,
    division: backendData.division,
    date: formatDate(backendData.date),
    description: backendData.description,
    courtType: courtTypeMapping[backendData.court_type] || 'High Court' // Fallback to High Court if unknown
  };
}

// API service class
export class CauseListService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  // Fetch cause lists with pagination and filters
  async getCauseLists(params: CauseListParams): Promise<ApiResponse<CauseList>> {
    try {
      const queryParams = new URLSearchParams({
        page: (params.page || 1).toString(),
        limit: (params.limit || 8).toString(),
        archived: (params.archived || false).toString(),
        ...(params.search && { search: params.search }),
        ...(params.date && { date: params.date }),
        ...(params.courtType && { courtType: params.courtType }),
        ...(params.region && { region: params.region })
      });

      const response = await fetch(`${this.baseUrl}/cause-lists?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cause lists');
      }

      const result = await response.json();

      // Transform the data if it's from the backend
      const isBackendData = 'court_type' in (result.data[0] || {});
      const transformedData = isBackendData 
        ? result.data.map(adaptBackendCauseList)
        : result.data;

      return {
        data: transformedData,
        total: result.total,
        totalPages: result.totalPages,
        page: result.page,
        limit: result.limit
      };
    } catch (error) {
      console.error('Error fetching cause lists:', error);
      throw error;
    }
  }

  // Get a single cause list by ID
  async getCauseListDetail(id: string): Promise<CauseList> {
    try {
      const response = await fetch(`${this.baseUrl}/cause-lists/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cause list detail');
      }

      const result = await response.json();
      
      // Transform the data if it's from the backend
      return 'court_type' in result 
        ? adaptBackendCauseList(result)
        : result;
    } catch (error) {
      console.error('Error fetching cause list detail:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const causeListService = new CauseListService(); 