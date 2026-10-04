/* Central icon registry so content data can stay pure (string keys). */
import {
  FaDog,
  FaCat,
  FaBath,
  FaCut,
  FaPaw,
  FaSpa,
  FaAward,
  FaLeaf,
  FaWallet,
  FaCalendarCheck,
  FaHeart,
  FaGem,
  FaHeadset,
  FaStar,
  FaComments,
  FaCheck,
} from 'react-icons/fa';
import {
  FaScissors,
  FaShieldDog,
  FaEarListen,
  FaBone,
  FaHouseChimney,
} from 'react-icons/fa6';

const ICONS = {
  FaDog,
  FaCat,
  FaBath,
  FaCut,
  FaPaw,
  FaSpa,
  FaAward,
  FaLeaf,
  FaWallet,
  FaCalendarCheck,
  FaHeart,
  FaGem,
  FaHeadset,
  FaStar,
  FaComments,
  FaCheck,
  FaScissors,
  FaShieldDog,
  FaEarListen,
  FaBone,
  FaHouseChimney,
};

/** Render an icon by its string key. Falls back to a paw. */
export default function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || FaPaw;
  return <Cmp {...props} />;
}
