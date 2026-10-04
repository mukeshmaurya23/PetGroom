import { useMemo } from 'react';
import PageWrapper from '../components/common/PageWrapper';
import { PAGE_META } from '../seo/pageMeta';
import PageHeader from '../components/sections/PageHeader';
import GallerySection from '../components/sections/GallerySection';
import ReviewsSection from '../components/sections/ReviewsSection';
import CTASection from '../components/sections/CTASection';
import { useReviews } from '../context/ReviewsContext';
import { graph, localBusiness, webPage, breadcrumbs } from '../seo/schema';


const { title: TITLE, description: DESC } = PAGE_META['/gallery'];

export default function Gallery() {
  const { rating, total } = useReviews();

  const jsonLd = useMemo(
    () =>
      graph([
        localBusiness({ rating, reviewCount: total }),
        webPage({ path: '/gallery', title: TITLE, description: DESC }),
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ]),
      ]),
    [rating, total]
  );

  return (
    <PageWrapper
      fullTitle={TITLE}
      description={DESC}
      path="/gallery"
      jsonLd={jsonLd}
      keywords={['pet grooming before after', 'dog grooming photos', 'pet grooming gallery Mumbai']}
    >
      <PageHeader
        eyebrow="Gallery"
        title="Our happy, pampered pets"
        subtitle="Wagging tails, fluffy coats and lots of smiles — take a look at our recent work."
      />
      <GallerySection showHeading={false} />
      <ReviewsSection />
      <CTASection />
    </PageWrapper>
  );
}
