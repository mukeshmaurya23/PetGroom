import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';

export default function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loader__paws">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -16, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
          >
            <FaPaw />
          </motion.span>
        ))}
      </div>
      <p className="loader__text">Asha Pets</p>
    </motion.div>
  );
}
