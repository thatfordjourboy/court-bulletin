import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#01292D] text-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-16 lg:px-24 py-10">
          <div className="flex flex-col md:flex-row flex-wrap gap-y-8">
            {/* GH Court Bulletin Section */}
            <div className="md:w-1/2 lg:w-[180px] space-y-2">
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
            <div className="md:w-1/2 lg:w-[180px] lg:ml-8 space-y-2">
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
            <div className="md:w-1/2 lg:w-[120px] lg:ml-8 space-y-2">
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
            <div className="md:w-1/2 lg:w-[120px] lg:ml-8 space-y-2">
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
            <div className="md:w-full lg:w-[300px] lg:ml-4 space-y-4">
              <h3 className="text-sm font-semibold text-[#F3F5F8]">Subscribe to our newsletter</h3>
              <div className="flex gap-x-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 text-xs text-gray-900 placeholder-gray-500 bg-white focus:outline-none"
                />
                <button className="px-6 py-2 text-xs text-[#F3F5F8] bg-[#01292D] hover:bg-[#71CED1] transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex items-center mt-8 mb-2">
                <div className="bg-[#FFF3D9] px-3 py-2 flex items-center justify-start gap-x-3 w-auto">
                  <p className="font-['Inter'] text-[12px] font-semibold leading-[170%] tracking-[-1%] text-[#1E1D1D]">Follow us</p>
                  <div className="flex items-center space-x-2">
                    <Link href="https://facebook.com" className="text-[#1E1D1D] hover:text-[#71CED1] transition-colors" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.6 8.61713C1.60011 7.38549 1.95561 6.18004 2.62383 5.14543C3.29205 4.11082 4.24461 3.291 5.36721 2.78434C6.4898 2.27767 7.73475 2.10569 8.95267 2.28903C10.1706 2.47236 11.3097 3.00323 12.2334 3.81792C13.1571 4.63262 13.8261 5.69653 14.1601 6.88201C14.4942 8.06749 14.479 9.32417 14.1166 10.5013C13.7541 11.6784 13.0597 12.7259 12.1166 13.5181C11.1736 14.3103 10.022 14.8136 8.8 14.9675V10.2171H10.4C10.6122 10.2171 10.8157 10.1328 10.9657 9.98281C11.1157 9.83278 11.2 9.6293 11.2 9.41713C11.2 9.20495 11.1157 9.00147 10.9657 8.85144C10.8157 8.70141 10.6122 8.61713 10.4 8.61713H8.8V7.01713C8.8 6.80495 8.88429 6.60147 9.03432 6.45144C9.18434 6.30141 9.38783 6.21713 9.6 6.21713H10C10.2122 6.21713 10.4157 6.13284 10.5657 5.98281C10.7157 5.83278 10.8 5.6293 10.8 5.41713C10.8 5.20495 10.7157 5.00147 10.5657 4.85144C10.4157 4.70141 10.2122 4.61713 10 4.61713H9.6C8.96348 4.61713 8.35303 4.86998 7.90294 5.32007C7.45286 5.77016 7.2 6.38061 7.2 7.01713V8.61713H5.6C5.38783 8.61713 5.18434 8.70141 5.03431 8.85144C4.88429 9.00147 4.8 9.20495 4.8 9.41713C4.8 9.6293 4.88429 9.83278 5.03431 9.98281C5.18434 10.1328 5.38783 10.2171 5.6 10.2171H7.2V14.9675C5.65329 14.7727 4.23089 14.02 3.1998 12.8507C2.16872 11.6815 1.59985 10.1761 1.6 8.61713ZM8 16.6171C12.4184 16.6171 16 13.0355 16 8.61713C16 4.19873 12.4184 0.617126 8 0.617126C3.5816 0.617126 0 4.19873 0 8.61713C0 13.0355 3.5816 16.6171 8 16.6171Z" fill="currentColor"/>
                      </svg>
                    </Link>
                    <Link href="https://linkedin.com" className="text-[#1E1D1D] hover:text-[#71CED1] transition-colors" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
                      </svg>
                    </Link>
                    <Link href="https://x.com" className="text-[#1E1D1D] hover:text-[#71CED1] transition-colors" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                      </svg>
                    </Link>
                    <Link href="https://instagram.com" className="text-[#1E1D1D] hover:text-[#71CED1] transition-colors" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-[#F3F5F8]/20 mt-2 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Logo */}
              <div>
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

              {/* Copyright */}
              <div className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#F3F5F8]">
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