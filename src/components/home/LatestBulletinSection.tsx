'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// This type definition will help with TypeScript when integrating with the backend
type Bulletin = {
  id?: string;
  title: string;
  description: string;
  date: string;
  volume: string;
}

// Mock data - will be replaced with API call in the future
const getMockBulletins = (): Bulletin[] => {
  return [
    {
      title: 'Practice Direction - Virtual Court Session',
      description: 'Being guided by the provisions of Article 125 (4) of the Constitution, 1992, Section 69 (1) of the Courts Act 1993 Act 459 and Orders 38 Rule.',
      date: '09/01/2024',
      volume: 'Vol. 1'
    },
    {
      title: 'Appointment of Supreme Court Justices',
      description: 'In exercise of the powers vested in the President of the Republic of Ghana under the 1992 Constitution under Article 144(2), the following...',
      date: '09/01/2024',
      volume: 'Vol. 1'
    },
    {
      title: 'Temporary Closure of Ada Courts',
      description: 'The attention of the Honourable Lady Chief Justice has been drawn to a general water crisis being faced by residents of Ada.',
      date: '09/01/2024',
      volume: 'Vol. 1'
    },
    {
      title: 'GBA Notice to All Lawyers',
      description: 'It is notified for lawyers that the mandatory requirement under Regulation 84 of the Legal Profession (Professional Conduct and Etiquette).',
      date: '09/01/2024',
      volume: 'Vol. 1'
    }
  ];
};

const LatestBulletinSection = () => {
  // State for bulletins - will be used with useEffect to fetch from API later
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This will be replaced with an API call in the future
    // Example: 
    // const fetchBulletins = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch('/api/bulletins');
    //     const data = await response.json();
    //     setBulletins(data);
    //   } catch (err) {
    //     setError('Failed to fetch bulletins');
    //     console.error(err);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchBulletins();

    // For now, just use mock data
    setBulletins(getMockBulletins());
  }, []);

  // Generate URL slug from bulletin title
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#01292D] mb-8">Latest GhCourt Bulletin</h2>

        {isLoading ? (
          // Loading state - will be shown when fetching data
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-6"></div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-16 bg-gray-200 rounded mb-6"></div>
                <div className="h-8 w-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state - will be shown when API request fails
          <div className="text-red-500 text-center py-8">
            {error}
          </div>
        ) : (
          // Data display
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bulletins.map((bulletin, index) => (
              <div key={index} className="bg-[#f9fafb] rounded-lg p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-30">
                  <span className="bg-[#FEF9C3] text-[#01292D] text-xs font-medium px-3 py-1.5">
                    GhCourt Bulletin {bulletin.volume}
                  </span>
                  <span className="bg-[#DBEAFE] text-[#01292D] text-xs font-medium px-3 py-1.5">
                    {bulletin.date}
                  </span>
                </div>
                <div className="flex flex-col h-full">
                  <h3 
                    className="font-['Inter'] text-[20px] font-semibold leading-[150%] tracking-[-0.01em] text-[#01292D] min-h-[90px]"
                    style={{ 
                      fontWeight: 600,
                      lineHeight: '150%',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {bulletin.title}
                  </h3>
                  <p 
                    className="font-['Inter'] text-[14px] font-normal leading-[160%] tracking-[-0.01em] text-[#1E1D1D] mb-8"
                    style={{ 
                      fontWeight: 400,
                      lineHeight: '160%',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {bulletin.description}
                  </p>
                  <div className="mt-auto">
                    <Link
                      href={`/bulletin/${generateSlug(bulletin.title)}`}
                      className="bg-[#01292D] text-white px-4 py-2 inline-flex items-center"
                    >
                      <span>Learn more</span>
                      <span className="ml-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBulletinSection; 