import { useMemo } from 'react'

const testimonials = [
  {
    name: 'A. Santoso',
    role: 'Product Manager, Fintech',
    quote:
      'Raffi quickly translated complex requirements into clean, intuitive flows. The sprint velocity went up 20%.',
  },
  {
    name: 'N. Wijaya',
    role: 'Marketing Lead, D2C',
    quote:
      'Our campaign hit record CTR thanks to a cohesive visual system and analytics-driven adjustments.',
  },
  {
    name: 'J. Park',
    role: 'Security Lead, SaaS',
    quote:
      'His blue-team mindset and SIEM knowledge helped us tighten detections without slowing delivery.',
  },
]

export default function Testimonials() {
  const loopData = useMemo(() => Array.from({ length: 6 }).flatMap(() => testimonials), [])

  return (
    <section className="relative bg-[#040a19] text-white py-20 overflow-hidden">
      {/* torn lights */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-10 -left-32 h-1 w-[120%] rotate-[12deg] bg-gradient-to-r from-transparent via-white/60 to-transparent animate-flicker"/>
        <div className="absolute top-10 -right-40 h-1 w-[120%] -rotate-[8deg] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-flicker-delayed"/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Client Testimonials</h2>
        <div className="mt-8 relative overflow-hidden">
          <div className="flex gap-6 whitespace-nowrap will-change-transform animate-marquee">
            {loopData.map((t, idx) => (
              <div
                key={idx}
                className="min-w-[320px] max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:border-white/60 transition-all"
              >
                <p className="text-white/80">“{t.quote}”</p>
                <div className="mt-4 text-sm text-white/60">{t.name} • {t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: 200%;
        }
        @keyframes flicker { 0%, 100% { opacity: .9 } 50% { opacity: .4 } }
        .animate-flicker { animation: flicker 5s ease-in-out infinite; }
        .animate-flicker-delayed { animation: flicker 6.5s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
