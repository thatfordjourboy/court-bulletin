'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockBulletins, type BulletinDocument } from '@/data/mockBulletins';

export default function BulletinReaderPage({
  params
}: {
  params: { id: string }
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [bulletin, setBulletin] = useState<BulletinDocument | null>(null);

  // Find the bulletin based on ID
  useEffect(() => {
    const found = mockBulletins.find(b => b.id === params.id);
    if (found) {
      setBulletin(found);
    }
  }, [params.id]);

  if (!bulletin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bulletin not found</h1>
          <Link 
            href="/bulletin"
            className="text-[#0066CC] hover:underline"
          >
            Back to Bulletins
          </Link>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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
            href="/bulletin"
            className="text-[#0066CC] hover:underline font-['Inter']"
          >
            Bulletins
          </Link>
          <span className="text-[#464646] font-['Inter']">/</span>
          <span className="text-[#464646] font-['Inter']">
            {bulletin.title}
          </span>
        </div>

        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-[#01292D] mb-6 font-['Inter']">
            {bulletin.title}
          </h1>
          
          <div className="flex flex-wrap gap-x-12 gap-y-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-[#E5F3FF] text-[#0066CC] text-sm font-medium rounded font-['Inter']">
                Date
              </span>
              <span className="text-[#1E1D1D] text-base font-['Inter']">
                {formatDate(bulletin.date)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-[#E5F3FF] text-[#0066CC] text-sm font-medium rounded font-['Inter']">
                Document type
              </span>
              <span className="text-[#1E1D1D] text-base font-['Inter']">
                {bulletin.documentType}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#01292D] text-[#8DFFDD] hover:bg-[#064e55] transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 2.5H3.33333L3.58333 4.16667M3.58333 4.16667L4.58333 11.6667H15.4167L16.4167 4.16667H3.58333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.5 15.8333C7.5 16.2936 7.12132 16.6667 6.66667 16.6667C6.21201 16.6667 5.83333 16.2936 5.83333 15.8333C5.83333 15.3731 6.21201 15 6.66667 15C7.12132 15 7.5 15.3731 7.5 15.8333Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M15 15.8333C15 16.2936 14.6213 16.6667 14.1667 16.6667C13.712 16.6667 13.3333 16.2936 13.3333 15.8333C13.3333 15.3731 13.712 15 14.1667 15C14.6213 15 15 15.3731 15 15.8333Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Purchase Hard Copy
            </button>
          </div>
        </div>

        {/* Document viewer */}
        <div className="flex gap-6">
          {/* Page thumbnails sidebar */}
          <div className="w-[200px] shrink-0">
            <h2 className="font-bold text-[#01292D] mb-4 font-['Inter']">PAGES</h2>
            <div className="flex flex-col gap-2">
              {Array.from({ length: bulletin.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
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
              <div className="max-w-[800px] mx-auto bg-white p-8 shadow-sm rounded-sm">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{bulletin.title}</h3>
                  <p className="text-gray-600">Page {currentPage} of {bulletin.totalPages}</p>
                  <p className="text-sm text-gray-500 mt-4">PDF viewer will be implemented here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 