import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaCalendarCheck,
  FaPhoneAlt,
  FaWhatsapp,
  FaStar,
  FaPaw,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import Button from '../ui/Button';
import LazyImage from '../ui/LazyImage';
import PawBackground from '../common/PawBackground';
import { BUSINESS, IMAGES, BADGES } from '../../constants';
import { useBooking } from '../../context/BookingContext';
import { useReviews } from '../../context/ReviewsContext';
import { telLink, whatsappLink, bookingMessage } from '../../utils/whatsapp';
import { EASE } from '../../animations/variants';

export default function Hero() {
  const ref = useRef(null);
  const { openBooking } = useBooking();
  const { rating, total } = useReviews();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yImg = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section className="hero" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <span className="blob hero__blob-1" />
        <span className="blob hero__blob-2" />
        <span className="blob hero__blob-3" />
      </div>
      <PawBackground opacity={0.06} />

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          style={{ y: yText, opacity }}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.a className="chip hero__chip" href="#reviews" variants={item}>
            <FaStar aria-hidden="true" /> {Number(rating).toFixed(1)}★ from {total} Google
            reviews
          </motion.a>

          {/* Primary keyword in the H1, location qualifier in the highlight */}
          <motion.h1 variants={item}>
            Pet Grooming Near You in{' '}
            <span className="gradient-text">Mumbai &amp; Across India</span>
          </motion.h1>

          <motion.p className="hero__tagline" variants={item}>
            {BUSINESS.tagline} Professional <strong>dog and cat grooming</strong> at our
            Mulund East studio or at your doorstep — bath, haircut, spa, de-shedding and
            tick treatment by groomers with {BUSINESS.yearsExperience}+ years of
            experience.
          </motion.p>

          <motion.p className="hero__locality" variants={item}>
            <FaMapMarkerAlt aria-hidden="true" /> Mumbai · Navi Mumbai · Thane · Pune ·
            Bangalore · Delhi NCR · Ahmedabad · Surat · Goa
          </motion.p>

          <motion.div className="hero__cta" variants={item}>
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappLink(bookingMessage())}
              icon={<FaWhatsapp />}
            >
              Book on WhatsApp
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
              Call Now
            </Button>
          </motion.div>

          <motion.ul className="hero__badges" variants={item}>
            {BADGES.map((b) => (
              <li key={b}>
                <FaPaw aria-hidden="true" /> {b}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="hero__visual"
          style={{ y: yImg }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          <div className="hero__img-wrap">
            <LazyImage
              src={IMAGES.heroMain}
              alt="Happy dog freshly groomed by Asha Pets in Mulund East, Mumbai"
              fetchpriority="high"
            />
          </div>

          {/* Clicking the rating jumps straight to the reviews section */}
          <motion.a
            className="hero__float hero__float--rating glass"
            href="#reviews"
            aria-label={`Rated ${rating} out of 5 from ${total} Google reviews — read them`}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="hero__rating-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <strong>{Number(rating).toFixed(1)}/5</strong>
            <span>{total} Google Reviews</span>
            <em className="hero__float-cta">Read reviews →</em>
          </motion.a>

          <motion.div
            className="hero__float hero__float--pets glass"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span className="hero__float-icon">
              <FaPaw aria-hidden="true" />
            </span>
            <div>
              <strong>{BUSINESS.happyPets.toLocaleString('en-IN')}+</strong>
              <span>Happy Pets</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path
            d="M0,64 C240,10 480,10 720,40 C960,70 1200,90 1440,44 L1440,90 L0,90 Z"
            fill="var(--white)"
          />
        </svg>
      </div>
    </section>
  );
}
