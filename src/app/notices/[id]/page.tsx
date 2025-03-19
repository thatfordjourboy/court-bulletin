'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { mockNotices, type Notice } from '@/data/mockNotices';
import { QRCodeSVG } from 'qrcode.react';
import { fadeInUp } from '@/utils/animations';

export default function NoticePage({ params }: { params: { id: string } }) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qrUrl, setQrUrl] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set up QR code URL after mount
  useEffect(() => {
    setQrUrl(`${window.location.origin}/notices/${params.id}`);
  }, [params.id]);

  // Fetch notice data
  useEffect(() => {
    const fetchNotice = () => {
      try {
        // Check if the ID already has the 'notice-' prefix
        const searchId = params.id.startsWith('notice-') ? params.id : `notice-${params.id}`;
        const foundNotice = mockNotices.find(n => n.id === searchId);
        setNotice(foundNotice || null);
      } catch (error) {
        console.error('Error fetching notice:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotice();
  }, [params.id]);

  // Handle countdown timer
  useEffect(() => {
    if (!notice?.expiryDate) return;

    const calculateTimeLeft = () => {
      const difference = new Date(notice.expiryDate).getTime() - new Date().getTime();
      
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
  }, [notice?.expiryDate]);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          {/* Back navigation */}
          <Link 
            href="/notices"
            className="inline-flex items-center text-[#0066CC] mb-8 hover:underline"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Back to Notices
          </Link>
          
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-[#464646] text-lg">Loading notice...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          {/* Back navigation */}
          <Link 
            href="/notices"
            className="inline-flex items-center text-[#0066CC] mb-8 hover:underline"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Back to Notices
          </Link>
          
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-[#464646] text-lg">Notice not found</div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    // Function to add ordinal suffix
    const getOrdinalSuffix = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    
    return `${getOrdinalSuffix(day)} ${month}, ${year}`;
  };

  const formatType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back navigation */}
        <Link 
          href="/notices"
          className="inline-flex items-center text-[#0066CC] mb-8 hover:underline"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to Notices
        </Link>

        <motion.div 
          className="w-full"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {/* Title and QR Code section */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[#01292D] text-[32px] font-bold mb-2">{notice.title}</h1>
              <div className="text-[#464646]">
                <div className="font-medium mb-1">
                  {notice.type === 'SUBSTITUTED_SERVICE_NOTICES' || notice.type === 'ESTATE_NOTICES' 
                    ? 'Suit number' 
                    : 'Reference number'
                  }
                </div>
                <div className="mb-4">
                  {notice.type === 'SUBSTITUTED_SERVICE_NOTICES' || notice.type === 'ESTATE_NOTICES'
                    ? notice.suitNumber
                    : notice.referenceNumber
                  }
                </div>

                {notice.type === 'SUBSTITUTED_SERVICE_NOTICES' && (
                  <>
                    <div className="mb-4">
                      <div className="font-inter text-[18px] font-bold leading-[150%] tracking-[-0.02em] text-[#01292D] w-[198px] h-[27px]">{notice.parties?.applicant.name}</div>
                      <span className="font-inter text-[14px] font-medium leading-none tracking-[-0.02em] text-[#01292D] bg-[#C5E0FF] px-[4px] py-[4px] inline-block">{notice.type === 'SUBSTITUTED_SERVICE_NOTICES' ? 'Applicant' : ''}</span>
                    </div>
                    
                    <div className="mb-4">
                      <span className="font-inter text-[16px] font-bold leading-none tracking-[-0.02em] uppercase text-[#FF8386] bg-[#FFCDCE] px-[6px] py-[6px] inline-block">VRS</span>
                    </div>

                    <div>
                      <div className="font-inter text-[18px] font-bold leading-[150%] tracking-[-0.02em] text-[#01292D] w-[198px] h-[27px]">{notice.parties?.respondent.name}</div>
                      <span className="font-inter text-[14px] font-medium leading-none tracking-[-0.02em] text-[#01292D] bg-[#C5E0FF] px-[4px] py-[4px] inline-block">{notice.type === 'SUBSTITUTED_SERVICE_NOTICES' ? 'Respondent' : ''}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              {qrUrl && (
                <QRCodeSVG 
                  value={qrUrl}
                  size={200}
                />
              )}
            </div>
          </div>

          {/* Horizontal line */}
          <div className="w-full h-[1px] bg-[#E5E7EB] my-8" />

          {/* Notice type and timing section */}
          <div className="bg-[#F3F5F8] p-4 flex items-center gap-4">
            <span className="font-inter font-medium text-[18px] leading-none tracking-[-0.02em] uppercase bg-[#E5F3FF] text-[#0066CC] px-4 py-2">
              {formatType(notice.type)}
            </span>
            <div className="text-[#464646]">
              <div className="font-medium">Served</div>
              <div>{notice.servedTime} | {formatDate(notice.servedDate)}</div>
            </div>
            <div className="inline-flex relative p-[2px] bg-white" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='none' stroke='%2301292D' stroke-width='2' stroke-dasharray='24 12' stroke-dashoffset='0' stroke-linecap='square'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%'
            }}>
              <div className="px-4 py-2">
                <div className="text-[#464646] text-sm font-medium mb-1">Countdown</div>
                <div className="text-[#FF6B6B] text-sm whitespace-nowrap">
                  {timeLeft.days}days | {timeLeft.hours}hrs | {timeLeft.minutes}mins | {timeLeft.seconds}sec
                </div>
              </div>
            </div>
          </div>

          {/* Court information */}
          {notice.division && (
            <div className="mb-8">
              <span className="text-[#464646] text-sm bg-white px-3 py-1">
                {notice.division}
              </span>
            </div>
          )}

          {/* Notice content */}
          <div className="prose max-w-none text-[#464646] text-lg leading-relaxed mb-12 max-w-4xl pt-8">
            {notice.content}
          </div>

          {/* Signature section */}
          <div className="mt-12 max-w-4xl">
            <p className="text-[#01292D] font-bold">Sgd: {notice.signatory}</p>
            <p className="text-[#464646]">{notice.signatoryTitle}</p>
          </div>

          {/* Download button */}
          <div className="mt-12">
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#01292D] text-[#64CCC5] hover:bg-[#064954] transition-colors"
            >
              Download
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0V12M8 12L3 7M8 12L13 7" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 14H14" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 