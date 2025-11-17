import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Education from './components/Education'
import WorksPreview from './components/WorksPreview'
import PortfolioTypes from './components/PortfolioTypes'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import SocialIsland from './components/SocialIsland'
import MotionSection from './components/MotionSection'
import AuroraBackground from './components/AuroraBackground'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import AdminPanel from './components/AdminPanel'
import KeyGlowOverlay from './components/KeyGlowOverlay'

function App() {
  const [showAdmin, setShowAdmin] = useState(false)

  // Only render Admin section if a verified admin is signed in
  useEffect(() => {
    const compute = () => {
      try {
        const raw = localStorage.getItem('auth')
        if (!raw) {
          setShowAdmin(false)
          return
        }
        const auth = JSON.parse(raw)
        const user = auth?.user
        const isAdmin = Boolean(auth?.token && user?.is_admin && user?.is_verified)
        setShowAdmin(isAdmin)
      } catch (e) {
        setShowAdmin(false)
      }
    }

    compute()

    // Update if auth changes in another tab/window
    const onStorage = (e) => {
      if (e.key === 'auth') compute()
    }
    window.addEventListener('storage', onStorage)

    // Optional: listen for in-app auth change broadcasts
    const onAuthChanged = () => compute()
    window.addEventListener('auth-changed', onAuthChanged)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('auth-changed', onAuthChanged)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050b1b] relative">
      {/* global progress bar & cursor glow */}
      <ScrollProgress />
      <CursorGlow />
      <KeyGlowOverlay />

      {/* page-wide aurora wash */}
      <div className="absolute inset-0 -z-10">
        <AuroraBackground />
      </div>

      <Navbar />
      <main className="mt-16">
        <MotionSection>
          <Hero />
        </MotionSection>

        <MotionSection delay={0.05}>
          <Education />
        </MotionSection>

        <MotionSection delay={0.1}>
          <WorksPreview />
        </MotionSection>

        <MotionSection delay={0.15}>
          <PortfolioTypes />
        </MotionSection>

        <MotionSection delay={0.2}>
          <Testimonials />
        </MotionSection>

        <MotionSection delay={0.25}>
          <Contact />
        </MotionSection>

        {/* Admin section anchor is inside the component (id="admin"). Render only for verified admins */}
        {showAdmin && (
          <MotionSection delay={0.3}>
            <AdminPanel />
          </MotionSection>
        )}
      </main>
      <SocialIsland />
    </div>
  )
}

export default App
