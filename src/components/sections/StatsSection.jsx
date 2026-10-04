import { useMemo } from 'react';
import { motion } from 'framer-motion';
import StatCard from '../ui/StatCard';
import { STATS } from '../../constants';
import { useReviews } from '../../context/ReviewsContext';
import { stagger, viewport } from '../../animations/variants';

export default function StatsSection() {
  const { rating, total } = useReviews();

  // Rating + review count follow the live Google feed; the rest are fixed.
  const stats = useMemo(
    () =>
      STATS.map((s) => {
        if (s.key === 'rating') return { ...s, value: rating };
        if (s.key === 'reviewsCount') return { ...s, value: total };
        return s;
      }),
    [rating, total]
  );

  return (
    <section className="section stats-section" aria-label="Asha Pets at a glance">
      <div className="container">
        <motion.div
          className="stats-grid"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
