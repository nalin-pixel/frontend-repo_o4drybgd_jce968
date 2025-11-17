import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function sizeClassForQuote(q) {
  const len = (q || '').length
  if (len < 120) return 'min-w-[280px] sm:min-w-[340px] md:min-w-[380px]'
  if (len < 220) return 'min-w-[340px] sm:min-w-[420px] md:min-w-[520px]'
  return 'min-w-[420px] sm:min-w-[520px] md:min-w-[640px]'
}

function Stars({ count = 5 }) {
  const safe = Math.max(0, Math.min(5, count || 0))
  return (
    <div className="flex items-center gap-1 text-amber-300">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < safe ? 'fill-amber-300' : 'fill-transparent'} stroke-amber-300`}
          viewBox="0 0 24 24"
        >
          <path strokeWidth="1.5" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

function LogoBadge({ name, logo }) {
  if (logo) {
    return <img src={logo} alt={name} className="h-8 w-8 rounded-full object-cover" />
  }
  const initials = (name || '')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div className="h-8 w-8 rounded-full bg-white/10 text-white/70 grid place-items-center text-xs font-semibold">
      {initials}
    </div>
  )
}

function TestimonialCard({ t, parallaxIntensity = 8, glowIntensity = 0.25 }) {
  const widthClass = sizeClassForQuote(t.quote)
  // parallax drift using pointer position with mobile/reduced-motion guard
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reduced = media.matches
    const isMobile = window.innerWidth < 768
    const cap = isMobile ? 4 : 12
    const effective = reduced ? 0 : Math.min(parallaxIntensity ?? 0, cap)

    let frame = 0
    const onMove = (e) => {
      if (effective === 0) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const px = (e.clientX / window.innerWidth - 0.5) * 2
        const py = (e.clientY / window.innerHeight - 0.5) * 2
        setOffset({ x: px * effective, y: py * effective })
      })
    }
    window.addEventListener('mousemove', onMove)
    const onResize = () => setOffset({ x: 0, y: 0 })
    window.addEventListener('resize', onResize)
    const onChange = () => setOffset({ x: 0, y: 0 })
    media.addEventListener?.('change', onChange)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      media.removeEventListener?.('change', onChange)
      cancelAnimationFrame(frame)
    }
  }, [parallaxIntensity])

  return (
    <div
      className={`${widthClass} group relative rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7 backdrop-blur transition-all h-auto hover:border-white/60`}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
    >
      {/* subtle glass border pulse on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30" style={{ boxShadow: `inset 0 0 25px rgba(255,255,255,${glowIntensity})` }} />
      </div>
      <Stars count={t.rating} />
      <p className="mt-3 text-white/80 whitespace-normal break-words leading-relaxed text-base md:text-lg">“{t.quote}”</p>
      <div className="mt-5 flex items-center gap-3 text-white/70">
        <LogoBadge name={t.company || t.name} logo={t.logo || t.logo_url} />
        <div className="text-sm md:text-base">
          <div className="font-medium text-white/90">{t.name}</div>
          <div className="text-white/60">{t.role}{t.company ? `, ${t.company}` : ''}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [dualRow, setDualRow] = useState(true)
  const [data, setData] = useState([])
  const [settings, setSettings] = useState({ marquee_a_seconds: 30, marquee_b_seconds: 28, glow_intensity: 0.25, parallax_intensity: 8 })

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const [tRes, cRes, sRes] = await Promise.all([
          fetch(`${API}/api/testimonials`).then(r => r.json()),
          fetch(`${API}/api/clients`).then(r => r.json()),
          fetch(`${API}/api/settings`).then(r => r.json()),
        ])
        if (!mounted) return
        const logoByCompany = Object.fromEntries(
          (cRes || []).map(c => [c.name, c.logo_url])
        )
        const merged = (tRes || []).map(t => ({
          ...t,
          logo: t.logo_url || logoByCompany[t.company] || '',
        }))
        if (merged.length === 0) {
          const samples = [
            { name: 'A. Santoso', role: 'Product Manager, Fintech', company: 'VoltPay', rating: 5, quote: 'Raffi quickly translated complex requirements into clean, intuitive flows. The sprint velocity went up 20%.' },
            { name: 'N. Wijaya', role: 'Marketing Lead, D2C', company: 'BloomCo', rating: 5, quote: 'Our campaign hit record CTR thanks to a cohesive visual system and analytics-driven adjustments.' },
            { name: 'J. Park', role: 'Security Lead, SaaS', company: 'Secura', rating: 4, quote: 'His blue-team mindset and SIEM knowledge helped us tighten detections without slowing delivery.' },
            { name: 'M. Rivera', role: 'CTO, HealthTech', company: 'Vitality', rating: 5, quote: 'From idea to production in three weeks. Clear communication and thoughtful trade-offs throughout.' },
            { name: 'K. Nguyen', role: 'Founder, SaaS', company: 'Northbeam', rating: 5, quote: 'The design system and motion guidelines elevated our brand and sped up feature delivery for the team.' },
          ]
          setData(samples)
        } else {
          setData(merged)
        }
        if (sRes && sRes.key) {
          setSettings(prev => ({
            ...prev,
            marquee_a_seconds: sRes.marquee_a_seconds ?? prev.marquee_a_seconds,
            marquee_b_seconds: sRes.marquee_b_seconds ?? prev.marquee_b_seconds,
            glow_intensity: sRes.glow_intensity ?? prev.glow_intensity,
            parallax_intensity: sRes.parallax_intensity ?? prev.parallax_intensity,
          }))
        }
      } catch (e) {
        console.error(e)
      }
    }
    load()

    // listen for live preview updates from Admin
    const onPreview = (e) => {
      const s = e.detail || {}
      setSettings(prev => ({ ...prev, ...s }))
    }
    const onUpdated = (e) => {
      const s = e.detail || {}
      setSettings(prev => ({ ...prev, ...s }))
    }
    window.addEventListener('ui-settings-preview', onPreview)
    window.addEventListener('ui-settings-updated', onUpdated)

    return () => { mounted = false; window.removeEventListener('ui-settings-preview', onPreview); window.removeEventListener('ui-settings-updated', onUpdated) }
  }, [])

  const base = useMemo(() => data, [data])
  const loopA = useMemo(() => Array.from({ length: 4 }).flatMap(() => base), [base])
  const loopB = useMemo(() => Array.from({ length: 4 }).flatMap(() => [...base].reverse()), [base])

  const handleAddClick = () => {
    // Simple anchor navigation to admin section where testimonials can be added
    const el = document.querySelector('#admin')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // fallback to hash navigation
      window.location.hash = 'admin'
    }
  }

  return (
    <section className="relative bg-[#040a19] text-white py-20 overflow-hidden">
      {/* torn lights */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-10 -left-32 h-1 w-[120%] rotate-[12deg] bg-gradient-to-r from-transparent via-white/60 to-transparent animate-flicker"/>
        <div className="absolute top-10 -right-40 h-1 w-[120%] -rotate-[-8deg] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-flicker-delayed"/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold">Client Testimonials</h2>
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="text-white/50">Rows</span>
            <button onClick={() => setDualRow(false)} className={`px-3 py-1 rounded-full border ${!dualRow ? 'bg-white/15 border-white/50' : 'bg-white/5 border-white/10'}`}>Single</button>
            <button onClick={() => setDualRow(true)} className={`px-3 py-1 rounded-full border ${dualRow ? 'bg-white/15 border-white/50' : 'bg-white/5 border-white/10'}`}>Dual</button>
          </div>
        </div>

        {/* Row 1 */}
        <div className="mt-8 relative overflow-hidden">
          <div className="flex gap-6 whitespace-nowrap will-change-transform items-stretch" style={{ animation: `marquee ${settings.marquee_a_seconds || 30}s linear infinite`, width: '200%' }}>
            {loopA.map((t, idx) => (
              <TestimonialCard key={`a-${idx}`} t={t} parallaxIntensity={settings.parallax_intensity} glowIntensity={settings.glow_intensity} />
            ))}
          </div>
        </div>

        {/* Row 2 (appears on md+), reverse direction; toggle-able */}
        {dualRow && (
          <div className="mt-6 relative overflow-hidden hidden md:block">
            <div className="flex gap-6 whitespace-nowrap will-change-transform items-stretch" style={{ animation: `marquee-reverse ${settings.marquee_b_seconds || 28}s linear infinite`, width: '200%' }}>
              {loopB.map((t, idx) => (
                <TestimonialCard key={`b-${idx}`} t={t} parallaxIntensity={settings.parallax_intensity} glowIntensity={settings.glow_intensity} />
              ))}
            </div>
          </div>
        )}

        {/* Add Testimonials CTA */}
        <div className="mt-10 flex items-center justify-center">
          <button
            onClick={handleAddClick}
            className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/40 text-sm font-medium transition-colors"
          >
            Add testimonials
          </button>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes flicker { 0%, 100% { opacity: .9 } 50% { opacity: .4 } }
        .animate-flicker { animation: flicker 5s ease-in-out infinite; }
        .animate-flicker-delayed { animation: flicker 6.5s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
