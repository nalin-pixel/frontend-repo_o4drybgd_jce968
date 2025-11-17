import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function HoverArtCard({ children, className = '' }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`group relative will-change-transform ${className}`}
    >
      {/* moving sheen */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div className="absolute -inset-1 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{
               background: 'conic-gradient(from 90deg at 50% 50%, rgba(255,255,255,.15), rgba(255,255,255,0) 50%, rgba(255,255,255,.15))'
             }}
        />
        <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(120px_60px_at_var(--mx)_var(--my),rgba(255,255,255,0.18),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {children}
    </motion.div>
  )
}
