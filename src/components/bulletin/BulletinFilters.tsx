'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { mockBulletins } from '@/data/mockBulletins';

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
  const [date, setDate] = useState<Date | null>(selectedDate ? new Date(selectedDate) : null);

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
    <div className="w-full lg:w-[250px] h-[399px] bg-[#F3F5F8] p-5 flex flex-col lg:sticky lg:top-6">
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
        .react-datepicker__day--keyboard-selected,
        .react-datepicker__day--selected {
          background-color: #01292D !important;
          color: white !important;
          font-weight: 500 !important;
        }
        .react-datepicker__day:hover {
          background-color: #E5E7EB !important;
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
        }
        .react-datepicker__month-select:focus,
        .react-datepicker__year-select:focus {
          outline: none;
          border-color: #64CCC5;
        }
        .react-datepicker__month-select option,
        .react-datepicker__year-select option {
          font-size: 14px;
          padding: 4px;
        }
      `}</style>

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
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            dateFormat="dd MMMM yyyy"
            className="w-full h-[33px] border border-[#E5E7EB] px-3 pr-10 py-[6px] text-[#464646] bg-white rounded cursor-pointer text-sm"
            placeholderText="Select date"
            isClearable
            dayClassName={highlightDatesWithData}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={10}
            scrollableYearDropdown
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8333 3.33334H4.16667C3.24619 3.33334 2.5 4.07954 2.5 5.00001V16.6667C2.5 17.5872 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5872 17.5 16.6667V5.00001C17.5 4.07954 16.7538 3.33334 15.8333 3.33334Z" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3333 1.66666V4.99999" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66667 1.66666V4.99999" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 8.33334H17.5" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
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