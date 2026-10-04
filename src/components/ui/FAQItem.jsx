import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

export default function FAQItem({ item, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="faq-item__q"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{item.q}</span>
        <motion.span
          className="faq-item__chev"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-item__a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
