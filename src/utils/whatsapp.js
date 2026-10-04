import { BUSINESS } from '../constants';
import { GOOGLE } from '../config/site';

/**
 * Build a WhatsApp click-to-chat link with an optional pre-filled message.
 * wa.me hands off to the installed app on mobile and to WhatsApp Web on
 * desktop, so the same URL works everywhere.
 */
export function whatsappLink(message = '') {
  const base = `https://wa.me/${BUSINESS.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Standard "Book Appointment" WhatsApp message. */
export function bookingMessage({
  name,
  phone,
  petType,
  service,
  area,
  date,
  notes,
} = {}) {
  const lines = [
    `Hi ${BUSINESS.name}! I'd like to book a pet grooming appointment. 🐾`,
    name && `Name: ${name}`,
    phone && `Phone: ${phone}`,
    petType && `Pet: ${petType}`,
    service && `Service: ${service}`,
    area && `Area: ${area}`,
    date && `Preferred date/time: ${date}`,
    notes && `Notes: ${notes}`,
  ].filter(Boolean);
  return lines.join('\n');
}

/** Pre-filled enquiry for a specific city landing page. */
export function areaMessage(city) {
  return `Hi ${BUSINESS.name}! I'm looking for pet grooming in ${city}. Could you share available slots?`;
}

/** tel: link for the business phone. */
export function telLink() {
  return `tel:+${BUSINESS.phoneRaw}`;
}

/** Google Maps directions to the studio (uses the verified listing id). */
export function directionsLink() {
  return GOOGLE.mapsUrl;
}

/** Google Maps embed src. */
export function mapEmbed() {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    BUSINESS.mapQuery
  )}&output=embed`;
}
