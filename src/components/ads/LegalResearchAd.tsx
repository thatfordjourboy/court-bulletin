import Image from 'next/image';
import Link from 'next/link';

const LegalResearchAd = () => {
  return (
    <div className="relative w-full bg-[#00A3E0] rounded-xl overflow-hidden">
      {/* Logo */}
      <div className="absolute top-6 right-6">
        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-sm">
          <Image
            src="/images/dennislaw.png"
            alt="Dennislaw"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-12">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-white text-4xl font-bold">
            Dennislaw Legal Research Database
          </h2>
          <div className="space-y-2">
            <p className="text-white text-xl">
              Access Ghana's most comprehensive legal research platform.
            </p>
            <p className="text-white text-xl">
              Find cases, laws, and legal principles instantly.
            </p>
          </div>
          <Link 
            href="https://dennislawgh.com" 
            target="_blank"
            className="inline-flex items-center bg-white text-[#00A3E0] px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md"
          >
            Start Researching
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LegalResearchAd; 