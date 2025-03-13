'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '@/utils/animations';
import SearchBar from '@/components/layout/SearchBar';
import Pagination from '@/components/gazettes/Pagination';
import GazetteCard from '@/components/gazettes/GazetteCard';
import { gazetteYears, type GazetteYear } from '@/data/mockGazettes';

const ITEMS_PER_PAGE = 8;

const GazettesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredGazettes, setFilteredGazettes] = useState<GazetteYear[]>(gazetteYears);

  // Filter gazettes based on search query
  useEffect(() => {
    const filtered = gazetteYears.filter(gazette => 
      gazette.year.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGazettes(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredGazettes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGazettes = filteredGazettes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle month click
  const handleMonthClick = (year: string, month: string, count: number) => {
    if (count > 0) {
      // TODO: Navigate to gazette list for specific month
      console.log(`Viewing gazettes for ${month} ${year}`);
    }
  };

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
          <motion.h1 
            className="text-4xl font-bold text-[#01292D]"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Gazettes
          </motion.h1>

          {/* Search bar */}
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={() => {/* Additional search logic if needed */}}
          />
        </div>

        {/* Gazette grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {paginatedGazettes.map((gazette, index) => (
            <GazetteCard
              key={gazette.year}
              year={gazette.year}
              count={gazette.count}
              quarters={gazette.quarters}
              isRecent={index < 2}
              onMonthClick={handleMonthClick}
            />
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
};

export default GazettesPage;