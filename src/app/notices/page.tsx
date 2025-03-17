'use client';

import Link from 'next/link';

export default function NoticesPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link 
          href="/"
          className="inline-flex items-center text-[#0066CC] mb-8 hover:underline"
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

        {/* Header section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <h1 className="text-4xl font-bold text-[#01292D]">
            Notices
          </h1>
        </div>

        {/* Content section */}
        <div className="bg-white p-8 rounded-sm shadow-sm">
          <p className="text-[#464646]">Coming soon...</p>
        </div>
      </div>
    </main>
  );
} 