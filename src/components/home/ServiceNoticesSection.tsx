'use client';

import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../../utils/animations';

interface ServiceNotice {
  id: string;
  courtName: string;
  caseTitle: string;
  suitNumber: string;
  servedTime: string;
  servedDate: string;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

// Temporary mock data - this will come from the dashboard later
const mockNotices: ServiceNotice[] = [
  {
    id: '1',
    courtName: 'High Court (Commercial Division)',
    caseTitle: 'The Special Prosecutor v. Anthony Gyasi',
    suitNumber: 'J5/05/2024',
    servedTime: '4:00 pm',
    servedDate: '3rd Jan, 2024',
    countdown: {
      days: 4,
      hours: 3,
      minutes: 4,
      seconds: 12
    }
  },
  {
    id: '2',
    courtName: 'Supreme Court',
    caseTitle: 'Dom v. The Republic',
    suitNumber: 'J5/05/2024',
    servedTime: '5:00 pm',
    servedDate: '2nd Jan, 2024',
    countdown: {
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 12
    }
  },
  {
    id: '3',
    courtName: 'High Court (Commercial Division)',
    caseTitle: 'The Special Prosecutor v. Anthony Gyasi',
    suitNumber: 'J5/05/2024',
    servedTime: '4:00 pm',
    servedDate: '3rd Jan, 2024',
    countdown: {
      days: 4,
      hours: 3,
      minutes: 4,
      seconds: 12
    }
  },
  {
    id: '4',
    courtName: 'Supreme Court',
    caseTitle: 'Dom v. The Republic',
    suitNumber: 'J5/05/2024',
    servedTime: '5:00 pm',
    servedDate: '2nd Jan, 2024',
    countdown: {
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 12
    }
  }
];

// Helper function to format date with superscript
const formatDateWithSuperscript = (date: string) => {
  const parts = date.split(' ');
  const dayWithOrdinal = parts[0];
  const day = dayWithOrdinal.replace(/\D/g, '');
  const ordinal = dayWithOrdinal.replace(day, '');
  
  return (
    <>
      {day}<sup>{ordinal}</sup> {parts[1]} {parts[2]}
    </>
  );
};

const ServiceNoticesSection = () => {
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
          {mockNotices.map((notice, index) => (
            <motion.div 
              key={notice.id} 
              className="bg-[#F3F5F8] rounded-lg p-4 flex flex-col min-h-[200px] hover:shadow-lg transition-all duration-300"
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
                    {notice.courtName}
                  </div>
                </motion.div>
                <h3 className="text-[#01292D] text-[14px] font-semibold mb-4 h-[40px] line-clamp-2 overflow-hidden">
                  {notice.caseTitle}
                </h3>
                
                <div className="grid grid-cols-[90px_1fr] gap-x-2 mb-1">
                  <div className="text-[#01292D] text-xs font-medium">Suit number</div>
                  <div className="text-[#01292D] text-xs font-medium">Served</div>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-x-2">
                  <div className="text-[#01292D] text-xs">{notice.suitNumber}</div>
                  <div className="text-[#01292D] text-xs">
                    {notice.servedTime} | {formatDateWithSuperscript(notice.servedDate)}
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
                  {notice.countdown.days}days | {notice.countdown.hours}hrs | {notice.countdown.minutes}mins | {notice.countdown.seconds}sec
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceNoticesSection; 