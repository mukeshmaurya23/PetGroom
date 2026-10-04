/* ============================================================
   Framer Motion — shared animation variants
   Kept lightweight to protect performance.
   ============================================================ */

export const EASE = [0.22, 1, 0.36, 1];

// Fade + rise on scroll into view
export const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export const fromLeft = {
  hidden: { opacity: 0, x: -46 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

export const fromRight = {
  hidden: { opacity: 0, x: 46 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

// Stagger container for grids/lists
export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.3, ease: EASE } },
};

// Shared viewport config for whileInView
export const viewport = { once: true, amount: 0.2 };

// Gentle infinite float (used for hero cards / paws)
export const float = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
};
