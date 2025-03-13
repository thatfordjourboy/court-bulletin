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
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link 
            href="/"
            className="text-[#0066CC] hover:underline font-['Inter']"
          >
            Home
          </Link>
          <span className="text-[#464646] font-['Inter']">/</span>
          <Link 
            href={`/gazettes/${params.year}`}
            className="text-[#0066CC] hover:underline font-['Inter']"
          >
            Gazettes - {params.year}
          </Link>
          <span className="text-[#464646] font-['Inter']">/</span>
          <span className="text-[#464646] font-['Inter']">
            {formatDisplayDate(gazette.date)}
          </span>
        </div>

        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-[#01292D] mb-6 font-['Inter']">
            {gazette.title}
          </h1>
          
          <div className="flex flex-wrap gap-x-12 gap-y-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-[#E5F3FF] text-[#0066CC] text-sm font-medium rounded font-['Inter']">
                Date
              </span>
              <span className="text-[#1E1D1D] text-base font-['Inter']">
                {formatFullDate(gazette.date)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-[#E5F3FF] text-[#0066CC] text-sm font-medium rounded font-['Inter']">
                Volume
              </span>
              <span className="text-[#1E1D1D] text-base font-['Inter']">
                {gazette.volume}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-[#E5F3FF] text-[#0066CC] text-sm font-medium rounded font-['Inter']">
                Page
              </span>
              <span className="text-[#1E1D1D] text-base font-['Inter']">
                {gazette.page}
              </span>
            </div>
          </div>

          {/* Action buttons and search */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Action buttons */}
            <div className="flex gap-3 order-2 sm:order-1">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors font-['Inter']">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Purchase Hard Copy
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#01292D] text-white hover:bg-[#01292D]/90 transition-colors font-['Inter']">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="relative w-full sm:w-[300px] order-1 sm:order-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[#E5E7EB] p-2.5 pr-12 rounded-sm font-['Inter'] placeholder:font-['Inter']"
                placeholder="Search document content"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full w-12 bg-[#01292D] text-white flex items-center justify-center rounded-r-sm"
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
        </div>

        {/* Main content area */}
        <div className="flex gap-6">
          {/* Page thumbnails sidebar */}
          <div className="w-[200px] shrink-0">
            <h2 className="font-bold text-[#01292D] mb-4 font-['Inter']">PAGES</h2>
            <div className="flex flex-col gap-2">
              {Array.from({ length: gazette.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-full aspect-[3/4] bg-[#F3F5F8] flex items-center justify-center border ${
                    pageNum === currentPage ? 'border-[#01292D]' : 'border-transparent'
                  } hover:border-[#01292D] transition-colors`}
                >
                  <div className="relative w-full h-full">
                    <span className="absolute inset-0 flex items-center justify-center text-[#464646] font-['Inter']">
                      {pageNum}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main preview area */}
          <div className="flex-1 bg-[#F3F5F8] rounded-sm">
            <div className="p-8">
              {/* Table of Contents */}
              <div className="max-w-[800px] mx-auto bg-white p-8 shadow-sm rounded-sm">
                <h2 className="text-xl font-bold mb-8 text-center text-[#01292D] font-['Inter']">CONTENTS</h2>
                <div className="space-y-4">
                  {gazette.contents.map((item, index) => (
                    <div key={index} className="flex justify-between items-start gap-4 py-1">
                      <span className="text-[#1E1D1D] flex-1 font-['Inter']">{item.title}</span>
                      <span className="text-[#1E1D1D] whitespace-nowrap font-['Inter']">{item.page}</span>
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