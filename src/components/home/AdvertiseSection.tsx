'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, slideIn } from '../../utils/animations';

const AdvertiseSection = () => {
  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-[#FFF3D9] rounded-2xl p-8 md:p-12 shadow-md hover:shadow-lg"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <motion.div 
              className="w-full md:w-[561px]"
              variants={slideIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="font-inter text-[24px] leading-[160%] tracking-[-0.01em] text-[#1E1D1D] font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Advertise with Ghana Court Bulletin and connect with a targeted legal audience
              </motion.h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/subscriptions"
                className="inline-flex items-center bg-[#01292D] text-white px-6 py-4 rounded-lg hover:bg-[#01292D]/90 transition-all duration-300 hover:shadow-lg group"
              >
                <span>Learn More About Our Subscriptions</span>
                <motion.svg 
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut" 
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AdvertiseSection; 