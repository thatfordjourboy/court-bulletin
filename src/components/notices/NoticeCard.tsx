'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';
import Link from 'next/link';

interface NoticeCardProps {
  id: string;
  type: string;
  title: string;
  suitNumber?: string;
  referenceNumber?: string;
  servedDate: string;
  servedTime: string;
  court: string;
  division?: string;
  expiryDate: string;
}

export default function NoticeCard({
  id,
  type,
  title,
  suitNumber,
  referenceNumber,
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
      month: 'short',
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

  const getNumberLabel = (type: string) => {
    return type === 'SUBSTITUTED_SERVICE_NOTICES' || type === 'ESTATE_NOTICES' 
      ? 'Suit number' 
      : 'Reference number';
  };

  const getNumber = (type: string) => {
    if (type === 'SUBSTITUTED_SERVICE_NOTICES' || type === 'ESTATE_NOTICES') {
      return suitNumber || 'N/A';
    }
    return referenceNumber || 'N/A';
  };

  return (
    <div className="space-y-3">
      <motion.div 
        className="bg-[#F3F5F8] p-3 inline-block"
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
          <div className="w-[150px] pl-2">
            <div className="text-[#464646] text-sm font-medium mb-1">{getNumberLabel(type)}</div>
            <div className="text-xs font-normal leading-none text-[#464646]">{getNumber(type)}</div>
          </div>
          <div className="w-[220px] px-2">
            <div className="text-[#464646] text-sm font-medium mb-1">Served</div>
            <div className="text-xs font-normal leading-none text-[#464646] whitespace-nowrap">{servedTime} | {formatDate(servedDate)}</div>
          </div>
          <div className="pl-2">
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
        <Link href={`/notices/${id.replace('notice-', '')}`}>
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="inline-flex items-center gap-2 px-2 py-1.5 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors text-sm"
          >
            Read online
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.29102 6.98317H3.04102L3.42435 5.88317H5.15768L5.55768 6.98317H6.29102L4.67435 2.68317H3.90768L2.29102 6.98317ZM3.64102 5.2665L4.27435 3.48317H4.30768L4.94102 5.2665H3.64102ZM8.95768 4.09984V2.9665C9.32435 2.81095 9.69935 2.69428 10.0827 2.6165C10.466 2.53873 10.8688 2.49984 11.291 2.49984C11.5799 2.49984 11.8632 2.52206 12.141 2.5665C12.4188 2.61095 12.691 2.6665 12.9577 2.73317V3.79984C12.691 3.69984 12.4216 3.62484 12.1493 3.57484C11.8771 3.52484 11.591 3.49984 11.291 3.49984C10.8688 3.49984 10.4632 3.55262 10.0743 3.65817C9.68546 3.76373 9.31324 3.91095 8.95768 4.09984ZM8.95768 7.7665V6.63317C9.32435 6.47761 9.69935 6.36095 10.0827 6.28317C10.466 6.20539 10.8688 6.1665 11.291 6.1665C11.5799 6.1665 11.8632 6.18873 12.141 6.23317C12.4188 6.27762 12.691 6.33317 12.9577 6.39984V7.4665C12.691 7.3665 12.4216 7.2915 12.1493 7.2415C11.8771 7.1915 11.591 7.1665 11.291 7.1665C10.8688 7.1665 10.4632 7.2165 10.0743 7.3165C9.68546 7.4165 9.31324 7.5665 8.95768 7.7665ZM8.95768 5.93317V4.79984C9.32435 4.64428 9.69935 4.52762 10.0827 4.44984C10.466 4.37206 10.8688 4.33317 11.291 4.33317C11.5799 4.33317 11.8632 4.35539 12.141 4.39984C12.4188 4.44428 12.691 4.49984 12.9577 4.5665V5.63317C12.691 5.53317 12.4216 5.45817 12.1493 5.40817C11.8771 5.35817 11.591 5.33317 11.291 5.33317C10.8688 5.33317 10.4632 5.38595 10.0743 5.4915C9.68546 5.59706 9.31324 5.74428 8.95768 5.93317ZM3.95768 8.1665C4.4799 8.1665 4.98824 8.22484 5.48268 8.3415C5.97713 8.45817 6.46879 8.63317 6.95768 8.8665V2.29984C6.50213 2.03317 6.01879 1.83317 5.50768 1.69984C4.99657 1.5665 4.4799 1.49984 3.95768 1.49984C3.55768 1.49984 3.16046 1.53873 2.76602 1.6165C2.37157 1.69428 1.99102 1.81095 1.62435 1.9665V8.5665C2.01324 8.43317 2.39935 8.33317 2.78268 8.2665C3.16602 8.19984 3.55768 8.1665 3.95768 8.1665ZM8.29102 8.8665C8.7799 8.63317 9.27157 8.45817 9.76602 8.3415C10.2605 8.22484 10.7688 8.1665 11.291 8.1665C11.691 8.1665 12.0827 8.19984 12.466 8.2665C12.8493 8.33317 13.2355 8.43317 13.6243 8.5665V1.9665C13.2577 1.81095 12.8771 1.69428 12.4827 1.6165C12.0882 1.53873 11.691 1.49984 11.291 1.49984C10.7688 1.49984 10.2521 1.5665 9.74102 1.69984C9.22991 1.83317 8.74657 2.03317 8.29102 2.29984V8.8665ZM7.62435 10.8332C7.09102 10.4109 6.51324 10.0832 5.89102 9.84984C5.26879 9.6165 4.62435 9.49984 3.95768 9.49984C3.49102 9.49984 3.03268 9.56095 2.58268 9.68317C2.13268 9.80539 1.70213 9.97762 1.29102 10.1998C1.05768 10.3221 0.832682 10.3165 0.616016 10.1832C0.399349 10.0498 0.291016 9.85539 0.291016 9.59984V1.5665C0.291016 1.44428 0.321571 1.32762 0.382682 1.2165C0.443793 1.10539 0.53546 1.02206 0.657682 0.966504C1.16879 0.699837 1.70213 0.499837 2.25768 0.366504C2.81324 0.233171 3.3799 0.166504 3.95768 0.166504C4.60213 0.166504 5.23268 0.249837 5.84935 0.416504C6.46602 0.583171 7.05768 0.833171 7.62435 1.1665C8.19102 0.833171 8.78268 0.583171 9.39935 0.416504C10.016 0.249837 10.6466 0.166504 11.291 0.166504C11.8688 0.166504 12.4355 0.233171 12.991 0.366504C13.5466 0.499837 14.0799 0.699837 14.591 0.966504C14.7132 1.02206 14.8049 1.10539 14.866 1.2165C14.9271 1.32762 14.9577 1.44428 14.9577 1.5665V9.59984C14.9577 9.85539 14.8493 10.0498 14.6327 10.1832C14.416 10.3165 14.191 10.3221 13.9577 10.1998C13.5466 9.97762 13.116 9.80539 12.666 9.68317C12.216 9.56095 11.7577 9.49984 11.291 9.49984C10.6243 9.49984 9.97991 9.6165 9.35768 9.84984C8.73546 10.0832 8.15768 10.4109 7.62435 10.8332Z" fill="currentColor"/>
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