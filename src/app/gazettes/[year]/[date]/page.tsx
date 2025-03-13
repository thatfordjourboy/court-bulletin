'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface GazetteContent {
  title: string;
  date: string;
  volume: number;
  page: number;
  totalPages: number;
  contents: Array<{
    title: string;
    page: number;
  }>;
}

export default function GazettePreviewPage({
  params,
}: {
  params: { year: string; date: string };
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [gazette, setGazette] = useState<GazetteContent>({
    title: 'Gazette',
    date: params.date,
    volume: 1,
    page: 2483,
    totalPages: 4,
    contents: [
      { title: 'Notice of Publication of a Public Holiday', page: 2480 },
      { title: 'Notice of Publication of a Legislative Instrument', page: 2480 },
      { title: 'Notice of Publication of Executive Instruments', page: 2480 },
      { title: 'Notice of Publication of an Official Bulletin', page: 2480 },
      { title: 'Licence for the Celebration of Marriages—Public Place of Worship (Harvest City Church, Shiashie, Accra)', page: 2481 },
      { title: 'Licence for the Celebration of Marriages—Public Place of Worship (Jesus Feeds Fellowship and Ministries International, Ostrich Link, Rama Area, Community 11,Tema)', page: 2481 },
    ]
  });

  useEffect(() => {
    setGazette(prev => ({
      ...prev,
      date: params.date,
      title: `Gazette ${formatDisplayDate(params.date)}`
    }));
  }, [params.date]);

  // Format the date for display
  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format the full date (including weekday) for metadata
  const formatFullDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Handle page change
  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Top navigation and metadata section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link 
            href="/"
            className="text-[#0066CC] hover:underline"
          >
            Home
          </Link>
          <span className="text-[#464646]">/</span>
          <Link 
            href={`/gazettes/${params.year}`}
            className="text-[#0066CC] hover:underline"
          >
            Gazettes - {params.year}
          </Link>
          <span className="text-[#464646]">/</span>
          <span className="text-[#464646]">
            {formatDisplayDate(gazette.date)}
          </span>
        </div>

        {/* Title and metadata */}
        <div className="mt-10 flex flex-col gap-6">
          <h1 className="text-[32px] font-bold text-[#01292D]">
            {gazette.title}
          </h1>
          
          <div className="flex flex-wrap gap-x-16 gap-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#E5F3FF] text-[#0066CC] text-sm font-medium rounded-sm">
                Date
              </span>
              <span className="text-[#1E1D1D] text-base">
                {formatFullDate(gazette.date)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#E5F3FF] text-[#0066CC] text-sm font-medium rounded-sm">
                Volume
              </span>
              <span className="text-[#1E1D1D] text-base">
                {gazette.volume}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#E5F3FF] text-[#0066CC] text-sm font-medium rounded-sm">
                Page
              </span>
              <span className="text-[#1E1D1D] text-base">
                {gazette.page}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button className="px-4 py-2 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors flex items-center gap-2">
              Purchase Hard Copy
              <span>→</span>
            </button>
            <button className="px-4 py-2 bg-[#01292D] text-[#8DFFDD] hover:bg-[#01292D]/90 transition-colors flex items-center gap-2">
              Download
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-end mb-6">
          <form onSubmit={handleSearch} className="relative w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#E5E7EB] p-2 pr-12"
              placeholder="Search document content"
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
        </div>

        <div className="flex gap-8">
          {/* Page thumbnails sidebar */}
          <div className="w-[202px] flex flex-col gap-4">
            <h2 className="font-bold text-[#01292D]">PAGES</h2>
            <div className="flex flex-col gap-3">
              {Array.from({ length: gazette.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-full aspect-[3/4] bg-[#F3F5F8] flex items-center justify-center border ${
                    pageNum === currentPage ? 'border-[#01292D]' : 'border-transparent'
                  } hover:border-[#01292D] transition-colors`}
                >
                  <div className="relative w-full h-full">
                    {/* Page preview will go here */}
                    <span className="absolute inset-0 flex items-center justify-center text-[#464646]">
                      {pageNum}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main preview area */}
          <div className="flex-1">
            <div className="bg-[#F3F5F8] min-h-[800px] p-8">
              {/* Table of Contents */}
              <div className="max-w-[800px] mx-auto bg-white p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-center">CONTENTS</h2>
                <div className="space-y-4">
                  {gazette.contents.map((item, index) => (
                    <div key={index} className="flex justify-between items-start gap-4">
                      <span className="text-[#1E1D1D] flex-1">{item.title}</span>
                      <span className="text-[#1E1D1D] whitespace-nowrap">{item.page}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 