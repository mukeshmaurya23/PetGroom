import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappLink, bookingMessage } from '../../utils/whatsapp';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      className="floating-wa"
      href={whatsappLink(bookingMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <span className="floating-wa__pulse" />
      <FaWhatsapp />
      <span className="floating-wa__label">Chat with us</span>
    </motion.a>
  );
}
