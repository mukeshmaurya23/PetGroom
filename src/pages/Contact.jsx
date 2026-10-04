import { useMemo } from 'react';
import PageWrapper from '../components/common/PageWrapper';
import { PAGE_META } from '../seo/pageMeta';
import PageHeader from '../components/sections/PageHeader';
import ContactSection from '../components/sections/ContactSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';
import { useReviews } from '../context/ReviewsContext';
import { graph, localBusiness, webPage, breadcrumbs, faqPage } from '../seo/schema';
import { BUSINESS } from '../constants';
import { absUrl } from '../config/site';


const { title: TITLE, description: DESC } = PAGE_META['/contact'];

export default function Contact() {
  const { rating, total } = useReviews();

  const jsonLd = useMemo(
    () =>
      graph([
        localBusiness({ rating, reviewCount: total }),
        {
          '@type': 'ContactPage',
          url: absUrl('/contact'),
          name: TITLE,
          description: DESC,
        },
        webPage({ path: '/contact', title: TITLE, description: DESC }),
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]),
        faqPage(),
      ]),
    [rating, total]
  );

  return (
    <PageWrapper
      fullTitle={TITLE}
      description={DESC}
      path="/contact"
      jsonLd={jsonLd}
      keywords={['pet grooming contact', 'pet groomer phone number Mumbai', 'book pet grooming']}
    >
      <PageHeader
        eyebrow="Contact Us"
        title="Let's pamper your pet"
        subtitle="Call, WhatsApp or drop into our Mulund East studio — we'd love to meet your furry friend."
      />
      <ContactSection showHeading={false} />
      <FAQSection />
      <CTASection />
    </PageWrapper>
  );
}
