'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArchiveNavigation from '@/components/archives/ArchiveNavigation';
import ArchiveNoticeFilters from '@/components/archives/ArchiveNoticeFilters';
import NoticeCard from '@/components/notices/NoticeCard';
import Pagination from '@/components/gazettes/Pagination';
import { mockNotices } from '@/data/mockNotices';
import { Notice } from '@/types/notice';
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
      if (notice.type !== 'SUBSTITUTED_SERVICE_NOTICES' && notice.type !== 'ESTATE_NOTICES') {
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
          notice.division?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Apply date filter
      if (selectedDate) {
        const filterDate = new Date(selectedDate);
        const noticeDate = new Date(notice.servedDate);
        if (filterDate.toDateString() !== noticeDate.toDateString()) return false;
      }

      // Apply type filter
      if (selectedType && notice.type !== selectedType) return false;

      // Apply court filter
      if (selectedCourt && notice.court !== selectedCourt) return false;

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

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedDate(null);
    setSelectedType(null);
    setSelectedCourt(null);
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
                onDateChange={setSelectedDate}
                onTypeChange={setSelectedType}
                onCourtChange={setSelectedCourt}
                onReset={handleReset}
                onApplyFilters={() => setIsExplicitSearch(true)}
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
                      setCurrentPage(1); // Reset to first page on search
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        setIsExplicitSearch(true);
                        setCurrentPage(1); // Reset to first page on search
                      }
                    }}
                    placeholder="Search by title, suit number etc."
                    className="w-full border border-[#E5E7EB] p-3 pr-12"
                  />
                  <button 
                    type="submit"
                    className="absolute right-0 top-0 h-full w-12 bg-[#01292D] text-white flex items-center justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsExplicitSearch(true);
                      setCurrentPage(1); // Reset to first page on search
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
                  {filteredNotices.length} results
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