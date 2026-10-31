'use client'

import styles from './SectionDivider.module.css'

interface SectionDividerProps {
  className?: string
  style?: React.CSSProperties
}

export default function SectionDivider({ className = '', style }: SectionDividerProps) {
  return (
    <div className={`${styles.dividerContainer} ${className}`} style={style}>
      <div className={styles.line}></div>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>𝄢</span>
      </div>
      <div className={styles.line}></div>
    </div>
  )
}
