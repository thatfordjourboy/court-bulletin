import { NextResponse } from 'next/server';
import { mockCauseLists } from '@/data/mockCauseLists';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '8');
  const search = searchParams.get('search') || '';
  const date = searchParams.get('date') || '';
  const courtType = searchParams.get('courtType') || '';
  const region = searchParams.get('region') || '';

  // Filter the cause lists based on search criteria
  let filteredLists = [...mockCauseLists];

  if (search) {
    const searchLower = search.toLowerCase();
    filteredLists = filteredLists.filter(list => 
      list.title.toLowerCase().includes(searchLower) ||
      list.description.toLowerCase().includes(searchLower) ||
      list.location.toLowerCase().includes(searchLower) ||
      (list.division && list.division.toLowerCase().includes(searchLower))
    );
  }

  if (date) {
    filteredLists = filteredLists.filter(list => list.date === date);
  }

  if (courtType) {
    filteredLists = filteredLists.filter(list => 
      list.courtType === courtType || 
      (list.division && list.division === courtType)
    );
  }

  if (region) {
    filteredLists = filteredLists.filter(list => list.location === region);
  }

  // Calculate pagination
  const total = filteredLists.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedLists = filteredLists.slice(start, end);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json({
    data: paginatedLists,
    total,
    totalPages,
    page,
    limit
  });
} 