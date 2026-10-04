import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import LazyImage from '../ui/LazyImage';
import Button from '../ui/Button';
import { GALLERY } from '../../constants';
import { fadeUp, stagger, viewport } from '../../animations/variants';

export default function GallerySection({ limit, showAllLink = false, showHeading = true }) {
  const items = limit ? GALLERY.slice(0, limit) : GALLERY;
  const [active, setActive] = useState(null); // index or null

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, next, prev]);

  return (
    <section className="section section--white gallery" id="gallery">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow="Gallery"
            title="Wagging tails & happy faces"
            subtitle="A glimpse of the pampered pets who visit Asha Pets. Tap any photo to view."
          />
        )}

        <motion.div
          className="gallery-masonry"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {items.map((g, i) => (
            <motion.button
              type="button"
              className={`gallery-item ${g.tall ? 'is-tall' : ''}`}
              key={g.src}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActive(i)}
              aria-label={`View ${g.alt}`}
            >
              <LazyImage src={g.src} alt={g.alt} />
              <span className="gallery-item__overlay">
                <span className="gallery-item__zoom">＋</span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {showAllLink && (
          <div className="gallery__more">
            <Button variant="primary" to="/gallery">
              View Full Gallery
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button className="lightbox__close" onClick={close} aria-label="Close">
              <FaTimes />
            </button>
            <button
              className="lightbox__nav lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>

            <motion.figure
              className="lightbox__figure"
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={items[active].src} alt={items[active].alt} />
              <figcaption>{items[active].alt}</figcaption>
            </motion.figure>

            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
