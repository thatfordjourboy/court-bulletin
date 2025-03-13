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
            <button className="text-[#FF6B6B] underline decoration-1 hover:opacity-80 mb-6">Reset all</button>
            
            {/* Filter by year */}
            <div className="mb-6">
              <h3 className="text-[20px] font-medium mb-4">Filter by year</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Years"
                  className="w-full border border-[#E5E7EB] rounded p-3 pr-10 text-gray-500 placeholder-gray-400"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg 
                    className="w-6 h-6 text-[#01292D]" 
                    viewBox="0 0 24 24" 
                    fill="none"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 2L8 6M16 2L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#E5E7EB] mb-6" />

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