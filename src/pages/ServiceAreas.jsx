import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaMapMarkerAlt, FaStore } from 'react-icons/fa';
import PageWrapper from '../components/common/PageWrapper';
import { PAGE_META } from '../seo/pageMeta';
import PageHeader from '../components/sections/PageHeader';
import SectionHeading from '../components/ui/SectionHeading';
import CTASection from '../components/sections/CTASection';
import FAQSection from '../components/sections/FAQSection';
import { SERVICE_AREAS, TOTAL_LOCALITIES, areaPath } from '../data/areas';
import { useReviews } from '../context/ReviewsContext';
import {
  graph,
  localBusiness,
  webPage,
  breadcrumbs,
  areasItemList,
} from '../seo/schema';
import { fadeUp, stagger, viewport } from '../animations/variants';


const { title: TITLE, description: DESC } = PAGE_META['/service-areas'];

export default function ServiceAreas() {
  const { rating, total } = useReviews();

  const jsonLd = useMemo(
    () =>
      graph([
        localBusiness({ rating, reviewCount: total }),
        webPage({ path: '/service-areas', title: TITLE, description: DESC }),
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Areas We Serve', path: '/service-areas' },
        ]),
        areasItemList(),
      ]),
    [rating, total]
  );

  return (
    <PageWrapper
      fullTitle={TITLE}
      description={DESC}
      path="/service-areas"
      jsonLd={jsonLd}
      keywords={SERVICE_AREAS.map((a) => `pet grooming in ${a.city}`)}
    >
      <PageHeader
        eyebrow="Areas We Serve"
        title="Pet grooming near you"
        subtitle={`From our flagship studio in Mulund East, Mumbai to doorstep grooming in ${TOTAL_LOCALITIES}+ localities across ${SERVICE_AREAS.length} cities.`}
      />

      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Our Network"
            title="Choose your city"
            subtitle="Every city has its own page with the full list of localities we cover."
          />

          <motion.div
            className="area-grid"
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {SERVICE_AREAS.map((a) => (
              <motion.article
                key={a.slug}
                className={`area-card ${a.tier === 'flagship' ? 'is-flagship' : ''}`}
                variants={fadeUp}
                whileHover={{ y: -8 }}
              >
                <span className="area-card__badge">
                  {a.tier === 'flagship' ? <FaStore aria-hidden="true" /> : <FaMapMarkerAlt aria-hidden="true" />}
                  {a.label}
                </span>
                <h3>
                  <Link to={areaPath(a.slug)}>Pet Grooming in {a.city}</Link>
                </h3>
                <p>{a.blurb}</p>
                <p className="area-card__localities">
                  <strong>{a.areas.length} localities</strong> · {a.areas.slice(0, 5).join(', ')}
                  {a.areas.length > 5 && ' and more'}
                </p>
                <Link className="btn btn--outline btn--sm" to={areaPath(a.slug)}>
                  <span>Explore {a.city}</span>
                  <FaArrowRight aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </PageWrapper>
  );
}
