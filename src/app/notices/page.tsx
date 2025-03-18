'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import NoticeFilters from '@/components/notices/NoticeFilters';
import NoticeCard from '@/components/notices/NoticeCard';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '@/utils/animations';
import { mockNotices, type Notice } from '@/data/mockNotices';

export default function NoticesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [noticeTypeFilter, setNoticeTypeFilter] = useState<string | null>(null);
  const [courtTypeFilter, setCourtTypeFilter] = useState<string | null>(null);
  const [divisionFilter, setDivisionFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest' | null>(null);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>(mockNotices);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Filter and sort notices
  useEffect(() => {
    let filtered = [...mockNotices];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.court.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.suitNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter).toDateString();
      filtered = filtered.filter(notice => 
        new Date(notice.servedDate).toDateString() === filterDate
      );
    }

    // Apply notice type filter
    if (noticeTypeFilter) {
      filtered = filtered.filter(notice => 
        notice.type === noticeTypeFilter.toUpperCase().replace(/ /g, '_')
      );
    }

    // Apply court type filter
    if (courtTypeFilter) {
      filtered = filtered.filter(notice => 
        notice.court === courtTypeFilter
      );

      // Apply division filter only if High Court is selected
      if (courtTypeFilter === 'High Court' && divisionFilter) {
        filtered = filtered.filter(notice => 
          notice.division === divisionFilter
        );
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.servedDate).getTime() - new Date(a.servedDate).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.servedDate).getTime() - new Date(b.servedDate).getTime();
      }
      return 0;
    });

    setFilteredNotices(filtered);
    setCurrentPage(1); // Reset to first page when filters change
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Only scroll to top when filters change
  }, [searchQuery, dateFilter, noticeTypeFilter, courtTypeFilter, divisionFilter, sortBy]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  const handleReset = () => {
    setDateFilter(null);
    setNoticeTypeFilter(null);
    setCourtTypeFilter(null);
    setDivisionFilter(null);
    setSortBy(null);
    setSearchQuery('');
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
              onNoticeTypeChange={setNoticeTypeFilter}
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
                  placeholder="Ghana Bar Association notice to all lawyers"
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
              {currentNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  type={notice.type}
                  title={notice.title}
                  suitNumber={notice.suitNumber}
                  servedDate={notice.servedDate}
                  servedTime={notice.servedTime}
                  court={notice.court}
                  division={notice.division}
                  expiryDate={notice.expiryDate}
                />
              ))}
            </motion.div>

            {/* Pagination */}
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
      </div>
    </div>
  );
} 