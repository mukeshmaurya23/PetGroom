import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaStar,
  FaStarHalfStroke,
  FaGoogle,
  FaChevronLeft,
  FaChevronRight,
  FaPenToSquare,
} from 'react-icons/fa6';
import SectionHeading from '../ui/SectionHeading';
import ReviewCard from '../ui/ReviewCard';
import { BUSINESS } from '../../constants';
import { useReviews } from '../../context/ReviewsContext';
import { fadeUp, viewport } from '../../animations/variants';

/** Renders 5 stars against a decimal rating, halves included. */
function Stars({ value = 5, className = '' }) {
  return (
    <span className={`stars ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        if (value >= i + 1) return <FaStar key={i} className="is-on" />;
        if (value >= i + 0.5) return <FaStarHalfStroke key={i} className="is-on" />;
        return <FaStar key={i} className="is-off" />;
      })}
    </span>
  );
}

export default function ReviewsSection() {
  const { rating, total, reviews, isLive, loading } = useReviews();
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const scrollByCard = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.review-slide');
    const gap = 24;
    const amount = card ? card.offsetWidth + gap : 340;
    let next = track.scrollLeft + dir * amount;
    if (dir > 0 && track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      next = 0; // loop to start
    } else if (dir < 0 && track.scrollLeft <= 10) {
      next = track.scrollWidth; // loop to end
    }
    track.scrollTo({ left: next, behavior: 'smooth' });
  }, []);

  // Auto-advance, paused on hover/touch so reading is never interrupted.
  useEffect(() => {
    if (paused) return undefined;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const id = setInterval(() => scrollByCard(1), 4500);
    return () => clearInterval(id);
  }, [scrollByCard, paused]);

  return (
    <section className="section section--beige reviews" id="reviews">
      <div className="container">
        <SectionHeading
          eyebrow="Happy Pet Parents"
          title={`Rated ${Number(rating).toFixed(1)}★ by Mumbai's pet families`}
          subtitle="Real, verified reviews from our Google Business Profile — updated automatically."
        />

        {/* ---- Overall rating card ---- */}
        <motion.div
          className="reviews__overall glass"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className="reviews__score">
            <strong>{Number(rating).toFixed(1)}</strong>
            <Stars value={rating} className="reviews__score-stars" />
            <span>out of 5</span>
          </div>

          <div className="reviews__overall-meta">
            <span className="reviews__google-badge">
              <FaGoogle aria-hidden="true" /> Google Verified
              {isLive && <em className="reviews__live" title="Updated live from Google">Live</em>}
            </span>
            <p>
              Based on <strong>{total} Google reviews</strong> from pet parents across
              Mumbai and beyond.
            </p>
            <div className="reviews__overall-actions">
              <a
                className="btn btn--gold btn--sm"
                href={BUSINESS.social.writeReview}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPenToSquare aria-hidden="true" /> <span>Write a Review</span>
              </a>
              <a
                className="btn btn--outline btn--sm"
                href={BUSINESS.social.reviews}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGoogle aria-hidden="true" /> <span>Read all {total} reviews</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ---- Review carousel ---- */}
        <div
          className="reviews__carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <button
            className="reviews__arrow reviews__arrow--left"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous review"
            type="button"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>

          <div
            className={`reviews__track ${loading ? 'is-loading' : ''}`}
            ref={trackRef}
            role="region"
            aria-label="Customer reviews"
            tabIndex={0}
          >
            {reviews.map((r, i) => (
              <div className="review-slide" key={r.id || `${r.name}-${i}`}>
                <ReviewCard review={r} />
              </div>
            ))}
          </div>

          <button
            className="reviews__arrow reviews__arrow--right"
            onClick={() => scrollByCard(1)}
            aria-label="Next review"
            type="button"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>

        {/* ---- Bottom prompt ---- */}
        <motion.div
          className="reviews__prompt"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <p>
            Groomed with us before? Your review helps other pet parents find{' '}
            {BUSINESS.name}.
          </p>
          <a
            className="btn btn--primary"
            href={BUSINESS.social.writeReview}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPenToSquare aria-hidden="true" /> <span>Rate us on Google</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export { Stars };
