import React, { useState, useRef, useEffect } from 'react';

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

export default function CauseListFilters({
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

  return (
    <div className="bg-[#F9FAFB] p-4 space-y-6 font-inter">
      <button 
        onClick={onReset}
        className="text-[#FF8B8B] text-sm font-medium hover:text-[#FF6B6B] transition-colors underline"
      >
        Reset all
      </button>

      {/* Filter by date */}
      <div className="space-y-3">
        <h2 className="text-[#1E1D1D] text-lg font-medium">Filter by date</h2>
        <div className="relative bg-white rounded-sm">
          <input
            type="text"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full h-11 px-4 border border-[#E5E7EB] bg-white text-[14px] leading-[100%] tracking-[0%] text-[#464646] rounded-sm"
            placeholder="Date"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8333 3.33334H4.16667C3.24619 3.33334 2.5 4.07954 2.5 5.00001V16.6667C2.5 17.5872 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5872 17.5 16.6667V5.00001C17.5 4.07954 16.7538 3.33334 15.8333 3.33334Z" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3333 1.66666V4.99999" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66667 1.66666V4.99999" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 8.33334H17.5" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#E5E7EB] w-full" />

      {/* Filter by court type */}
      <div className="space-y-3">
        <h2 className="text-[#1E1D1D] text-lg font-medium">Filter by court type</h2>
        <div className="space-y-1.5">
          {courtTypes.map((court) => (
            <div key={typeof court === 'string' ? court : court.name} className="relative">
              <button
                ref={typeof court !== 'string' ? buttonRef : undefined}
                onClick={() => handleCourtTypeClick(court)}
                className={`w-full text-left px-4 py-2 text-[14px] leading-[100%] tracking-[0%] font-normal text-[#464646] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors flex items-center justify-between rounded-sm ${
                  selectedCourtType === (typeof court === 'string' ? court : court.name) ? 'border-[#64CCC5]' : ''
                }`}
              >
                <span>{typeof court === 'string' ? court : court.name}</span>
                {typeof court !== 'string' && (
                  <svg 
                    className={`transform transition-transform ${showHighCourtDivisions ? 'rotate-180' : ''} ml-2 flex-shrink-0`}
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              {typeof court !== 'string' && court.divisions && showHighCourtDivisions && (
                <div 
                  ref={dropdownRef}
                  className="absolute left-0 top-full mt-1 w-[280px] bg-white shadow-lg rounded-sm border border-[#E5E7EB] z-50 py-1"
                >
                  {court.divisions.map((division) => (
                    <button
                      key={division}
                      onClick={() => {
                        onCourtTypeChange(division);
                        setShowHighCourtDivisions(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-[14px] leading-[100%] tracking-[0%] font-normal text-[#464646] hover:bg-[#F9FAFB] transition-colors whitespace-nowrap ${
                        selectedCourtType === division ? 'bg-[#F9FAFB] border-l-2 border-[#64CCC5]' : ''
                      }`}
                    >
                      {division}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-[#E5E7EB] w-full" />

      {/* Filter by region */}
      <div className="space-y-3">
        <h2 className="text-[#1E1D1D] text-lg font-medium">Filter by region</h2>
        <div className="space-y-1.5">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => onRegionChange(region)}
              className={`w-full text-left px-4 py-2 text-[14px] leading-[100%] tracking-[0%] font-normal text-[#464646] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors rounded-sm ${
                selectedRegion === region ? 'border-[#64CCC5]' : ''
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onApplyFilters}
        className="w-full bg-[#01292D] text-[#64CCC5] h-11 flex items-center justify-center gap-2 hover:bg-[#064E55] transition-colors rounded-sm"
      >
        View result
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.6667 5.83334L15.8333 10L11.6667 14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
} 