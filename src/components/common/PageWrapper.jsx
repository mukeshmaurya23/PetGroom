import { motion } from 'framer-motion';
import { pageTransition } from '../../animations/variants';
import Seo from './Seo';

/** Route shell: page transition + per-page SEO head. */
export default function PageWrapper({
  title,
  fullTitle,
  description,
  path,
  jsonLd,
  keywords,
  noindex,
  image,
  children,
}) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Seo
        title={title}
        fullTitle={fullTitle}
        description={description}
        path={path}
        jsonLd={jsonLd}
        keywords={keywords}
        noindex={noindex}
        image={image}
      />
      {children}
    </motion.div>
  );
}
