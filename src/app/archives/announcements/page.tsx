'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArchiveNavigation from '@/components/archives/ArchiveNavigation';
import ArchiveAnnouncementFilters from '@/components/archives/ArchiveAnnouncementFilters';
import ArchiveAnnouncementCard from '@/components/archives/ArchiveAnnouncementCard';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { motion } from 'framer-motion';
import { stagger } from '@/utils/animations';

export default function ArchiveAnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isExplicitSearch, setIsExplicitSearch] = useState(false);
  const itemsPerPage = 5;

  const { data: announcements, isLoading, error, total } = useAnnouncements({
    page: currentPage,
    limit: itemsPerPage,
    search: isExplicitSearch ? searchQuery : '',
    date: selectedDate || '',
    archived: true
  });

  // Calculate total pages
  const totalPages = Math.ceil(total / itemsPerPage);

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

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedDate(null);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-1 sm:px-6 lg:px-8">
          <ArchiveNavigation />
          
          <div className="flex gap-32">
            {/* Sidebar */}
            <div className="w-[240px] shrink-0 bg-[#F3F5F8] p-5 lg:sticky lg:top-6 h-fit">
              <ArchiveAnnouncementFilters
                onDateChange={setSelectedDate}
                onReset={handleReset}
                onApplyFilters={() => setIsExplicitSearch(true)}
                selectedDate={selectedDate}
              />
            </div>

            {/* Main content */}
            <div className="flex-1">
              {/* Search section */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsExplicitSearch(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        setIsExplicitSearch(true);
                      }
                    }}
                    className="w-full h-[46px] border border-[#E5E7EB] px-4 pr-[46px] py-2.5 bg-white"
                    placeholder="Search announcement archives..."
                  />
                  <button 
                    className="absolute right-0 top-0 h-full w-[46px] bg-[#01292D] text-white flex items-center justify-center transition-transform duration-100"
                    onClick={() => setIsExplicitSearch(true)}
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
                </div>
                
                {/* Results count */}
                <div className="text-[#64CCC5] text-sm font-medium mt-3 mb-6">
                  {total} results
                </div>
              </div>

              {/* Loading state */}
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#01292D]"></div>
                </div>
              ) : error ? (
                <div className="text-red-500">Error loading announcements. Please try again later.</div>
              ) : (
                <>
                  {/* Grid of announcements */}
                  <motion.div 
                    className="grid grid-cols-1 gap-y-8 mb-12"
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                  >
                    {announcements.map((announcement) => (
                      <ArchiveAnnouncementCard
                        key={announcement.id}
                        id={announcement.id}
                        type={announcement.type}
                        title={announcement.title}
                        referenceNumber={announcement.referenceNumber || `AN/${announcement.id}/2024`}
                        servedDate={announcement.servedDate || announcement.date}
                        servedTime={announcement.servedTime || '12:00 PM'}
                        court={announcement.court}
                        division={announcement.division}
                        expiryDate={announcement.expiryDate || new Date(new Date(announcement.date).setFullYear(new Date(announcement.date).getFullYear() + 1)).toISOString()}
                      />
                    ))}
                  </motion.div>

                  {/* Pagination section */}
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
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 