'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ArchiveNavigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.startsWith(`/archives/${path}`);
  };

  const linkBaseStyles = "px-2 sm:px-4 py-2 transition-colors duration-200 flex items-center gap-1 sm:gap-2 font-['Inter'] text-[16px] sm:text-[18px] font-bold leading-[100%] tracking-[0%] whitespace-nowrap";

  return (
    <nav className="w-full bg-[#FFEACB] py-2 sm:py-3 mb-8">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <Link
            href="/archives/cause-lists"
            className={`${linkBaseStyles} ${
              isActive('cause-lists')
                ? 'bg-[#01292D] text-white'
                : 'text-[#01292D] hover:bg-[#FFE7B3]'
            }`}
          >
            Cause Lists
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </Link>

          <Link
            href="/archives/announcements"
            className={`${linkBaseStyles} ${
              isActive('announcements')
                ? 'bg-[#01292D] text-white'
                : 'text-[#01292D] hover:bg-[#FFE7B3]'
            }`}
          >
            Announcements
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </Link>

          <Link
            href="/archives/notices"
            className={`${linkBaseStyles} ${
              isActive('notices')
                ? 'bg-[#01292D] text-white'
                : 'text-[#01292D] hover:bg-[#FFE7B3]'
            }`}
          >
            Notices
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ArchiveNavigation; 