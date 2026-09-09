import Header from './components/Header'
import HeroVideo from './components/HeroVideo'
import Hero from './components/Hero'
import Courses from './components/Courses'
import PerformanceOpportunities from './components/PerformanceOpportunities'
import ReelsSection from './components/ReelsSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header transparent={true} />
      <HeroVideo />
      <Hero />
      <Courses />
      <PerformanceOpportunities />
      <ReelsSection />
      <AboutSection />
      <Footer />
    </main>
  )
}

