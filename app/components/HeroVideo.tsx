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
        <h1 className={styles.heroTitle}>Swargumphan Music Institute</h1>
        <p className={styles.heroSubtitle}>
          Discover the joy of music with our expert instructors. Join us to learn singing, instruments, and experience the rich heritage of Indian classical and western music.
        </p>
        <Link href="/register" className={styles.registerButton}>
          Find Your Course
        </Link>
      </div>
    </section>
  )
}
