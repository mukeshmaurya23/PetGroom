import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { loadGoogleReviews, SNAPSHOT_FEED } from '../services/googleReviews';

const ReviewsContext = createContext(null);

/**
 * Holds the live Google rating for the whole site: hero badge,
 * stat counters, review carousel and the JSON-LD aggregateRating
 * all read from here, so one fetch updates every surface.
 */
export function ReviewsProvider({ children }) {
  const [feed, setFeed] = useState(SNAPSHOT_FEED);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    loadGoogleReviews({ signal: controller.signal })
      .then((next) => {
        if (alive && next) setFeed(next);
      })
      .catch(() => {
        /* loadGoogleReviews already falls back; nothing to do */
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  const value = useMemo(
    () => ({
      rating: feed.rating,
      total: feed.total,
      reviews: feed.reviews,
      source: feed.source,
      isLive: feed.source === 'google',
      loading,
    }),
    [feed, loading]
  );

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews() {
  return useContext(ReviewsContext) || { ...SNAPSHOT_FEED, isLive: false, loading: false };
}
