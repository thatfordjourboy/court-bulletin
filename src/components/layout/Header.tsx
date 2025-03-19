"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import SearchBar from './SearchBar';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNoticesMenuOpen, setIsNoticesMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Add timeout ref for dropdown
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const isActivePath = (path: string) => {
    return pathname?.startsWith(path);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const linkStyles = "text-[#01292D] hover:text-[#71CED1] transition-all duration-300 hover:scale-105";
  const activeLinkStyles = "text-[#01292D] font-bold";
  const buttonStyles = "px-6 py-2 transition-all duration-300 hover:scale-105";

  const noticeTypes = [
    { name: "Substituted Service Notices", type: "substituted-service" },
    { name: "General Notices", type: "general" },
    { name: "Practice Direction", type: "practice-direction" },
    { name: "Announcements", type: "announcements" },
    { name: "Estate Notices", type: "estate" }
  ];

  const handleNoticeTypeClick = (type: string) => {
    router.push(`/notices?type=${type}`);
    setIsNoticesMenuOpen(false);
  };

  const handleDropdownEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsNoticesMenuOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsNoticesMenuOpen(false);
      closeTimeout.current = null;
    }, 150); // Small delay before closing
  };

  return (
    <header className="bg-white pt-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24">
        {/* Top Row: Logo + Search */}
        <div className="flex items-center justify-between mb-6">
          {/* Logo */}
          <Link 
            href="/"
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none"
          >
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
                <Link 
                  href="/gazettes" 
                  className={`${linkStyles} ${isActivePath('/gazettes') ? activeLinkStyles : ''}`}
                >
                  Gazettes
                </Link>
                <Link 
                  href="/bulletin" 
                  className={`${linkStyles} ${isActivePath('/bulletin') ? activeLinkStyles : ''}`}
                >
                  Bulletin
                </Link>
                <Link 
                  href="/cause-lists" 
                  className={`${linkStyles} ${isActivePath('/cause-lists') ? activeLinkStyles : ''}`}
                >
                  Cause Lists
                </Link>
                {/* Notices Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="flex items-center gap-1">
                    <Link 
                      href="/notices"
                      className={`${linkStyles} ${isActivePath('/notices') ? activeLinkStyles : ''}`}
                    >
                      Notices
                    </Link>
                    <button className="p-1 group">
                      <svg
                        className="w-4 h-4 text-current"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Invisible gap cover */}
                  {isNoticesMenuOpen && (
                    <div className="absolute top-full left-0 w-full h-2 -mt-1" />
                  )}
                  
                  {/* Dropdown Menu */}
                  {isNoticesMenuOpen && (
                    <div
                      className="absolute left-0 top-[calc(100%-1px)] w-64 bg-white border border-gray-200 shadow-lg rounded-sm z-50"
                    >
                      {noticeTypes.map((notice) => (
                        <button
                          key={notice.type}
                          onClick={() => handleNoticeTypeClick(notice.type)}
                          className="block w-full text-left py-2 px-3 text-sm text-[#01292D] hover:bg-gray-50 flex items-center gap-3"
                        >
                          <div className="w-6 h-6 flex-shrink-0">
                            {notice.type === 'substituted-service' ? (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="5.75" fill="#F3F5F8"/>
                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="5.75" stroke="#01292D" stroke-width="0.5"/>
                                <path d="M8 12H13M8 14H15M8 16H11M18 17V10L13 5H8C7.46957 5 6.96086 5.21071 6.58579 5.58579C6.21071 5.96086 6 6.46957 6 7V17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17Z" stroke="#01292D" stroke-width="1.14286" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13 5V8C13 8.53043 13.2107 9.03914 13.5858 9.41421C13.9609 9.78929 14.4696 10 15 10H18" stroke="#01292D" stroke-width="1.14286" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            ) : notice.type === 'general' ? (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="5.75" fill="#F3F5F8"/>
                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="5.75" stroke="#01292D" stroke-width="0.5"/>
                                <path d="M15.5294 5V6.41176M12 5V6.41176M8.47059 5V6.41176M9.17647 14.1765H12M9.17647 10.6471H14.8235M6 10.6471C6 8.31765 6 7.15294 6.72353 6.42941C7.44706 5.70588 8.61176 5.70588 10.9412 5.70588H13.0588C15.3882 5.70588 16.5529 5.70588 17.2765 6.42941C18 7.15294 18 8.31765 18 10.6471V14.1765C18 16.5059 18 17.6706 17.2765 18.3941C16.5529 19.1176 15.3882 19.1176 13.0588 19.1176H10.9412C8.61176 19.1176 7.44706 19.1176 6.72353 18.3941C6 17.6706 6 16.5059 6 14.1765V10.6471Z" stroke="#01292D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            ) : notice.type === 'practice-direction' ? (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="5.75" fill="#F3F5F8"/>
                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="5.75" stroke="#01292D" stroke-width="0.5"/>
                                <path d="M5.66656 10.3912C5.45524 10.6024 5.28761 10.8532 5.17324 11.1293C5.05887 11.4053 5 11.7012 5 12C5 12.2988 5.05887 12.5947 5.17324 12.8707C5.28761 13.1468 5.45524 13.3976 5.66656 13.6088L10.3912 18.3334C10.6024 18.5448 10.8532 18.7124 11.1293 18.8268C11.4053 18.9411 11.7012 19 12 19C12.2988 19 12.5947 18.9411 12.8707 18.8268C13.1468 18.7124 13.3976 18.5448 13.6088 18.3334L18.3334 13.6088C18.5448 13.3976 18.7124 13.1468 18.8268 12.8707C18.9411 12.5947 19 12.2988 19 12C19 11.7012 18.9411 11.4053 18.8268 11.1293C18.7124 10.8532 18.5448 10.6024 18.3334 10.3912L13.6088 5.66656C13.3976 5.45524 13.1468 5.28761 12.8707 5.17324C12.5947 5.05887 12.2988 5 12 5C11.7012 5 11.4053 5.05887 11.1293 5.17324C10.8532 5.28761 10.6024 5.45524 10.3912 5.66656L5.66656 10.3912ZM6.4085 12.8662C6.29474 12.7524 6.20451 12.6174 6.14294 12.4688C6.08138 12.3202 6.04969 12.1609 6.04969 12C6.04969 11.8391 6.08138 11.6798 6.14294 11.5312C6.20451 11.3826 6.29474 11.2476 6.4085 11.1338L11.1338 6.4092C11.2476 6.29544 11.3826 6.20521 11.5312 6.14364C11.6798 6.08208 11.8391 6.05039 12 6.05039C12.1609 6.05039 12.3202 6.08208 12.4688 6.14364C12.6174 6.20521 12.7524 6.29544 12.8662 6.4092L17.5908 11.1338C17.7046 11.2476 17.7948 11.3826 17.8564 11.5312C17.9179 11.6798 17.9496 11.8391 17.9496 12C17.9496 12.1609 17.9179 12.3202 17.8564 12.4688C17.7948 12.6174 17.7046 12.7524 17.5908 12.8662L12.8662 17.5908C12.7524 17.7046 12.6174 17.7948 12.4688 17.8564C12.3202 17.9179 12.1609 17.9496 12 17.9496C11.8391 17.9496 11.6798 17.9179 11.5312 17.8564C11.3826 17.7948 11.2476 17.7046 11.1338 17.5908L6.4085 12.8662ZM13.2456 8.65392C13.146 8.56119 13.0144 8.51071 12.8784 8.51311C12.7424 8.51551 12.6127 8.5706 12.5165 8.66678C12.4203 8.76296 12.3652 8.89272 12.3628 9.02872C12.3604 9.16472 12.4109 9.29635 12.5036 9.39586L13.0069 9.89982H11.824C11.3136 9.9 10.8242 10.1029 10.4633 10.4638C10.1025 10.8248 9.89982 11.3143 9.89982 11.8247V14.2745C9.89982 14.4137 9.95513 14.5472 10.0536 14.6457C10.152 14.7441 10.2855 14.7994 10.4248 14.7994C10.564 14.7994 10.6975 14.7441 10.796 14.6457C10.8944 14.5472 10.9497 14.4137 10.9497 14.2745V11.8247C10.9497 11.3417 11.3417 10.9497 11.8247 10.9497H13.0076L12.5036 11.4537C12.4535 11.5021 12.4135 11.5601 12.386 11.6241C12.3586 11.6882 12.3441 11.7571 12.3435 11.8268C12.343 11.8965 12.3563 11.9656 12.3827 12.0301C12.4091 12.0946 12.4481 12.1532 12.4975 12.2025C12.5468 12.2518 12.6054 12.2907 12.6699 12.3171C12.7345 12.3434 12.8036 12.3567 12.8733 12.3561C12.943 12.3554 13.0119 12.3409 13.0759 12.3134C13.1399 12.2858 13.1978 12.2458 13.2463 12.1956L14.6461 10.7957C14.7444 10.6973 14.7997 10.5639 14.7997 10.4248C14.7997 10.2857 14.7444 10.1522 14.6461 10.0538L13.2456 8.65392Z" fill="#01292D"/>
                              </svg>
                            ) : notice.type === 'announcements' ? (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="5.75" fill="#F3F5F8"/>
                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="5.75" stroke="#01292D" stroke-width="0.5"/>
                                <path d="M19 8.275C19 9.5295 17.9795 10.55 16.725 10.55C15.4705 10.55 14.45 9.5295 14.45 8.275C14.45 7.0205 15.4705 6 16.725 6C17.9795 6 19 7.0205 19 8.275ZM16.725 11.85H16.4V17.7H7.3V8.6H13.1695C13.15 8.496 13.15 8.3855 13.15 8.275C13.15 7.95 13.202 7.625 13.2865 7.3H7.3C6.5785 7.3 6 7.8785 6 8.6V17.7C6 18.0448 6.13696 18.3754 6.38076 18.6192C6.62456 18.863 6.95522 19 7.3 19H16.4C17.1215 19 17.7 18.4215 17.7 17.7V11.7135C17.375 11.798 17.05 11.85 16.725 11.85Z" fill="#01292D"/>
                              </svg>
                            ) : notice.type === 'estate' ? (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="5.75" fill="#F3F5F8"/>
                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="5.75" stroke="#01292D" stroke-width="0.5"/>
                                <path d="M15.6 9.6H9.6C8.94 9.6 8.4 10.14 8.4 10.8V14.4C8.4 14.7183 8.52643 15.0235 8.75147 15.2485C8.97652 15.4736 9.28174 15.6 9.6 15.6H15.6C16.266 15.6 16.8 15.066 16.8 14.4V10.8C16.8 10.4817 16.6736 10.1765 16.4485 9.95147C16.2235 9.72643 15.9183 9.6 15.6 9.6ZM13.2 14.4H9.6V13.2H13.2V14.4ZM15.6 12H9.6V10.8H15.6V12ZM18 8.4H7.2V18H6V6H7.2V7.2H18V8.4Z" fill="#01292D"/>
                              </svg>
                            ) : null}
                          </div>
                          {notice.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Link 
                  href="/archives" 
                  className={`${linkStyles} ${isActivePath('/archives') ? activeLinkStyles : ''}`}
                >
                  Archives
                </Link>
                <Link 
                  href="/statistics" 
                  className={`${linkStyles} ${isActivePath('/statistics') ? activeLinkStyles : ''}`}
                >
                  Court Statistics
                </Link>
              </nav>
            </div>

            {/* Contact and Sign Up */}
            <div className="flex items-center gap-4">
              <Link 
                href="/contact" 
                className={`${buttonStyles} border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white ${
                  isActivePath('/contact') ? 'bg-[#01292D] text-white' : ''
                }`}
              >
                Contact us
              </Link>
              
              <Link 
                href="/signup" 
                className={`${buttonStyles} bg-[#01292D] text-white hover:bg-[#71CED1] ${
                  isActivePath('/signup') ? 'bg-[#71CED1]' : ''
                }`}
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
                <Link 
                  href="/gazettes" 
                  className={`${linkStyles} px-2 ${isActivePath('/gazettes') ? activeLinkStyles : ''}`}
                >
                  Gazettes
                </Link>
                <Link 
                  href="/bulletin" 
                  className={`${linkStyles} px-2 ${isActivePath('/bulletin') ? activeLinkStyles : ''}`}
                >
                  Bulletin
                </Link>
                <Link 
                  href="/cause-lists" 
                  className={`${linkStyles} px-2 ${isActivePath('/cause-lists') ? activeLinkStyles : ''}`}
                >
                  Cause Lists
                </Link>
                {/* Mobile Notices Menu */}
                <div className="px-2">
                  <div className="flex items-center justify-between">
                    <Link 
                      href="/notices"
                      className={`${linkStyles} ${isActivePath('/notices') ? activeLinkStyles : ''}`}
                    >
                      Notices
                    </Link>
                    <button
                      onClick={() => setIsNoticesMenuOpen(!isNoticesMenuOpen)}
                      className="p-1"
                    >
                      <svg
                        className={`w-4 h-4 transform transition-transform ${isNoticesMenuOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                  
                  {isNoticesMenuOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      {noticeTypes.map((notice) => (
                        <button
                          key={notice.type}
                          onClick={() => handleNoticeTypeClick(notice.type)}
                          className={`block w-full text-left py-2 text-sm ${linkStyles}`}
                        >
                          {notice.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Link 
                  href="/archives" 
                  className={`${linkStyles} px-2 ${isActivePath('/archives') ? activeLinkStyles : ''}`}
                >
                  Archives
                </Link>
                <Link 
                  href="/statistics" 
                  className={`${linkStyles} px-2 ${isActivePath('/statistics') ? activeLinkStyles : ''}`}
                >
                  Court Statistics
                </Link>
              </nav>

              {/* Mobile Contact and Sign Up */}
              <div className="flex flex-col space-y-4 pt-4">
                <Link 
                  href="/contact" 
                  className={`${buttonStyles} w-full border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white text-center ${
                    isActivePath('/contact') ? 'bg-[#01292D] text-white' : ''
                  }`}
                >
                  Contact us
                </Link>
                
                <Link 
                  href="/signup" 
                  className={`${buttonStyles} w-full bg-[#01292D] text-white hover:bg-[#71CED1] text-center ${
                    isActivePath('/signup') ? 'bg-[#71CED1]' : ''
                  }`}
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