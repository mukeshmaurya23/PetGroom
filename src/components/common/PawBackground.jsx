import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';

// Decorative floating paw prints. Purely visual, non-interactive.
const PAWS = [
  { top: '12%', left: '6%', size: 34, delay: 0, rot: -20 },
  { top: '24%', left: '88%', size: 26, delay: 1.2, rot: 15 },
  { top: '65%', left: '10%', size: 22, delay: 0.6, rot: 30 },
  { top: '78%', left: '82%', size: 38, delay: 1.8, rot: -10 },
  { top: '45%', left: '48%', size: 18, delay: 0.9, rot: 0 },
];

export default function PawBackground({ opacity = 0.08 }) {
  return (
    <div className="paw-bg" aria-hidden="true">
      {PAWS.map((p, i) => (
        <motion.span
          key={i}
          className="paw-bg__paw"
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.size,
            rotate: `${p.rot}deg`,
            opacity,
          }}
          animate={{ y: [0, -18, 0], opacity: [opacity, opacity * 1.8, opacity] }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        >
          <FaPaw />
        </motion.span>
      ))}
    </div>
  );
}
