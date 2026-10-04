import { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPhoneAlt,
  FaCalendarCheck,
  FaStar,
  FaArrowRight,
} from 'react-icons/fa';
import PageWrapper from '../components/common/PageWrapper';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/ui/ServiceCard';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ReviewsSection from '../components/sections/ReviewsSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';
import Button from '../components/ui/Button';
import PawBackground from '../components/common/PawBackground';
import { BUSINESS, SERVICES } from '../constants';
import { SERVICE_AREAS, getAreaBySlug, areaPath } from '../data/areas';
import { useBooking } from '../context/BookingContext';
import { useReviews } from '../context/ReviewsContext';
import { telLink, whatsappLink, areaMessage } from '../utils/whatsapp';
import {
  graph,
  localBusiness,
  webPage,
  breadcrumbs,
  cityPage,
  faqPage,
  service as serviceNode,
} from '../seo/schema';
import { fadeUp, stagger, viewport } from '../animations/variants';

/**
 * Location landing page: /pet-grooming-in-<city>
 * One page per city, each with its own title, description,
 * locality list and Service schema — this is what wins the
 * "pet grooming in <city>" and "pet grooming near me" queries.
 */
export default function AreaPage({ citySlug }) {
  const area = getAreaBySlug(citySlug);
  const { openBooking } = useBooking();
  const { rating, total } = useReviews();

  const title = area
    ? `Pet Grooming in ${area.city} | Dog & Cat Grooming at Home — Asha Pets`
    : '';
  const desc = area
    ? `Professional pet grooming in ${area.city}. Asha Pets offers dog & cat grooming, bath, haircut, spa and de-shedding at your doorstep across ${area.areas.length}+ localities including ${area.areas
        .slice(0, 4)
        .join(', ')}. Rated ${rating}★ on Google. Book on WhatsApp.`
    : '';

  const jsonLd = useMemo(() => {
    if (!area) return null;
    return graph([
      localBusiness({ rating, reviewCount: total }),
      webPage({ path: areaPath(area.slug), title, description: desc }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Areas We Serve', path: '/service-areas' },
        { name: area.city, path: areaPath(area.slug) },
      ]),
      cityPage(area),
      ...SERVICES.slice(0, 6).map((s) => serviceNode(s, area.city)),
      faqPage(),
    ]);
  }, [area, rating, total, title, desc]);

  if (!area) return <Navigate to="/service-areas" replace />;

  const nearby = SERVICE_AREAS.filter((a) => a.slug !== area.slug).slice(0, 6);

  return (
    <PageWrapper
      fullTitle={title}
      description={desc}
      path={areaPath(area.slug)}
      jsonLd={jsonLd}
      keywords={[
        `pet grooming in ${area.city}`,
        `dog grooming ${area.city}`,
        `cat grooming ${area.city}`,
        `pet grooming near me ${area.city}`,
        `doorstep pet grooming ${area.city}`,
        ...area.areas.slice(0, 12).map((a) => `pet grooming ${a}`),
      ]}
    >
      {/* ---- Local hero ---- */}
      <section className="area-hero">
        <PawBackground opacity={0.05} />
        <div className="container area-hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/service-areas">Areas We Serve</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{area.city}</span>
          </nav>

          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
            className="area-hero__content"
          >
            <motion.span className="chip" variants={fadeUp}>
              <FaMapMarkerAlt aria-hidden="true" /> {area.label}
            </motion.span>

            <motion.h1 variants={fadeUp}>
              Pet Grooming in <span className="gradient-text">{area.city}</span>
            </motion.h1>

            <motion.p className="area-hero__blurb" variants={fadeUp}>
              {area.blurb}
            </motion.p>

            <motion.a className="area-hero__rating" href="#reviews" variants={fadeUp}>
              <span aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </span>
              <strong>{Number(rating).toFixed(1)}</strong>
              <span>from {total} Google reviews</span>
            </motion.a>

            <motion.div className="area-hero__cta" variants={fadeUp}>
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappLink(areaMessage(area.city))}
                icon={<FaWhatsapp />}
              >
                WhatsApp for {area.city}
              </Button>
              <Button
                variant="primary"
                size="lg"
                icon={<FaCalendarCheck />}
                onClick={() => openBooking()}
              >
                Book Appointment
              </Button>
              <Button variant="outline" size="lg" href={telLink()} icon={<FaPhoneAlt />}>
                {BUSINESS.phone}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---- Locality list: the crawlable keyword surface ---- */}
      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow={`${area.areas.length} localities covered`}
            title={`Where we groom in ${area.city}`}
            subtitle={`We serve pet parents right across ${area.city}. If your locality isn't listed, message us — we almost certainly cover it.`}
          />
          <motion.ul
            className="areas__chips areas__chips--page"
            variants={stagger(0.02)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {area.areas.map((a) => (
              <motion.li key={a} variants={fadeUp}>
                <FaMapMarkerAlt aria-hidden="true" />
                Pet Grooming in {a}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ---- Services, localised ---- */}
      <section className="section section--beige">
        <div className="container">
          <SectionHeading
            eyebrow="Services"
            title={`Grooming services available in ${area.city}`}
            subtitle="Share your pet's breed and coat condition on WhatsApp and we'll send an exact quote."
          />
          <motion.div
            className="services-grid"
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} city={area.city} />
            ))}
          </motion.div>
        </div>
      </section>

      <WhyChooseUs />
      <ReviewsSection />

      {/* ---- Internal links to sibling cities ---- */}
      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Also available in"
            title="Other cities we serve"
            subtitle="Asha Pets grooming is available in these cities too."
          />
          <motion.div
            className="area-links"
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {nearby.map((a) => (
              <motion.div key={a.slug} variants={fadeUp}>
                <Link className="area-links__item" to={areaPath(a.slug)}>
                  <FaMapMarkerAlt aria-hidden="true" />
                  <span>Pet Grooming in {a.city}</span>
                  <FaArrowRight aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="areas__all">
            <Link className="btn btn--outline" to="/service-areas">
              <span>View all service areas</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </PageWrapper>
  );
}
