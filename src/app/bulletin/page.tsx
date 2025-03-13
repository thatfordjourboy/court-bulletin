'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/layout/SearchBar';
import Pagination from '@/components/gazettes/Pagination';
import BulletinFilters from '@/components/bulletin/BulletinFilters';
import Link from 'next/link';
import { mockBulletins } from '@/data/mockBulletins';

const ITEMS_PER_PAGE = 8; // 4 items per row, 2 rows

export default function BulletinPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBulletins, setFilteredBulletins] = useState(mockBulletins);
  const [selectedDate, setSelectedDate] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest'>('relevance');

  // Filter and sort bulletins
  useEffect(() => {
    let filtered = [...mockBulletins];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(bulletin => 
        bulletin.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(bulletin => 
        bulletin.date.startsWith(selectedDate)
      );
    }

    // Sort bulletins
    if (sortBy !== 'relevance') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
      });
    }

    setFilteredBulletins(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedDate, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBulletins.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBulletins = filteredBulletins.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Format date to display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedDate('');
    setSortBy('relevance');
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search section */}
        <div className="w-full max-w-[907px] mx-auto mb-8">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[#E5E7EB] p-2.5 pr-12"
                placeholder="Ghana Court Bulletin Tuesday, Vol 1"
              />
              <button className="absolute right-0 top-0 h-full w-12 bg-[#01292D] text-white flex items-center justify-center">
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
            <button 
              className="px-6 py-2.5 bg-[#01292D] text-white hover:bg-[#064e55] transition-colors flex items-center gap-2"
              onClick={() => {
                // This will be connected to document search functionality later
                alert('Document search functionality will be implemented here');
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H11.6667L17.5 8.33333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.6667 2.5V8.33333H17.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Document Search
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-[#71CED1] mb-8">
          {filteredBulletins.length} results
        </div>

        {/* Main content grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="order-2 lg:order-1">
            <BulletinFilters
              onDateChange={setSelectedDate}
              onSortChange={setSortBy}
              onReset={handleReset}
              selectedDate={selectedDate}
              selectedSort={sortBy}
            />
          </div>

          {/* Bulletins grid */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {paginatedBulletins.map((bulletin) => (
                <div 
                  key={bulletin.id}
                  className="bg-[#F9FAFB] p-6 rounded-sm"
                >
                  <h2 className="text-[#01292D] text-xl font-bold mb-6">
                    {bulletin.title}
                  </h2>
                  
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[#464646]">Date</span>
                      <span className="text-[#464646]">{formatDate(bulletin.date)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#464646]">Document type</span>
                      <span className="text-[#464646]">{bulletin.documentType}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Link 
                      href={`/bulletin/${bulletin.id}/read`}
                      className="flex items-center gap-2 px-4 py-2 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H11.6667L17.5 8.33333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.6667 2.5V8.33333H17.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Read online
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#01292D] text-[#8DFFDD] hover:bg-[#064e55] transition-colors">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 