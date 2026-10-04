import { useState } from 'react';

/**
 * Image with native lazy loading, async decoding, blur-up reveal
 * and a graceful gradient fallback if the source fails to load.
 */
export default function LazyImage({ src, alt = '', className = '', ...rest }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <span className={`lazy-img ${loaded ? 'is-loaded' : ''} ${className}`}>
      {failed ? (
        <span className="lazy-img__fallback" aria-label={alt} role="img">
          🐾
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          {...rest}
        />
      )}
    </span>
  );
}
