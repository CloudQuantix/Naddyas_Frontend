'use client'

import Image from 'next/image'
import Link from 'next/link'
import ScrollAnimation from './ScrollAnimation'
import styles from './DonationSection.module.css'

export default function DonationSection() {
  return (
    <section className={`section ${styles.donationSection}`}>
      <div className="container">
        <div className={styles.donationContent}>
          <ScrollAnimation animationType="fadeInLeft" delay={0.2}>
            <div className={styles.donationImageWrapper}>
              <Image
                src="/donation_music_image.png"
                alt="Donation to Swargumphan Music Institute"
                fill
                className={styles.donationImage}
                sizes="(max-width: 968px) 100vw, 50vw"
              />
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animationType="fadeInRight" delay={0.4}>
            <div className={styles.donationText}>
              <h2 className={styles.donationTitle}>
                Support the Gift of Music
              </h2>
              <p className={styles.donationSubtitle}>
                Help us nurture the next generation of musical talent.
              </p>
              <p className={styles.donationDescription}>
                Your generous donation helps Swargumphan Sangeet Vidyalaya provide quality musical education, instruments, and performance opportunities to dedicated students. Join us in preserving and promoting our rich classical heritage.
              </p>
              <Link href="/donors" className={styles.donationButton}>
                Make a Donation
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
