import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Education from './components/Education'
import WorksPreview from './components/WorksPreview'
import PortfolioTypes from './components/PortfolioTypes'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import SocialIsland from './components/SocialIsland'

function App() {
  return (
    <div className="min-h-screen bg-[#050b1b]">
      <Navbar />
      <main className="mt-16">
        <Hero />
        <Education />
        <WorksPreview />
        <PortfolioTypes />
        <Testimonials />
        <Contact />
      </main>
      <SocialIsland />
    </div>
  )
}

export default App
