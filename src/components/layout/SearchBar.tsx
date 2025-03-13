'use client';

import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  variant?: 'home' | 'default';
}

const SearchBar = ({ value, onChange, onSearch, variant = 'default' }: SearchBarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <motion.div 
      className="relative flex items-center w-full max-w-[401px] h-[54px] border border-[#01292D] bg-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="w-full px-[10px] py-4 bg-white text-[#01292D] placeholder-[#667085] text-[18px] font-inter font-normal leading-none focus:outline-none focus:ring-0"
      />

      <button
        onClick={onSearch}
        className="h-[54px] w-[78px] bg-[#71CED1] text-white flex items-center justify-center transition-colors duration-200 hover:bg-[#01292D]"
      >
        <svg 
          className="w-6 h-6" 
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
      </button>
    </motion.div>
  );
};

export default SearchBar; 