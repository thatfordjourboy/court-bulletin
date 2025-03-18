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
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest' | null>(null);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>(mockNotices);

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
  }, [searchQuery, dateFilter, noticeTypeFilter, courtTypeFilter, sortBy]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  // Handle filter changes
  const handleDateChange = (date: string | null) => {
    setDateFilter(date);
  };

  const handleNoticeTypeChange = (type: string | null) => {
    setNoticeTypeFilter(type);
  };

  const handleCourtTypeChange = (type: string | null) => {
    setCourtTypeFilter(type);
  };

  const handleSortChange = (sort: 'relevance' | 'newest' | 'oldest' | null) => {
    setSortBy(sort);
  };

  const handleReset = () => {
    setDateFilter(null);
    setNoticeTypeFilter(null);
    setCourtTypeFilter(null);
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
              onDateChange={handleDateChange}
              onNoticeTypeChange={handleNoticeTypeChange}
              onCourtTypeChange={handleCourtTypeChange}
              onSortChange={handleSortChange}
              onReset={handleReset}
              selectedDate={dateFilter}
              selectedNoticeType={noticeTypeFilter}
              selectedCourtType={courtTypeFilter}
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
              className="space-y-6"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {filteredNotices.map((notice) => (
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
            <div className="mt-12 flex items-center justify-between">
              <button className="flex items-center text-[#0066CC] hover:underline">
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
                {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center
                      ${page === 1 ? 'bg-[#01292D] text-white' : 'text-[#464646] hover:bg-[#F3F5F8]'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="flex items-center text-[#0066CC] hover:underline">
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