import Banner from '@/app/components/sections/Banner';
import HeroSection from '@/app/components/sections/HeroSection';
import WelcomeSection from '@/app/components/sections/WelcomeSection';
import WhyChooseSection from '@/app/components/sections/WhyChooseSection';
import ServicesSection from '@/app/components/sections/ServicesSection';
import ProcessSection from '@/app/components/sections/ProcessSection';
import AboutSection from '@/app/components/sections/AboutSection';
import PortfolioSection from '@/app/components/sections/PortfolioSection';
import TechStackSection from '@/app/components/sections/TechStackSection';
import FaqSection from '@/app/components/sections/FaqSection';
import CtaSection from '@/app/components/sections/CtaSection';
import ContactSection from '@/app/components/sections/ContactSection';
import { getContent } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('home');

export default async function HomePage() {
  const settings = await getContent('settings');

  const heroData = {
    title: "Building Tomorrow's Software Solutions",
    subtitle:
      "We're a passionate team of developers creating innovative software that transforms businesses and empowers growth.",
    primaryCtaLabel: 'View Our Work',
    primaryCtaHref: '#portfolio',
    secondaryCtaLabel: 'Get Started',
    secondaryCtaHref: '#contact',
  };

  return (
    <>
      <Banner banner={settings.banner} />
      <HeroSection hero={heroData} />
      <WelcomeSection />
      <WhyChooseSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <PortfolioSection />
      <TechStackSection />
      <FaqSection />
      <CtaSection />
      <ContactSection settings={settings} />
    </>
  );
}
