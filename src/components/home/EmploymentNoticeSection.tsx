import Link from 'next/link';

interface EmploymentNoticeSectionProps {
  type?: 'internal' | 'external';
  position?: string;
  applicationDeadline?: string;
  closingDate?: string;
}

const EmploymentNoticeSection = ({
  type = 'internal',
  position = 'Circuit Court Judge',
  applicationDeadline = 'Friday 12th January 2024',
  closingDate = 'Two weeks after publication'
}: EmploymentNoticeSectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[32px] font-bold text-[#01292D] mb-8">Employment Notice</h2>
        
        <div className="bg-[#C5E0FF] p-8 relative">
          {/* Countdown and deadline section */}
          <div className="lg:absolute lg:top-8 lg:right-8 flex flex-col items-end space-y-2 mb-6 lg:mb-0">
            <div className="bg-white px-4 py-2 w-full sm:w-auto">
              <span className="text-[#F79009] font-normal text-xs mr-2">Countdown</span>
              <span className="text-[#01292D] text-xs">4days | 3hrs | 4mins | 12sec</span>
            </div>
            <div className="text-[#01292D] text-xs text-right">
              <div>Interested persons may apply to the Judicial</div>
              <div>Secretary by <span className="font-medium">{applicationDeadline}</span></div>
            </div>
          </div>

          {/* Main grid container */}
          <div className="grid grid-cols-12 gap-4">
            {/* Job title - Responsive width */}
            <div className="col-span-12 lg:col-span-7">
              <h3 className="text-[28px] sm:text-[32px] font-bold text-[#01292D] leading-[1.2] sm:leading-tight">
                <span className="inline-block mb-1">{type === 'internal' ? 'Internal' : 'External'} Advertisement for</span>
                <span className="inline-block break-words hyphens-auto">{position}</span>
              </h3>
            </div>

            {/* Empty space for countdown - Only show on large screens */}
            <div className="hidden lg:block lg:col-span-5"></div>

            {/* Bottom section - spans full width */}
            <div className="col-span-12 mt-4 lg:mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="bg-white py-2 px-4 w-full sm:w-auto">
                  <span className="text-[#01292D] font-medium text-xs italic">Closing Date:</span>
                  <span className="text-[#01292D] text-xs ml-1">{closingDate}</span>
                </div>
                
                <Link 
                  href="/employment-notice/circuit-court-judge" 
                  className="bg-[#01292D] hover:bg-opacity-90 text-white px-4 py-2 inline-flex items-center justify-center sm:justify-start rounded cursor-pointer transition-all duration-200 hover:shadow-md active:transform active:scale-95 w-full sm:w-auto"
                >
                  View Advert
                  <svg 
                    className="w-4 h-4 ml-2" 
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmploymentNoticeSection; 