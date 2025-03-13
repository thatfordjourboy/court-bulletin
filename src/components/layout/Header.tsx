"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkStyles = "text-[#01292D] hover:text-[#71CED1] transition-all duration-300 hover:scale-105";
  const buttonStyles = "px-6 py-2 transition-all duration-300 hover:scale-105";

  return (
    <header className="bg-white pt-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24">
        {/* Top Row: Logo + Search */}
        <div className="flex items-center justify-between mb-6">
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

          {/* Search Bar */}
          <div className="hidden lg:block relative w-[280px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-none focus:outline-none focus:border-[#01292D] text-sm transition-all duration-300 focus:ring-2 focus:ring-[#71CED1]"
            />
            <button className="absolute right-0 top-0 h-full w-[40px] bg-[#01292D] flex items-center justify-center transition-all duration-300 hover:bg-[#71CED1]">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.361 18.2168L14.601 13.2662C15.8249 11.8113 16.4954 9.98069 16.4954 8.07499C16.4954 3.62251 12.8729 0 8.42045 0C3.96797 0 0.345459 3.62251 0.345459 8.07499C0.345459 12.5275 3.96797 16.15 8.42045 16.15C10.092 16.15 11.6849 15.6458 13.0467 14.6888L17.8429 19.677C18.0434 19.8852 18.313 20 18.602 20C18.8755 20 19.1349 19.8957 19.3319 19.7061C19.7504 19.3034 19.7637 18.6357 19.361 18.2168ZM8.42045 2.10652C11.7115 2.10652 14.3889 4.78391 14.3889 8.07499C14.3889 11.3661 11.7115 14.0435 8.42045 14.0435C5.12937 14.0435 2.45198 11.3661 2.45198 8.07499C2.45198 4.78391 5.12937 2.10652 8.42045 2.10652Z" fill="white"/>
              </svg>
            </button>
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

        {/* Bottom Row: Navigation + Contact/Sign Up */}
        <div className="border-t border-[#E5E7EB]">
          <div className="hidden lg:flex items-center justify-between py-4">
            {/* Navigation Menu */}
            <div className="flex-1">
              <nav className="flex items-center justify-end gap-8 mr-8">
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
            </div>

            {/* Contact and Sign Up */}
            <div className="flex items-center gap-4">
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
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative w-full mb-6">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-none focus:outline-none focus:border-[#01292D] text-sm transition-all duration-300 focus:ring-2 focus:ring-[#71CED1]"
                />
                <button className="absolute right-0 top-0 h-full w-[40px] bg-[#01292D] flex items-center justify-center transition-all duration-300 hover:bg-[#71CED1]">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.361 18.2168L14.601 13.2662C15.8249 11.8113 16.4954 9.98069 16.4954 8.07499C16.4954 3.62251 12.8729 0 8.42045 0C3.96797 0 0.345459 3.62251 0.345459 8.07499C0.345459 12.5275 3.96797 16.15 8.42045 16.15C10.092 16.15 11.6849 15.6458 13.0467 14.6888L17.8429 19.677C18.0434 19.8852 18.313 20 18.602 20C18.8755 20 19.1349 19.8957 19.3319 19.7061C19.7504 19.3034 19.7637 18.6357 19.361 18.2168ZM8.42045 2.10652C11.7115 2.10652 14.3889 4.78391 14.3889 8.07499C14.3889 11.3661 11.7115 14.0435 8.42045 14.0435C5.12937 14.0435 2.45198 11.3661 2.45198 8.07499C2.45198 4.78391 5.12937 2.10652 8.42045 2.10652Z" fill="white"/>
                  </svg>
                </button>
              </div>

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
      </div>
    </header>
  );
};

export default Header; 