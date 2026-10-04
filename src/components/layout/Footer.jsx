import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaPaw,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaGoogle,
  FaHeart,
  FaStar,
  FaCode,
} from 'react-icons/fa';
import { BUSINESS, NAV_LINKS, SERVICES, SERVICE_AREAS, areaPath } from '../../constants';
import { CREDIT } from '../../config/site';
import {
  telLink,
  whatsappLink,
  bookingMessage,
  directionsLink,
} from '../../utils/whatsapp';
import { useReviews } from '../../context/ReviewsContext';
import { fadeUp, viewport, stagger } from '../../animations/variants';

export default function Footer() {
  const { rating, total } = useReviews();

  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <motion.div
        className="container footer__grid"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <motion.div className="footer__col footer__brand" variants={fadeUp}>
          <div className="footer__logo">
            <span className="navbar__logo">
              <FaPaw aria-hidden="true" />
            </span>
            <span className="navbar__name">
              Asha<span>Pets</span>
            </span>
          </div>
          <p>
            Premium pet grooming with {BUSINESS.yearsExperience}+ years of love, care and
            expertise. Studio in Mulund East, Mumbai, with doorstep dog and cat grooming
            across {SERVICE_AREAS.length} cities.
          </p>

          <a className="footer__rating" href={BUSINESS.social.reviews} target="_blank" rel="noopener noreferrer">
            <span className="footer__rating-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
            <strong>{Number(rating).toFixed(1)}</strong>
            <span>· {total} Google reviews</span>
          </a>

          <div className="footer__social">
            {BUSINESS.social.instagram && (
              <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Asha Pets on Instagram">
                <FaInstagram aria-hidden="true" />
              </a>
            )}
            {BUSINESS.social.facebook && (
              <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Asha Pets on Facebook">
                <FaFacebookF aria-hidden="true" />
              </a>
            )}
            <a href={BUSINESS.social.google} target="_blank" rel="noopener noreferrer" aria-label="Asha Pets on Google Maps">
              <FaGoogle aria-hidden="true" />
            </a>
            <a href={whatsappLink(bookingMessage())} target="_blank" rel="noopener noreferrer" aria-label="Chat with Asha Pets on WhatsApp">
              <FaWhatsapp aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.nav className="footer__col" variants={fadeUp} aria-label="Footer">
          <h4>Quick Links</h4>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <a href={BUSINESS.social.writeReview} target="_blank" rel="noopener noreferrer">
                Write a Review
              </a>
            </li>
          </ul>
        </motion.nav>

        <motion.nav className="footer__col" variants={fadeUp} aria-label="Popular services">
          <h4>Popular Services</h4>
          <ul>
            {SERVICES.slice(0, 7).map((s) => (
              <li key={s.title}>
                <Link to="/services">{s.title}</Link>
              </li>
            ))}
          </ul>
        </motion.nav>

        <motion.div className="footer__col" variants={fadeUp}>
          <h4>Get in Touch</h4>
          <ul className="footer__contact">
            <li>
              <FaMapMarkerAlt aria-hidden="true" />
              <a href={directionsLink()} target="_blank" rel="noopener noreferrer">
                {BUSINESS.address}
              </a>
            </li>
            <li>
              <FaPhoneAlt aria-hidden="true" />
              <a href={telLink()}>{BUSINESS.phone}</a>
            </li>
            <li>
              <FaWhatsapp aria-hidden="true" />
              <a href={whatsappLink(bookingMessage())} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </li>
            <li>
              <FaClock aria-hidden="true" />
              <span>Open daily · {BUSINESS.hours}</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Full-width area links: keyword-rich anchor text and an internal
          link to every city page from every page on the site. */}
      <motion.nav
        className="container footer__areas"
        aria-label="Service areas"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <h4>Pet Grooming Near You</h4>
        <ul>
          {SERVICE_AREAS.map((a) => (
            <li key={a.slug}>
              <Link to={areaPath(a.slug)}>Pet Grooming in {a.city}</Link>
            </li>
          ))}
        </ul>
      </motion.nav>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="footer__made">
            Made with <FaHeart aria-hidden="true" /> for happy pets
          </p>
          <p className="footer__credit">
            <FaCode aria-hidden="true" />
            <span>
              Designed &amp; developed by{' '}
              <a href={`mailto:${CREDIT.email}`} rel="nofollow">
                {CREDIT.label}
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
