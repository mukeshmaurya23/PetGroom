import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import FAQItem from '../ui/FAQItem';
import Button from '../ui/Button';
import { FaWhatsapp } from 'react-icons/fa';
import { FAQS } from '../../constants';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import { whatsappLink, bookingMessage } from '../../utils/whatsapp';

export default function FAQSection() {
  return (
    <section className="section section--beige faq" id="faq">
      <div className="container faq__inner">
        <div className="faq__aside">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions? We've got answers."
            subtitle="Everything you need to know before your pet's grooming visit."
            align="left"
          />
          <Button
            variant="whatsapp"
            href={whatsappLink(bookingMessage())}
            icon={<FaWhatsapp />}
          >
            Still have a question? Ask us
          </Button>
        </div>

        <motion.div
          className="faq__list"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {FAQS.map((item, i) => (
            <motion.div key={item.q} variants={fadeUp}>
              <FAQItem item={item} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
