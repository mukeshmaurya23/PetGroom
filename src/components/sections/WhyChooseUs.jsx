import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../../utils/iconMap';
import { WHY_CHOOSE } from '../../constants';
import { fadeUp, stagger, viewport } from '../../animations/variants';

export default function WhyChooseUs() {
  return (
    <section className="section section--white why" id="why">
      <div className="container">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Pet parents across Mumbai trust Asha Pets"
          subtitle="Every detail is designed around your pet's comfort, safety and happiness."
        />

        <motion.div
          className="why-grid"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {WHY_CHOOSE.map((w) => (
            <motion.div
              className="why-card"
              key={w.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
            >
              <span className="why-card__icon">
                <Icon name={w.icon} />
              </span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
