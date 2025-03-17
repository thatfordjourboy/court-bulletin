'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import useTypewriter from '../../hooks/useTypewriter';
import { fadeInUp, fadeIn, slideIn } from '../../utils/animations';
import SearchBar from './SearchBar';

const HeroSection = () => {
  const words = [
    'legal professionals',
    'the government',
    'researchers',
    'students',
    'communities',
    'the private sector'
  ];
  
  const animatedText = useTypewriter(words);

  const gradientTextStyle = {
    background: 'linear-gradient(to right, #01292D, #71CED1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textDecoration: 'underline',
    textDecorationStyle: 'solid' as const,
    textDecorationThickness: '0',
    textUnderlineOffset: '0',
    textDecorationSkipInk: 'none' as const
  };

  return (
    <section className="relative bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            className="max-w-xl"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-[#01292D] text-5xl font-bold leading-tight mb-6"
              variants={slideIn}
            >
              Your <span className="relative inline-block">
                <span 
                  className="italic font-bold text-[48px] leading-[150%] tracking-[0] font-['Inter']"
                  style={gradientTextStyle}
                >
                  trusted
                </span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-[#71CED1]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                ></motion.span>
              </span> source for
              <br />
              legal updates in Ghana
            </motion.h1>
            
            <motion.p 
              className="text-lg text-[#01292D] mb-10"
              variants={fadeInUp}
            >
              Providing timely and reliable legal bulletins, cause lists, and judicial
              notices to empower {' '}
              <span 
                className="italic font-bold"
                style={gradientTextStyle}
              >
                {animatedText}
              </span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/bulletin/weekly"
                className="inline-flex items-center px-[12px] py-[11px] bg-[#01292D] text-white font-medium rounded hover:bg-teal-800 transition-all duration-300 hover:scale-105 gap-[10px]"
              >
                Weekly Bulletin
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Image with Decorative Elements */}
          <motion.div 
            className="relative"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            {/* Container for positioning all elements */}
            <div className="relative">
              {/* Dark green rectangle at top-right */}
              <motion.div 
                className="absolute" 
                style={{
                  top: '-24px',
                  right: '-24px',
                  width: '190px',
                  height: '115%',
                  backgroundColor: '#01292D',
                  zIndex: 1
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              ></motion.div>
              
              {/* Teal accent rectangle at bottom-left */}
              <motion.div 
                className="absolute" 
                style={{
                  bottom: '-24px',
                  left: '-24px',
                  width: '117px',
                  height: '99px',
                  backgroundColor: '#C2F8FA',
                  zIndex: 1
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              ></motion.div>
              
              {/* The image */}
              <motion.div 
                className="relative" 
                style={{ zIndex: 2 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/supremcourt.webp"
                  alt="Supreme Court of Ghana"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 