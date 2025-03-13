'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const GazettesHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkStyles = "text-[#01292D] hover:text-[#71CED1] transition-all duration-300 hover:scale-105";
  const buttonStyles = "px-6 py-2 transition-all duration-300 hover:scale-105";

  return (
    <header className="bg-white pt-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24">
        {/* Single Row: Logo + Navigation + Buttons */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Image
              src="/images/ghana-court-bulletin-combined.svg"
              alt="Ghana Court Bulletin"
              width={200}
              height={98}
              priority
              className="object-contain"
            />
          </Link>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/gazettes" className={linkStyles}>
              Gazettes
            </Link>
            <Link href="/bulletin" className={linkStyles}>
              Bulletin
            </Link>
            <Link href="/cause-lists" className={linkStyles}>
              Cause Lists
            </Link>
            <Link href="/notices" className={linkStyles}>
              Notices
            </Link>
            <Link href="/archives" className={linkStyles}>
              Archives
            </Link>
            <Link href="/statistics" className={linkStyles}>
              Court Statistics
            </Link>
          </nav>

          {/* Contact and Sign Up - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/contact" 
              className={`${buttonStyles} border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white`}
            >
              Contact us
            </Link>
            <Link 
              href="/signup" 
              className={`${buttonStyles} bg-[#01292D] text-white hover:bg-[#71CED1]`}
            >
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#01292D] transition-transform duration-300 hover:scale-110"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} border-t border-[#E5E7EB] mt-6`}>
          <div className="py-4 space-y-4">
            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-4">
              <Link href="/gazettes" className={`${linkStyles} px-2`}>
                Gazettes
              </Link>
              <Link href="/bulletin" className={`${linkStyles} px-2`}>
                Bulletin
              </Link>
              <Link href="/cause-lists" className={`${linkStyles} px-2`}>
                Cause Lists
              </Link>
              <Link href="/notices" className={`${linkStyles} px-2`}>
                Notices
              </Link>
              <Link href="/archives" className={`${linkStyles} px-2`}>
                Archives
              </Link>
              <Link href="/statistics" className={`${linkStyles} px-2`}>
                Court Statistics
              </Link>
            </nav>

            {/* Mobile Contact and Sign Up */}
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/contact" 
                className={`${buttonStyles} w-full border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white text-center`}
              >
                Contact us
              </Link>
              <Link 
                href="/signup" 
                className={`${buttonStyles} w-full bg-[#01292D] text-white hover:bg-[#71CED1] text-center`}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GazettesHeader; 