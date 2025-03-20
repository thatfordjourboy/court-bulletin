'use client';

import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  onDateChange: (date: string) => void;
  onCourtTypeChange: (courtType: string) => void;
  onRegionChange: (region: string) => void;
  onReset: () => void;
  onApplyFilters: () => void;
  selectedDate: string;
  selectedCourtType: string;
  selectedRegion: string;
};

const courtTypes = [
  'Supreme Court',
  'Court of Appeal',
  {
    name: 'High Court',
    divisions: [
      'Criminal Division',
      'Land Court',
      'Divorce and Matrimonial Division',
      'Probate and Administration Division',
      'Labour Division',
      'Human Rights Division',
      'Commercial Division',
      'Financial Division',
      'General Jurisdiction'
    ]
  },
  'Circuit Court',
  'District Court'
];

const regions = [
  'Greater Accra',
  'Ashanti',
  'Ahafo Region',
  'Bono East Region',
  'Brong Ahafo Region',
  'Eastern Region',
  'North East Region',
  'Northern Region',
  'Oti Region',
  'Savannah Region',
  'Upper West Region',
  'Upper East Region',
  'Volta Region',
  'Western Region',
  'Western North Region'
];

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

const buttonVariants = {
  initial: { 
    scale: 1,
    backgroundColor: "rgb(255, 255, 255)"
  },
  hover: { 
    scale: 1.002,
    backgroundColor: "rgb(249, 250, 251)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
};

export default function ArchiveFilters({
  onDateChange,
  onCourtTypeChange,
  onRegionChange,
  onReset,
  onApplyFilters,
  selectedDate,
  selectedCourtType,
  selectedRegion
}: Props) {
  const [showHighCourtDivisions, setShowHighCourtDivisions] = useState(false);
  const [date, setDate] = useState<Date | null>(selectedDate ? new Date(selectedDate) : null);
  const [hoveredCourt, setHoveredCourt] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && 
          buttonRef.current && 
          !dropdownRef.current.contains(event.target as Node) && 
          !buttonRef.current.contains(event.target as Node)) {
        setShowHighCourtDivisions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCourtTypeClick = (court: string | { name: string, divisions: string[] }) => {
    if (typeof court === 'string') {
      onCourtTypeChange(court);
    } else {
      setShowHighCourtDivisions(!showHighCourtDivisions);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    if (date) {
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      onDateChange(formattedDate);
    } else {
      onDateChange('');
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#F9FAFB] p-4 space-y-6 font-inter rounded-sm"
    >
      <style jsx global>{`
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
        onClick={onReset}
        className="text-[#FF8B8B] text-sm font-medium hover:text-[#FF6B6B] transition-colors underline"
      >
        Reset all
      </motion.button>

      {/* Filter by date */}
      <motion.div 
        variants={itemVariants}
        className="pb-5 mb-[8px] border-b-2 border-[#01292D] border-opacity-20"
      >
        <h3 className="text-base font-['Inter'] tracking-[0px] font-bold mb-3">Filter by date</h3>
        <div className="space-y-3">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.002 }}
            transition={{ duration: 0.2 }}
          >
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              dateFormat="dd MMMM yyyy"
              className="w-full h-11 px-4 pr-12 border border-[#E5E7EB] bg-white text-[14px] leading-[100%] tracking-[0%] text-[#464646] rounded-sm cursor-pointer transition-all duration-200 hover:border-[#64CCC5] hover:bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#64CCC5] focus:border-[#64CCC5]"
              placeholderText="Select date"
              isClearable
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              yearDropdownItemNumber={10}
              scrollableYearDropdown
              portalId="datepicker-portal"
              popperPlacement="bottom-start"
            />
            <button 
              onClick={() => document.querySelector<HTMLInputElement>('input[placeholder="Select date"]')?.click()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#464646] hover:text-[#01292D] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66667 1.66667V4.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3333 1.66667V4.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.91667 7.57333H17.0833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4167 3.125H4.58333C3.61667 3.125 2.91667 3.825 2.91667 4.79167V15.2083C2.91667 16.175 3.61667 16.875 4.58333 16.875H15.4167C16.3833 16.875 17.0833 16.175 17.0833 15.2083V4.79167C17.0833 3.825 16.3833 3.125 15.4167 3.125Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Filter by court type */}
      <motion.div 
        variants={itemVariants}
        className="pb-5 mb-[8px] border-b-2 border-[#01292D] border-opacity-20"
      >
        <h3 className="text-base font-['Inter'] tracking-[0px] font-bold mb-3">Filter by court type</h3>
        <div className="space-y-1.5">
          {courtTypes.map((court) => (
            <motion.div key={typeof court === 'string' ? court : court.name} className="relative">
              <motion.button
                ref={typeof court !== 'string' ? buttonRef : undefined}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredCourt(typeof court === 'string' ? court : court.name)}
                onHoverEnd={() => setHoveredCourt(null)}
                onClick={() => handleCourtTypeClick(court)}
                className={`w-full text-left px-4 py-2 text-[12px] leading-[100%] tracking-[0%] font-normal text-[#464646] bg-white border border-[#E5E7EB] transition-all duration-200 flex items-center justify-between rounded-sm overflow-hidden relative ${
                  selectedCourtType === (typeof court === 'string' ? court : court.name) ? 'border-l-2 border-l-[#64CCC5] bg-[#F9FAFB]' : ''
                }`}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: selectedCourtType === (typeof court === 'string' ? court : court.name) ? 1 : 0,
                    scale: hoveredCourt === (typeof court === 'string' ? court : court.name) ? 1.05 : 1
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-[#64CCC5] opacity-[0.03]"
                />
                <div className="flex items-center justify-between w-full relative z-10">
                  <motion.span
                    animate={{ 
                      x: hoveredCourt === (typeof court === 'string' ? court : court.name) ? 2 : 0,
                      color: selectedCourtType === (typeof court === 'string' ? court : court.name) ? '#01292D' : '#464646'
                    }}
                  >
                    {typeof court === 'string' ? court : court.name}
                  </motion.span>
                  {typeof court !== 'string' && (
                    <motion.svg 
                      animate={{ 
                        rotate: showHighCourtDivisions ? 180 : 0,
                        scale: hoveredCourt === court.name ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className="ml-2 flex-shrink-0"
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  )}
                </div>
              </motion.button>
              <AnimatePresence>
                {typeof court !== 'string' && court.divisions && showHighCourtDivisions && (
                  <motion.div 
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-1 w-[280px] bg-white shadow-lg rounded-sm border border-[#E5E7EB] z-50 py-1 overflow-hidden"
                  >
                    {court.divisions.map((division) => (
                      <motion.button
                        key={division}
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => onCourtTypeChange(division)}
                        onHoverStart={() => setHoveredCourt(division)}
                        onHoverEnd={() => setHoveredCourt(null)}
                        className={`w-full text-left px-4 py-2 text-[12px] leading-[100%] tracking-[0%] font-normal text-[#464646] hover:bg-[#F9FAFB] transition-all duration-200 relative ${
                          selectedCourtType === division ? 'border-l-2 border-l-[#64CCC5] bg-[#F9FAFB]' : ''
                        }`}
                      >
                        <motion.span
                          animate={{ 
                            x: hoveredCourt === division ? 2 : 0,
                            color: selectedCourtType === division ? '#01292D' : '#464646'
                          }}
                        >
                          {division}
                        </motion.span>
                        <motion.div
                          initial={false}
                          animate={{
                            opacity: selectedCourtType === division ? 1 : 0,
                            scale: hoveredCourt === division ? 1.05 : 1
                          }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 bg-[#64CCC5] opacity-[0.03]"
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Filter by region */}
      <motion.div 
        variants={itemVariants}
        className="pb-5 mb-[8px] border-b-2 border-[#01292D] border-opacity-20"
      >
        <h3 className="text-base font-['Inter'] tracking-[0px] font-bold mb-3">Filter by region</h3>
        <div className="space-y-1.5">
          {regions.map((region) => (
            <motion.button
              key={region}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredRegion(region)}
              onHoverEnd={() => setHoveredRegion(null)}
              onClick={() => onRegionChange(selectedRegion === region ? '' : region)}
              className={`w-full text-left px-4 py-2 text-[12px] leading-[100%] tracking-[0%] font-normal text-[#464646] bg-white border border-[#E5E7EB] transition-all duration-200 rounded-sm relative overflow-hidden ${
                selectedRegion === region ? 'border-l-2 border-l-[#64CCC5] bg-[#F9FAFB]' : ''
              }`}
            >
              <motion.span
                animate={{ 
                  x: hoveredRegion === region ? 2 : 0,
                  color: selectedRegion === region ? '#01292D' : '#464646'
                }}
              >
                {region}
              </motion.span>
              <motion.div
                initial={false}
                animate={{
                  opacity: selectedRegion === region ? 1 : 0,
                  scale: hoveredRegion === region ? 1.05 : 1
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-[#64CCC5] opacity-[0.03]"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Apply filters button */}
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
    </motion.div>
  );
} 