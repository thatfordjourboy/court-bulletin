'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import NoticeFilters from '@/components/notices/NoticeFilters';
import NoticeCard from '@/components/notices/NoticeCard';
import SpotlightCarousel from '@/components/notices/SpotlightCarousel';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '@/utils/animations';
import { mockNotices, type Notice } from '@/data/mockNotices';

export default function NoticesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [noticeTypeFilter, setNoticeTypeFilter] = useState<string | null>(null);
  const [courtTypeFilter, setCourtTypeFilter] = useState<string | null>(null);
  const [divisionFilter, setDivisionFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest' | null>(null);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>(mockNotices);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle URL updates
  const createQueryString = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove parameters based on the updates object
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    return params.toString();
  };

  // Initialize filters from URL parameters
  useEffect(() => {
    const typeFromUrl = searchParams.get('type');
    if (typeFromUrl) {
      const typeMap: { [key: string]: string } = {
        'substituted-service': 'Substituted Service Notices',
        'general': 'General Notices',
        'practice-direction': 'Practice Direction',
        'estate': 'Estate Notices',
        'announcements': 'Announcements',
        'judicial': 'Judicial Notices'
      };
      
      const displayType = typeMap[typeFromUrl];
      if (displayType) {
        setNoticeTypeFilter(displayType);
      }
    }
  }, [searchParams]);

  // Filter notices based on all criteria
  useEffect(() => {
    let filtered = [...mockNotices];

    // Apply notice type filter
    if (noticeTypeFilter) {
      // Convert display format to enum format
      const typeMap: { [key: string]: string } = {
        'Substituted Service Notices': 'SUBSTITUTED_SERVICE_NOTICES',
        'General Notices': 'GENERAL_NOTICES',
        'Practice Direction': 'PRACTICE_DIRECTION',
        'Estate Notices': 'ESTATE_NOTICES',
        'Announcements': 'ANNOUNCEMENTS',
        'Judicial Notices': 'JUDICIAL_NOTICES'
      };
      
      const typeEnum = typeMap[noticeTypeFilter];
      if (typeEnum) {
        filtered = filtered.filter(notice => notice.type === typeEnum);
      }
    }

    // Apply court type filter
    if (courtTypeFilter) {
      filtered = filtered.filter(notice => 
        notice.court === courtTypeFilter
      );
    }

    // Apply division filter
    if (divisionFilter) {
      filtered = filtered.filter(notice => 
        notice.division === divisionFilter
      );
    }

    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter(notice => 
        notice.servedDate.startsWith(dateFilter)
      );
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (notice.suitNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (notice.referenceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      );
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.servedDate).getTime();
        const dateB = new Date(b.servedDate).getTime();
        if (sortBy === 'newest') return dateB - dateA;
        if (sortBy === 'oldest') return dateA - dateB;
        return 0;
      });
    }

    setFilteredNotices(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [noticeTypeFilter, courtTypeFilter, divisionFilter, dateFilter, searchQuery, sortBy]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = filteredNotices.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7;
    const ellipsis = '...';

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      if (currentPage <= 3) {
        // If current page is near the start
        for (let i = 2; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(ellipsis);
        pageNumbers.push(totalPages - 1);
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // If current page is near the end
        pageNumbers.push(ellipsis);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // If current page is in the middle
        pageNumbers.push(ellipsis);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(ellipsis);
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  // Handle reset
  const handleReset = () => {
    // Clear all filters
    setDateFilter(null);
    setNoticeTypeFilter(null);
    setCourtTypeFilter(null);
    setDivisionFilter(null);
    setSortBy(null);
    setSearchQuery('');

    // Update URL - remove type parameter while preserving other potential parameters
    const queryString = createQueryString({ type: null });
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };

  // Handle notice type change
  const handleNoticeTypeChange = (type: string | null) => {
    setNoticeTypeFilter(type);
    
    // Convert display type to URL parameter format
    const typeMap: { [key: string]: string } = {
      'Substituted Service Notices': 'substituted-service',
      'General Notices': 'general',
      'Practice Direction': 'practice-direction',
      'Estate Notices': 'estate',
      'Announcements': 'announcements',
      'Judicial Notices': 'judicial'
    };

    const urlType = type ? typeMap[type] : null;
    const queryString = createQueryString({ type: urlType });
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">
        {/* Back navigation */}
        <Link 
          href="/"
          className="inline-flex items-center text-[#0066CC] mb-8 hover:underline"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Home
        </Link>

        {/* Main content grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-60">
          {/* Sidebar */}
          <div className="w-full lg:w-[250px] bg-[#F3F5F8] p-5 lg:sticky lg:top-6 h-fit order-2 lg:order-1">
            <NoticeFilters
              onDateChange={setDateFilter}
              onNoticeTypeChange={handleNoticeTypeChange}
              onCourtTypeChange={setCourtTypeFilter}
              onDivisionChange={setDivisionFilter}
              onSortChange={setSortBy}
              onReset={handleReset}
              selectedDate={dateFilter}
              selectedNoticeType={noticeTypeFilter}
              selectedCourtType={courtTypeFilter}
              selectedDivision={divisionFilter}
              selectedSort={sortBy}
            />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Search bar */}
            <div className="mb-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, suit number etc."
                  className="w-full border border-[#E5E7EB] p-3 pr-12"
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full w-12 bg-[#01292D] text-white flex items-center justify-center"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </button>
              </form>
              <div className="text-[#64CCC5] mt-2">
                {filteredNotices.length} results
              </div>
            </div>

            {/* Notices list */}
            <motion.div 
              className="space-y-10"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {currentNotices.map((notice) => {
                console.log('Notice:', notice); // Debug log
                return (
                  <NoticeCard
                    key={notice.id}
                    id={notice.id}
                    type={notice.type}
                    title={notice.title}
                    suitNumber={notice.suitNumber}
                    referenceNumber={notice.referenceNumber}
                    servedDate={notice.servedDate}
                    servedTime={notice.servedTime}
                    court={notice.court}
                    division={notice.division}
                    expiryDate={notice.expiryDate}
                  />
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Pagination section - moved outside the grid */}
        <div className="relative mt-12 border-t border-[#E5E7EB] -mr-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-24">
            <div className="flex items-center justify-between py-6">
              <button 
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#0066CC] hover:underline'}`}
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
                Previous
              </button>
              <div className="flex items-center gap-2">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                    className={`w-8 h-8 flex items-center justify-center
                      ${page === currentPage ? 'bg-[#01292D] text-white' : 
                        page === '...' ? 'cursor-default' : 'text-[#464646] hover:bg-[#F3F5F8]'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#0066CC] hover:underline'}`}
              >
                Next
                <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Spotlight Carousel Section */}
        <div className="mt-16">
          <SpotlightCarousel />
        </div>
      </div>
    </div>
  );
} 