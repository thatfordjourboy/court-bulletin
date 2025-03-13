'use client';

import { useState } from 'react';
import Link from 'next/link';

interface GazetteEntry {
  title: string;
  volume: number;
  page: number;
  date: string;
}

interface MonthGroup {
  month: string;
  gazettes: GazetteEntry[];
}

const tableItemStyles = "font-['Inter'] text-base leading-none text-[#1E1D1D] font-normal";

export default function GazetteYearPage({ params }: { params: { year: string } }) {
  const [searchQuery, setSearchQuery] = useState(params.year);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest'>('relevance');

  // Mock data - will come from backend
  const mockGazettes: MonthGroup[] = [
    {
      month: 'January 2023',
      gazettes: [
        { title: 'Gazette 6 January 2023', volume: 1, page: 2483, date: '2023-01-06' },
        { title: 'Gazette 9 January 2023', volume: 1, page: 2483, date: '2023-01-09' },
        { title: 'Gazette 14 January 2023', volume: 4, page: 2483, date: '2023-01-14' },
        { title: 'Gazette 17 January 2023', volume: 3, page: 2483, date: '2023-01-17' }
      ]
    },
    {
      month: 'February 2023',
      gazettes: [
        { title: 'Gazette 3 February 2023', volume: 1, page: 2484, date: '2023-02-03' },
        { title: 'Gazette 10 February 2023', volume: 2, page: 2484, date: '2023-02-10' },
        { title: 'Gazette 17 February 2023', volume: 1, page: 2484, date: '2023-02-17' }
      ]
    },
    {
      month: 'March 2023',
      gazettes: [
        { title: 'Gazette 3 March 2023', volume: 1, page: 2485, date: '2023-03-03' },
        { title: 'Gazette 10 March 2023', volume: 2, page: 2485, date: '2023-03-10' },
        { title: 'Gazette 17 March 2023', volume: 3, page: 2485, date: '2023-03-17' },
        { title: 'Gazette 24 March 2023', volume: 1, page: 2485, date: '2023-03-24' }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb and back navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link 
          href="/"
          className="inline-flex items-center text-[#0066CC] hover:underline"
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
      </div>

      {/* Header section with title and search */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#01292D]">
              Gazettes - {params.year}
            </h1>
            <span className="bg-[#01292D] text-white px-3 py-1 rounded text-sm">
              53 gazettes
            </span>
          </div>
          <div className="relative w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#E5E7EB] p-2 pr-12"
              placeholder="Search..."
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
        </div>

        {/* Main content grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-[250px] h-[399px] bg-[#F3F5F8] p-6 flex flex-col lg:sticky lg:top-6 order-2 lg:order-1">
            <button className="text-[#FF6B6B] underline decoration-1 hover:opacity-80 mb-4 text-left">Reset all</button>
            
            {/* Filter by year */}
            <div className="mb-6">
              <h3 className="text-base font-['Inter'] tracking-[0px] font-medium mb-4">Filter by year</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Years"
                  className="w-[202px] h-[33px] border border-[#E5E7EB] rounded px-3 py-[6px] text-gray-500 placeholder-gray-400 bg-white flex justify-between"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.375 18.25C1.89375 18.25 1.48177 18.0786 1.13906 17.7359C0.796354 17.3932 0.625 16.9812 0.625 16.5V4.25C0.625 3.76875 0.796354 3.35677 1.13906 3.01406C1.48177 2.67135 1.89375 2.5 2.375 2.5H3.25V0.75H5V2.5H12V0.75H13.75V2.5H14.625C15.1062 2.5 15.5182 2.67135 15.8609 3.01406C16.2036 3.35677 16.375 3.76875 16.375 4.25V16.5C16.375 16.9812 16.2036 17.3932 15.8609 17.7359C15.5182 18.0786 15.1062 18.25 14.625 18.25H2.375ZM2.375 16.5H14.625V7.75H2.375V16.5ZM2.375 6H14.625V4.25H2.375V6ZM8.5 11.25C8.25208 11.25 8.04427 11.1661 7.87656 10.9984C7.70885 10.8307 7.625 10.6229 7.625 10.375C7.625 10.1271 7.70885 9.91927 7.87656 9.75156C8.04427 9.58385 8.25208 9.5 8.5 9.5C8.74792 9.5 8.95573 9.58385 9.12344 9.75156C9.29115 9.91927 9.375 10.1271 9.375 10.375C9.375 10.6229 9.29115 10.8307 9.12344 10.9984C8.95573 11.1661 8.74792 11.25 8.5 11.25ZM5 11.25C4.75208 11.25 4.54427 11.1661 4.37656 10.9984C4.20885 10.8307 4.125 10.6229 4.125 10.375C4.125 10.1271 4.20885 9.91927 4.37656 9.75156C4.54427 9.58385 4.75208 9.5 5 9.5C5.24792 9.5 5.45573 9.58385 5.62344 9.75156C5.79115 9.91927 5.875 10.1271 5.875 10.375C5.875 10.6229 5.79115 10.8307 5.62344 10.9984C5.45573 11.1661 5.24792 11.25 5 11.25ZM12 11.25C11.7521 11.25 11.5443 11.1661 11.3766 10.9984C11.2089 10.8307 11.125 10.6229 11.125 10.375C11.125 10.1271 11.2089 9.91927 11.3766 9.75156C11.5443 9.58385 11.7521 9.5 12 9.5C12.2479 9.5 12.4557 9.58385 12.6234 9.75156C12.7911 9.91927 12.875 10.1271 12.875 10.375C12.875 10.6229 12.7911 10.8307 12.6234 10.9984C12.4557 11.1661 12.2479 11.25 12 11.25ZM8.5 14.75C8.25208 14.75 8.04427 14.6661 7.87656 14.4984C7.70885 14.3307 7.625 14.1229 7.625 13.875C7.625 13.6271 7.70885 13.4193 7.87656 13.2516C8.04427 13.0839 8.25208 13 8.5 13C8.74792 13 8.95573 13.0839 9.12344 13.2516C9.29115 13.4193 9.375 13.6271 9.375 13.875C9.375 14.1229 9.29115 14.3307 9.12344 14.4984C8.95573 14.6661 8.74792 14.75 8.5 14.75ZM5 14.75C4.75208 14.75 4.54427 14.6661 4.37656 14.4984C4.20885 14.3307 4.125 14.1229 4.125 13.875C4.125 13.6271 4.20885 13.4193 4.37656 13.2516C4.54427 13.0839 4.75208 13 5 13C5.24792 13 5.45573 13.0839 5.62344 13.2516C5.79115 13.4193 5.875 13.6271 5.875 13.875C5.875 14.1229 5.79115 14.3307 5.62344 14.4984C5.45573 14.6661 5.24792 14.75 5 14.75ZM12 14.75C11.7521 14.75 11.5443 14.6661 11.3766 14.4984C11.2089 14.3307 11.125 14.1229 11.125 13.875C11.125 13.6271 11.2089 13.4193 11.3766 13.2516C11.5443 13.0839 11.7521 13 12 13C12.2479 13 12.4557 13.0839 12.6234 13.2516C12.7911 13.4193 12.875 13.6271 12.875 13.875C12.875 14.1229 12.7911 14.3307 12.6234 14.4984C12.4557 14.6661 12.2479 14.75 12 14.75Z" fill="#01292D"/>
                </svg>

                </span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#E5E7EB] mb-4" />

            {/* Sort by */}
            <div className="mb-6">
              <h3 className="text-[20px] font-medium mb-4">Sort by</h3>
              <div className="space-y-2">
                {['Relevance', 'Newest', 'Oldest'].map((option) => (
                  <button
                    key={option}
                    className={`w-full text-left p-3 hover:bg-white rounded transition-colors ${
                      sortBy.toLowerCase() === option.toLowerCase() ? 'bg-white' : ''
                    }`}
                    onClick={() => setSortBy(option.toLowerCase() as any)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full mt-auto bg-[#01292D] text-white/90 py-3 px-4 flex items-center justify-between rounded hover:opacity-90 transition-opacity">
              <span className="text-lg font-light">View result</span>
              <span className="text-2xl">→</span>
            </button>
          </div>

          {/* Main content table */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white">
              {/* Table header */}
              <div className="grid grid-cols-12 border-b py-4 font-medium">
                <div className="col-span-6 px-4">Title</div>
                <div className="col-span-3 px-4 text-right">Volume</div>
                <div className="col-span-3 px-4 text-right">Page</div>
              </div>

              {/* Table content */}
              {mockGazettes.map((group) => (
                <div key={group.month}>
                  <div className="bg-[#F9FAFB] py-4 px-4 font-medium">
                    {group.month}
                  </div>
                  {group.gazettes.map((gazette) => {
                    const formattedDate = gazette.date.replace(/-/g, '/');
                    
                    return (
                      <Link 
                        href={`/gazettes/${params.year}/${formattedDate}`}
                        key={gazette.title}
                      >
                        <div className="grid grid-cols-12 border-b hover:bg-gray-50 cursor-pointer">
                          <div className={`col-span-6 px-4 py-[10px] text-[#1E1D1D] hover:text-[#0066CC] hover:underline ${tableItemStyles}`}>
                            {gazette.title}
                          </div>
                          <div className={`col-span-3 px-4 py-[10px] text-right ${tableItemStyles}`}>
                            {gazette.volume}
                          </div>
                          <div className={`col-span-3 px-4 py-[10px] text-right ${tableItemStyles}`}>
                            {gazette.page}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 