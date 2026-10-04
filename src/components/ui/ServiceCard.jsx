import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { fadeUp } from '../../animations/variants';
import Icon from '../../utils/iconMap';
import { useBooking } from '../../context/BookingContext';

export default function ServiceCard({ service, city }) {
  const { openBooking } = useBooking();
  const heading = city ? `${service.title} in ${city}` : service.title;

  return (
    <motion.article
      className="service-card"
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    >
      <div className="service-card__icon">
        <Icon name={service.icon} />
      </div>
      <h3>{heading}</h3>
      <p>{service.desc}</p>
      <div className="service-card__foot">
        <button
          type="button"
          className="btn btn--gold btn--sm"
          onClick={() => openBooking(service.title)}
        >
          <FaWhatsapp aria-hidden="true" />
          <span>Book Now</span>
        </button>
      </div>
    </motion.article>
  );
}
