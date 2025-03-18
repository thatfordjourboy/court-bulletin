'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from 'framer-motion';

interface NoticeFiltersProps {
  onDateChange: (date: string | null) => void;
  onNoticeTypeChange: (type: string | null) => void;
  onCourtTypeChange: (type: string | null) => void;
  onSortChange: (sort: 'relevance' | 'newest' | 'oldest' | null) => void;
  onReset: () => void;
  selectedDate: string | null;
  selectedNoticeType: string | null;
  selectedCourtType: string | null;
  selectedSort: 'relevance' | 'newest' | 'oldest' | null;
  isLoading?: boolean;
}

const noticeTypes = [
  'Substituted Service Notices',
  'Judicial Notices',
  'General Notices',
  'Practice Direction',
  'Estate Notices',
  'Announcements'
];

const courtTypes = [
  'Supreme Court',
  'High Court',
  'Circuit Court',
  'District Court',
  'Court of Appeal'
];

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

export default function NoticeFilters({
  onDateChange,
  onNoticeTypeChange,
  onCourtTypeChange,
  onSortChange,
  onReset,
  selectedDate,
  selectedNoticeType,
  selectedCourtType,
  selectedSort,
  isLoading = false
}: NoticeFiltersProps) {
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [date, setDate] = useState<Date | null>(selectedDate ? new Date(selectedDate) : null);
  const [animatingButton, setAnimatingButton] = useState<string | null>(null);

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    onDateChange(date ? date.toISOString() : null);
  };

  const handleButtonClick = (type: string, handler: () => void) => {
    setAnimatingButton(type);
    handler();
    setTimeout(() => setAnimatingButton(null), 200);
  };

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

      {/* Filter by date */}
      <div className="pb-4 mb-4 border-b-[3px] border-[#01292D] border-opacity-20">
        <h3 className="text-[#1E1D1D] text-[16px] font-medium mb-3">Filter by date</h3>
        <motion.div 
          className="relative"
          initial="initial"
          whileHover="hover"
          variants={buttonVariants}
        >
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            dateFormat="dd MMMM yyyy"
            placeholderText="Select date"
            className="w-full h-[34px] px-2.5 pr-12 border border-[#E5E7EB] bg-white text-[13px] leading-[100%] tracking-[0%] text-[#464646] rounded-sm cursor-pointer transition-all duration-200 hover:border-[#64CCC5] focus:outline-none focus:ring-1 focus:ring-[#64CCC5]"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={10}
            scrollableYearDropdown
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <motion.svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              animate={{ scale: date ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M15.8333 3.33334H4.16667C3.24619 3.33334 2.5 4.07954 2.5 5.00001V16.6667C2.5 17.5872 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5872 17.5 16.6667V5.00001C17.5 4.07954 16.7538 3.33334 15.8333 3.33334Z" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3333 1.66666V4.99999" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66667 1.66666V4.99999" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 8.33334H17.5" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </div>
          {date && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[#64CCC5] opacity-[0.03] pointer-events-none"
            />
          )}
        </motion.div>
      </div>

      {/* Filter by notices */}
      <div className="pb-4 mb-4 border-b-[3px] border-[#01292D] border-opacity-20">
        <h3 className="text-[#1E1D1D] text-[16px] font-medium mb-3">Filter by notices</h3>
        <div className="flex flex-col gap-1.5">
          {noticeTypes.map((type) => (
            <motion.button
              key={type}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onNoticeTypeChange(selectedNoticeType === type ? null : type)}
              className={`relative w-full h-[34px] text-left px-2.5 flex items-center text-[13px] leading-[100%] tracking-[0%] font-normal font-['Inter'] text-[#464646] bg-white border border-[#E5E7EB] transition-all duration-200 rounded-sm overflow-hidden ${
                selectedNoticeType === type ? 'border-l-[3px] border-l-[#64CCC5] bg-[#F9FAFB]' : ''
              }`}
            >
              <span className="relative z-10">{type}</span>
              <motion.div
                initial={false}
                animate={{
                  opacity: selectedNoticeType === type ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-[#64CCC5] opacity-[0.03]"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Filter by court type */}
      <div className="pb-4 mb-4 border-b-[3px] border-[#01292D] border-opacity-20">
        <h3 className="text-[#1E1D1D] text-[16px] font-medium mb-3">Filter by court type</h3>
        <div className="flex flex-col gap-1.5">
          {courtTypes.map((type) => (
            <motion.button
              key={type}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onCourtTypeChange(selectedCourtType === type ? null : type)}
              className={`relative w-full h-[34px] text-left px-2.5 flex items-center justify-between text-[13px] leading-[100%] tracking-[0%] font-normal font-['Inter'] text-[#464646] bg-white border border-[#E5E7EB] transition-all duration-200 rounded-sm overflow-hidden ${
                selectedCourtType === type ? 'border-l-[3px] border-l-[#64CCC5] bg-[#F9FAFB]' : ''
              }`}
            >
              <span className="relative z-10">{type}</span>
              {type === 'High Court' && (
                <motion.svg 
                  animate={{ rotate: selectedCourtType === type ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4 text-[#464646] relative z-10" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              )}
              <motion.div
                initial={false}
                animate={{
                  opacity: selectedCourtType === type ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-[#64CCC5] opacity-[0.03]"
              />
            </motion.button>
          ))}
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
        onClick={() => {/* Implement view results logic */}}
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