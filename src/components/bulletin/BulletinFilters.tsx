'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { mockBulletins } from '@/data/mockBulletins';
import { motion, AnimatePresence } from 'framer-motion';

interface BulletinFiltersProps {
  onDateChange: (date: string) => void;
  onSortChange: (sort: 'relevance' | 'newest' | 'oldest' | null) => void;
  onReset: () => void;
  selectedDate: string;
  selectedSort: 'relevance' | 'newest' | 'oldest' | null;
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
    scale: 1.005,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  tap: { scale: 0.98 }
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

const BulletinFilters = ({
  onDateChange,
  onSortChange,
  onReset,
  selectedDate,
  selectedSort
}: BulletinFiltersProps) => {
  const [date, setDate] = useState<Date | null>(selectedDate ? new Date(selectedDate) : null);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Create a Set of dates that have bulletins
  const availableDates = new Set(
    mockBulletins.map(bulletin => new Date(bulletin.date).toDateString())
  );

  // Function to determine if a date has bulletins
  const hasDataForDate = (date: Date) => {
    return availableDates.has(date.toDateString());
  };

  // Function to add custom class to dates with data
  const highlightDatesWithData = (date: Date) => {
    return hasDataForDate(date) ? 'has-cause-list' : '';
  };

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    if (date) {
      onDateChange(date.toISOString().split('T')[0]);
    } else {
      onDateChange('');
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full lg:w-[250px] bg-[#F3F5F8] p-5 flex flex-col lg:sticky lg:top-6 rounded-sm"
    >
      <style jsx global>{`
        .has-cause-list {
          position: relative;
        }
        .has-cause-list::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background-color: #64CCC5;
          border-radius: 50%;
        }
        .react-datepicker {
          z-index: 50 !important;
          position: relative;
          font-family: Inter, sans-serif;
          animation: fadeIn 0.2s ease-out;
        }
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker-popper {
          z-index: 9999 !important;
        }
        .datepicker-portal {
          position: relative;
          z-index: 9999;
        }
        .react-datepicker__day--keyboard-selected,
        .react-datepicker__day--selected {
          background-color: #01292D !important;
          color: white !important;
          font-weight: 500 !important;
          transform: scale(1.1);
          transition: all 0.2s ease;
        }
        .react-datepicker__day:hover {
          background-color: #E5E7EB !important;
          transform: scale(1.1);
          transition: all 0.2s ease;
        }
        .react-datepicker__day--keyboard-selected:hover,
        .react-datepicker__day--selected:hover {
          background-color: #064E55 !important;
          color: white !important;
        }
        .react-datepicker__month-select,
        .react-datepicker__year-select {
          padding: 2px;
          border-radius: 4px;
          border: 1px solid #E5E7EB;
          font-size: 14px;
          color: #464646;
          background-color: white;
          transition: all 0.2s ease;
        }
        .react-datepicker__month-select:focus,
        .react-datepicker__year-select:focus {
          outline: none;
          border-color: #64CCC5;
          box-shadow: 0 0 0 2px rgba(100, 204, 197, 0.1);
        }
        .react-datepicker__month-select option,
        .react-datepicker__year-select option {
          font-size: 14px;
          padding: 4px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <motion.button 
        variants={itemVariants}
        whileHover={{ opacity: 0.8, x: 2 }}
        whileTap={{ scale: 0.98 }}
        className="text-[#FF4444] underline decoration-1 mb-6 text-left text-sm"
        onClick={onReset}
      >
        Reset all
      </motion.button>
      
      {/* Filter by date */}
      <motion.div 
        variants={itemVariants}
        className="pb-4 mb-4 border-b-[3px] border-[#01292D] border-opacity-20"
      >
        <h3 className="text-[#1E1D1D] text-[16px] font-medium mb-3">Filter by date</h3>
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.002 }}
          transition={{ duration: 0.2 }}
        >
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            dateFormat="dd MMMM yyyy"
            className="w-full h-[34px] border border-[#E5E7EB] px-3 pr-10 py-[6px] text-[#464646] bg-white rounded-sm cursor-pointer text-sm focus:outline-none focus:ring-1 focus:ring-[#64CCC5] focus:border-[#64CCC5] transition-all duration-200 hover:border-[#64CCC5] hover:bg-[#FAFAFA]"
            placeholderText="Select date"
            isClearable
            dayClassName={highlightDatesWithData}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={10}
            scrollableYearDropdown
            portalId="datepicker-portal"
            popperPlacement="bottom-start"
          />
          <motion.div 
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#464646]"
            animate={{ 
              rotate: date ? 180 : 0,
              scale: date ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Sort by */}
      <motion.div 
        variants={itemVariants}
        className="mb-6 relative z-10"
      >
        <h3 className="text-[#1E1D1D] text-[16px] font-medium mb-3">Sort by</h3>
        <div className="flex flex-col gap-1.5">
          {sortOptions.map((option) => (
            <motion.button
              key={option.value}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setIsHovered(option.value)}
              onHoverEnd={() => setIsHovered(null)}
              onClick={() => onSortChange(selectedSort === option.value ? null : option.value)}
              className={`relative w-full h-[34px] text-left px-2.5 flex items-center text-[13px] leading-[100%] tracking-[0%] font-normal font-['Inter'] text-[#464646] bg-white border border-[#E5E7EB] transition-all duration-200 rounded-sm overflow-hidden ${
                selectedSort === option.value ? 'border-l-[3px] border-l-[#64CCC5] bg-[#F9FAFB]' : ''
              }`}
            >
              <motion.span 
                className="relative z-10"
                animate={{ 
                  x: isHovered === option.value ? 2 : 0,
                  color: selectedSort === option.value ? '#01292D' : '#464646'
                }}
              >
                {option.label}
              </motion.span>
              <motion.div
                initial={false}
                animate={{
                  opacity: selectedSort === option.value ? 1 : 0,
                  scale: isHovered === option.value ? 1.05 : 1
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-[#64CCC5] opacity-[0.03]"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* View result button */}
      <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => onDateChange(selectedDate)}
        className="w-full bg-[#01292D] text-[#64CCC5] h-[34px] flex items-center justify-between px-4 rounded-sm group mt-auto relative z-10 overflow-hidden"
      >
        <motion.span 
          className="font-['Inter'] text-sm font-medium relative z-10"
          whileHover={{ x: 2 }}
        >
          View result
        </motion.span>
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
          className="group-hover:translate-x-0.5 transition-transform relative z-10"
        >
          <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.6667 5.83334L15.8333 10L11.6667 14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
        <motion.div
          className="absolute inset-0 bg-[#064E55]"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.div>
  );
};

export default BulletinFilters;