import Header from './components/Header'
import HeroVideo from './components/HeroVideo'
import Hero from './components/Hero'
import AutoRotatingStrip from './components/AutoRotatingStrip'
import Courses from './components/Courses'
import PerformanceOpportunities from './components/PerformanceOpportunities'
import DonationSection from './components/DonationSection'
import PopularBlogs from './components/PopularBlogs'
import ReelsSection from './components/ReelsSection'
import SectionDivider from './components/SectionDivider'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header transparent={true} />
      <HeroVideo />
      <Hero />
      <AutoRotatingStrip />
      <SectionDivider />
      <Courses />
      <SectionDivider />
      <PerformanceOpportunities />
      <SectionDivider />
      <DonationSection />
      <SectionDivider />
      <PopularBlogs />
      <SectionDivider />
      <ReelsSection />
      <Footer />
    </main>
  )
}

