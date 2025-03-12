import HeroSection from '../components/layout/HeroSection';
import ServiceNoticesSection from '../components/home/ServiceNoticesSection';
import FeaturesSection from '../components/home/FeaturesSection';
import EmploymentNoticeSection from '../components/home/EmploymentNoticeSection';
import PlaceNoticeSection from '../components/home/PlaceNoticeSection';
import LatestBulletinSection from '../components/home/LatestBulletinSection';
import GazettesSection from '../components/home/GazettesSection';
import AdvertiseSection from '../components/home/AdvertiseSection';
import LegalResearchAd from '../components/ads/LegalResearchAd';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceNoticesSection />
      <FeaturesSection />
      <EmploymentNoticeSection />
      <PlaceNoticeSection />
      <LatestBulletinSection />
      <GazettesSection />
      <AdvertiseSection />
      <div className="relative">
        <div className="absolute -top-6 right-4 sm:right-8 lg:right-30">
          <div className="bg-[#FFF3D9] text-[#01292D] px-3 py-1 text-sm font-medium rounded-md shadow-sm">
            Ad
          </div>
        </div>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <LegalResearchAd />
          </div>
        </section>
      </div>
    </>
  );
}
