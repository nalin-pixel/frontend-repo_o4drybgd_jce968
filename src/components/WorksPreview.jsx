import HoverArtCard from './HoverArtCard'

export default function WorksPreview() {
  const works = [
    { title: 'Fintech App UX', tag: 'UI/UX Design' },
    { title: 'Brand Visual System', tag: 'Graphic Design' },
    { title: 'City Nightscape', tag: 'Photography' },
  ]

  return (
    <section id="portfolio" className="relative bg-[#040a19] text-white py-20">
      {/* torn lights */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-flicker" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Work Glimpses</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {works.map((w, idx) => (
            <HoverArtCard key={idx} className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all">
              <div className="aspect-[4/3] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="p-6">
                <div className="text-lg font-semibold">{w.title}</div>
                <div className="text-white/60">{w.tag}</div>
              </div>
            </HoverArtCard>
          ))}
        </div>
      </div>

      <style>{`@keyframes flicker { 0%, 100% { opacity: .9 } 50% { opacity: .3 } } .animate-flicker { animation: flicker 7s ease-in-out infinite; }`}</style>
    </section>
  )
}
