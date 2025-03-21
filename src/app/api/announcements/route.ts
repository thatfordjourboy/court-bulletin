import { NextResponse } from 'next/server';
import { mockAnnouncements } from '@/data/mockAnnouncements';

// Function to determine if an announcement should be archived (1 year old)
const isArchived = (dateString: string): boolean => {
  const [day, month, year] = dateString.split(' ');
  const date = new Date(
    parseInt(year),
    new Date(Date.parse(month + " 1, " + year)).getMonth(),
    parseInt(day)
  );
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  return date < oneYearAgo;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '8');
  const search = searchParams.get('search') || '';
  const date = searchParams.get('date') || '';
  const type = searchParams.get('type') || '';
  const isArchivePage = searchParams.get('archived') === 'true';

  // First filter by archive status
  let filteredAnnouncements = mockAnnouncements.filter(announcement => 
    isArchived(announcement.date) === isArchivePage
  );

  // Then apply other filters
  if (search) {
    const searchLower = search.toLowerCase();
    filteredAnnouncements = filteredAnnouncements.filter(announcement => 
      announcement.title.toLowerCase().includes(searchLower) ||
      announcement.description.toLowerCase().includes(searchLower) ||
      announcement.court.toLowerCase().includes(searchLower)
    );
  }

  if (date) {
    filteredAnnouncements = filteredAnnouncements.filter(announcement => 
      announcement.date === date
    );
  }

  if (type) {
    filteredAnnouncements = filteredAnnouncements.filter(announcement => 
      announcement.type === type
    );
  }

  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAnnouncements = filteredAnnouncements.slice(startIndex, endIndex);

  return NextResponse.json({
    announcements: paginatedAnnouncements,
    total: filteredAnnouncements.length,
    page,
    limit
  });
} 