import Image from 'next/image';
import Link from 'next/link';

const LegalResearchAd = () => {
  return (
    <div className="relative w-full bg-[#00A3E0] rounded-xl overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0088CC]/20 to-transparent" />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#008CC7]/30" />
      
      {/* Content */}
      <div className="relative p-8">
        {/* Ad tag */}
        <div className="absolute top-3 right-3 bg-white text-[#0088CC] px-2 py-1 text-xs font-medium rounded shadow-sm">
          Ad
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left content */}
          <div className="flex-1 space-y-5">
            <h2 className="text-white text-3xl md:text-4xl font-bold">
              Dennislaw Legal Research Database
            </h2>
            <div className="space-y-2">
              <p className="text-white text-lg">
                Access Ghana's most comprehensive legal research platform.
              </p>
              <p className="text-white text-lg">
                Find cases, laws, and legal principles instantly.
              </p>
            </div>
            <Link 
              href="https://dennislawgh.com" 
              target="_blank"
              className="inline-flex items-center bg-white text-[#0088CC] px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md"
            >
              Start Researching
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Right content - Logo */}
          <div className="flex-shrink-0 bg-white/95 p-4 rounded-lg shadow-md">
            <Image
              src="/images/dennislaw.png"
              alt="Dennislaw"
              width={180}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalResearchAd; 