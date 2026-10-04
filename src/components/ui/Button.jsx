import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

const hover = { whileHover: { y: -3 }, whileTap: { scale: 0.96 } };

/**
 * Flexible button — renders <button>, <a> or router <Link>.
 * variant: primary | gold | whatsapp | outline | ghost
 */
export default function Button({
  variant = 'primary',
  size,
  block = false,
  icon,
  iconRight,
  children,
  to,
  href,
  className = '',
  ...rest
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    size && `btn--${size}`,
    block && 'btn--block',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon}
      {children && <span>{children}</span>}
      {iconRight}
    </>
  );

  if (to) {
    return (
      <MotionLink to={to} className={cls} {...hover} {...rest}>
        {content}
      </MotionLink>
    );
  }
  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...hover}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button className={cls} {...hover} {...rest}>
      {content}
    </motion.button>
  );
}
