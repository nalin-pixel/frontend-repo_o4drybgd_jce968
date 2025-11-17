export default function Education() {
  const items = [
    {
      title: 'Bachelor of Information System',
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

  return (
    <section className="relative bg-[#050b1b] text-white py-20">
      {/* torn lights */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-flicker" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Education</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:border-white/60 transition-all"
            >
              <div className="text-lg font-semibold">{it.title}</div>
              <div className="text-white/70">{it.org}</div>
              <div className="text-white/50 text-sm mt-2">{it.years}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes flicker { 0%, 100% { opacity: .9 } 50% { opacity: .4 } } .animate-flicker { animation: flicker 6s ease-in-out infinite; }`}</style>
    </section>
  )
}
