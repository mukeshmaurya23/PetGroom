import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaWhatsapp, FaPaw, FaPhoneAlt } from 'react-icons/fa';
import { useBooking } from '../../context/BookingContext';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import { whatsappLink, bookingMessage, telLink } from '../../utils/whatsapp';
import { SERVICES, BUSINESS, SERVICE_AREAS } from '../../constants';

const PET_TYPES = ['Dog', 'Cat', 'Puppy', 'Kitten', 'Other'];

/** Lets someone ask for something that isn't in the service list. */
const OTHER_SERVICE = 'Other / not sure';

export default function BookingModal() {
  const { open, preselect, closeBooking } = useBooking();
  const formRef = useRef(null);
  const firstFieldRef = useRef(null);
  useLockBodyScroll(open);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    petType: 'Dog',
    service: '',
    otherService: '',
    area: '',
    date: '',
    notes: '',
  });

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, service: preselect || f.service || SERVICES[0].title }));
    }
  }, [open, preselect]);

  // Focus the first field so the keyboard opens right away on mobile.
  useEffect(() => {
    if (!open) return undefined;
    const t = setTimeout(() => firstFieldRef.current?.focus(), 220);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeBooking();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeBooking]);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  /* The WhatsApp URL is rebuilt on every keystroke and lives on the
     anchor's href. Tapping it is a plain link navigation, so mobile
     browsers hand off to the WhatsApp app immediately — no popup
     blocker, no blank intermediate tab. */
  const waUrl = useMemo(() => {
    const service =
      form.service === OTHER_SERVICE
        ? form.otherService.trim() || OTHER_SERVICE
        : form.service;
    return whatsappLink(bookingMessage({ ...form, service }));
  }, [form]);

  /* Deliberately no validation gate. Anything the visitor has filled in
     is enough — the rest gets sorted out in the WhatsApp conversation,
     and a blocked submit is just a lost booking. */
  const handleSend = () => {
    setTimeout(closeBooking, 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBooking}
        >
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Book a pet grooming appointment"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal__close" onClick={closeBooking} aria-label="Close" type="button">
              <FaTimes aria-hidden="true" />
            </button>

            <div className="modal__head">
              <span className="modal__icon">
                <FaPaw aria-hidden="true" />
              </span>
              <h3>Book an Appointment</h3>
              <p>
                Fill this in and it opens WhatsApp with your booking ready to send — we
                confirm your slot within minutes.
              </p>
            </div>

            {/* One-tap path for anyone who'd rather just chat */}
            <a
              className="btn btn--whatsapp btn--block modal__quick"
              href={whatsappLink(bookingMessage())}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setTimeout(closeBooking, 350)}
            >
              <FaWhatsapp aria-hidden="true" />
              <span>Skip the form — chat with us now</span>
            </a>

            <div className="modal__divider"><span>or send your details</span></div>

            <form
              className="booking-form"
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
              noValidate
            >
              <div className="booking-form__row">
                <label>
                  Your Name
                  <input
                    ref={firstFieldRef}
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="e.g. Suraj"
                    autoComplete="name"
                  />
                </label>
                <label>
                  Phone Number
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={update}
                    placeholder="10-digit mobile"
                    autoComplete="tel"
                  />
                </label>
              </div>

              <div className="booking-form__row">
                <label>
                  Pet Type
                  <select name="petType" value={form.petType} onChange={update}>
                    {PET_TYPES.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Service
                  <select name="service" value={form.service} onChange={update}>
                    {SERVICES.map((s) => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                    <option>{OTHER_SERVICE}</option>
                  </select>
                </label>
              </div>

              {form.service === OTHER_SERVICE && (
                <label>
                  What does your pet need?
                  <input
                    name="otherService"
                    value={form.otherService}
                    onChange={update}
                    placeholder="Tell us in your own words"
                    autoFocus
                  />
                </label>
              )}

              <div className="booking-form__row">
                <label>
                  Your City
                  <select name="area" value={form.area} onChange={update}>
                    <option value="">Select city</option>
                    {SERVICE_AREAS.map((c) => (
                      <option key={c.slug}>{c.city}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Preferred Date &amp; Time
                  <input
                    name="date"
                    value={form.date}
                    onChange={update}
                    placeholder="e.g. Sat 5 PM"
                  />
                </label>
              </div>

              <label>
                Notes (optional)
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={update}
                  rows={2}
                  placeholder="Breed, coat condition, special requests…"
                />
              </label>

              <a
                className="btn btn--whatsapp btn--block btn--lg"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSend}
              >
                <FaWhatsapp aria-hidden="true" />
                <span>Send Booking on WhatsApp</span>
              </a>

              <p className="booking-form__note">
                Prefer to call?{' '}
                <a href={telLink()} className="btn btn--link">
                  <FaPhoneAlt aria-hidden="true" /> {BUSINESS.phone}
                </a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
