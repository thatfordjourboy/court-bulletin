'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../../utils/animations';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Cause Lists',
      description: 'Quickly access schedules and details for all ongoing and upcoming court proceedings in Ghana.',
      image: '/images/ghana.png',
      link: '/cause-lists',
      linkText: 'View Cause Lists →',
      buttonClassName: 'px-4 py-2 bg-red-100 text-gray-700 font-medium inline-block rounded hover:bg-red-200 transition-all duration-300 hover:scale-105'
    },
    {
      title: 'Notices',
      description: 'Stay ahead with official updates, policy changes, and judicial announcements straight from the courts.',
      image: '/images/notice.jpeg',
      link: '/notices',
      linkText: 'Browse Notices →',
      buttonClassName: 'px-4 py-2 bg-blue-100 text-gray-700 font-medium inline-block rounded hover:bg-blue-200 transition-all duration-300 hover:scale-105'
    },
    {
      title: 'Archives',
      description: 'Dive into a well-organized archive of past legal bulletins, case outcomes, old Gazettes, and more.',
      image: '/images/archive.jpeg',
      link: '/archives',
      linkText: 'Explore Archives →',
      buttonClassName: 'px-4 py-2 bg-amber-100 text-gray-700 font-medium inline-block rounded hover:bg-amber-200 transition-all duration-300 hover:scale-105'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={stagger}
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              variants={fadeInUp}
            >
              <motion.div 
                className="mb-6 relative h-64 overflow-hidden rounded-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-300"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-[#01292D] mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-[#464646] mb-6 flex-grow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 * index }}
              >
                {feature.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 * index }}
              >
                <Link 
                  href={feature.link}
                  className={feature.buttonClassName}
                >
                  {feature.linkText}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 