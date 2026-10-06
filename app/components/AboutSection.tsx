'use client'

import { useEffect, useState } from 'react'
import ScrollAnimation from './ScrollAnimation'
import styles from './AboutSection.module.css'

const FALLBACK_HTML = `
<h2>Swargumphan Music Institute</h2>
<p>We nurture classical and contemporary music education with expert faculty, structured courses, and performance opportunities for every learner.</p>
<p>Live online and offline classes help students grow as confident performers and passionate musicians.</p>
`

export default function AboutSection() {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/site-about', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data.success && typeof data.html === 'string') {
          setHtml(data.html.trim() === '' ? '' : data.html)
        } else {
          setHtml('')
        }
      })
      .catch(() => {
        if (!cancelled) setHtml('')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const displayHtml = html === null ? null : html === '' ? FALLBACK_HTML : html

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={`container ${styles.inner}`}>
        <ScrollAnimation animationType="fadeInUp" delay={0.1}>
          <div className={styles.header}>
            <p className={styles.kicker}>Our story</p>
            <h2 id="about-heading" className={styles.title}>
              About Naad Dhyas Foundation 
            </h2>
            <p className={styles.subtitle}>
              Discover our mission, values, and the vibrant community behind the institute.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animationType="fadeInUp" delay={0.25}>
          <div className={styles.card}>
            {displayHtml === null ? (
              <div className={styles.loading}>Loading…</div>
            ) : (
              <div
                className={`${styles.aboutHtml} about-site-html`}
                dangerouslySetInnerHTML={{ __html: displayHtml }}
              />
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
