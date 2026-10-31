'use client'

import Link from 'next/link'
import styles from './DonateNowBookmark.module.css'

export default function RightSideBookmarks() {
  return (
    <div className={styles.bookmarkContainer}>
      <Link href="/register" className={`${styles.bookmark} ${styles.admissionBookmark}`}>
        Admission Now
      </Link>
      <Link href="/donation" className={`${styles.bookmark} ${styles.donateBookmark}`}>
        Donate Now
      </Link>
    </div>
  )
}
