import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPaw, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import { NAV_LINKS, BUSINESS } from '../../constants';
import { useBooking } from '../../context/BookingContext';
import { telLink } from '../../utils/whatsapp';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // document.body does not exist while prerendering.
  const [mounted, setMounted] = useState(false);
  const { openBooking } = useBooking();
  const location = useLocation();
  useLockBodyScroll(menuOpen);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    if (menuOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  /*
   * The drawer is portalled to <body> rather than living inside <header>.
   * `.navbar.is-scrolled` applies a backdrop-filter, and a filtered element
   * becomes the containing block for its position:fixed descendants — so
   * inside the header the drawer anchored to the 76px navbar as soon as the
   * page was scrolled, collapsing the panel and spilling its links across
   * the page.
   */
  const drawer = (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            <div className="drawer__head">
              <span className="navbar__name">
                Asha<span>Pets</span>
              </span>
              <button
                className="drawer__close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                type="button"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <nav className="drawer__links" aria-label="Mobile">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `drawer__link ${isActive ? 'is-active' : ''}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="drawer__foot">
              <button
                className="btn btn--gold btn--block"
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openBooking();
                }}
              >
                <FaCalendarCheck aria-hidden="true" /> <span>Book Appointment</span>
              </button>
              <a className="btn btn--outline btn--block" href={telLink()}>
                <FaPhoneAlt aria-hidden="true" /> <span>Call {BUSINESS.phone}</span>
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Asha Pets home">
          <span className="navbar__logo">
            <FaPaw aria-hidden="true" />
          </span>
          <span className="navbar__name">
            Asha<span>Pets</span>
          </span>
        </Link>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <a className="navbar__call" href={telLink()} aria-label="Call Asha Pets">
            <FaPhoneAlt aria-hidden="true" /> <span>{BUSINESS.phone}</span>
          </a>
          <button
            className="btn btn--primary btn--sm"
            type="button"
            onClick={() => openBooking()}
            aria-label="Book an appointment"
          >
            <FaCalendarCheck aria-hidden="true" /> <span>Book Now</span>
          </button>
          <button
            className="navbar__burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            type="button"
          >
            <FaBars aria-hidden="true" />
          </button>
        </div>
      </div>

      {mounted && createPortal(drawer, document.body)}
    </header>
  );
}
