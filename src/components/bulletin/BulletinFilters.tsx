'use client';

import { useState } from 'react';

interface BulletinFiltersProps {
  onDateChange: (date: string) => void;
  onSortChange: (sort: 'relevance' | 'newest' | 'oldest') => void;
  onReset: () => void;
  selectedDate: string;
  selectedSort: 'relevance' | 'newest' | 'oldest';
}

const BulletinFilters = ({
  onDateChange,
  onSortChange,
  onReset,
  selectedDate,
  selectedSort
}: BulletinFiltersProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="w-full lg:w-[250px] h-[399px] bg-[#F3F5F8] p-5 flex flex-col lg:sticky lg:top-6">
      <button 
        onClick={onReset}
        className="text-[#FF6B6B] underline decoration-1 hover:opacity-80 mb-3 text-left"
      >
        Reset all
      </button>
      
      {/* Filter by date */}
      <div className="w-[202px] pb-5 mb-[8px] border-b border-[#01292D] border-opacity-20">
        <h3 className="text-base font-['Inter'] tracking-[0px] font-bold mb-3">Filter by date</h3>
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-[202px] h-[33px] border border-[#E5E7EB] rounded px-3 py-[6px] text-gray-500 placeholder-gray-400 bg-white"
          />
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#01292D] opacity-20 mb-3" />

      {/* Sort by */}
      <div className="mb-5">
        <h3 className="text-base font-['Inter'] tracking-[0px] font-bold mb-3">Sort by</h3>
        <div className="flex flex-col gap-2">
          {['Relevance', 'Newest', 'Oldest'].map((option) => (
            <button
              key={option}
              className={`w-[202px] h-[29px] px-3 py-[6px] bg-white text-left font-['Inter'] text-sm leading-[17px] tracking-[0px] text-[#464646] font-normal ${
                selectedSort === option.toLowerCase() ? 'bg-[#F3F5F8]' : ''
              }`}
              onClick={() => onSortChange(option.toLowerCase() as any)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => onDateChange(selectedDate)}
        className="w-[202px] bg-[#01292D] text-[#8DFFDD] py-2 px-4 flex items-center justify-between rounded mb-5 mt-auto"
      >
        <span className="font-['Inter'] text-base font-light">View result</span>
        <span className="text-xl">→</span>
      </button>
    </div>
  );
};

export default BulletinFilters; 