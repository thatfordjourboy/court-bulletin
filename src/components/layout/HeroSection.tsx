'use client';

import Link from 'next/link';
import Image from 'next/image';
import useTypewriter from '../../hooks/useTypewriter';

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
          <div className="max-w-xl">
            <h1 className="text-[#01292D] text-5xl font-bold leading-tight mb-6">
              Your <span className="relative">
                <span 
                  className="italic font-bold text-[48px] leading-[150%] tracking-[-1%] font-['Inter']"
                  style={gradientTextStyle}
                >
                  trusted
                </span>
                <span className="absolute bottom-1 left-0 w-full h-1 bg-[#71CED1]"></span>
              </span> source for
              <br />
              legal updates in Ghana
            </h1>
            
            <p className="text-lg text-[#01292D] mb-10">
              Providing timely and reliable legal bulletins, cause lists, and judicial
              notices to empower {' '}
              <span 
                className="italic font-bold"
                style={gradientTextStyle}
              >
                {animatedText}
              </span>
            </p>
            
            <Link
              href="/bulletin/weekly"
              className="inline-flex items-center px-[12px] py-[11px] bg-[#01292D] text-white font-medium rounded hover:bg-teal-800 transition-colors gap-[10px]"
            >
              Weekly Bulletin
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
          
          {/* Right Column - Image with Decorative Elements */}
          <div className="relative">
            {/* Container for positioning all elements */}
            <div className="relative">
              {/* Dark green rectangle at top-right */}
              <div 
                className="absolute" 
                style={{
                  top: '-24px',
                  right: '-24px',
                  width: '190px',
                  height: '115%',
                  backgroundColor: '#01292D',
                  zIndex: 1
                }}
              ></div>
              
              {/* Teal accent rectangle at bottom-left */}
              <div 
                className="absolute" 
                style={{
                  bottom: '-24px',
                  left: '-24px',
                  width: '117px',
                  height: '99px',
                  backgroundColor: '#C2F8FA',
                  zIndex: 1
                }}
              ></div>
              
              {/* The image */}
              <div className="relative" style={{ zIndex: 2 }}>
                <Image
                  src="/images/supremcourt.webp"
                  alt="Supreme Court of Ghana"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 