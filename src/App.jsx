import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BookingProvider } from './context/BookingContext';
import { SERVICE_AREAS, areaPath } from './data/areas';
import { ReviewsProvider } from './context/ReviewsContext';
import Layout from './components/layout/Layout';
import Loader from './components/common/Loader';

// Extra stylesheets (index.css is loaded in main.jsx)
import './styles/layout.css';
import './styles/cards.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/modal.css';
import './styles/pages.css';
import './styles/areas.css';

// Code-split pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceAreas = lazy(() => import('./pages/ServiceAreas'));
const AreaPage = lazy(() => import('./pages/AreaPage'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function SuspenseFallback() {
  return <div className="route-fallback" aria-hidden="true" />;
}

const isBrowser = typeof window !== 'undefined';

export default function App() {
  // The boot splash is a client-only flourish — prerendered HTML must
  // contain the real page, not the loader.
  const [booting, setBooting] = useState(isBrowser);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <ReviewsProvider>
      <BookingProvider>
        <AnimatePresence>{booting && <Loader key="loader" />}</AnimatePresence>

        <Suspense fallback={<SuspenseFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service-areas" element={<ServiceAreas />} />

              {/* Location landing pages: /pet-grooming-in-mumbai, …-goa, etc.
                  Registered explicitly rather than as "/pet-grooming-in-:slug"
                  because React Router only matches a dynamic param that spans a
                  whole path segment — a partial-segment param never matches. */}
              {SERVICE_AREAS.map((a) => (
                <Route
                  key={a.slug}
                  path={areaPath(a.slug)}
                  element={<AreaPage citySlug={a.slug} />}
                />
              ))}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BookingProvider>
    </ReviewsProvider>
  );
}
