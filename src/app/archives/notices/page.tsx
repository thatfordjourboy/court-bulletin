'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArchiveNavigation from '@/components/archives/ArchiveNavigation';
import ArchiveNoticeFilters from '@/components/archives/ArchiveNoticeFilters';

export default function ArchiveNoticesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
            <div className="w-[250px] shrink-0 bg-[#F3F5F8] p-5 lg:sticky lg:top-6 h-fit">
              <ArchiveNoticeFilters
                onDateChange={setSelectedDate}
                onReset={handleReset}
                selectedDate={selectedDate}
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
                  0 results
                </div>
              </div>

              {/* Notices grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
                {/* Notice cards will go here */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 