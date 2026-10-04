import { useMemo } from 'react';
import PageWrapper from '../components/common/PageWrapper';
import { PAGE_META } from '../seo/pageMeta';
import Hero from '../components/sections/Hero';
import StatsSection from '../components/sections/StatsSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ServiceAreasSection from '../components/sections/ServiceAreasSection';
import GallerySection from '../components/sections/GallerySection';
import ReviewsSection from '../components/sections/ReviewsSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';
import { useReviews } from '../context/ReviewsContext';
import {
  graph,
  localBusiness,
  website,
  webPage,
  faqPage,
  serviceList,
  areasItemList,
  reviewNodes,
} from '../seo/schema';


const { title: TITLE, description: DESC } = PAGE_META['/'];

export default function Home() {
  const { rating, total, reviews } = useReviews();

  const jsonLd = useMemo(
    () =>
      graph([
        localBusiness({ rating, reviewCount: total }),
        website(),
        webPage({ path: '/', title: TITLE, description: DESC }),
        serviceList(),
        areasItemList(),
        faqPage(),
        ...reviewNodes(reviews),
      ]),
    [rating, total, reviews]
  );

  return (
    <PageWrapper fullTitle={TITLE} description={DESC} path="/" jsonLd={jsonLd}>
      <Hero />
      <StatsSection />
      <AboutSection />
      <ServicesSection limit={6} showAllLink />
      <WhyChooseUs />
      <ServiceAreasSection />
      <GallerySection limit={6} showAllLink />
      <ReviewsSection />
      <FAQSection />
      <CTASection />
    </PageWrapper>
  );
}
