'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface YearPickerProps {
  years: string[];
  selectedYear: string | null;
  onChange: (year: string | null) => void;
  onClose: () => void;
  isOpen: boolean;
}

const YEARS_PER_GROUP = 10;

export default function YearPicker({ 
  years, 
  selectedYear, 
  onChange, 
  onClose,
  isOpen 
}: YearPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Sort years in descending order to show newest first
  const sortedYears = [...years].sort((a, b) => parseInt(b) - parseInt(a));
  
  // Group years by decades dynamically
  const groupedYears = sortedYears.reduce((groups, year) => {
    const yearNum = parseInt(year);
    const decade = Math.floor(yearNum / YEARS_PER_GROUP) * YEARS_PER_GROUP;
    if (!groups[decade]) {
      groups[decade] = [];
    }
    groups[decade].push(year);
    return groups;
  }, {} as Record<number, string[]>);

  // Filter years based on search query
  const filteredGroups = Object.entries(groupedYears)
    .filter(([decade, yearsInDecade]) => 
      yearsInDecade.some(year => 
        year.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0])); // Sort decades newest first

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-sm shadow-lg overflow-hidden"
          style={{ zIndex: 1000 }}
        >
          {/* Search input */}
          <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search year..."
                className="w-full h-8 px-8 text-sm border border-[#E5E7EB] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#64CCC5]"
              />
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Years list */}
          <div className="max-h-[300px] overflow-y-auto">
            {filteredGroups.length > 0 ? (
              filteredGroups.map(([decade, yearsInDecade]) => {
                const filteredYears = yearsInDecade.filter(year =>
                  year.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (filteredYears.length === 0) return null;

                const decadeEnd = parseInt(decade) + 9;
                const decadeLabel = `${decade}–${decadeEnd}`;

                return (
                  <div key={decade} className="border-b border-[#E5E7EB] last:border-b-0">
                    <div className="px-3 py-2 bg-[#F9FAFB] text-xs font-medium text-[#6B7280]">
                      {decadeLabel}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3">
                      {filteredYears.map(year => (
                        <motion.button
                          key={year}
                          onClick={() => {
                            onChange(selectedYear === year ? null : year);
                            onClose();
                          }}
                          className={`relative h-[34px] text-left px-2.5 flex items-center text-[13px] leading-[100%] tracking-[0%] font-normal font-['Inter'] text-[#464646] hover:bg-[#F9FAFB] ${
                            selectedYear === year ? 'border-l-[3px] border-l-[#64CCC5] bg-[#F9FAFB]' : ''
                          }`}
                          whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10">{year}</span>
                          <motion.div
                            initial={false}
                            animate={{
                              opacity: selectedYear === year ? 1 : 0
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-[#64CCC5] opacity-[0.03]"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                {years.length === 0 ? 'No years available' : 'No years match your search'}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 