import { motion } from 'framer-motion';
import { FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';
import LazyImage from '../ui/LazyImage';
import Button from '../ui/Button';
import { BUSINESS, ABOUT_POINTS, IMAGES } from '../../constants';
import { fromLeft, fromRight, fadeUp, stagger, viewport } from '../../animations/variants';
import { useBooking } from '../../context/BookingContext';

export default function AboutSection({ showLearnMore = true }) {
  const { openBooking } = useBooking();

  return (
    <section className="section section--white about" id="about">
      <div className="container about__grid">
        <motion.div
          className="about__media"
          variants={fromLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className="about__img about__img--main">
            <LazyImage src={IMAGES.aboutMain} alt="Groomer caring for a dog" />
          </div>
          <div className="about__img about__img--sub">
            <LazyImage src={IMAGES.aboutSecondary} alt="Pet enjoying grooming" />
          </div>
          <motion.div
            className="about__badge glass"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <strong>{BUSINESS.yearsExperience}+</strong>
            <span>Years of Trust</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="about__content"
          variants={fromRight}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <span className="chip">About Asha Pets</span>
          <h2>
            Loving care &amp; <span className="gold-text">expert grooming</span> for your
            furry family
          </h2>
          <p>
            For over a decade, {BUSINESS.name} has been {BUSINESS.addressShort}&apos;s
            trusted grooming studio. We treat every pet like our own — combining a calm,
            hygienic environment with premium products and genuine love for animals.
          </p>

          <motion.ul
            className="about__points"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {ABOUT_POINTS.map((p) => (
              <motion.li key={p} variants={fadeUp}>
                <FaCheckCircle /> {p}
              </motion.li>
            ))}
          </motion.ul>

          <div className="about__actions">
            <Button variant="primary" icon={<FaCalendarCheck />} onClick={() => openBooking()}>
              Book Appointment
            </Button>
            {showLearnMore && (
              <Button variant="link" to="/about" className="about__learn">
                Learn more about us →
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
