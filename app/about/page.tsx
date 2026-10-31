import Header from '../components/Header'
import Footer from '../components/Footer'
import AboutSection from '../components/AboutSection'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header transparent={false} />
      <div style={{ paddingTop: '80px' }}>
        <AboutSection />
      </div>
      <Footer />
    </main>
  )
}
