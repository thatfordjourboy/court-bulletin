import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white pt-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24">
        {/* Top Row: Logo + Search */}
        <div className="flex items-center justify-between mb-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
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
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-none focus:outline-none focus:border-[#01292D] text-sm"
            />
            <button className="absolute right-0 top-0 h-full w-[40px] bg-[#01292D] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.361 18.2168L14.601 13.2662C15.8249 11.8113 16.4954 9.98069 16.4954 8.07499C16.4954 3.62251 12.8729 0 8.42045 0C3.96797 0 0.345459 3.62251 0.345459 8.07499C0.345459 12.5275 3.96797 16.15 8.42045 16.15C10.092 16.15 11.6849 15.6458 13.0467 14.6888L17.8429 19.677C18.0434 19.8852 18.313 20 18.602 20C18.8755 20 19.1349 19.8957 19.3319 19.7061C19.7504 19.3034 19.7637 18.6357 19.361 18.2168ZM8.42045 2.10652C11.7115 2.10652 14.3889 4.78391 14.3889 8.07499C14.3889 11.3661 11.7115 14.0435 8.42045 14.0435C5.12937 14.0435 2.45198 11.3661 2.45198 8.07499C2.45198 4.78391 5.12937 2.10652 8.42045 2.10652Z" fill="white"/>
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 text-[#01292D]">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Bottom Row: Navigation + Contact/Sign Up */}
        <div className="border-t border-[#E5E7EB]">
          <div className="hidden lg:flex items-center justify-between py-4">
            {/* Navigation Menu */}
            <nav className="flex-1 flex items-center justify-center gap-8">
              <Link href="/gazettes" className="text-[#01292D] hover:text-[#71CED1] transition-colors">
                Gazettes
              </Link>
              <Link href="/bulletin" className="text-[#01292D] hover:text-[#71CED1] transition-colors">
                Bulletin
              </Link>
              <Link href="/cause-lists" className="text-[#01292D] hover:text-[#71CED1] transition-colors">
                Cause Lists
              </Link>
              <Link href="/notices" className="text-[#01292D] hover:text-[#71CED1] transition-colors">
                Notices
              </Link>
              <Link href="/archives" className="text-[#01292D] hover:text-[#71CED1] transition-colors">
                Archives
              </Link>
              <Link href="/statistics" className="text-[#01292D] hover:text-[#71CED1] transition-colors">
                Court Statistics
              </Link>
            </nav>

            {/* Contact and Sign Up */}
            <div className="flex items-center gap-4">
              <Link 
                href="/contact" 
                className="px-6 py-2 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors"
              >
                Contact us
              </Link>
              
              <Link 
                href="/signup" 
                className="px-6 py-2 bg-[#01292D] text-white hover:bg-[#01292D]/90 transition-colors"
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

export default Header; 