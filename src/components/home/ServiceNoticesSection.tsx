'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp, stagger } from '../../utils/animations';
import { mockNotices, type Notice } from '@/data/mockNotices';

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const ServiceNoticesSection = () => {
  // Get the 4 most recent substituted service notices
  const recentNotices = mockNotices
    .filter(notice => notice.type === 'SUBSTITUTED_SERVICE_NOTICES')
    .sort((a, b) => new Date(b.servedDate).getTime() - new Date(a.servedDate).getTime())
    .slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[32px] text-[#01292D] font-bold leading-[160%] tracking-[-0.01em]">
            Latest substituted service notices
          </h1>
          <p className="text-[#464646] text-[18px] font-normal leading-[160%] tracking-[-0.01em] w-[525px] h-[29px]">
            Stay updated with the most recent substituted service notices.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
          variants={stagger}
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
        >
          {recentNotices.map((notice, index) => (
            <Link 
              key={notice.id}
              href={`/notices/${notice.id}`}
              className="block"
            >
              <motion.div 
                className="bg-[#F3F5F8] rounded-lg p-4 flex flex-col min-h-[200px] hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <motion.div 
                    className="w-fit"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-[#C5E0FF] text-[#01292D] text-xs font-medium px-2 py-1 mb-0">
                      SUBSTITUTED SERVICE NOTICE
                    </div>
                    <div className="bg-white text-[#1E1D1D] text-xs font-normal px-2 py-1 mb-5 font-['Inter'] leading-[100%] tracking-[-0.02em]">
                      {notice.court}{notice.division ? ` (${notice.division})` : ''}
                    </div>
                  </motion.div>
                  <h3 className="text-[#01292D] text-[14px] font-semibold mb-4 h-[40px] line-clamp-2 overflow-hidden">
                    {notice.title}
                  </h3>
                  
                  <div className="grid grid-cols-[90px_1fr] gap-x-2 mb-1">
                    <div className="text-[#01292D] text-xs font-medium">Suit number</div>
                    <div className="text-[#01292D] text-xs font-medium">Served</div>
                  </div>
                  <div className="grid grid-cols-[90px_1fr] gap-x-2">
                    <div className="text-[#01292D] text-xs">{notice.suitNumber}</div>
                    <div className="text-[#01292D] text-xs">
                      {notice.servedTime} | {formatDate(notice.servedDate)}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded p-2 flex items-center mt-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#F79009] text-xs font-semibold mr-2">Countdown</span>
                  <span className="text-[#01292D] text-xs font-semibold">
                    {/* Calculate countdown from expiryDate */}
                    {Math.ceil((new Date(notice.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}days | {new Date(notice.expiryDate).getHours()}hrs | {new Date(notice.expiryDate).getMinutes()}mins | {new Date(notice.expiryDate).getSeconds()}sec
                  </span>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceNoticesSection; 