import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#01292D] text-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-16 lg:px-24 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8">
            {/* GH Court Bulletin Section */}
            <div className="lg:col-span-2 space-y-2">
              <h3 className="text-sm font-semibold text-[#F3F5F8] whitespace-nowrap">GH Court Bulletin</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/about" 
                    className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8] hover:text-[#71CED1] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/subscriptions" 
                    className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8] hover:text-[#71CED1] transition-colors"
                  >
                    Our Subscriptions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sitemap Section */}
            <div className="lg:col-span-2 space-y-2">
              <h3 className="text-sm font-semibold text-[#F3F5F8]">Sitemap</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/bulletin" 
                    className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8] hover:text-[#71CED1] transition-colors"
                  >
                    Bulletin
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/cause-lists" 
                    className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8] hover:text-[#71CED1] transition-colors"
                  >
                    Cause Lists
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/notices" 
                    className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8] hover:text-[#71CED1] transition-colors"
                  >
                    Notices
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/archives" 
                    className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8] hover:text-[#71CED1] transition-colors"
                  >
                    Archives
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get in touch Section */}
            <div className="lg:col-span-1 space-y-2">
              <h3 className="text-sm font-semibold text-[#F3F5F8]">Get in touch</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/help" 
                    className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8] hover:text-[#71CED1] transition-colors"
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <span className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8]">
                    Contact
                  </span>
                </li>
              </ul>
            </div>

            {/* Policies Section */}
            <div className="lg:col-span-1 space-y-2">
              <h3 className="text-sm font-semibold text-[#F3F5F8]">Policies</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/privacy" 
                    className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8] hover:text-[#71CED1] transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terms" 
                    className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8] hover:text-[#71CED1] transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-3 space-y-2">
              <h3 className="text-sm font-semibold text-[#F3F5F8]">Subscribe to our newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 text-xs text-gray-900 placeholder-gray-500 bg-white rounded-l focus:outline-none"
                />
                <button className="px-6 py-2 text-xs text-[#F3F5F8] bg-[#01292D] rounded-r hover:bg-[#71CED1] transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-[#F3F5F8]/20 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Logo */}
              <div className="md:order-1">
                <svg width="92" height="43" viewBox="0 0 92 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.72727 7.93359C8.64773 7.65708 8.53599 7.41276 8.39205 7.20064C8.24811 6.98473 8.07197 6.80291 7.86364 6.65518C7.65909 6.50367 7.42424 6.38814 7.15909 6.30859C6.89773 6.22905 6.60795 6.18928 6.28977 6.18928C5.69508 6.18928 5.17235 6.337 4.72159 6.63246C4.27462 6.92791 3.92614 7.35784 3.67614 7.92223C3.42614 8.48284 3.30114 9.16844 3.30114 9.97905C3.30114 10.7897 3.42424 11.479 3.67045 12.0472C3.91667 12.6154 4.26515 13.0491 4.71591 13.3484C5.16667 13.6438 5.69886 13.7915 6.3125 13.7915C6.86932 13.7915 7.3447 13.6931 7.73864 13.4961C8.13636 13.2953 8.43939 13.0131 8.64773 12.6495C8.85985 12.2859 8.96591 11.8559 8.96591 11.3597L9.46591 11.4336H6.46591V9.58132H11.3352V11.0472C11.3352 12.07 11.1193 12.9487 10.6875 13.6836C10.2557 14.4147 9.66098 14.979 8.90341 15.3768C8.14583 15.7707 7.27841 15.9677 6.30114 15.9677C5.21023 15.9677 4.25189 15.7272 3.42614 15.2461C2.60038 14.7612 1.95644 14.0737 1.49432 13.1836C1.03598 12.2897 0.806818 11.229 0.806818 10.0018C0.806818 9.05859 0.943182 8.21768 1.21591 7.47905C1.49242 6.73662 1.87879 6.10784 2.375 5.59268C2.87121 5.07753 3.44886 4.68549 4.10795 4.41655C4.76705 4.14761 5.48106 4.01314 6.25 4.01314C6.90909 4.01314 7.52273 4.10973 8.09091 4.30291C8.65909 4.49231 9.16288 4.76125 9.60227 5.10973C10.0455 5.45821 10.4072 5.87299 10.6875 6.35405C10.9678 6.83132 11.1477 7.35784 11.2273 7.93359H8.72727Z" fill="#F3F5F8"/>
                  <rect width="58" height="23" transform="translate(0 19.8086)" fill="#F3F5F8"/>
                  <path d="M3.01136 36.8086V25.1722H7.67045C8.52652 25.1722 9.24053 25.2991 9.8125 25.5529C10.3845 25.8067 10.8144 26.159 11.1023 26.6097C11.3902 27.0567 11.5341 27.5719 11.5341 28.1552C11.5341 28.6097 11.4432 29.0094 11.2614 29.354C11.0795 29.695 10.8295 29.9753 10.5114 30.195C10.197 30.4109 9.83712 30.5643 9.43182 30.6552V30.7688C9.875 30.7878 10.2898 30.9128 10.6761 31.1438C11.0663 31.3749 11.3826 31.6987 11.625 32.1154C11.8674 32.5283 11.9886 33.0207 11.9886 33.5927C11.9886 34.2101 11.8352 34.7612 11.5284 35.2461C11.2254 35.7272 10.7765 36.1078 10.1818 36.3881C9.58712 36.6684 8.85417 36.8086 7.98295 36.8086H3.01136Z" fill="#71CED1"/>
                  <rect x="59" y="19.8086" width="10" height="11" fill="#71CED1"/>
                  <rect x="70" y="19.8086" width="10" height="11" fill="#71CED1"/>
                  <rect x="81" y="19.8086" width="10" height="11" fill="#71CED1"/>
                  <rect x="59" y="31.8086" width="10" height="11" fill="#71CED1"/>
                  <rect x="70" y="31.8086" width="10" height="11" fill="#71CED1"/>
                  <rect x="81" y="31.8086" width="10" height="11" fill="#71CED1"/>
                </svg>
              </div>

              {/* Social Links */}
              <div className="bg-[#FFF3D9] px-4 py-2 rounded flex items-center space-x-4 md:order-2">
                <p className="text-[#01292D] text-xs font-medium">Follow us</p>
                <div className="flex items-center space-x-4">
                  <Link href="https://facebook.com" className="text-[#01292D] hover:text-[#71CED1] transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </Link>
                  <Link href="https://linkedin.com" className="text-[#01292D] hover:text-[#71CED1] transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                  </Link>
                  <Link href="https://twitter.com" className="text-[#01292D] hover:text-[#71CED1] transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </Link>
                  <Link href="https://instagram.com" className="text-[#01292D] hover:text-[#71CED1] transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </Link>
                </div>
              </div>

              {/* Copyright */}
              <div className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8] md:order-3">
                Copyright © 2025 Ghana Court Bulletin. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 