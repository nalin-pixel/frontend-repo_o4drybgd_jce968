import { motion } from 'framer-motion'

const variantsMap = {
  fadeUp: {
    initial: { opacity: 0, y: 32 },
    in: { opacity: 1, y: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: -32 },
    in: { opacity: 1, x: 0 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: 32 },
    in: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
  },
}

export default function MotionSection({ children, className = '', delay = 0, variant = 'fadeUp' }) {
  const v = variantsMap[variant] || variantsMap.fadeUp
  return (
    <motion.section
      className={className}
      initial={v.initial}
      whileInView={v.in}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.section>
  )}
