'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GazetteEntry {
  title: string;
  volume: number;
  page: number;
  date: string;
}

interface MonthGroup {
  month: string;
  gazettes: GazetteEntry[];
}

type PageParams = {
  params: {
    year: string;
  };
}

const tableItemStyles = "font-['Inter'] text-base leading-none text-[#1E1D1D] font-normal";

export default function GazetteYearPage({ params }: PageParams) {
  const router = useRouter();
  const year = params.year;
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState(year);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest'>('relevance');
  const [filteredGazettes, setFilteredGazettes] = useState<MonthGroup[]>([]);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Generate years for picker (e.g., last 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  // Mock data - will come from backend
  const mockGazettes: MonthGroup[] = [
    {
      month: `January ${year}`,
      gazettes: [
        { title: `Gazette 6 January ${year}`, volume: 1, page: 2483, date: `${year}-01-06` },
        { title: `Gazette 9 January ${year}`, volume: 1, page: 2483, date: `${year}-01-09` },
        { title: `Gazette 14 January ${year}`, volume: 4, page: 2483, date: `${year}-01-14` },
        { title: `Gazette 17 January ${year}`, volume: 3, page: 2483, date: `${year}-01-17` },
        { title: `Gazette 23 January ${year}`, volume: 2, page: 2483, date: `${year}-01-23` },
        { title: `Gazette 30 January ${year}`, volume: 1, page: 2483, date: `${year}-01-30` }
      ]
    },
    {
      month: `February ${year}`,
      gazettes: [
        { title: `Gazette 3 February ${year}`, volume: 1, page: 2484, date: `${year}-02-03` },
        { title: `Gazette 10 February ${year}`, volume: 2, page: 2484, date: `${year}-02-10` },
        { title: `Gazette 17 February ${year}`, volume: 1, page: 2484, date: `${year}-02-17` },
        { title: `Gazette 24 February ${year}`, volume: 3, page: 2484, date: `${year}-02-24` }
      ]
    },
    {
      month: `March ${year}`,
      gazettes: [
        { title: `Gazette 3 March ${year}`, volume: 1, page: 2485, date: `${year}-03-03` },
        { title: `Gazette 10 March ${year}`, volume: 2, page: 2485, date: `${year}-03-10` },
        { title: `Gazette 17 March ${year}`, volume: 3, page: 2485, date: `${year}-03-17` },
        { title: `Gazette 24 March ${year}`, volume: 1, page: 2485, date: `${year}-03-24` },
        { title: `Gazette 31 March ${year}`, volume: 2, page: 2485, date: `${year}-03-31` }
      ]
    },
    {
      month: `April ${year}`,
      gazettes: [
        { title: `Gazette 7 April ${year}`, volume: 1, page: 2486, date: `${year}-04-07` },
        { title: `Gazette 14 April ${year}`, volume: 2, page: 2486, date: `${year}-04-14` },
        { title: `Gazette 21 April ${year}`, volume: 1, page: 2486, date: `${year}-04-21` },
        { title: `Gazette 28 April ${year}`, volume: 3, page: 2486, date: `${year}-04-28` }
      ]
    }
  ];

  // Filter and sort gazettes
  useEffect(() => {
    let filtered = [...mockGazettes];

    // Filter by month if search query exists
    if (searchQuery) {
      filtered = filtered.filter(group => 
        group.month.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort gazettes based on selected option
    filtered = filtered.map(group => ({
      ...group,
      gazettes: [...group.gazettes].sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortBy === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        // 'relevance' maintains original order
        return 0;
      })
    }));

    // Sort month groups for 'newest' and 'oldest'
    if (sortBy !== 'relevance') {
      filtered.sort((a, b) => {
        const aDate = new Date(a.gazettes[0].date);
        const bDate = new Date(b.gazettes[0].date);
        return sortBy === 'newest' 
          ? bDate.getTime() - aDate.getTime()
          : aDate.getTime() - bDate.getTime();
      });
    }

    setFilteredGazettes(filtered);
  }, [searchQuery, sortBy]);

  // Handle year filter change
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearFilter(e.target.value);
  };

  // Handle year selection from modal
  const handleYearSelect = (selectedYear: string) => {
    setYearFilter(selectedYear);
    setShowYearPicker(false);
  };

  // Handle year filter submit
  const handleYearSubmit = () => {
    if (yearFilter && yearFilter !== year) {
      router.push(`/gazettes/${yearFilter}`);
    }
  };

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setYearFilter(year);
    setSortBy('relevance');
  };

  return (
    <main className="min-h-screen bg-white relative">
      {/* Breadcrumb and back navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/"
          className="inline-flex items-center text-[#0066CC] hover:underline"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Home
        </Link>
      </div>

      {/* Header section with title and search */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-[32px] font-bold text-[#01292D]">
              Gazettes - {year}
            </h1>
            <span className="bg-[#01292D] text-white px-3 py-1 rounded-sm text-sm font-medium ml-1">
              {filteredGazettes.reduce((acc, group) => acc + group.gazettes.length, 0)} gazettes
            </span>
          </div>
          <div className="relative w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#E5E7EB] p-2 pr-12"
              placeholder="Filter by month..."
            />
            <button className="absolute right-0 top-0 h-full w-12 bg-[#01292D] text-white flex items-center justify-center">
              <svg 
                className="w-5 h-5" 
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
          </div>
        </div>

        {/* Main content grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-[250px] h-[399px] bg-[#F3F5F8] p-5 flex flex-col lg:sticky lg:top-6 order-2 lg:order-1">
            <button 
              onClick={handleReset}
              className="text-[#FF6B6B] underline decoration-1 hover:opacity-80 mb-3 text-left"
            >
              Reset all
            </button>
            
            {/* Filter by year */}
            <div className="w-[202px] pb-5 mb-[8px] border-b border-[#01292D] border-opacity-20">
              <h3 className="text-base font-['Inter'] tracking-[0px] font-bold mb-3">Filter by year</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Years"
                  value={yearFilter}
                  onChange={handleYearChange}
                  className="w-[202px] h-[33px] border border-[#E5E7EB] rounded px-3 py-[6px] text-gray-500 placeholder-gray-400 bg-white flex justify-between"
                />
                <button 
                  onClick={() => setShowYearPicker(true)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.375 18.25C1.89375 18.25 1.48177 18.0786 1.13906 17.7359C0.796354 17.3932 0.625 16.9812 0.625 16.5V4.25C0.625 3.76875 0.796354 3.35677 1.13906 3.01406C1.48177 2.67135 1.89375 2.5 2.375 2.5H3.25V0.75H5V2.5H12V0.75H13.75V2.5H14.625C15.1062 2.5 15.5182 2.67135 15.8609 3.01406C16.2036 3.35677 16.375 3.76875 16.375 4.25V16.5C16.375 16.9812 16.2036 17.3932 15.8609 17.7359C15.5182 18.0786 15.1062 18.25 14.625 18.25H2.375ZM2.375 16.5H14.625V7.75H2.375V16.5ZM2.375 6H14.625V4.25H2.375V6Z" fill="#01292D"/>
                  </svg>
                </button>
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
                      sortBy.toLowerCase() === option.toLowerCase() ? 'bg-[#F3F5F8]' : ''
                    }`}
                    onClick={() => setSortBy(option.toLowerCase() as any)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleYearSubmit}
              className="w-[202px] bg-[#01292D] text-[#8DFFDD] py-2 px-4 flex items-center justify-between rounded mb-5 mt-auto"
            >
              <span className="font-['Inter'] text-base font-light">View result</span>
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Main content table */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white mb-24">
              {/* Table header */}
              <div className="grid grid-cols-12 border-b py-4 font-medium">
                <div className="col-span-6 px-4">Title</div>
                <div className="col-span-3 px-4 text-right">Volume</div>
                <div className="col-span-3 px-4 text-right">Page</div>
              </div>

              {/* Table content */}
              {filteredGazettes.map((group, index) => (
                <div key={group.month}>
                  <div className="bg-[#F9FAFB] py-4 px-4 font-medium">
                    {group.month}
                  </div>
                  {group.gazettes.map((gazette) => {
                    // Format date for URL: YYYY-MM-DD
                    const formattedDateForUrl = gazette.date;
                    
                    return (
                      <Link 
                        href={`/gazettes/${year}/${formattedDateForUrl}`}
                        key={gazette.title}
                      >
                        <div className="grid grid-cols-12 border-b hover:bg-gray-50 cursor-pointer">
                          <div className={`col-span-6 px-4 py-[10px] text-[#1E1D1D] hover:text-[#0066CC] hover:underline ${tableItemStyles}`}>
                            {gazette.title}
                          </div>
                          <div className={`col-span-3 px-4 py-[10px] text-right ${tableItemStyles}`}>
                            {gazette.volume}
                          </div>
                          <div className={`col-span-3 px-4 py-[10px] text-right ${tableItemStyles}`}>
                            {gazette.page}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Year Picker Modal */}
      {showYearPicker && (
        <div className="fixed inset-0 flex items-start justify-center z-50 pt-[120px]">
          <div className="bg-white rounded-lg shadow-lg w-[296px]">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#01292D] text-lg font-semibold">Select Year</h3>
                <button 
                  onClick={() => setShowYearPicker(false)}
                  className="text-[#464646] hover:text-[#01292D]"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map((y) => (
                  <button
                    key={y}
                    onClick={() => handleYearSelect(y.toString())}
                    className={`py-2 px-3 text-base font-normal text-center rounded-sm transition-colors
                      ${yearFilter === y.toString() 
                        ? 'bg-[#F3F5F8] text-[#01292D]' 
                        : 'text-[#464646] hover:bg-[#F3F5F8]'}`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div 
            className="fixed inset-0 bg-black/30 -z-10"
            onClick={() => setShowYearPicker(false)}
          />
        </div>
      )}
    </main>
  );
} 