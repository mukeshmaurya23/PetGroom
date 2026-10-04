import { useMemo } from 'react';
import PageWrapper from '../components/common/PageWrapper';
import { PAGE_META } from '../seo/pageMeta';
import PageHeader from '../components/sections/PageHeader';
import AboutSection from '../components/sections/AboutSection';
import StatsSection from '../components/sections/StatsSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ReviewsSection from '../components/sections/ReviewsSection';
import CTASection from '../components/sections/CTASection';
import { useReviews } from '../context/ReviewsContext';
import { graph, localBusiness, webPage, breadcrumbs, reviewNodes } from '../seo/schema';


const { title: TITLE, description: DESC } = PAGE_META['/about'];

export default function About() {
  const { rating, total, reviews } = useReviews();

  const jsonLd = useMemo(
    () =>
      graph([
        localBusiness({ rating, reviewCount: total }),
        webPage({ path: '/about', title: TITLE, description: DESC }),
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]),
        ...reviewNodes(reviews),
      ]),
    [rating, total, reviews]
  );

  return (
    <PageWrapper
      fullTitle={TITLE}
      description={DESC}
      path="/about"
      jsonLd={jsonLd}
      keywords={['about Asha Pets', 'pet groomer Mulund East', 'best pet groomer Mumbai']}
    >
      <PageHeader
        eyebrow="About Asha Pets"
        title="A decade of love, care & expert pet grooming"
        subtitle="Get to know the team that has been pampering Mumbai's dogs and cats since 2014."
      />
      <AboutSection showLearnMore={false} />
      <StatsSection />
      <WhyChooseUs />
      <ReviewsSection />
      <CTASection />
    </PageWrapper>
  );
}
