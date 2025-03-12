'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, stagger, slideIn } from '../../utils/animations';

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
        <motion.h2 
          className="text-3xl font-bold text-[#01292D] mb-8"
          variants={slideIn}
          initial="initial"
          animate="animate"
        >
          Latest GhCourt Bulletin
        </motion.h2>

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
          <motion.div 
            className="text-red-500 text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        ) : (
          // Data display
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="initial"
            animate="animate"
            viewport={{ once: true }}
          >
            {bulletins.map((bulletin, index) => (
              <motion.div 
                key={index} 
                className={`bg-[#f9fafb] rounded-lg p-6 flex flex-col h-full transition-all duration-300
                  ${index === 0 ? 'shadow-md hover:shadow-xl' : 'hover:shadow-lg'}`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="flex justify-between items-center mb-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <motion.span 
                    className={`text-[#01292D] text-xs font-medium px-3 py-1.5
                      ${index === 0 ? 'bg-[#64CCC5]' : 'bg-[#FEF9C3]'}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    GhCourt Bulletin {bulletin.volume}
                  </motion.span>
                  <motion.span 
                    className="bg-[#DBEAFE] text-[#01292D] text-xs font-medium px-3 py-1.5"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {bulletin.date}
                  </motion.span>
                </motion.div>
                <div className="flex flex-col h-full">
                  <motion.h3 
                    className="font-['Inter'] text-[20px] font-semibold leading-[150%] tracking-[-0.01em] text-[#01292D] min-h-[90px]"
                    style={{ 
                      fontWeight: 600,
                      lineHeight: '150%',
                      letterSpacing: '-0.01em'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 * index }}
                  >
                    {bulletin.title}
                  </motion.h3>
                  <motion.p 
                    className="font-['Inter'] text-[14px] font-normal leading-[160%] tracking-[-0.01em] text-[#1E1D1D] mb-8"
                    style={{ 
                      fontWeight: 400,
                      lineHeight: '160%',
                      letterSpacing: '-0.01em'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 * index }}
                  >
                    {bulletin.description}
                  </motion.p>
                  <motion.div 
                    className="mt-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 * index }}
                  >
                    <Link
                      href={`/bulletin/${generateSlug(bulletin.title)}`}
                      className="bg-[#01292D] text-white px-4 py-2 inline-flex items-center group hover:bg-[#71CED1] transition-all duration-300"
                    >
                      <span>Learn more</span>
                      <motion.span 
                        className="ml-1"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestBulletinSection; 