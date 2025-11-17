import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Education() {
  const items = [
    {
      title: 'Bachelor of Information Systems and Management',
      org: 'Binus University',
      years: '2018 - 2023',
    },
    {
      title: 'Bachelor of Management',
      org: 'Binus University',
      years: '2018 - 2023',
    },
    {
      title: 'Master of Cybersecurity',
      org: 'Monash University',
      years: '2024 - 2026 (Expected)',
    },
  ]

  // timeline scroll linkage
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="education" ref={ref} className="relative bg-[#050b1b] text-white py-20">
      {/* top sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-flicker" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Education</h2>

        {/* timeline */}
        <div className="relative mt-12 grid grid-cols-[28px_1fr] gap-x-6">
          {/* vertical line background */}
          <div className="relative">
            <div className="absolute left-[13px] top-0 bottom-0 w-[2px] bg-white/10" />
            <motion.div style={{ scaleY: lineScaleY }} className="origin-top absolute left-[13px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500" />
          </div>

          <div className="space-y-10">
            {items.map((it, idx) => {
              const isTop = idx === 0
              const isMid = idx === 1
              const isBottom = idx === 2
              return (
                <TimelineItem key={idx} idx={idx} isTop={isTop} isMid={isMid} isBottom={isBottom} {...it} />
              )
            })}
          </div>
        </div>
      </div>

      <style>{`@keyframes flicker { 0%, 100% { opacity: .9 } 50% { opacity: .4 } } .animate-flicker { animation: flicker 6s ease-in-out infinite; }`}</style>
    </section>
  )
}

function TimelineItem({ idx, title, org, years, isTop, isMid, isBottom }) {
  const itemRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: itemRef, offset: ['-20% 80%', '40% 20%'] })
  const y = useTransform(scrollYProgress, [0, 1], [20, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1])

  return (
    <motion.div ref={itemRef} style={{ y, opacity, scale }} className="relative grid grid-cols-[28px_1fr] gap-x-6">
      {/* node */}
      <div className="relative">
        <div className="absolute left-0 top-3 h-3 w-3 rounded-full bg-white/20" />
        <div className={`absolute left-0 top-3 h-3 w-3 rounded-full bg-white ${idx===0? 'shadow-[0_0_18px_rgba(59,130,246,0.8)]' : 'shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`} />
      </div>

      <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur transition-all hover:bg-white/10 hover:border-white/60">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-white/70">{org}</div>
        <div className="text-white/50 text-sm mt-2">{years}</div>
        {/* directional hint */}
        {isTop && <div className="mt-3 text-xs text-cyan-300/80">Latest • Scroll down to continue the journey</div>}
        {isBottom && <div className="mt-3 text-xs text-purple-300/80">Next • Scroll up to revisit previous milestones</div>}
      </div>
    </motion.div>
  )
}
