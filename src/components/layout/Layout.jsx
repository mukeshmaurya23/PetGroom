import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from '../common/ScrollToTopButton';
import FloatingWhatsApp from '../common/FloatingWhatsApp';
import BookingModal from '../common/BookingModal';

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // A hash means "jump to that section" — e.g. /#reviews from another page.
    if (hash) {
      const id = hash.slice(1);
      // Sections are lazily rendered, so retry briefly until it mounts.
      let tries = 0;
      const find = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (tries < 20) {
          tries += 1;
          setTimeout(find, 100);
        }
      };
      find();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTopButton />
      <BookingModal />
    </>
  );
}
