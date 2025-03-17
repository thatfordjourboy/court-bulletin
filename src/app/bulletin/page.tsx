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

  // Clean text for search
  const cleanText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s\.]/g, " ") // Keep letters, numbers, dots, and spaces
      .replace(/\s+/g, " ")
      .trim();
  };

  // Extract volume number from text
  const extractVolumeNumber = (text: string) => {
    const match = text.match(/vol\.?\s*(\d+)/i);
    return match ? parseInt(match[1]) : null;
  };

  // Check if a string contains all search terms
  const containsAllTerms = (text: string, searchTerms: string[]) => {
    const cleanedText = cleanText(text);
    
    return searchTerms.every(term => {
      // Handle volume number search
      const searchVolNumber = extractVolumeNumber(term);
      if (searchVolNumber !== null) {
        const textVolNumber = extractVolumeNumber(text);
        return textVolNumber === searchVolNumber;
      }
      
      // Regular text search
      return cleanedText.includes(term.toLowerCase());
    });
  };

  // Filter and sort bulletins
  useEffect(() => {
    let filtered = [...mockBulletins];

    // Filter by search query
    if (searchQuery) {
      const searchTerms = cleanText(searchQuery)
        .split(' ')
        .filter(term => term.length > 0);
      
      filtered = filtered.filter(bulletin => {
        // Search in title
        const titleMatch = containsAllTerms(bulletin.title, searchTerms);
        
        // Search in date
        const dateMatch = containsAllTerms(formatDate(bulletin.date), searchTerms);
        
        // Search in document type
        const typeMatch = containsAllTerms(bulletin.documentType, searchTerms);
        
        return titleMatch || dateMatch || typeMatch;
      });

      // Sort by relevance if search includes volume number
      const searchVolNumber = extractVolumeNumber(searchQuery);
      if (searchVolNumber !== null) {
        filtered.sort((a, b) => {
          const aVolNumber = extractVolumeNumber(a.title) || 0;
          const bVolNumber = extractVolumeNumber(b.title) || 0;
          
          // Exact matches first
          if (aVolNumber === searchVolNumber && bVolNumber !== searchVolNumber) return -1;
          if (bVolNumber === searchVolNumber && aVolNumber !== searchVolNumber) return 1;
          
          // Then by closest volume number
          return Math.abs(aVolNumber - searchVolNumber) - Math.abs(bVolNumber - searchVolNumber);
        });
      }
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(bulletin => 
        bulletin.date.startsWith(selectedDate)
      );
    }

    // Sort bulletins by date if not a volume search
    if (!searchQuery?.toLowerCase().includes('vol')) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
      });
    }

    setFilteredBulletins(filtered);
    setCurrentPage(1);
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
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-[240px] shrink-0">
            <BulletinFilters
              onDateChange={setSelectedDate}
              onSortChange={setSortBy}
              onReset={handleReset}
              selectedDate={selectedDate}
              selectedSort={sortBy}
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const button = document.querySelector('#searchButton');
                      if (button instanceof HTMLElement) {
                        button.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          button.style.transform = 'scale(1)';
                        }, 100);
                      }
                    }
                  }}
                  className="w-full h-[46px] border border-[#E5E7EB] px-4 pr-[46px] py-2.5 bg-white"
                  placeholder="Ghana Court Bulletin Tuesday, Vol 1"
                />
                <button 
                  id="searchButton"
                  className="absolute right-0 top-0 h-full w-[46px] bg-[#01292D] text-white flex items-center justify-center transition-transform duration-100"
                  onClick={() => {
                    const button = document.querySelector('#searchButton');
                    if (button instanceof HTMLElement) {
                      button.style.transform = 'scale(0.95)';
                      setTimeout(() => {
                        button.style.transform = 'scale(1)';
                      }, 100);
                    }
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
              </div>
              
              {/* Results count */}
              <div className="text-[#71CED1] mt-4">
                {filteredBulletins.length} results
              </div>
            </div>

            {/* Bulletins grid */}
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

                  <div className="flex gap-6">
                    <Link 
                      href={`/bulletin/${bulletin.id}/read`}
                      className="flex items-center gap-2 px-6 py-2.5 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.66699 2.5H6.66699C7.55105 2.5 8.39889 2.85119 9.02401 3.47631C9.64914 4.10143 10.0003 4.94928 10.0003 5.83333V17.5C10.0003 16.837 9.73694 16.2011 9.26809 15.7322C8.79925 15.2634 8.16337 15 7.50033 15H1.66699V2.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.3337 2.5H13.3337C12.4496 2.5 11.6018 2.85119 10.9767 3.47631C10.3515 4.10143 10.0003 4.94928 10.0003 5.83333V17.5C10.0003 16.837 10.2637 16.2011 10.7325 15.7322C11.2014 15.2634 11.8373 15 12.5003 15H18.3337V2.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Read online
                    </Link>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#01292D] text-[#8DFFDD] hover:bg-[#064e55] transition-colors">
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