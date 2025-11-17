import { useState } from 'react'
import { Palette, Camera, Shield, LayoutDashboard, Megaphone, ChevronRight } from 'lucide-react'

const categories = [
  { key: 'uiux', icon: LayoutDashboard, title: 'UI/UX Design', desc: 'Human-centered product design, wireframes, user flows, prototypes.', clients: ['Finpay', 'NeoBank', 'MedTrack'] },
  { key: 'graphic', icon: Palette, title: 'Graphic Design', desc: 'Brand identity, social assets, typography systems.', clients: ['Vivid Co', 'Northline', 'Sora Studio'] },
  { key: 'photo', icon: Camera, title: 'Photography', desc: 'Editorial, lifestyle, cityscapes, and product shots.', clients: ['CityMag', 'UrbanWear'] },
  { key: 'marketing', icon: Megaphone, title: 'Digital Marketing', desc: 'Campaign strategy, content, analytics, and growth.', clients: ['GroMart', 'Swiftly', 'Nimbus'] },
  { key: 'security', icon: Shield, title: 'Cybersecurity', desc: 'Risk assessments, blue teaming, SIEM dashboards.', clients: ['SaaSly', 'CoreOps'] },
]

const projectsByClient = {
  Finpay: [
    { title: 'Mobile Wallet UX', tag: 'UI/UX', desc: 'Onboarding and KYC flow redesign.' },
    { title: 'Payments Dashboard', tag: 'UI/UX', desc: 'Visibility into transfers and disputes.' },
  ],
  NeoBank: [
    { title: 'Loan Flow', tag: 'UI/UX', desc: 'Optimized loan application with risk hints.' },
  ],
  MedTrack: [
    { title: 'Patient Portal', tag: 'UI/UX', desc: 'Lab results and appointments.' },
  ],
  'Vivid Co': [
    { title: 'Brand System', tag: 'Graphic', desc: 'Logo, palette, type ramps.' },
  ],
  Northline: [
    { title: 'Campaign Kit', tag: 'Graphic', desc: 'OOH and social set.' },
  ],
  'Sora Studio': [
    { title: 'Poster Series', tag: 'Graphic', desc: 'Limited edition art posters.' },
  ],
  CityMag: [
    { title: 'Night City', tag: 'Photo', desc: 'Editorial spread.' },
  ],
  UrbanWear: [
    { title: 'Lookbook', tag: 'Photo', desc: 'FW collection lookbook.' },
  ],
  GroMart: [
    { title: 'Performance Ads', tag: 'Marketing', desc: 'Paid social + landing tests.' },
  ],
  Swiftly: [
    { title: 'SEO Overhaul', tag: 'Marketing', desc: 'Content clusters + tech fixes.' },
  ],
  Nimbus: [
    { title: 'Funnels', tag: 'Marketing', desc: 'CRO on top pages.' },
  ],
  SaaSly: [
    { title: 'Detection Tuning', tag: 'Security', desc: 'SIEM dashboards + alerts.' },
  ],
  CoreOps: [
    { title: 'Playbooks', tag: 'Security', desc: 'IR and blue team runbooks.' },
  ],
}

export default function PortfolioTypes() {
  const [activeCat, setActiveCat] = useState(null)
  const [activeClient, setActiveClient] = useState(null)

  const clients = activeCat ? categories.find(c => c.key === activeCat)?.clients ?? [] : []
  const projects = activeClient ? projectsByClient[activeClient] ?? [] : []

  return (
    <section className="relative bg-[#050b1b] text-white py-20">
      {/* torn lights */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent animate-flicker" />
        <div className="absolute bottom-6 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-flicker-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Portfolio Categories</h2>

        {/* Categories */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => { setActiveCat(c.key); setActiveClient(null) }}
              className={`group text-left rounded-2xl border ${activeCat===c.key? 'border-white/60' : 'border-white/10'} bg-white/5 p-5 backdrop-blur hover:bg-white/10 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]`}
            >
              <c.icon className="text-white/80" />
              <div className="mt-3 text-lg font-semibold flex items-center justify-between">
                <span>{c.title}</span>
                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={18}/>
              </div>
              <div className="text-sm text-white/60">{c.desc}</div>
            </button>
          ))}
        </div>

        {/* Clients list */}
        {activeCat && (
          <div className="mt-10">
            <div className="text-white/70 text-sm">Clients</div>
            <div className="mt-3 flex flex-wrap gap-3">
              {clients.map(cl => (
                <button
                  key={cl}
                  onClick={() => setActiveClient(cl)}
                  className={`rounded-full border ${activeClient===cl? 'border-white/60 bg-white/10' : 'border-white/10 bg-white/5'} px-4 py-1.5 text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all`}
                >
                  {cl}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Projects grid */}
        {activeClient && (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all">
                <div className="aspect-video rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.08),transparent_60%)] border border-white/10 mb-4 group-hover:border-white/60 transition-colors" />
                <div className="text-lg font-semibold">{p.title}</div>
                <div className="text-white/60 text-sm">{p.tag}</div>
                <div className="text-white/60 text-sm mt-1">{p.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes flicker { 0%, 100% { opacity: .9 } 50% { opacity: .4 } }
        .animate-flicker { animation: flicker 5s ease-in-out infinite; }
        .animate-flicker-delayed { animation: flicker 7s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
