import MainLayout from '../components/layout/MainLayout';
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
    <MainLayout>
      <HeroSection />
      <ServiceNoticesSection />
      <FeaturesSection />
      <EmploymentNoticeSection />
      <PlaceNoticeSection />
      <LatestBulletinSection />
      <GazettesSection />
      <AdvertiseSection />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <LegalResearchAd />
        </div>
      </section>
    </MainLayout>
  );
}
