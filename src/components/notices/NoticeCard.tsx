'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

interface NoticeCardProps {
  type: string;
  title: string;
  suitNumber: string;
  servedDate: string;
  servedTime: string;
  court: string;
  division?: string;
  expiryDate: string;
}

export default function NoticeCard({
  type,
  title,
  suitNumber,
  servedDate,
  servedTime,
  court,
  division,
  expiryDate
}: NoticeCardProps) {
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
      month: 'long',
      year: 'numeric'
    });
  };

  const getBadgeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'GENERAL_NOTICES': 'bg-[#E5F3FF] text-[#0066CC]',
      'ANNOUNCEMENTS': 'bg-[#E5F3FF] text-[#0066CC]',
      'PRACTICE_DIRECTION': 'bg-[#E5F3FF] text-[#0066CC]',
      'ESTATE_NOTICES': 'bg-[#E5F3FF] text-[#0066CC]',
      'JUDICIAL_NOTICES': 'bg-[#E5F3FF] text-[#0066CC]',
      'SUBSTITUTED_SERVICE_NOTICES': 'bg-[#E5F3FF] text-[#0066CC]'
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
        className="bg-[#F3F5F8] pt-2 pb-6 px-2"
        variants={fadeInUp}
      >
        {/* Header section with type and court */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 text-sm font-medium ${getBadgeColor(type)}`}>
            {formatType(type)}
          </span>
          <span className="text-[#464646] text-sm bg-white px-3 py-1">
            {court}{division ? ` (${division})` : ''}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[#01292D] font-inter text-base font-bold leading-[150%] tracking-[-0.02em] truncate whitespace-nowrap mb-6">
          {title}
        </h3>

        {/* Details grid */}
        <div className="flex -mx-2">
          <div className="w-[150px] px-2">
            <div className="text-[#464646] text-sm font-medium mb-1">Suit number</div>
            <div className="font-inter text-xs font-normal leading-none text-[#464646]">{suitNumber}</div>
          </div>
          <div className="w-[250px] px-2">
            <div className="text-[#464646] text-sm font-medium mb-1">Served</div>
            <div className="font-inter text-xs font-normal leading-none text-[#464646] w-[160px] h-[15px]">{servedTime} | {formatDate(servedDate)}</div>
          </div>
          <div className="flex-1 px-2">
            <div className="text-[#464646] text-sm font-medium mb-1">Countdown</div>
            <div className="text-[#FF6B6B] text-xs font-normal leading-none">
              {timeLeft.days}days | {timeLeft.hours}hrs | {timeLeft.minutes}mins | {timeLeft.seconds}sec
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons - now outside the card */}
      <div className="flex gap-3">
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2V14H14V2H2ZM1 0H15C15.5523 0 16 0.447715 16 1V15C16 15.5523 15.5523 16 15 16H1C0.447715 16 0 15.5523 0 15V1C0 0.447715 0.447715 0 1 0ZM3 3H13V5H3V3ZM3 6H13V8H3V6ZM3 9H13V11H3V9Z" fill="currentColor"/>
          </svg>
          Read online
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#01292D] text-[#64CCC5] hover:bg-[#064E55] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0V12M8 12L3 7M8 12L13 7" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 14H14" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Download
        </motion.button>
      </div>
    </div>
  );
} 