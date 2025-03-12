import Link from 'next/link';

const AdvertiseSection = () => {
  return (
    <section className="py-16 bg-[#FFF3D9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-[32px] font-medium text-[#01292D] leading-[1.2]">
              Advertise with Ghana Court Bulletin and connect
              <br className="hidden md:block" />
              with a targeted legal audience
            </h2>
          </div>
          <div>
            <Link 
              href="/subscriptions" 
              className="bg-[#01292D] text-white px-8 py-4 inline-flex items-center gap-3"
            >
              Learn More About Our Subscriptions
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M14 5L21 12M21 12L14 19M21 12H3" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertiseSection; 