'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gazetteYears } from '@/data/mockGazettes';
import GazetteFilters from '@/components/gazettes/GazetteFilters';

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
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest' | null>(null);
  const [filteredGazettes, setFilteredGazettes] = useState<MonthGroup[]>([]);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Generate years for picker (e.g., last 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i));

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
        if (!sortBy) return 0;
        if (sortBy === 'newest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortBy === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return 0;
      })
    }));

    // Sort month groups for 'newest' and 'oldest'
    if (sortBy && sortBy !== 'relevance') {
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
    setSortBy(null);
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
          <div className="w-full lg:w-[250px] bg-[#F3F5F8] p-5 flex flex-col lg:sticky lg:top-6 order-2 lg:order-1 h-fit">
            <GazetteFilters
              onYearChange={(year) => {
                if (year && year !== params.year) {
                  router.push(`/gazettes/${year}`);
                }
              }}
              onSortChange={(sort) => setSortBy(sort)}
              onReset={handleReset}
              selectedYear={yearFilter}
              selectedSort={sortBy}
              isLoading={false}
              years={years}
            />
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
          <div className="bg-white rounded-lg shadow-lg w-[320px]">
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

              {/* Quick actions */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => handleYearSelect(new Date().getFullYear().toString())}
                  className="flex-1 py-2 px-3 text-sm font-medium text-[#01292D] bg-[#F3F5F8] hover:bg-[#E5E7EB] rounded-sm transition-colors"
                >
                  Current Year
                </button>
                <button
                  onClick={() => handleYearSelect(gazetteYears[0].year)}
                  className="flex-1 py-2 px-3 text-sm font-medium text-[#01292D] bg-[#F3F5F8] hover:bg-[#E5E7EB] rounded-sm transition-colors"
                >
                  Most Recent
                </button>
              </div>

              {/* Decade separators and year grid */}
              <div className="max-h-[320px] overflow-y-auto pr-2">
                {Array.from({ length: Math.ceil((2024 - 1959 + 1) / 10) }, (_, i) => {
                  const decadeStart = 2024 - (i * 10);
                  const decadeYears = Array.from({ length: 10 }, (_, j) => decadeStart - j)
                    .filter(year => year >= 1959);
                  
                  return (
                    <div key={decadeStart} className="mb-4">
                      <div className="text-sm text-[#464646] mb-2 font-medium">
                        {`${decadeStart - 9} - ${decadeStart}`}
                      </div>
                      <div className="grid grid-cols-3 gap-x-2 gap-y-2">
                        {decadeYears.map((year) => (
                          <button
                            key={year}
                            onClick={() => handleYearSelect(year.toString())}
                            className={`py-2 px-3 text-base font-normal text-center rounded-sm transition-colors outline-none
                              ${yearFilter === year.toString() 
                                ? 'bg-[#01292D] text-white' 
                                : 'text-[#464646] hover:bg-[#F3F5F8] focus:ring-2 focus:ring-[#64CCC5]'}`}
                            onKeyDown={(e) => {
                              const currentIndex = decadeYears.indexOf(year);
                              if (e.key === 'ArrowRight' && currentIndex < decadeYears.length - 1) {
                                e.preventDefault();
                                (document.querySelector(`button[data-year="${decadeYears[currentIndex + 1]}"]`) as HTMLButtonElement)?.focus();
                              } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                                e.preventDefault();
                                (document.querySelector(`button[data-year="${decadeYears[currentIndex - 1]}"]`) as HTMLButtonElement)?.focus();
                              } else if (e.key === 'ArrowUp' && currentIndex >= 3) {
                                e.preventDefault();
                                (document.querySelector(`button[data-year="${decadeYears[currentIndex - 3]}"]`) as HTMLButtonElement)?.focus();
                              } else if (e.key === 'ArrowDown' && currentIndex + 3 < decadeYears.length) {
                                e.preventDefault();
                                (document.querySelector(`button[data-year="${decadeYears[currentIndex + 3]}"]`) as HTMLButtonElement)?.focus();
                              }
                            }}
                            data-year={year}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
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