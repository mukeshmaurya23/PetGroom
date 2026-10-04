import { useMemo } from 'react';
import PageWrapper from '../components/common/PageWrapper';
import { PAGE_META } from '../seo/pageMeta';
import PageHeader from '../components/sections/PageHeader';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ServiceAreasSection from '../components/sections/ServiceAreasSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';
import { useReviews } from '../context/ReviewsContext';
import {
  graph,
  localBusiness,
  webPage,
  breadcrumbs,
  serviceList,
  faqPage,
} from '../seo/schema';


const { title: TITLE, description: DESC } = PAGE_META['/services'];

export default function Services() {
  const { rating, total } = useReviews();

  const jsonLd = useMemo(
    () =>
      graph([
        localBusiness({ rating, reviewCount: total }),
        webPage({ path: '/services', title: TITLE, description: DESC }),
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]),
        serviceList(),
        faqPage(),
      ]),
    [rating, total]
  );

  return (
    <PageWrapper
      fullTitle={TITLE}
      description={DESC}
      path="/services"
      jsonLd={jsonLd}
      keywords={[
        'dog haircut near me',
        'pet spa near me',
        'de-shedding treatment',
        'tick and flea treatment for dogs',
        'cat grooming service',
      ]}
    >
      <PageHeader
        eyebrow="Our Services"
        title="Grooming services for every pet"
        subtitle="From a quick nail trim to a full luxury spa day — pampering tailored to your furry friend. Share your pet's breed on WhatsApp for an exact quote."
      />
      <ServicesSection showHeading={false} />
      <WhyChooseUs />
      <ServiceAreasSection compact />
      <FAQSection />
      <CTASection />
    </PageWrapper>
  );
}
