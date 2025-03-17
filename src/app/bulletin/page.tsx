'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/layout/SearchBar';
import Pagination from '@/components/gazettes/Pagination';
import BulletinFilters from '@/components/bulletin/BulletinFilters';
import Link from 'next/link';
import { mockBulletins } from '@/data/mockBulletins';

type BulletinDocument = {
  id: string;
  title: string;
  date: string;
  documentType: string;
  volume: string;
};

const ITEMS_PER_PAGE = 8; // 4 items per row, 2 rows

export default function BulletinPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBulletins, setFilteredBulletins] = useState<BulletinDocument[]>(mockBulletins);
  const [selectedDate, setSelectedDate] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest'>('relevance');
  const [isExplicitSearch, setIsExplicitSearch] = useState(false);

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
        
        // For explicit search, prioritize exact matches
        if (isExplicitSearch) {
          const searchVolNumber = extractVolumeNumber(searchQuery);
          if (searchVolNumber !== null) {
            const bulletinVolNumber = extractVolumeNumber(bulletin.title);
            return bulletinVolNumber === searchVolNumber;
          }
          return bulletin.title.toLowerCase().includes(searchQuery.toLowerCase());
        }
        
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
  }, [searchQuery, selectedDate, sortBy, isExplicitSearch]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBulletins.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBulletins = filteredBulletins.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Format date to display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    // Remove any ordinal indicators (st, nd, rd, th)
    return formattedDate.replace(/(\d+)(st|nd|rd|th)/, '$1');
  };

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedDate('');
    setSortBy('relevance');
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex gap-32">
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsExplicitSearch(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setIsExplicitSearch(true);
                      setTimeout(() => setIsExplicitSearch(false), 100);
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
                    setIsExplicitSearch(true);
                    setTimeout(() => setIsExplicitSearch(false), 100);
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
              <div className="text-[#64CCC5] text-sm font-medium mt-3 mb-6">
                {filteredBulletins.length} results
              </div>
            </div>

            {/* Bulletins grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-12 mb-12">
              {paginatedBulletins.map((bulletin) => (
                <div key={bulletin.id} className="flex flex-col">
                  <div className="bg-[#F9FAFB] mb-2 w-fit">
                    <h2 className="text-[#01292D] text-2xl font-semibold mb-4 px-4 pt-4">
                      Ghana Court Bulletin, Vol. {bulletin.volume}
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-x-4 px-4 pb-4">
                      <div>
                        <div className="font-medium text-sm text-[#1E1D1D] mb-2">Date</div>
                        <div className="text-sm text-[#464646]">{formatDate(bulletin.date)}</div>
                      </div>
                      <div>
                        <div className="font-medium text-sm text-[#1E1D1D] mb-2">Document type</div>
                        <div className="text-sm text-[#464646]">{bulletin.documentType}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/bulletin/${bulletin.id}/read`}
                      className="h-9 flex items-center px-3 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors text-sm font-semibold"
                    >
                      Read online
                      <svg className="ml-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2.66667H6C6.70724 2.66667 7.38552 2.94762 7.88562 3.44772C8.38572 3.94781 8.66667 4.62609 8.66667 5.33334V14.6667C8.66667 14.1362 8.456 13.6275 8.08093 13.2525C7.70587 12.8774 7.19713 12.6667 6.66667 12.6667H2V2.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2.66667H10C9.29276 2.66667 8.61448 2.94762 8.11438 3.44772C7.61428 3.94781 7.33334 4.62609 7.33334 5.33334V14.6667C7.33334 14.1362 7.544 13.6275 7.91907 13.2525C8.29413 12.8774 8.80287 12.6667 9.33334 12.6667H14V2.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                    <Link 
                      href={`/bulletin/${bulletin.id}/download`}
                      className="h-9 flex items-center px-3 bg-[#01292D] text-white hover:bg-[#064E55] transition-colors text-sm font-semibold"
                    >
                      Download
                      <svg className="ml-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
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