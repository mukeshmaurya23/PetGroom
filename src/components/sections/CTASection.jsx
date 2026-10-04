import { motion } from 'framer-motion';
import { FaCalendarCheck, FaWhatsapp, FaPhoneAlt, FaPaw } from 'react-icons/fa';
import Button from '../ui/Button';
import PawBackground from '../common/PawBackground';
import { BUSINESS } from '../../constants';
import { useBooking } from '../../context/BookingContext';
import { telLink, whatsappLink, bookingMessage } from '../../utils/whatsapp';
import { fadeUp, viewport } from '../../animations/variants';

export default function CTASection() {
  const { openBooking } = useBooking();

  return (
    <section className="section cta">
      <div className="container">
        <motion.div
          className="cta__box"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <PawBackground opacity={0.1} />
          <span className="cta__paw">
            <FaPaw />
          </span>
          <h2>
            Ready to pamper your pet at <span className="gold-text">{BUSINESS.name}</span>?
          </h2>
          <p>
            Same-day appointments available. Book now and give your furry friend the
            premium grooming they deserve.
          </p>
          <div className="cta__actions">
            <Button variant="gold" size="lg" icon={<FaCalendarCheck />} onClick={() => openBooking()}>
              Book Appointment
            </Button>
            <Button variant="whatsapp" size="lg" href={whatsappLink(bookingMessage())} icon={<FaWhatsapp />}>
              WhatsApp Now
            </Button>
            <Button variant="outline" size="lg" href={telLink()} icon={<FaPhoneAlt />}>
              Call {BUSINESS.phone}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
