import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import PawBackground from '../common/PawBackground';
import { EASE } from '../../animations/variants';

export default function PageHeader({ eyebrow, title, subtitle, crumb }) {
  return (
    <section className="page-header">
      <div className="page-header__bg" aria-hidden="true">
        <span className="blob page-header__blob-1" />
        <span className="blob page-header__blob-2" />
      </div>
      <PawBackground opacity={0.07} />
      <div className="container">
        <motion.nav
          className="breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-label="Breadcrumb"
        >
          <Link to="/">Home</Link>
          <FaChevronRight />
          <span>{crumb || title}</span>
        </motion.nav>

        {eyebrow && (
          <motion.span
            className="chip"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
