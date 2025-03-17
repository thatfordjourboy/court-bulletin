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
              <div className="flex items-center w-full max-w-[276px] h-[42.81px] bg-white p-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 min-w-0 bg-transparent text-[#1E1D1D] placeholder:text-[#464646] placeholder:text-[8.34px] placeholder:font-medium placeholder:leading-[170%] placeholder:tracking-[-0.01em] placeholder:font-['Inter'] focus:placeholder-transparent focus:outline-none"
                />
                <button className="flex-shrink-0 bg-[#01292D] w-[79.69px] h-[28.9px] px-[8.34px] py-[6.95px] text-[#F3F5F8] hover:bg-[#71CED1] transition-colors font-['Inter'] flex items-center justify-center">
                  <span className="font-['Inter'] text-[12.51px] font-bold leading-[100%] tracking-[0%] text-[#FFFFFF] flex items-center justify-center">Subscribe</span>
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
                        <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" fill="currentColor"/>
                      </svg>
                    </Link>
                    <Link href="https://x.com" className="text-[#1E1D1D] hover:text-[#71CED1] transition-colors" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" fill="currentColor"/>
                      </svg>
                    </Link>
                    <Link href="https://instagram.com" className="text-[#1E1D1D] hover:text-[#71CED1] transition-colors" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" fill="currentColor"/>
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
                <path d="M8.72727 7.93359C8.64773 7.65708 8.53599 7.41276 8.39205 7.20064C8.24811 6.98473 8.07197 6.80291 7.86364 6.65518C7.65909 6.50367 7.42424 6.38814 7.15909 6.30859C6.89773 6.22905 6.60795 6.18928 6.28977 6.18928C5.69508 6.18928 5.17235 6.337 4.72159 6.63246C4.27462 6.92791 3.92614 7.35784 3.67614 7.92223C3.42614 8.48284 3.30114 9.16844 3.30114 9.97905C3.30114 10.7897 3.42424 11.479 3.67045 12.0472C3.91667 12.6154 4.26515 13.0491 4.71591 13.3484C5.16667 13.6438 5.69886 13.7915 6.3125 13.7915C6.86932 13.7915 7.3447 13.6931 7.73864 13.4961C8.13636 13.2953 8.43939 13.0131 8.64773 12.6495C8.85985 12.2859 8.96591 11.8559 8.96591 11.3597L9.46591 11.4336H6.46591V9.58132H11.3352V11.0472C11.3352 12.07 11.1193 12.9487 10.6875 13.6836C10.2557 14.4147 9.66098 14.979 8.90341 15.3768C8.14583 15.7707 7.27841 15.9677 6.30114 15.9677C5.21023 15.9677 4.25189 15.7272 3.42614 15.2461C2.60038 14.7612 1.95644 14.0737 1.49432 13.1836C1.03598 12.2897 0.806818 11.229 0.806818 10.0018C0.806818 9.05859 0.943182 8.21768 1.21591 7.47905C1.49242 6.73662 1.87879 6.10784 2.375 5.59268C2.87121 5.07753 3.44886 4.68549 4.10795 4.41655C4.76705 4.14761 5.48106 4.01314 6.25 4.01314C6.90909 4.01314 7.52273 4.10973 8.09091 4.30291C8.65909 4.49231 9.16288 4.76125 9.60227 5.12677C10.0455 5.48662 10.4072 5.92791 10.6875 6.45064C10.9678 6.97337 11.1477 7.57185 11.2273 8.24609ZM14.7582 10.7631V15.8086H12.3378V4.17223H14.6901V8.62109H14.7923C14.9893 8.10594 15.3075 7.70253 15.7469 7.41087C16.1863 7.11541 16.7374 6.96768 17.4003 6.96768C18.0063 6.96768 18.5348 7.10026 18.9855 7.36541C19.4401 7.62678 19.7923 8.00367 20.0423 8.49609C20.2961 8.98473 20.4211 9.56996 20.4173 10.2518V15.8086H17.9969V10.6836C18.0007 10.1457 17.8643 9.72715 17.5878 9.42791C17.3151 9.12867 16.9325 8.97905 16.4401 8.97905C16.1105 8.97905 15.8188 9.04912 15.5651 9.18928C15.3151 9.32943 15.1181 9.53397 14.9741 9.80291C14.834 10.0681 14.762 10.3881 14.7582 10.7631ZM24.0108 15.9734C23.454 15.9734 22.9578 15.8768 22.5222 15.6836C22.0866 15.4866 21.7419 15.1969 21.4881 14.8143C21.2381 14.4279 21.1131 13.9469 21.1131 13.3711C21.1131 12.8862 21.2021 12.479 21.3801 12.1495C21.5581 11.82 21.8006 11.5548 22.1074 11.354C22.4142 11.1533 22.7627 11.0018 23.1528 10.8995C23.5468 10.7972 23.9597 10.7253 24.3915 10.6836C24.8991 10.6306 25.3081 10.5813 25.6187 10.5359C25.9294 10.4866 26.1547 10.4147 26.2949 10.32C26.435 10.2253 26.5051 10.0851 26.5051 9.8995V9.86541C26.5051 9.50556 26.3915 9.22715 26.1642 9.03018C25.9407 8.83321 25.6225 8.73473 25.2097 8.73473C24.7741 8.73473 24.4275 8.83132 24.1699 9.0245C23.9123 9.2139 23.7419 9.45253 23.6585 9.74041L21.4199 9.55859C21.5335 9.02829 21.757 8.56996 22.0903 8.18359C22.4237 7.79344 22.8536 7.4942 23.3801 7.28587C23.9104 7.07375 24.5241 6.96768 25.221 6.96768C25.7059 6.96768 26.1699 7.0245 26.6131 7.13814C27.06 7.25178 27.4559 7.42791 27.8006 7.66655C28.1491 7.90518 28.4237 8.212 28.6244 8.587C28.8252 8.95821 28.9256 9.40329 28.9256 9.92223V15.8086H26.6301V14.5984H26.5619C26.4218 14.8711 26.2343 15.1116 25.9994 15.32C25.7646 15.5245 25.4824 15.6855 25.1528 15.8029C24.8233 15.9165 24.4426 15.9734 24.0108 15.9734ZM24.704 14.3029C25.06 14.3029 25.3744 14.2328 25.6472 14.0927C25.9199 13.9487 26.1339 13.7556 26.2892 13.5131C26.4445 13.2707 26.5222 12.9961 26.5222 12.6893V11.7631C26.4464 11.8124 26.3422 11.8578 26.2097 11.8995C26.0809 11.9374 25.935 11.9734 25.7722 12.0075C25.6093 12.0378 25.4464 12.0662 25.2835 12.0927C25.1206 12.1154 24.9729 12.1362 24.8403 12.1552C24.5562 12.1969 24.3081 12.2631 24.096 12.354C23.8839 12.445 23.7191 12.5681 23.6017 12.7234C23.4843 12.8749 23.4256 13.0643 23.4256 13.2915C23.4256 13.6211 23.5449 13.873 23.7835 14.0472C24.0259 14.2177 24.3328 14.3029 24.704 14.3029ZM32.4239 10.7631V15.8086H30.0034V7.08132H32.3102V8.62109H32.4125C32.6057 8.11352 32.9295 7.712 33.3841 7.41655C33.8386 7.11731 34.3898 6.96768 35.0375 6.96768C35.6436 6.96768 36.172 7.10026 36.6227 7.36541C37.0735 7.63056 37.4239 8.00935 37.6739 8.50178C37.9239 8.99041 38.0489 9.57374 38.0489 10.2518V15.8086H35.6284V10.6836C35.6322 10.1495 35.4958 9.73284 35.2193 9.43359C34.9428 9.13056 34.5621 8.97905 34.0773 8.97905C33.7515 8.97905 33.4636 9.04912 33.2136 9.18928C32.9674 9.32943 32.7742 9.53397 32.6341 9.80291C32.4977 10.0681 32.4277 10.3881 32.4239 10.7631ZM41.6452 15.9734C41.0884 15.9734 40.5921 15.8768 40.1565 15.6836C39.7209 15.4866 39.3762 15.1969 39.1224 14.8143C38.8724 14.4279 38.7474 13.9469 38.7474 13.3711C38.7474 12.8862 38.8365 12.479 39.0145 12.1495C39.1925 11.82 39.4349 11.5548 39.7418 11.354C40.0486 11.1533 40.3971 11.0018 40.7872 10.8995C41.1812 10.7972 41.594 10.7253 42.0259 10.6836C42.5334 10.6306 42.9425 10.5813 43.2531 10.5359C43.5637 10.4866 43.7891 10.4147 43.9293 10.32C44.0694 10.2253 44.1395 10.0851 44.1395 9.8995V9.86541C44.1395 9.50556 44.0259 9.22715 43.7986 9.03018C43.5751 8.83321 43.2569 8.73473 42.844 8.73473C42.4084 8.73473 42.0618 8.83132 41.8043 9.0245C41.5467 9.2139 41.3762 9.45253 41.2929 9.74041L39.0543 9.55859C39.1679 9.02829 39.3914 8.56996 39.7247 8.18359C40.058 7.79344 40.488 7.4942 41.0145 7.28587C41.5448 7.07375 42.1584 6.96768 42.8554 6.96768C43.3402 6.96768 43.8043 7.0245 44.2474 7.13814C44.6944 7.25178 45.0902 7.42791 45.4349 7.66655C45.7834 7.90518 46.058 8.212 46.2588 8.587C46.4596 8.95821 46.5599 9.40329 46.5599 9.92223V15.8086H44.2645V14.5984H44.1963C44.0562 14.8711 43.8687 15.1116 43.6338 15.32C43.399 15.5245 43.1168 15.6855 42.7872 15.8029C42.4577 15.9165 42.077 15.9734 41.6452 15.9734ZM42.3384 14.3029C42.6944 14.3029 43.0088 14.2328 43.2815 14.0927C43.5543 13.9487 43.7683 13.7556 43.9236 13.5131C44.0789 13.2707 44.1565 12.9961 44.1565 12.6893V11.7631C44.0808 11.8124 43.9766 11.8578 43.844 11.8995C43.7152 11.9374 43.5694 11.9734 43.4065 12.0075C43.2437 12.0378 43.0808 12.0662 42.9179 12.0927C42.755 12.1154 42.6073 12.1362 42.4747 12.1552C42.1906 12.1969 41.9425 12.2631 41.7304 12.354C41.5183 12.445 41.3535 12.5681 41.2361 12.7234C41.1187 12.8749 41.0599 13.0643 41.0599 13.2915C41.0599 13.6211 41.1793 13.873 41.4179 14.0472C41.6603 14.2177 41.9671 14.3029 42.3384 14.3029ZM60.8534 8.24609H58.3648C58.3193 7.92412 58.2265 7.63814 58.0864 7.38814C57.9462 7.13435 57.7663 6.91844 57.5466 6.74041C57.3269 6.56238 57.0731 6.42602 56.7852 6.33132C56.5011 6.23662 56.1924 6.18928 55.8591 6.18928C55.2568 6.18928 54.7322 6.3389 54.2852 6.63814C53.8383 6.93359 53.4917 7.36541 53.2455 7.93359C52.9992 8.49799 52.8761 9.18359 52.8761 9.99041C52.8761 10.82 52.9992 11.5169 53.2455 12.0813C53.4955 12.6457 53.8439 13.0719 54.2909 13.3597C54.7379 13.6476 55.2549 13.7915 55.842 13.7915C56.1716 13.7915 56.4765 13.748 56.7568 13.6609C57.0409 13.5737 57.2928 13.4469 57.5125 13.2802C57.7322 13.1097 57.914 12.9033 58.058 12.6609C58.2057 12.4184 58.308 12.1419 58.3648 11.8313L60.8534 11.8427C60.789 12.3768 60.628 12.8919 60.3705 13.3881C60.1167 13.8806 59.7739 14.3219 59.342 14.712C58.914 15.0984 58.4027 15.4052 57.808 15.6325C57.217 15.8559 56.5485 15.9677 55.8023 15.9677C54.7644 15.9677 53.8364 15.7328 53.0182 15.2631C52.2038 14.7934 51.5598 14.1135 51.0864 13.2234C50.6167 12.3332 50.3818 11.2556 50.3818 9.99041C50.3818 8.72147 50.6205 7.64193 51.0977 6.75178C51.575 5.86162 52.2227 5.18359 53.0409 4.71768C53.8591 4.24799 54.7795 4.01314 55.8023 4.01314C56.4765 4.01314 57.1015 4.10784 57.6773 4.29723C58.2568 4.48662 58.7701 4.76314 59.217 5.12677C59.664 5.48662 60.0277 5.92791 60.308 6.45064C60.592 6.97337 60.7739 7.57185 60.8534 8.24609ZM65.7153 15.979C64.8328 15.979 64.0695 15.7915 63.4256 15.4165C62.7854 15.0378 62.2911 14.5112 61.9426 13.837C61.5941 13.159 61.4199 12.373 61.4199 11.479C61.4199 10.5775 61.5941 9.78965 61.9426 9.11541C62.2911 8.43738 62.7854 7.91087 63.4256 7.53587C64.0695 7.15708 64.8328 6.96768 65.7153 6.96768C66.5979 6.96768 67.3593 7.15708 67.9994 7.53587C68.6434 7.91087 69.1396 8.43738 69.4881 9.11541C69.8366 9.78965 70.0108 10.5775 70.0108 11.479C70.0108 12.373 69.8366 13.159 69.4881 13.837C69.1396 14.5112 68.6434 15.0378 67.9994 15.4165C67.3593 15.7915 66.5979 15.979 65.7153 15.979ZM65.7267 14.104C66.1282 14.104 66.4634 13.9904 66.7324 13.7631C67.0013 13.5321 67.204 13.2177 67.3403 12.82C67.4805 12.4222 67.5506 11.9696 67.5506 11.462C67.5506 10.9544 67.4805 10.5018 67.3403 10.104C67.204 9.70632 67.0013 9.39193 66.7324 9.16087C66.4634 8.92981 66.1282 8.81428 65.7267 8.81428C65.3214 8.81428 64.9805 8.92981 64.704 9.16087C64.4313 9.39193 64.2248 9.70632 64.0847 10.104C63.9483 10.5018 63.8801 10.9544 63.8801 11.462C63.8801 11.9696 63.9483 12.4222 64.0847 12.82C64.2248 13.2177 64.4313 13.5321 64.704 13.7631C64.9805 13.9904 65.3214 14.104 65.7267 14.104ZM76.3812 12.0927V7.08132H78.8017V15.8086H76.4778V14.2234H76.3869C76.19 14.7347 75.8623 15.1457 75.404 15.4563C74.9494 15.7669 74.3945 15.9222 73.7392 15.9222C73.1559 15.9222 72.6426 15.7897 72.1994 15.5245C71.7562 15.2594 71.4097 14.8825 71.1597 14.3938C70.9134 13.9052 70.7884 13.32 70.7847 12.6381V7.08132H73.2051V12.2063C73.2089 12.7215 73.3472 13.1287 73.6199 13.4279C73.8926 13.7272 74.2581 13.8768 74.7165 13.8768C75.0081 13.8768 75.2809 13.8105 75.5347 13.6779C75.7884 13.5415 75.993 13.3408 76.1483 13.0756C76.3074 12.8105 76.385 12.4828 76.3812 12.0927ZM79.9378 15.8086V7.08132H82.2844V8.60405H82.3753C82.5344 8.06238 82.8014 7.65329 83.1764 7.37678C83.5514 7.09647 83.9832 6.95632 84.4719 6.95632C84.5931 6.95632 84.7238 6.9639 84.8639 6.97905C85.0041 6.9942 85.1272 7.01503 85.2332 7.04155V9.18928C85.1196 9.15518 84.9624 9.12488 84.7617 9.09837C84.5609 9.07185 84.3772 9.05859 84.2105 9.05859C83.8545 9.05859 83.5363 9.13625 83.256 9.29155C82.9795 9.44306 82.7598 9.65518 82.5969 9.92791C82.4378 10.2006 82.3582 10.515 82.3582 10.8711V15.8086H79.9378ZM90.7642 7.08132V8.8995H85.5085V7.08132H90.7642ZM86.7017 4.99041H89.1222V13.1268C89.1222 13.3503 89.1563 13.5245 89.2244 13.6495C89.2926 13.7707 89.3873 13.8559 89.5085 13.9052C89.6335 13.9544 89.7775 13.979 89.9403 13.979C90.054 13.979 90.1676 13.9696 90.2812 13.9506C90.3949 13.9279 90.482 13.9109 90.5426 13.8995L90.9233 15.7006C90.8021 15.7385 90.6316 15.7821 90.4119 15.8313C90.1922 15.8844 89.9252 15.9165 89.6108 15.9279C89.0275 15.9506 88.5161 15.873 88.0767 15.695C87.6411 15.5169 87.3021 15.2404 87.0597 14.8654C86.8172 14.4904 86.6979 14.0169 86.7017 13.445V4.99041Z" fill="#F3F5F8"/>
                <rect width="58" height="23" transform="translate(0 19.8086)" fill="#F3F5F8"/>
                <path d="M3.01136 36.8086V25.1722H7.67045C8.52652 25.1722 9.24053 25.2991 9.8125 25.5529C10.3845 25.8067 10.8144 26.159 11.1023 26.6097C11.3902 27.0567 11.5341 27.5719 11.5341 28.1552C11.5341 28.6097 11.4432 29.0094 11.2614 29.354C11.0795 29.695 10.8295 29.9753 10.5114 30.195C10.197 30.4109 9.83712 30.5643 9.43182 30.6552V30.7688C9.875 30.7878 10.2898 30.9128 10.6761 31.1438C11.0663 31.3749 11.3826 31.6987 11.625 32.1154C11.8674 32.5283 11.9886 33.0207 11.9886 33.5927C11.9886 34.2101 11.8352 34.7612 11.5284 35.2461C11.2254 35.7272 10.7765 36.1078 10.1818 36.3881C9.58712 36.6684 8.85417 36.8086 7.98295 36.8086H3.01136ZM5.47159 34.7972H7.47727C8.16288 34.7972 8.66288 34.6665 8.97727 34.4052C9.29167 34.14 9.44886 33.7878 9.44886 33.3484C9.44886 33.0264 9.37121 32.7423 9.21591 32.4961C9.06061 32.2499 8.83902 32.0567 8.55114 31.9165C8.26705 31.7764 7.92803 31.7063 7.53409 31.7063H5.47159V34.7972ZM5.47159 30.0415H7.29545C7.63258 30.0415 7.93182 29.9828 8.19318 29.8654C8.45833 29.7442 8.66667 29.5737 8.81818 29.354C8.97348 29.1344 9.05114 28.8711 9.05114 28.5643C9.05114 28.1438 8.90152 27.8048 8.60227 27.5472C8.30682 27.2897 7.88636 27.1609 7.34091 27.1609H5.47159V30.0415ZM18.3406 33.0927V28.0813H20.7611V36.8086H18.4372V35.2234H18.3463C18.1493 35.7347 17.8217 36.1457 17.3634 36.4563C16.9088 36.7669 16.3539 36.9222 15.6986 36.9222C15.1152 36.9222 14.602 36.7897 14.1588 36.5245C13.7156 36.2594 13.369 35.8825 13.119 35.3938C12.8728 34.9052 12.7478 34.32 12.744 33.6381V28.0813H15.1645V33.2063C15.1683 33.7215 15.3065 34.1287 15.5793 34.4279C15.852 34.7272 16.2175 34.8768 16.6759 34.8768C16.9675 34.8768 17.2402 34.8105 17.494 34.6779C17.7478 34.5415 17.9524 34.3408 18.1077 34.0756C18.2668 33.8105 18.3444 33.4828 18.3406 33.0927ZM24.3176 25.1722V36.8086H21.8972V25.1722H24.3176ZM27.877 25.1722V36.8086H25.4565V25.1722H27.877ZM32.9932 36.979C32.0955 36.979 31.3227 36.7972 30.675 36.4336C30.0311 36.0662 29.5348 35.5472 29.1864 34.8768C28.8379 34.2025 28.6636 33.4052 28.6636 32.4847C28.6636 31.587 28.8379 30.7991 29.1864 30.1211C29.5348 29.4431 30.0254 28.9147 30.658 28.5359C31.2943 28.1571 32.0405 27.9677 32.8966 27.9677C33.4723 27.9677 34.0083 28.0605 34.5045 28.2461C35.0045 28.4279 35.4402 28.7025 35.8114 29.07C36.1864 29.4374 36.478 29.8995 36.6864 30.4563C36.8947 31.0094 36.9989 31.6571 36.9989 32.3995V33.0643H29.6295V31.5643H34.7205C34.7205 31.2158 34.6447 30.9071 34.4932 30.6381C34.3417 30.3692 34.1314 30.159 33.8625 30.0075C33.5973 29.8522 33.2886 29.7745 32.9364 29.7745C32.5689 29.7745 32.2432 29.8597 31.9591 30.0302C31.6788 30.1969 31.4591 30.4222 31.3 30.7063C31.1409 30.9866 31.0595 31.2991 31.0557 31.6438V33.07C31.0557 33.5018 31.1352 33.873 31.2943 34.1893C31.4572 34.5037 31.6864 34.7461 31.9818 34.9165C32.2773 35.087 32.6277 35.1722 33.033 35.1722C33.3019 35.1722 33.5481 35.1344 33.7716 35.0586C33.9951 34.9828 34.1864 34.8692 34.3455 34.7177C34.5045 34.5662 34.6258 34.3806 34.7091 34.1609L36.9477 34.3086C36.8341 34.8465 36.6011 35.3162 36.2489 35.7177C35.9004 36.1154 35.4496 36.426 34.8966 36.6495C34.3473 36.8692 33.7129 36.979 32.9932 36.979ZM42.4205 28.0813V29.8995H37.1648V28.0813H42.4205ZM38.358 25.9904H40.7784V34.1268C40.7784 34.3503 40.8125 34.5245 40.8807 34.6495C40.9489 34.7707 41.0436 34.8559 41.1648 34.9052C41.2898 34.9544 41.4337 34.979 41.5966 34.979C41.7102 34.979 41.8239 34.9696 41.9375 34.9506C42.0511 34.9279 42.1383 34.9109 42.1989 34.8995L42.5795 36.7006C42.4583 36.7385 42.2879 36.7821 42.0682 36.8313C41.8485 36.8844 41.5814 36.9165 41.267 36.9279C40.6837 36.9506 40.1723 36.873 39.733 36.695C39.2973 36.5169 38.9583 36.2404 38.7159 35.8654C38.4735 35.4904 38.3542 35.0169 38.358 34.445V25.9904ZM43.1972 36.8086V28.0813H45.6176V36.8086H43.1972ZM44.4131 26.9563C44.0532 26.9563 43.7445 26.837 43.4869 26.5984C43.2331 26.3559 43.1063 26.0662 43.1063 25.729C43.1063 25.3957 43.2331 25.1097 43.4869 24.8711C43.7445 24.6287 44.0532 24.5075 44.4131 24.5075C44.7729 24.5075 45.0797 24.6287 45.3335 24.8711C45.5911 25.1097 45.7199 25.3957 45.7199 25.729C45.7199 26.0662 45.5911 26.3559 45.3335 26.5984C45.0797 26.837 44.7729 26.9563 44.4131 26.9563ZM49.177 31.7631V36.8086H46.7565V28.0813H49.0634V29.6211H49.1656C49.3588 29.1135 49.6827 28.712 50.1372 28.4165C50.5918 28.1173 51.1429 27.9677 51.7906 27.9677C52.3967 27.9677 52.9251 28.1003 53.3759 28.3654C53.8266 28.6306 54.177 29.0094 54.427 29.5018C54.677 29.9904 54.802 30.5737 54.802 31.2518V36.8086H52.3815V31.6836C52.3853 31.1495 52.249 30.7328 51.9724 30.4336C51.6959 30.1306 51.3152 29.979 50.8304 29.979C50.5046 29.979 50.2168 30.0491 49.9668 30.1893C49.7206 30.3294 49.5274 30.534 49.3872 30.8029C49.2509 30.9681 49.1808 31.2881 49.177 31.7631Z" fill="#71CED1"/>
                <rect x="59" y="19.8086" width="10" height="11" fill="#71CED1"/>
                <rect x="70" y="19.8086" width="10" height="11" fill="#71CED1"/>
                <rect x="81" y="19.8086" width="10" height="11" fill="#71CED1"/>
                <rect x="59" y="31.8086" width="10" height="11" fill="#71CED1"/>
                <rect x="70" y="31.8086" width="10" height="11" fill="#71CED1"/>
                <rect x="81" y="31.8086" width="10" height="11" fill="#71CED1"/>
              </svg>
              </div>

              {/* Copyright */}
              <div className="font-['Inter'] text-xs leading-[170%] tracking-[-0.01em] text-[#FFFFFF]/30 w-[330px] h-[20px] md:order-1">
                Copyright © {new Date().getFullYear()} Ghana Court Bulletin. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 