'use client'

import styles from './SectionDivider.module.css'

export default function SectionDivider() {
  return (
    <div className={styles.dividerContainer}>
      <div className={styles.line}></div>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>𝄢</span>
      </div>
      <div className={styles.line}></div>
    </div>
  )
}
