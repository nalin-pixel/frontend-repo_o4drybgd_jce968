import { useState, useEffect } from 'react'
import { Menu, X, UserPlus } from 'lucide-react'
import SignUpModal from './SignUpModal'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
  { label: 'Admin', href: '#admin' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'backdrop-blur bg-blue-950/60 border-b border-white/10' : 'bg-transparent'} `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div onClick={() => handleNav('#about')} className="cursor-pointer select-none text-white">
          <div className="text-lg font-semibold tracking-wide">Raffi Alvriansyah</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">Portfolio</div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <button key={l.href} onClick={() => handleNav(l.href)} className="text-white/80 hover:text-white transition-colors">
              {l.label}
            </button>
          ))}
          <button onClick={()=>setShowSignUp(true)} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
            <UserPlus size={16} /> Sign up
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={()=>setShowSignUp(true)} className="text-white" aria-label="Sign up">
            <UserPlus size={20} />
          </button>
          <button className="text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-blue-950/80 backdrop-blur">
          <div className="px-4 py-3 flex flex-col">
            {links.map((l) => (
              <button key={l.href} onClick={() => handleNav(l.href)} className="py-2 text-left text-white/80 hover:text-white">
                {l.label}
              </button>
            ))}
            <button onClick={()=>{ setShowSignUp(true); setOpen(false) }} className="py-2 text-left text-white/80 hover:text-white inline-flex items-center gap-2">
              <UserPlus size={16} /> Sign up
            </button>
          </div>
        </div>
      )}
      <SignUpModal open={showSignUp} onClose={()=>setShowSignUp(false)} />
    </header>
  )
}
