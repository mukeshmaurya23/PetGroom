import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaWhatsapp,
  FaStore,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import { SERVICE_AREAS, TOTAL_LOCALITIES, areaPath } from '../../data/areas';
import { whatsappLink } from '../../utils/whatsapp';
import { fadeUp, stagger, viewport } from '../../animations/variants';

/**
 * "Areas We Serve" — city tabs with the full locality list.
 * Every locality is real crawlable text, and each city links to
 * its own landing page, which is what ranks for
 * "pet grooming in <city>" and "pet grooming near me".
 */
/** How many locality chips to show before the "show all" toggle.
    The collapsed remainder is not rendered at all — visually hidden
    keyword lists read as cloaking, and every city page already lists
    its full set of localities as visible text. */
const PREVIEW_COUNT = 12;

export default function ServiceAreasSection({ compact = false }) {
  const [active, setActive] = useState(SERVICE_AREAS[0].slug);
  const [expanded, setExpanded] = useState(false);
  const city = SERVICE_AREAS.find((c) => c.slug === active) || SERVICE_AREAS[0];

  // Collapse again when switching city so the panel never opens huge.
  useEffect(() => setExpanded(false), [active]);

  const hidden = Math.max(0, city.areas.length - PREVIEW_COUNT);
  const visibleAreas = expanded ? city.areas : city.areas.slice(0, PREVIEW_COUNT);

  return (
    <section className="section section--white areas" id="service-areas">
      <div className="container">
        <SectionHeading
          eyebrow="Areas We Serve"
          title="Pet grooming near you — across India"
          subtitle={`Our flagship studio is in Mulund East, Mumbai, and our groomers travel to ${TOTAL_LOCALITIES}+ localities across ${SERVICE_AREAS.length} cities. Find yours below.`}
        />

        {/* City selector */}
        <motion.div
          className="areas__tabs"
          role="tablist"
          aria-label="Select a city"
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {SERVICE_AREAS.map((c) => (
            <motion.button
              key={c.slug}
              type="button"
              role="tab"
              id={`areatab-${c.slug}`}
              aria-selected={active === c.slug}
              aria-controls={`areapanel-${c.slug}`}
              className={`areas__tab ${active === c.slug ? 'is-active' : ''} ${
                c.tier === 'flagship' ? 'is-flagship' : ''
              }`}
              onClick={() => setActive(c.slug)}
              variants={fadeUp}
            >
              {c.tier === 'flagship' ? <FaStore aria-hidden="true" /> : <FaMapMarkerAlt aria-hidden="true" />}
              <span>{c.city}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Active city panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={city.slug}
            className="areas__panel glass"
            role="tabpanel"
            id={`areapanel-${city.slug}`}
            aria-labelledby={`areatab-${city.slug}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="areas__panel-head">
              <div>
                <span className={`areas__badge ${city.tier === 'flagship' ? 'is-flagship' : ''}`}>
                  {city.label}
                </span>
                <h3>{city.headline}</h3>
                <p>{city.blurb}</p>
              </div>
              <Link className="btn btn--primary btn--sm" to={areaPath(city.slug)}>
                <span>View {city.city} page</span>
                <FaArrowRight aria-hidden="true" />
              </Link>
            </div>

            <ul className="areas__chips">
              {visibleAreas.map((a) => (
                <li key={a}>
                  <FaMapMarkerAlt aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>

            {hidden > 0 && (
              <button
                type="button"
                className="areas__toggle"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
              >
                {expanded ? <FaMinus aria-hidden="true" /> : <FaPlus aria-hidden="true" />}
                <span>
                  {expanded ? 'Show fewer areas' : `Show all ${city.areas.length} areas in ${city.city}`}
                </span>
              </button>
            )}

            <p className="areas__note">
              Don&apos;t see your locality?{' '}
              <a
                href={whatsappLink(
                  `Hi Asha Pets! Do you offer pet grooming in my area (${city.city})?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--link"
              >
                <FaWhatsapp aria-hidden="true" /> Ask us on WhatsApp
              </a>{' '}
              — we cover most of {city.city}.
            </p>
          </motion.div>
        </AnimatePresence>

        {!compact && (
          <div className="areas__all">
            <Link className="btn btn--outline" to="/service-areas">
              <span>See all {SERVICE_AREAS.length} cities we serve</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
