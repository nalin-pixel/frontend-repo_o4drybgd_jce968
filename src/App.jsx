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

function App() {
  return (
    <div className="min-h-screen bg-[#050b1b] relative">
      {/* global progress bar & cursor glow */}
      <ScrollProgress />
      <CursorGlow />

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

        {/* Admin section anchor is inside the component (id="admin") */}
        <MotionSection delay={0.3}>
          <AdminPanel />
        </MotionSection>
      </main>
      <SocialIsland />
    </div>
  )
}

export default App
