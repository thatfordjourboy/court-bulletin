'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { motion } from 'framer-motion';

interface ArchiveNoticeFiltersProps {
  onDateChange: (date: string | null) => void;
  onTypeChange: (type: string | null) => void;
  onCourtChange: (court: string | null) => void;
  onReset: () => void;
  onApplyFilters: () => void;
  selectedDate: string | null;
  selectedType: string | null;
  selectedCourt: string | null;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

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

export default function ArchiveNoticeFilters({
  onDateChange,
  onTypeChange,
  onCourtChange,
  onReset,
  onApplyFilters,
  selectedDate,
  selectedType,
  selectedCourt,
}: ArchiveNoticeFiltersProps) {
  const [date, setDate] = useState<Date | null>(selectedDate ? new Date(selectedDate) : null);

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    onDateChange(date ? date.toISOString() : null);
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
            popperClassName="datepicker-popper"
            portalId="datepicker-portal"
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

      {/* Filter by type */}
      <div className="pb-4 mb-4 border-b-[3px] border-[#01292D] border-opacity-20">
        <h3 className="text-[#1E1D1D] text-[16px] font-medium mb-3">Filter by type</h3>
        <div className="flex flex-col gap-1.5">
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onTypeChange(selectedType === 'SUBSTITUTED_SERVICE_NOTICES' ? null : 'SUBSTITUTED_SERVICE_NOTICES')}
            className={`relative w-full h-[34px] text-left px-2.5 flex items-center text-[13px] leading-[100%] tracking-[0%] font-normal font-['Inter'] ${
              selectedType === 'SUBSTITUTED_SERVICE_NOTICES' 
                ? 'text-[#01292D] bg-[#64CCC5] bg-opacity-10 border-[#64CCC5]' 
                : 'text-[#464646] bg-white border-[#E5E7EB]'
            } border transition-all duration-200 rounded-sm overflow-hidden`}
          >
            <span className="relative z-10">Substituted Service Notices</span>
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onTypeChange(selectedType === 'ESTATE_NOTICES' ? null : 'ESTATE_NOTICES')}
            className={`relative w-full h-[34px] text-left px-2.5 flex items-center text-[13px] leading-[100%] tracking-[0%] font-normal font-['Inter'] ${
              selectedType === 'ESTATE_NOTICES'
                ? 'text-[#01292D] bg-[#64CCC5] bg-opacity-10 border-[#64CCC5]'
                : 'text-[#464646] bg-white border-[#E5E7EB]'
            } border transition-all duration-200 rounded-sm overflow-hidden`}
          >
            <span className="relative z-10">Estate Notices</span>
          </motion.button>
        </div>
      </div>

      {/* Filter by court */}
      <div className="pb-4 mb-4 border-b-[3px] border-[#01292D] border-opacity-20">
        <h3 className="text-[#1E1D1D] text-[16px] font-medium mb-3">Filter by court</h3>
        <div className="flex flex-col gap-1.5">
          {['Supreme Court', 'High Court', 'Court of Appeal', 'Circuit Court', 'District Court'].map((court) => (
            <motion.button
              key={court}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onCourtChange(selectedCourt === court ? null : court)}
              className={`relative w-full h-[34px] text-left px-2.5 flex items-center text-[13px] leading-[100%] tracking-[0%] font-normal font-['Inter'] ${
                selectedCourt === court
                  ? 'text-[#01292D] bg-[#64CCC5] bg-opacity-10 border-[#64CCC5]'
                  : 'text-[#464646] bg-white border-[#E5E7EB]'
              } border transition-all duration-200 rounded-sm overflow-hidden`}
            >
              <span className="relative z-10">{court}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* View Results Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onApplyFilters}
        className="w-full bg-[#01292D] text-white py-2 px-4 rounded-sm hover:bg-[#064E55] transition-colors duration-200 flex items-center justify-center gap-2"
      >
        View result
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      <style jsx global>{`
        .react-datepicker {
          font-family: Inter, sans-serif;
          background-color: white;
          border: 1px solid #E5E7EB;
          border-radius: 4px;
          position: relative;
          z-index: 60 !important;
        }
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker-popper {
          z-index: 99999 !important;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .datepicker-portal {
          position: relative;
          z-index: 99999;
        }
        .datepicker-popper {
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </motion.div>
  );
} 