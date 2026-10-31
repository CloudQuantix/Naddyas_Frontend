import Header from './components/Header'
import HeroVideo from './components/HeroVideo'
import Hero from './components/Hero'
import AutoRotatingStrip from './components/AutoRotatingStrip'
import YouTubeVideoStrip from './components/YouTubeVideoStrip'
import PerformanceOpportunities from './components/PerformanceOpportunities'
import DonationSection from './components/DonationSection'
import SectionDivider from './components/SectionDivider'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header transparent={true} />
      <HeroVideo />
      <Hero />
      <AutoRotatingStrip />
      <SectionDivider style={{ padding: '10px 20px' }} />
      <YouTubeVideoStrip />
      <SectionDivider style={{ padding: '10px 20px' }} />
      <PerformanceOpportunities />
      <DonationSection />
      <Footer />
    </main>
  )
}

