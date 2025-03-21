'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArchiveNavigation from '@/components/archives/ArchiveNavigation';
import ArchiveNoticeFilters from '@/components/archives/ArchiveNoticeFilters';
import NoticeCard from '@/components/notices/NoticeCard';
import Pagination from '@/components/gazettes/Pagination';
import { mockNotices } from '@/data/mockNotices';
import { Notice, NoticeType } from '@/types/notice';
import { motion } from 'framer-motion';
import { stagger } from '@/utils/animations';

const ITEMS_PER_PAGE = 5;

export default function ArchiveNoticesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [isExplicitSearch, setIsExplicitSearch] = useState(false);

  // Filter notices
  const filteredNotices = useMemo(() => {
    let filtered = mockNotices.filter(notice => {
      // Only show notices older than 1 year
      const servedDate = new Date(notice.servedDate);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      if (servedDate > oneYearAgo) return false;

      // Only show Substituted Service and Estate notices
      if (notice.type !== NoticeType.SUBSTITUTED_SERVICE_NOTICES && notice.type !== NoticeType.ESTATE_NOTICES) {
        return false;
      }

      // Apply search filter
      if (isExplicitSearch && searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          notice.title.toLowerCase().includes(searchLower) ||
          notice.suitNumber?.toLowerCase().includes(searchLower) ||
          notice.referenceNumber?.toLowerCase().includes(searchLower) ||
          notice.court.toLowerCase().includes(searchLower) ||
          notice.division?.toLowerCase().includes(searchLower) ||
          notice.parties?.applicant.name.toLowerCase().includes(searchLower) ||
          notice.parties?.respondent.name.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Apply date filter
      if (selectedDate) {
        const filterDate = new Date(selectedDate);
        const noticeDate = new Date(notice.servedDate);
        if (
          filterDate.getFullYear() !== noticeDate.getFullYear() ||
          filterDate.getMonth() !== noticeDate.getMonth() ||
          filterDate.getDate() !== noticeDate.getDate()
        ) {
          return false;
        }
      }

      // Apply type filter
      if (selectedType && notice.type !== selectedType) {
        return false;
      }

      // Apply court filter
      if (selectedCourt && notice.court !== selectedCourt) {
        return false;
      }

      return true;
    });

    // Sort by served date (most recent first)
    filtered.sort((a, b) => new Date(b.servedDate).getTime() - new Date(a.servedDate).getTime());

    return filtered;
  }, [searchQuery, selectedDate, selectedType, selectedCourt, isExplicitSearch]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE);
  const paginatedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredNotices, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle date change
  const handleDateChange = (date: string | null) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  // Handle type change
  const handleTypeChange = (type: string | null) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  // Handle court change
  const handleCourtChange = (court: string | null) => {
    setSelectedCourt(court);
    setCurrentPage(1);
  };

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedDate(null);
    setSelectedType(null);
    setSelectedCourt(null);
    setCurrentPage(1);
    setIsExplicitSearch(false);
  };

  // Apply filters
  const handleApplyFilters = () => {
    setIsExplicitSearch(true);
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
            <div className="w-[250px] shrink-0 bg-[#F3F5F8] p-5 lg:sticky lg:top-6 h-fit">
              <ArchiveNoticeFilters
                onDateChange={handleDateChange}
                onTypeChange={handleTypeChange}
                onCourtChange={handleCourtChange}
                onReset={handleReset}
                onApplyFilters={handleApplyFilters}
                selectedDate={selectedDate}
                selectedType={selectedType}
                selectedCourt={selectedCourt}
              />
            </div>

            {/* Main content */}
            <div className="flex-1">
              {/* Search bar */}
              <div className="mb-8">
                <form className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsExplicitSearch(false);
                      setCurrentPage(1);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        setIsExplicitSearch(true);
                        setCurrentPage(1);
                      }
                    }}
                    placeholder="Search by title, suit number, parties etc."
                    className="w-full border border-[#E5E7EB] p-3 pr-12"
                  />
                  <button 
                    type="submit"
                    className="absolute right-0 top-0 h-full w-12 bg-[#01292D] text-white flex items-center justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsExplicitSearch(true);
                      setCurrentPage(1);
                    }}
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
                  {filteredNotices.length} {filteredNotices.length === 1 ? 'result' : 'results'}
                </div>
              </div>

              {/* Notices grid */}
              <motion.div 
                className="space-y-8"
                variants={stagger}
                initial="initial"
                animate="animate"
              >
                {paginatedNotices.map((notice) => (
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
                ))}

                {paginatedNotices.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-[#464646]"
                  >
                    No notices found matching your criteria
                  </motion.div>
                )}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 