import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaWhatsapp,
  FaCalendarCheck,
  FaDirections,
  FaInstagram,
  FaFacebookF,
  FaGoogle,
} from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { BUSINESS } from '../../constants';
import {
  telLink,
  whatsappLink,
  bookingMessage,
  directionsLink,
  mapEmbed,
} from '../../utils/whatsapp';
import { useBooking } from '../../context/BookingContext';
import { fromLeft, fromRight, viewport } from '../../animations/variants';

export default function ContactSection({ showHeading = true }) {
  const { openBooking } = useBooking();
  const [msg, setMsg] = useState({ name: '', text: '' });

  const sendEnquiry = (e) => {
    e.preventDefault();
    const text = `Hi ${BUSINESS.name}! ${msg.name ? `I'm ${msg.name}. ` : ''}${
      msg.text || 'I have an enquiry about grooming.'
    }`;
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
  };

  const info = [
    {
      icon: <FaMapMarkerAlt />,
      label: 'Visit Us',
      value: BUSINESS.address,
      href: directionsLink(),
    },
    { icon: <FaPhoneAlt />, label: 'Call Us', value: BUSINESS.phone, href: telLink() },
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      value: BUSINESS.phone,
      href: whatsappLink(bookingMessage()),
    },
    { icon: <FaClock />, label: 'Hours', value: `Mon–Sun · ${BUSINESS.hours}` },
  ];

  return (
    <section className="section section--beige contact" id="contact">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow="Contact Us"
            title="Book a pamper session for your pet"
            subtitle="Call, WhatsApp or drop by our studio in Mulund East. We'd love to meet your furry friend."
          />
        )}

        <div className="contact__grid">
          <motion.div
            className="contact__left"
            variants={fromLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <div className="contact__info">
              {info.map((it) => {
                const Wrapper = it.href ? 'a' : 'div';
                return (
                  <Wrapper
                    key={it.label}
                    className="contact__info-card glass"
                    {...(it.href
                      ? {
                          href: it.href,
                          target: it.href.startsWith('http') ? '_blank' : undefined,
                          rel: it.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                        }
                      : {})}
                  >
                    <span className="contact__info-icon">{it.icon}</span>
                    <div>
                      <span className="contact__info-label">{it.label}</span>
                      <strong>{it.value}</strong>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            <div className="contact__actions">
              <Button variant="primary" icon={<FaCalendarCheck />} onClick={() => openBooking()}>
                Book Appointment
              </Button>
              <Button variant="whatsapp" href={whatsappLink(bookingMessage())} icon={<FaWhatsapp />}>
                WhatsApp Now
              </Button>
              <Button variant="outline" href={telLink()} icon={<FaPhoneAlt />}>
                Call Now
              </Button>
              <Button variant="outline" href={directionsLink()} icon={<FaDirections />}>
                Get Directions
              </Button>
            </div>

            <form className="contact__form glass" onSubmit={sendEnquiry}>
              <h3>Send a quick enquiry</h3>
              <input
                placeholder="Your name"
                value={msg.name}
                onChange={(e) => setMsg((m) => ({ ...m, name: e.target.value }))}
              />
              <textarea
                rows={3}
                placeholder="How can we help your pet?"
                value={msg.text}
                onChange={(e) => setMsg((m) => ({ ...m, text: e.target.value }))}
              />
              <button type="submit" className="btn btn--whatsapp btn--block">
                <FaWhatsapp /> <span>Send on WhatsApp</span>
              </button>
            </form>

            <div className="contact__social">
              {BUSINESS.social.instagram && (
                <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
              )}
              {BUSINESS.social.facebook && (
                <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebookF />
                </a>
              )}
              <a href={BUSINESS.social.google} target="_blank" rel="noopener noreferrer" aria-label="Google reviews">
                <FaGoogle />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact__map"
            variants={fromRight}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <iframe
              title="Asha Pets location map"
              src={mapEmbed()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
