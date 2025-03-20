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
    limit: 8,
    archived: false
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
                      setCurrentPage(1); // Reset to first page on search
                    }
                  }}
                  className="w-full h-[46px] border border-[#E5E7EB] px-4 pr-[46px] py-2.5 bg-white"
                  placeholder="Search cause lists..."
                />
                <button 
                  id="searchButton"
                  className="absolute right-0 top-0 h-full w-[46px] bg-[#01292D] text-white flex items-center justify-center transition-transform duration-100"
                  onClick={() => {
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
                            <svg className="ml-1" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.29102 6.98317H3.04102L3.42435 5.88317H5.15768L5.55768 6.98317H6.29102L4.67435 2.68317H3.90768L2.29102 6.98317ZM3.64102 5.2665L4.27435 3.48317H4.30768L4.94102 5.2665H3.64102ZM8.95768 4.09984V2.9665C9.32435 2.81095 9.69935 2.69428 10.0827 2.6165C10.466 2.53873 10.8688 2.49984 11.291 2.49984C11.5799 2.49984 11.8632 2.52206 12.141 2.5665C12.4188 2.61095 12.691 2.6665 12.9577 2.73317V3.79984C12.691 3.69984 12.4216 3.62484 12.1493 3.57484C11.8771 3.52484 11.591 3.49984 11.291 3.49984C10.8688 3.49984 10.4632 3.55262 10.0743 3.65817C9.68546 3.76373 9.31324 3.91095 8.95768 4.09984ZM8.95768 7.7665V6.63317C9.32435 6.47761 9.69935 6.36095 10.0827 6.28317C10.466 6.20539 10.8688 6.1665 11.291 6.1665C11.5799 6.1665 11.8632 6.18873 12.141 6.23317C12.4188 6.27762 12.691 6.33317 12.9577 6.39984V7.4665C12.691 7.3665 12.4216 7.2915 12.1493 7.2415C11.8771 7.1915 11.591 7.1665 11.291 7.1665C10.8688 7.1665 10.4632 7.2165 10.0743 7.3165C9.68546 7.4165 9.31324 7.5665 8.95768 7.7665ZM8.95768 5.93317V4.79984C9.32435 4.64428 9.69935 4.52762 10.0827 4.44984C10.466 4.37206 10.8688 4.33317 11.291 4.33317C11.5799 4.33317 11.8632 4.35539 12.141 4.39984C12.4188 4.44428 12.691 4.49984 12.9577 4.5665V5.63317C12.691 5.53317 12.4216 5.45817 12.1493 5.40817C11.8771 5.35817 11.591 5.33317 11.291 5.33317C10.8688 5.33317 10.4632 5.38595 10.0743 5.4915C9.68546 5.59706 9.31324 5.74428 8.95768 5.93317ZM3.95768 8.1665C4.4799 8.1665 4.98824 8.22484 5.48268 8.3415C5.97713 8.45817 6.46879 8.63317 6.95768 8.8665V2.29984C6.50213 2.03317 6.01879 1.83317 5.50768 1.69984C4.99657 1.5665 4.4799 1.49984 3.95768 1.49984C3.55768 1.49984 3.16046 1.53873 2.76602 1.6165C2.37157 1.69428 1.99102 1.81095 1.62435 1.9665V8.5665C2.01324 8.43317 2.39935 8.33317 2.78268 8.2665C3.16602 8.19984 3.55768 8.1665 3.95768 8.1665ZM8.29102 8.8665C8.7799 8.63317 9.27157 8.45817 9.76602 8.3415C10.2605 8.22484 10.7688 8.1665 11.291 8.1665C11.691 8.1665 12.0827 8.19984 12.466 8.2665C12.8493 8.33317 13.2355 8.43317 13.6243 8.5665V1.9665C13.2577 1.81095 12.8771 1.69428 12.4827 1.6165C12.0882 1.53873 11.691 1.49984 11.291 1.49984C10.7688 1.49984 10.2521 1.5665 9.74102 1.69984C9.22991 1.83317 8.74657 2.03317 8.29102 2.29984V8.8665ZM7.62435 10.8332C7.09102 10.4109 6.51324 10.0832 5.89102 9.84984C5.26879 9.6165 4.62435 9.49984 3.95768 9.49984C3.49102 9.49984 3.03268 9.56095 2.58268 9.68317C2.13268 9.80539 1.70213 9.97762 1.29102 10.1998C1.05768 10.3221 0.832682 10.3165 0.616016 10.1832C0.399349 10.0498 0.291016 9.85539 0.291016 9.59984V1.5665C0.291016 1.44428 0.321571 1.32762 0.382682 1.2165C0.443793 1.10539 0.53546 1.02206 0.657682 0.966504C1.16879 0.699837 1.70213 0.499837 2.25768 0.366504C2.81324 0.233171 3.3799 0.166504 3.95768 0.166504C4.60213 0.166504 5.23268 0.249837 5.84935 0.416504C6.46602 0.583171 7.05768 0.833171 7.62435 1.1665C8.19102 0.833171 8.78268 0.583171 9.39935 0.416504C10.016 0.249837 10.6466 0.166504 11.291 0.166504C11.8688 0.166504 12.4355 0.233171 12.991 0.366504C13.5466 0.499837 14.0799 0.699837 14.591 0.966504C14.7132 1.02206 14.8049 1.10539 14.866 1.2165C14.9271 1.32762 14.9577 1.44428 14.9577 1.5665V9.59984C14.9577 9.85539 14.8493 10.0498 14.6327 10.1832C14.416 10.3165 14.191 10.3221 13.9577 10.1998C13.5466 9.97762 13.116 9.80539 12.666 9.68317C12.216 9.56095 11.7577 9.49984 11.291 9.49984C10.6243 9.49984 9.97991 9.6165 9.35768 9.84984C8.73546 10.0832 8.15768 10.4109 7.62435 10.8332Z" fill="currentColor"/>
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