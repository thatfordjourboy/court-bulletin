'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArchiveFilters from '@/components/archives/ArchiveFilters';
import ArchiveNavigation from '@/components/archives/ArchiveNavigation';

const ArchiveCauseListsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCourtType, setSelectedCourtType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isExplicitSearch, setIsExplicitSearch] = useState(false);

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedDate('');
    setSelectedCourtType('');
    setSelectedRegion('');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-1 sm:px-6 lg:px-8">
          <ArchiveNavigation />
          
          <div className="flex gap-32">
            {/* Sidebar */}
            <div className="w-[240px] shrink-0">
              <ArchiveFilters
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
                      }
                    }}
                    className="w-full h-[46px] border border-[#E5E7EB] px-4 pr-[46px] py-2.5 bg-white"
                    placeholder="Search cause list archives..."
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
                  203 results
                </div>
              </div>

              {/* Archives grid */}
              <div className="grid grid-cols-1 gap-6">
                {/* Archive Item */}
                <div className="bg-[#F8F9FB] flex flex-col">
                  <div className="p-4">
                    <div className="h-[100px]">
                      <h2 className="text-[#01292D] text-[22px] leading-[150%] tracking-[-0.02em] font-bold font-['Inter']">
                        Supreme Court (Accra Central) Cause List
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 mb-4">
                      <div>
                        <div className="font-medium text-sm text-[#1E1D1D] mb-2">Location</div>
                        <div className="text-sm text-[#464646]">Accra</div>
                      </div>
                      <div>
                        <div className="font-medium text-sm text-[#1E1D1D] mb-2">Date</div>
                        <div className="text-sm text-[#464646]">1st - 5th, February 2021</div>
                      </div>
                    </div>

                    <p className="text-sm text-[#464646] line-clamp-3 mb-4">
                      Cause list for the general sitting of the Supreme Court for hearing cases at the Supreme Court Building at 9.30am commencing from 1st February, 2021
                    </p>

                    <div className="flex gap-4">
                      <button className="h-9 flex items-center px-3 bg-[#FFF8E7] text-[#01292D] hover:bg-[#FFE7B3] transition-colors text-sm font-semibold">
                        Read online
                        <svg className="ml-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8.66667V12C12 12.3536 11.8595 12.6928 11.6095 12.9428C11.3594 13.1929 11.0203 13.3333 10.6667 13.3333H4C3.64638 13.3333 3.30724 13.1929 3.05719 12.9428C2.80714 12.6928 2.66667 12.3536 2.66667 12V5.33333C2.66667 4.97971 2.80714 4.64057 3.05719 4.39052C3.30724 4.14048 3.64638 4 4 4H7.33333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 2.66667H13.3333V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.66667 9.33333L13.3333 2.66667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="h-9 flex items-center px-3 bg-[#01292D] text-white hover:bg-[#064E55] transition-colors text-sm font-semibold">
                        Download
                        <svg className="ml-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-between">
                <button className="flex items-center gap-2 text-[#01292D] hover:text-[#71CED1]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center bg-[#01292D] text-white">1</button>
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100">2</button>
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100">3</button>
                  <span>...</span>
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100">8</button>
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100">9</button>
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100">10</button>
                </div>
                <button className="flex items-center gap-2 text-[#01292D] hover:text-[#71CED1]">
                  Next
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ArchiveCauseListsPage; 