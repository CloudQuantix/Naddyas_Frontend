'use client'

import Link from 'next/link'
import styles from './HeroVideo.module.css'

export default function HeroVideo() {
  return (
    <section className={styles.heroVideoSection}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.heroVideo}
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.videoOverlay}></div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Swargumphan <br />
          <span className={styles.heroTitleHighlight}>Music Institute</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Awaken your musical spirit. Learn <span className={styles.highlight}>vocal mastery</span> and <span className={styles.highlight}>classical instruments</span> under esteemed gurus — and experience the timeless depth of Indian classical &amp; contemporary music.
        </p>
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.registerButton}>
            Find Your Course <span className={styles.buttonArrow}>→</span>
          </Link>
          <a href="#courses" className={styles.exploreButton}>
            Explore Programs
          </a>
        </div>
      </div>
    </section>
  )
}
