'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp } from '@/utils/animations';

interface ArchiveAnnouncementCardProps {
  id: string;
  type: string;
  title: string;
  referenceNumber: string;
  servedDate: string;
  servedTime: string;
  court: string;
  division?: string;
  expiryDate: string;
}

export default function ArchiveAnnouncementCard({
  id,
  type,
  title,
  referenceNumber,
  servedDate,
  servedTime,
  court,
  division,
  expiryDate
}: ArchiveAnnouncementCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(expiryDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getBadgeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'GENERAL_NOTICES': 'bg-[#E5F3FF] text-[#0066CC]',
      'ANNOUNCEMENTS': 'bg-[#E5F3FF] text-[#0066CC]',
      'PRACTICE_DIRECTION': 'bg-[#E5F3FF] text-[#0066CC]',
      'JUDICIAL_NOTICES': 'bg-[#E5F3FF] text-[#0066CC]'
    };
    return colors[type] || 'bg-[#E5F3FF] text-[#0066CC]';
  };

  const formatType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className="space-y-3">
      <motion.div 
        className="bg-[#F3F5F8] p-3 w-fit"
        variants={fadeInUp}
      >
        {/* Header section with type and court */}
        <div className="flex items-center mb-3">
          <span className={`px-3 py-1 text-sm font-medium ${getBadgeColor(type)}`}>
            {formatType(type)}
          </span>
          <span className="text-[#464646] text-sm bg-white px-3 py-1">
            {court}{division ? ` (${division})` : ''}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[#01292D] text-base font-bold leading-[150%] tracking-[-0.02em] truncate whitespace-nowrap mb-3">
          {title}
        </h3>

        {/* Details grid */}
        <div className="flex">
          <div className="w-[150px]">
            <div className="text-[#464646] text-sm font-medium mb-1">Reference number</div>
            <div className="text-xs font-normal leading-none text-[#464646]">{referenceNumber}</div>
          </div>
          <div className="w-[220px]">
            <div className="text-[#464646] text-sm font-medium mb-1">Served</div>
            <div className="text-xs font-normal leading-none text-[#464646] whitespace-nowrap">
              {servedTime} | {formatDate(servedDate)}
            </div>
          </div>
          <div>
            {/* Countdown with dashed border */}
            <div className="bg-white inline-flex relative p-[2px]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='none' stroke='%2301292D' stroke-width='2' stroke-dasharray='24 12' stroke-dashoffset='0' stroke-linecap='square'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%'
            }}>
              <div className="px-4 py-2">
                <div className="text-[#464646] text-sm font-medium mb-1">Countdown</div>
                <div className="text-[#FF6B6B] text-xs font-normal leading-none">
                  {timeLeft.days}days | {timeLeft.hours}hrs | {timeLeft.minutes}mins | {timeLeft.seconds}sec
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Link href={`/archives/announcements/${id}`}>
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="inline-flex items-center gap-2 px-2 py-1.5 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors text-sm"
          >
            Read online
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.29102 6.98317H3.04102L3.42435 5.88317H5.15768L5.55768 6.98317H6.29102L4.67435 2.68317H3.90768L2.29102 6.98317ZM3.64102 5.2665L4.27435 3.48317H4.30768L4.94102 5.2665H3.64102ZM8.95768 4.09984V2.9665C9.32435 2.81095 9.69935 2.69428 10.0827 2.6165C10.466 2.53873 10.8688 2.49984 11.291 2.49984C11.5799 2.49984 11.8632 2.52206 12.141 2.5665C12.4188 2.61095 12.691 2.6665 12.9577 2.73317V3.79984C12.691 3.69984 12.4216 3.62484 12.1493 3.57484C11.8771 3.52484 11.591 3.49984 11.291 3.49984C10.8688 3.49984 10.4632 3.55262 10.0743 3.65817C9.68546 3.76373 9.31324 3.91095 8.95768 4.09984Z" fill="currentColor"/>
            </svg>
          </motion.button>
        </Link>
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="inline-flex items-center gap-2 px-2 py-1.5 bg-[#01292D] text-[#64CCC5] hover:bg-[#064954] transition-colors text-sm"
        >
          Download
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0V12M8 12L3 7M8 12L13 7" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 14H14" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </motion.button>
      </div>
    </div>
  );
} 