import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../../animations/variants';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <motion.div
      className={`section-head ${align === 'left' ? 'section-head--left' : ''}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {eyebrow && <span className="chip">{eyebrow}</span>}
      <h2 style={{ marginTop: eyebrow ? '1rem' : 0 }}>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </motion.div>
  );
}
