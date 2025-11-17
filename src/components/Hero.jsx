import { useState } from 'react'
import Spline from '@splinetool/react-spline'
import HyperdriveBackground from './HyperdriveBackground'

const RESUME_URL = import.meta.env.VITE_RESUME_URL || '/resume.pdf'

// Fallback mapping by stable identifiers from Spline events
const FALLBACK_ID_MAP = {
  '82a8c17a-395f-40a4-b63d-09d1b86a8818': 'work', // Key YOU
  'a5c5d194-53e6-4206-ac02-5000aa34f6e0': 'resume', // Key Esc
  '85e2fbad-9b63-4f63-824f-056102ee7f1c': 'contact', // Key Send
}

// Explicit name mapping when Spline exposes non-semantic names
const NAME_MAP = {
  'key you': 'work',
  'key esc': 'resume',
  'key send': 'contact',
}

function extractTargetInfo(evt) {
  // Try common places Spline exposes a target
  const tgt = evt?.target || evt?.object || evt?.detail?.target || null
  const name = evt?.name || tgt?.name || ''
  // Probe likely id fields
  const id = evt?.id || tgt?.id || tgt?.uuid || tgt?.nodeId || tgt?.refId || ''
  const type = tgt?.type || tgt?.className || ''
  const pointer = {
    x: evt?.clientX ?? evt?.detail?.clientX ?? evt?.pointer?.x ?? undefined,
    y: evt?.clientY ?? evt?.detail?.clientY ?? evt?.pointer?.y ?? undefined,
  }
  return { name, id, type, pointer, rawTarget: tgt }
}

export default function Hero() {
  const [open, setOpen] = useState(false)

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleAction = (label) => {
    const n = (label || '').toLowerCase()
    if (!n) return false
    if (n.includes('work')) {
      goTo('portfolio')
      return true
    }
    if (n.includes('resume')) {
      window.open(RESUME_URL, '_blank', 'noopener,noreferrer')
      return true
    }
    if (n.includes('hire') || n.includes('contact')) {
      goTo('contact')
      return true
    }
    return false
  }

  // Central click handler: prefer id map, then explicit name map, then keyword heuristics
  const onAnySplineEvent = (evt) => {
    const info = extractTargetInfo(evt)
    // eslint-disable-next-line no-console
    console.debug('[Spline interaction raw event]', info)

    // 1) ID mapping has top priority (works even when name is present but non-semantic)
    if (info.id && FALLBACK_ID_MAP[info.id]) {
      const mapped = FALLBACK_ID_MAP[info.id]
      // eslint-disable-next-line no-console
      console.debug('[Spline interaction fallback by id]', info.id, '→', mapped)
      handleAction(mapped)
      return
    }

    // 2) Explicit name mapping
    const lowerName = (info.name || '').toLowerCase()
    if (lowerName && NAME_MAP[lowerName]) {
      const mapped = NAME_MAP[lowerName]
      // eslint-disable-next-line no-console
      console.debug('[Spline interaction mapped by name]', lowerName, '→', mapped)
      handleAction(mapped)
      return
    }

    // 3) Heuristic keywords in name
    if (info.name) {
      const ok = handleAction(info.name)
      if (ok) return
    }

    // 4) No route found — log hint
    // eslint-disable-next-line no-console
    console.debug('[Spline] no route matched for event; name/id seen:', info.name, info.id)
  }

  const onSplineLoad = (spline) => {
    try {
      // eslint-disable-next-line no-console
      console.debug('[Spline] loaded scene and attaching listeners')
      const attach = (type) => spline.addEventListener?.(type, onAnySplineEvent)
      ;['mouseDown','mouseUp','click','pointerdown','pointerup','touchstart','touchend']
        .forEach(attach)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.debug('[Spline] runtime listeners unavailable', e)
    }
  }

  const onSplineError = (e) => {
    // eslint-disable-next-line no-console
    console.error('[Spline] failed to load scene', e)
  }

  return (
    <section id="about" className="relative min-h-[90vh] w-full overflow-hidden bg-[#050b1b]">
      {/* Hyperspeed lights behind Spline */}
      <div className="absolute inset-0">
        <HyperdriveBackground density={160} speed={1.0} />
      </div>

      {/* 3D scene */}
      <div className="absolute inset-0 mix-blend-screen opacity-[0.92] pointer-events-auto z-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
          onLoad={onSplineLoad}
          onError={onSplineError}
          onMouseDown={onAnySplineEvent}
          onMouseUp={onAnySplineEvent}
          onClick={onAnySplineEvent}
          onPointerDown={onAnySplineEvent}
          onPointerUp={onAnySplineEvent}
          onTouchStart={onAnySplineEvent}
          onTouchEnd={onAnySplineEvent}
        />
      </div>

      {/* dark gradient veil (non-interactive) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b1b]/40 via-[#050b1b]/60 to-[#050b1b] pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col lg:flex-row items-center gap-10 pointer-events-none">
        <div className="w-full lg:w-1/2 text-white">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Raffi Alvriansyah</h1>
          <p className="mt-4 text-lg text-white/80">
            Blending cybersecurity, product design, and digital marketing into impactful experiences.
          </p>

          <div className="mt-6 flex items-center gap-3 pointer-events-auto">
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
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
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
