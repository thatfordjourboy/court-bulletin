'use client';

import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages = [];
    
    // For 7 or fewer pages, show all numbers
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    
    // Always show first page
    pages.push(1);
    
    // Handle ellipsis and numbers around current page
    if (currentPage <= 4) {
      // If current page is near start, show first 5 pages + ellipsis + last page
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // If current page is near end, show first page + ellipsis + last 5 pages
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If current page is in middle, show first + ellipsis + current-1/current/current+1 + ellipsis + last
      pages.push('...');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div>
      {/* Horizontal line */}
      <div className="w-full h-px bg-[#E5E7EB] mb-8" />
      
      {/* Pagination controls */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Previous button */}
        <motion.button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center text-[#01292D] ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#71CED1]'}`}
        >
          <svg 
            className="w-4 h-4 mr-2" 
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
          Previous
        </motion.button>

        {/* Page numbers */}
        <div className="flex items-center gap-2">
          {renderPageNumbers().map((page, index) => (
            <motion.button
              key={`${page}-${index}`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center transition-colors
                ${currentPage === page
                  ? 'bg-[#01292D] text-white'
                  : typeof page === 'number'
                    ? 'text-[#01292D] hover:text-[#71CED1]'
                    : 'text-[#667085] cursor-default'
                }`}
            >
              {page}
            </motion.button>
          ))}
        </div>

        {/* Next button */}
        <motion.button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center text-[#01292D] ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#71CED1]'}`}
        >
          Next
          <svg 
            className="w-4 h-4 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Pagination; 