'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CauseListFilters from '@/components/cause-lists/CauseListFilters';
import Pagination from '@/components/gazettes/Pagination';
import { mockCauseLists, CauseList } from '@/data/mockCauseLists';
import { useCauseLists } from '@/hooks/useCauseLists';

const ITEMS_PER_PAGE = 8;

export const getBackgroundColor = (courtType: string) => {
  switch (courtType) {
    case 'Supreme Court':
      return 'bg-[#FFEACB]';
    case 'High Court':
      return 'bg-[#C5E0FF]';
    case 'Court of Appeal':
      return 'bg-[#FFCDCE]';
    case 'Circuit Court':
      return 'bg-[#E8FFE4]';
    case 'District Court':
      return 'bg-[#F3E8FF]';
    default:
      return 'bg-[#F9FAFB]';
  }
};

export default function CauseListsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCourtType, setSelectedCourtType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isExplicitSearch, setIsExplicitSearch] = useState(false);

  const { data: causeLists, isLoading, error, total, totalPages } = useCauseLists({
    page: currentPage,
    search: isExplicitSearch ? searchQuery : '',
    date: selectedDate,
    courtType: selectedCourtType,
    region: selectedRegion,
    limit: 8
  });

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedDate('');
    setSelectedCourtType('');
    setSelectedRegion('');
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-1 sm:px-6 lg:px-8">
          <div className="text-red-500">Error loading cause lists. Please try again later.</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex gap-32">
          {/* Sidebar */}
          <div className="w-[240px] shrink-0">
            <CauseListFilters
              onDateChange={setSelectedDate}
              onCourtTypeChange={setSelectedCourtType}
              onRegionChange={setSelectedRegion}
              onReset={handleReset}
              onApplyFilters={() => setIsExplicitSearch(true)}
              selectedDate={selectedDate}
              selectedCourtType={selectedCourtType}
              selectedRegion={selectedRegion}
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
                  placeholder="Supreme court cause list"
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
                {total} results
              </div>
            </div>

            {/* Loading state */}
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#01292D]"></div>
              </div>
            ) : (
              <>
                {/* Cause Lists grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 mb-12">
                  {causeLists.map((causeList: CauseList) => (
                    <div key={causeList.id} className="flex flex-col w-full min-h-[300px]">
                      <div className="bg-[#F8F9FB] w-full flex-1">
                        <div className="h-[100px] px-4 pt-4">
                          <h2 className="text-[#01292D] text-[22px] leading-[150%] tracking-[-0.02em] font-bold font-['Inter']">
                            {causeList.title}
                          </h2>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 px-4 pb-4">
                          {causeList.division ? (
                            <>
                              <div>
                                <div className="font-medium text-sm text-[#1E1D1D] mb-2">Division</div>
                                <div className="text-sm text-[#464646]">{causeList.division}</div>
                              </div>
                              <div>
                                <div className="font-medium text-sm text-[#1E1D1D] mb-2">Date</div>
                                <div className="text-sm text-[#464646]">{causeList.date}</div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <div className="font-medium text-sm text-[#1E1D1D] mb-2">Location</div>
                                <div className="text-sm text-[#464646]">{causeList.location}</div>
                              </div>
                              <div>
                                <div className="font-medium text-sm text-[#1E1D1D] mb-2">Date</div>
                                <div className="text-sm text-[#464646]">{causeList.date}</div>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="px-4 pb-4">
                          <p className="text-sm text-[#464646] line-clamp-3">{causeList.description}</p>
                        </div>
                      </div>

                      <div className={`w-full ${getBackgroundColor(causeList.courtType)}`}>
                        <div className="flex items-center gap-2 pt-6">
                          <Link 
                            href={`/cause-lists/${causeList.id}/read`}
                            className="h-9 flex items-center px-3 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors text-sm font-semibold"
                          >
                            Read online
                            <svg className="ml-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 2.66667H6C6.70724 2.66667 7.38552 2.94762 7.88562 3.44772C8.38572 3.94781 8.66667 4.62609 8.66667 5.33334V14.6667C8.66667 14.1362 8.456 13.6275 8.08093 13.2525C7.70587 12.8774 7.19713 12.6667 6.66667 12.6667H2V2.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 2.66667H10C9.29276 2.66667 8.61448 2.94762 8.11438 3.44772C7.61428 3.94781 7.33334 4.62609 7.33334 5.33334V14.6667C7.33334 14.1362 7.544 13.6275 7.91907 13.2525C8.29413 12.8774 8.80287 12.6667 9.33334 12.6667H14V2.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
                          <Link 
                            href={`/cause-lists/${causeList.id}/download`}
                            className="h-9 flex items-center px-3 bg-[#01292D] text-white hover:bg-[#064E55] transition-colors text-sm font-semibold"
                          >
                            Download
                            <svg className="ml-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
                        </div>
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
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 