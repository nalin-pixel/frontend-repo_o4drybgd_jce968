import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import HyperdriveBackground from './HyperdriveBackground'

const RESUME_URL = import.meta.env.VITE_RESUME_URL || '/resume.pdf'

export default function Hero() {
  const [open, setOpen] = useState(false)

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleAction = (label) => {
    const n = (label || '').toLowerCase()
    if (n.includes('work')) {
      goTo('portfolio')
    } else if (n.includes('resume')) {
      window.open(RESUME_URL, '_blank', 'noopener,noreferrer')
    } else if (n.includes('hire') || n.includes('contact')) {
      goTo('contact')
    }
  }

  const onSplineLoad = (spline) => {
    try {
      spline.addEventListener('mouseDown', (e) => {
        const name = e?.target?.name || ''
        handleAction(name)
      })
      // Optional: also react to "mouseUp" if your scene emits on release instead of press
      spline.addEventListener?.('mouseUp', (e) => {
        const name = e?.target?.name || ''
        handleAction(name)
      })
    } catch (e) {
      // fail silently if events are not available
    }
  }

  // Keyboard accessibility: W = Works, R = Resume, H/C = Hire/Contact, 1/2/3 as alternatives
  useEffect(() => {
    const onKey = (e) => {
      const key = e.key.toLowerCase()
      if (key === 'w' || key === '1') {
        handleAction('works')
      } else if (key === 'r' || key === '2') {
        handleAction('resume')
      } else if (key === 'h' || key === 'c' || key === '3') {
        handleAction('hire me')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="about" className="relative min-h-[90vh] w-full overflow-hidden bg-[#050b1b]">
      {/* Hyperspeed lights behind Spline */}
      <div className="absolute inset-0">
        <HyperdriveBackground density={160} speed={1.0} />
      </div>

      {/* 3D scene */}
      <div className="absolute inset-0 mix-blend-screen opacity-[0.92]">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} onLoad={onSplineLoad} />
      </div>

      {/* dark gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b1b]/40 via-[#050b1b]/60 to-[#050b1b] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2 text-white">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Raffi Alvriansyah</h1>
          <p className="mt-4 text-lg text-white/80">
            Blending cybersecurity, product design, and digital marketing into impactful experiences.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button onClick={() => setOpen(!open)} className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:border-white/60 border border-transparent transition-all">
              {open ? 'Hide details' : 'View more'}
            </button>
          </div>

          {open && (
            <div className="mt-4 overflow-hidden">
              <p className="text-white/80">
                IT professional with dual degrees in Information Systems and Management, pursuing a Master's in Cybersecurity at Monash University. Experienced in UI/UX design, cybersecurity analysis, and Agile project coordination. Proficient in Figma, Trello, and SIEM platforms.
              </p>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2" />
      </div>

      {/* Animated white strip + torn lights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute top-0 h-px w-1/2 bg-white/20"
            style={{
              left: `${(i * 18) % 100}%`,
              transform: 'translateX(-50%)',
              animation: `slideAcross ${8 + i}s linear infinite`,
            }}
          />
        ))}
        <div className="absolute left-0 right-0 top-8 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-flicker"/>
        <div className="absolute left-0 right-0 bottom-8 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent animate-flicker-delayed"/>
      </div>
      <style>{`
        @keyframes slideAcross {
          0% { transform: translateX(-50%) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateX(150vw) translateY(0); opacity: 0; }
        }
        @keyframes flicker { 0%, 100% { opacity: .9 } 50% { opacity: .4 } }
        .animate-flicker { animation: flicker 5.5s ease-in-out infinite; }
        .animate-flicker-delayed { animation: flicker 7s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
