import Image from 'next/image';
import Link from 'next/link';

const PlaceNoticeSection = () => {
  const steps = [
    {
      icon: '/images/prepare-icon.svg',
      title: 'Prepare your notice',
      description: 'Ensure your notice complies with legal requirements and is formatted correctly.',
      bgColor: 'bg-[#C5E0FF]'
    },
    {
      icon: '/images/email-icon.svg',
      title: 'Send via email',
      description: 'Email your notice to us at gazette@ghcourtbulletin.com. Be sure to include all necessary details and attachments.',
      bgColor: 'bg-[#F3F5F8]'
    },
    {
      icon: '/images/review-icon.svg',
      title: 'Review and notify',
      description: 'Our team will review your notice promptly for compliance and accuracy. You\'ll receive a confirmation email as soon as it\'s published in The Gazette.',
      bgColor: 'bg-[#FFEACB]'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How do I place a notice in the GhCourt Bulletin?</h2>
        <p className="font-inter text-[18px] leading-[160%] tracking-[-0.01em] text-[#464646] mb-12 max-w-3xl">
          Publishing your notice in The Gazette has never been easier. Whether you're announcing a legal
          proceeding, a public notice, or an appointment, we've streamlined the process to save you time
          and ensure accuracy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg ${step.bgColor} flex flex-col w-[304px] min-h-[272px]`}
            >
              <div className="flex items-center justify-center h-16 w-16 text-blue-500 mb-6">
                {index === 0 && (
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 32 32" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M0 32V28H5.5L4.7 27.3C2.96667 25.7667 1.75 24.0167 1.05 22.05C0.35 20.0833 0 18.1 0 16.1C0 12.4 1.10833 9.10833 3.325 6.225C5.54167 3.34167 8.43333 1.43333 12 0.5V4.7C9.6 5.56667 7.66667 7.04167 6.2 9.125C4.73333 11.2083 4 13.5333 4 16.1C4 17.6 4.28333 19.0583 4.85 20.475C5.41667 21.8917 6.3 23.2 7.5 24.4L8 24.9V20H12V32H0ZM20 31.5V27.3C22.4 26.4333 24.3333 24.9583 25.8 22.875C27.2667 20.7917 28 18.4667 28 15.9C28 14.4 27.7167 12.9417 27.15 11.525C26.5833 10.1083 25.7 8.8 24.5 7.6L24 7.1V12H20V0H32V4H26.5L27.3 4.7C28.9333 6.33333 30.125 8.10833 30.875 10.025C31.625 11.9417 32 13.9 32 15.9C32 19.6 30.8917 22.8917 28.675 25.775C26.4583 28.6583 23.5667 30.5667 20 31.5Z" 
                      fill="#4098FF"
                    />
                  </svg>
                )}
                {index === 1 && (
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 48 48" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="mask0_529_3599" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
                      <rect width="48" height="48" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_529_3599)">
                      <path d="M24 26L8 16V36H26V40H8C6.9 40 5.95833 39.6083 5.175 38.825C4.39167 38.0417 4 37.1 4 36V12C4 10.9 4.39167 9.95833 5.175 9.175C5.95833 8.39167 6.9 8 8 8H40C41.1 8 42.0417 8.39167 42.825 9.175C43.6083 9.95833 44 10.9 44 12V26H40V16L24 26ZM24 22L40 12H8L24 22ZM38 46L35.2 43.2L38.35 40H30V36H38.35L35.15 32.8L38 30L46 38L38 46ZM8 16V38V26V26.15V12V16Z" fill="#71CED1"/>
                    </g>
                  </svg>
                )}
                {index === 2 && (
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 48 48" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="mask0_529_3595" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
                      <rect width="48" height="48" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_529_3595)">
                      <path d="M34.7 40L27.65 32.9L30.45 30.1L34.7 34.35L43.2 25.85L46 28.7L34.7 40ZM4 44V8C4 6.9 4.39167 5.95833 5.175 5.175C5.95833 4.39167 6.9 4 8 4H40C41.1 4 42.0417 4.39167 42.825 5.175C43.6083 5.95833 44 6.9 44 8V22H40V8H8V34.25L10.3 32H24V36H12L4 44Z" fill="#FD9901"/>
                    </g>
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="relative inline-block group">
            <Link 
              href="/submit-notice" 
              className="inline-block bg-[#01292D] text-[#9CDAD6] px-8 py-3 font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              Submit Your Notice Now
              <svg 
                className="w-4 h-4 ml-2 inline-block" 
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
            <div className="absolute left-0 right-0 -bottom-12 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <div className="border border-[#01292D] py-2 px-4 inline-flex items-center">
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                info@ghcourtbull.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceNoticeSection; 