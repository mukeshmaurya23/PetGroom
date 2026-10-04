import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../ui/ServiceCard';
import Button from '../ui/Button';
import { SERVICES } from '../../constants';
import { stagger, viewport } from '../../animations/variants';

export default function ServicesSection({ limit, showAllLink = false, showHeading = true }) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <section className="section section--beige services" id="services">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow="Our Services"
            title="Premium grooming, tailored to every pet"
            subtitle="From a quick refresh to a full luxury spa day — pick what your pet needs and we'll pamper them with care."
          />
        )}

        <motion.div
          className="services-grid"
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {list.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </motion.div>

        {showAllLink && (
          <div className="services__more">
            <Button variant="primary" to="/services">
              View All Services
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
