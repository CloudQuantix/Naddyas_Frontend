import ScrollAnimation from './ScrollAnimation'
import StatsBanner from './StatsBanner'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <ScrollAnimation animationType="fadeInLeft" delay={0.2}>
            <div className={styles.heroText}>
              <StatsBanner />
              <h1 className={styles.heroTitle}>Learn Music. Anytime. Anywhere.</h1>
              <p className={styles.heroSubtitle}>
                Live, online classes with expert faculty, personalized learning and world class curriculum for all age groups.
              </p>
              <button className={styles.heroButton}>
                Find Your Course <span className={styles.musicIcon}>🎶</span>
              </button>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animationType="fadeInRight" delay={0.4}>
            <div className={styles.heroImage}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/h4O8IrtGa3I?si=2z7SYQ0w8ZOa0Lt8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ borderRadius: '20px' }}
              ></iframe>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      <div className={styles.heroDivider}></div>
    </section>
  )
}


