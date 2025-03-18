'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YearPicker from './YearPicker';

interface GazetteFiltersProps {
  onYearChange: (year: string | null) => void;
  onSortChange: (sort: 'relevance' | 'newest' | 'oldest' | null) => void;
  onReset: () => void;
  selectedYear: string | null;
  selectedSort: 'relevance' | 'newest' | 'oldest' | null;
  isLoading?: boolean;
  years: string[];
}

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' }
] as const;

const buttonVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0 0 0 rgba(0,0,0,0)"
  },
  hover: { 
    scale: 1.002,
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  },
  tap: { scale: 0.98 }
};

export default function GazetteFilters({
  onYearChange,
  onSortChange,
  onReset,
  selectedYear,
  selectedSort,
  isLoading = false,
  years
}: GazetteFiltersProps) {
  const [showYearPicker, setShowYearPicker] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && buttonRef.current && 
          !dropdownRef.current.contains(event.target as Node) && 
          !buttonRef.current.contains(event.target as Node)) {
        setShowYearPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col"
    >
      <button 
        onClick={onReset}
        className="text-[#FF4444] underline decoration-1 hover:opacity-80 mb-6 text-left text-sm"
      >
        Reset all
      </button>

      {/* Filter by year */}
      <div className="pb-4 mb-4 border-b-[3px] border-[#01292D] border-opacity-20">
        <h3 className="text-[#1E1D1D] text-[16px] font-medium mb-3">Filter by year</h3>
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setShowYearPicker(!showYearPicker)}
            className="w-full h-[34px] text-left px-2.5 flex items-center justify-between text-[13px] leading-[100%] tracking-[0%] font-normal font-['Inter'] text-[#464646] bg-white border border-[#E5E7EB] transition-all duration-200 rounded-sm"
          >
            <span>{selectedYear || 'Select year'}</span>
            <motion.svg 
              animate={{ rotate: showYearPicker ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4 text-[#464646]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
          <YearPicker
            years={years}
            selectedYear={selectedYear}
            onChange={onYearChange}
            onClose={() => setShowYearPicker(false)}
            isOpen={showYearPicker}
          />
        </div>
      </div>

      {/* Sort by */}
      <div className="mb-6">
        <h3 className="text-[#1E1D1D] text-[16px] font-medium mb-3">Sort by</h3>
        <div className="flex flex-col gap-1.5">
          {sortOptions.map((option) => (
            <motion.button
              key={option.value}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onSortChange(selectedSort === option.value ? null : option.value)}
              className={`relative w-full h-[34px] text-left px-2.5 flex items-center text-[13px] leading-[100%] tracking-[0%] font-normal font-['Inter'] text-[#464646] bg-white border border-[#E5E7EB] transition-all duration-200 rounded-sm overflow-hidden ${
                selectedSort === option.value ? 'border-l-[3px] border-l-[#64CCC5] bg-[#F9FAFB]' : ''
              }`}
            >
              <span className="relative z-10">{option.label}</span>
              <motion.div
                initial={false}
                animate={{
                  opacity: selectedSort === option.value ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-[#64CCC5] opacity-[0.03]"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* View result button */}
      <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className={`group w-full bg-[#01292D] text-[#64CCC5] h-[34px] flex items-center justify-center gap-2 hover:bg-[#064E55] transition-all rounded-sm relative overflow-hidden ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="relative h-0.5 w-full bg-[#64CCC5] bg-opacity-20">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-[#64CCC5]"
            />
          </div>
        ) : (
          <>
            <span>View result</span>
            <motion.svg 
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.6667 5.83334L15.8333 10L11.6667 14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </>
        )}
      </motion.button>
    </motion.div>
  );
} 