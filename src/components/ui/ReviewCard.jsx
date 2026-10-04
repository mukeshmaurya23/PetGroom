import { FaQuoteLeft, FaStar, FaGoogle } from 'react-icons/fa';

export default function ReviewCard({ review }) {
  const meta = [review.pet && `${review.pet} parent`, review.relative]
    .filter(Boolean)
    .join(' · ');

  return (
    <article className="review-card glass">
      <div className="review-card__top">
        <FaQuoteLeft className="review-card__quote" aria-hidden="true" />
        <FaGoogle className="review-card__google" aria-label="Google review" />
      </div>

      <p className="review-card__text">{review.text}</p>

      <div
        className="review-card__stars"
        aria-label={`Rated ${review.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={i < review.rating ? 'is-on' : 'is-off'} aria-hidden="true" />
        ))}
      </div>

      <footer className="review-card__person">
        {review.photo ? (
          <img
            className="review-card__avatar review-card__avatar--img"
            src={review.photo}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span
            className="review-card__avatar"
            style={{ background: review.color }}
            aria-hidden="true"
          >
            {review.initial}
          </span>
        )}
        <div>
          <strong>{review.name}</strong>
          {meta && <span>{meta}</span>}
        </div>
      </footer>
    </article>
  );
}
