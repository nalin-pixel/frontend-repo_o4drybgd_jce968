import { useState, useEffect } from 'react'
import { Menu, X, UserPlus, LogIn, LogOut, Shield } from 'lucide-react'
import SignUpModal from './SignUpModal'
import SignInModal from './SignInModal'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem('auth')
      if (stored) {
        try { const parsed = JSON.parse(stored); setUser(parsed.user); setToken(parsed.token) } catch {}
      } else {
        setUser(null); setToken('')
      }
    }
    load()
    const onStorage = (e) => { if (e.key === 'auth') load() }
    window.addEventListener('storage', onStorage)
    const onAuthChanged = () => load()
    window.addEventListener('auth-changed', onAuthChanged)
    return () => { window.removeEventListener('storage', onStorage); window.removeEventListener('auth-changed', onAuthChanged) }
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    if (href === '#admin') {
      if (!user) { alert('Please sign in first.'); return }
      if (!(user?.is_admin && user?.is_verified)) { alert('Admin access required.'); return }
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const signInPrompt = () => {
    setShowSignIn(true)
  }

  const signOut = () => {
    localStorage.removeItem('auth')
    setUser(null); setToken('')
    window.dispatchEvent(new CustomEvent('auth-changed'))
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
          {user?.is_admin && user?.is_verified && (
            <button onClick={() => handleNav('#admin')} className="inline-flex items-center gap-2 text-emerald-300/90 hover:text-emerald-300">
              <Shield size={16} /> Admin
            </button>
          )}
          {!user && (
            <>
              <button onClick={()=>setShowSignUp(true)} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
                <UserPlus size={16} /> Sign up
              </button>
              <button onClick={signInPrompt} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium">
                <LogIn size={16} /> Sign in
              </button>
            </>
          )}
          {user && (
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
              <LogOut size={16} /> Sign out
            </button>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-3">
          {!user && (
            <button onClick={()=>setShowSignUp(true)} className="text-white" aria-label="Sign up">
              <UserPlus size={20} />
            </button>
          )}
          {!user ? (
            <button onClick={signInPrompt} className="text-white" aria-label="Sign in">
              <LogIn size={20} />
            </button>
          ) : (
            <button onClick={signOut} className="text-white" aria-label="Sign out">
              <LogOut size={20} />
            </button>
          )}
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
            {user?.is_admin && user?.is_verified && (
              <button onClick={() => { handleNav('#admin'); setOpen(false) }} className="py-2 text-left text-emerald-300/90 hover:text-emerald-300 inline-flex items-center gap-2">
                <Shield size={16} /> Admin
              </button>
            )}
            {!user && (
              <>
                <button onClick={()=>{ setShowSignUp(true); setOpen(false) }} className="py-2 text-left text-white/80 hover:text-white inline-flex items-center gap-2">
                  <UserPlus size={16} /> Sign up
                </button>
                <button onClick={()=>{ setShowSignIn(true); setOpen(false) }} className="py-2 text-left text-white/80 hover:text-white inline-flex items-center gap-2">
                  <LogIn size={16} /> Sign in
                </button>
              </>
            )}
            {user && (
              <button onClick={()=>{ signOut(); setOpen(false) }} className="py-2 text-left text-white/80 hover:text-white inline-flex items-center gap-2">
                <LogOut size={16} /> Sign out
              </button>
            )}
          </div>
        </div>
      )}
      <SignUpModal open={showSignUp} onClose={()=>setShowSignUp(false)} />
      <SignInModal open={showSignIn} onClose={()=>setShowSignIn(false)} onSuccess={(data)=>{ setUser(data.user); setToken(data.token) }} />
    </header>
  )
}
