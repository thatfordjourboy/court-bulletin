import Link from 'next/link';

const AdvertiseSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF3D9] rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="w-full md:w-[561px]">
              <h2 className="font-inter text-[24px] leading-[160%] tracking-[-0.01em] text-[#1E1D1D] font-medium">
                Advertise with Ghana Court Bulletin and connect with a targeted legal audience
              </h2>
            </div>
            <Link
              href="/subscriptions"
              className="inline-flex items-center bg-[#01292D] text-white px-6 py-4 rounded-lg hover:bg-[#01292D]/90 transition-colors whitespace-nowrap"
            >
              Learn More About Our Subscriptions
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertiseSection; 