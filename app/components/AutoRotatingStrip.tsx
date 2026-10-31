'use client'

import styles from './AutoRotatingStrip.module.css'

export default function AutoRotatingStrip() {
  const stats = [
    { value: '200+', label: 'Happy Students' },
    { value: '4', label: 'Active Branches' },
    { value: '11', label: 'Music Courses' },
    { value: '200+', label: 'Happy Students' },
    { value: '4', label: 'Active Branches' },
    { value: '11', label: 'Music Courses' },
    { value: '200+', label: 'Happy Students' },
    { value: '4', label: 'Active Branches' },
    { value: '11', label: 'Music Courses' },
  ];

  return (
    <div className={styles.stripContainer}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.separator}>✦</span>
            </div>
          ))}
        </div>
        {/* Duplicate content for seamless scrolling */}
        <div className={styles.marqueeContent}>
          {stats.map((stat, index) => (
            <div key={`dup-${index}`} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.separator}>✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
