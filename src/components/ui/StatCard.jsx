import { motion } from 'framer-motion';
import { fadeUp } from '../../animations/variants';
import Icon from '../../utils/iconMap';
import useCountUp from '../../hooks/useCountUp';

/**
 * Animated stat counter. When `stat.href` is set the whole card
 * becomes a link — used to jump straight to the reviews section.
 */
export default function StatCard({ stat }) {
  const [value, ref] = useCountUp(stat.value, { decimals: stat.decimals || 0 });

  const body = (
    <>
      <div className="stat-card__icon">
        <Icon name={stat.icon} />
      </div>
      <div className="stat-card__num" ref={ref}>
        {value}
        <span>{stat.suffix}</span>
      </div>
      <p className="stat-card__label">{stat.label}</p>
      {stat.href && <span className="stat-card__hint">See reviews →</span>}
    </>
  );

  if (stat.href) {
    return (
      <motion.a
        className="stat-card stat-card--link"
        href={stat.href}
        variants={fadeUp}
        whileHover={{ y: -6 }}
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.div className="stat-card" variants={fadeUp}>
      {body}
    </motion.div>
  );
}
