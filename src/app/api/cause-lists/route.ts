import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { mockCauseLists, CauseList } from '@/data/mockCauseLists';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '8');
    const search = searchParams.get('search') || '';
    const date = searchParams.get('date') || '';
    const courtType = searchParams.get('courtType') || '';
    const region = searchParams.get('region') || '';

    console.log('Received params:', { page, limit, search, date, courtType, region });

    // Filter mock data
    let filtered = [...mockCauseLists];
    console.log('Initial data count:', filtered.length);

    // Apply search filter
    if (search) {
      const cleanQuery = search.toLowerCase().trim();
      filtered = filtered.filter(causeList => {
        const titleMatch = causeList.title.toLowerCase().includes(cleanQuery);
        const locationMatch = causeList.location.toLowerCase().includes(cleanQuery);
        const divisionMatch = causeList.division ? causeList.division.toLowerCase().includes(cleanQuery) : false;
        return titleMatch || locationMatch || divisionMatch;
      });
      console.log('After search filter:', filtered.length);
    }

    // Apply date filter
    if (date) {
      filtered = filtered.filter(causeList => 
        causeList.date.includes(date)
      );
      console.log('After date filter:', filtered.length);
    }

    // Apply court type filter
    if (courtType) {
      filtered = filtered.filter(causeList => 
        causeList.courtType === courtType || causeList.division === courtType
      );
      console.log('After court type filter:', filtered.length);
    }

    // Apply region filter
    if (region) {
      console.log('Filtering by region:', region);
      console.log('Sample locations:', filtered.slice(0, 5).map(item => item.location));
      filtered = filtered.filter(causeList => 
        causeList.location === region
      );
      console.log('After region filter:', filtered.length);
    }

    // Calculate pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = filtered.slice(start, end);

    console.log('Final response:', {
      dataLength: paginatedData.length,
      total,
      totalPages,
      page,
      limit
    });

    return NextResponse.json({
      data: paginatedData,
      page,
      limit,
      total,
      totalPages
    });
  } catch (error) {
    console.error('Error fetching cause lists:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 