'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname()
  const isExaminationSection = Boolean(pathname?.startsWith('/examination'))
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [marksEntryEnabled, setMarksEntryEnabled] = useState(false)

  useEffect(() => {
    if (!isExaminationSection) return
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch('/api/examination', { cache: 'no-store' })
        const data = await res.json()
        if (!cancelled && data.success) {
          setMarksEntryEnabled(Boolean(data.marksEntryEnabled))
        }
      } catch {
        if (!cancelled) setMarksEntryEnabled(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [isExaminationSection])

  return (
    <header className={`${styles.header} ${transparent ? styles.transparent : ''}`}>
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <div className={styles.topBarLeft}>
            <a href="#faqs" className={styles.faqsLink}>FAQs</a>
            <span className={styles.separator}>|</span>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook" className={styles.socialLink}>Facebook</a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>Instagram</a>
              <a href="https://www.youtube.com/@NnadDhyass" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className={styles.socialLink}>Youtube</a>
            </div>
          </div>
          <div className={styles.topBarRight}>
            <span className={styles.topBarText}>
              स्वरगुंफनच्या सुरेल प्रवासात सहभागी व्हा आणि संगीताच्या सुंदर विश्वात आपल्या कलेला नवी ओळख द्या.
            </span>
          </div>
        </div>
      </div>
      <div className={styles.navbar}>
        <div className={`container ${styles.headerContainer}`}>
          
          <div className={styles.navTopRow}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/Logo2.png"
                alt="Logo"
                width={70}
                height={70}
                className={styles.logoImage}
                priority
              />
              <div className={styles.logoTextWrapper}>
                <span className={styles.logoText}>Swargumphan</span>
                <span className={styles.logoSubtext}>Music Institute</span>
              </div>
            </Link>

            <div className={styles.searchContainer}>
              <button className={styles.searchIconBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              <input type="text" placeholder="Search courses, events..." className={styles.searchInput} />
            </div>
            
            <div className={styles.actionButtonsDesktop}>
              <Link href="/student/login" className={styles.loginBtn}>Login</Link>
              <a href="#online-courses" className={styles.onlineCoursesBtn}>Online Courses</a>
              <Link href="/register" className={styles.admissionBtn}>Take Admission</Link>
            </div>

            <button
              className={styles.menuToggle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          {isMenuOpen && (
            <div
              className={styles.backdrop}
              onClick={() => setIsMenuOpen(false)}
            ></div>
          )}
          
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <button
              className={styles.closeButton}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            {isExaminationSection ? (
              <>
                <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link
                  href="/examination"
                  className={`${styles.navLink} ${pathname === '/examination' ? styles.examNavLinkActive : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Notice
                </Link>
                {marksEntryEnabled && (
                  <Link
                    href="/examination/marks-entry"
                    className={`${styles.navLink} ${pathname === '/examination/marks-entry' ? styles.examNavLinkActive : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Marks Entry
                  </Link>
                )}
                <Link
                  href="/examination/exam-admin"
                  className={`${styles.navLink} ${pathname?.startsWith('/examination/exam-admin') ? styles.examNavLinkActive : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Exam_Admin
                </Link>
              </>
            ) : (
              <>
                <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</Link>
                <a href="#events" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Events</a>
                <Link href="/donation" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Donation</Link>
                <Link href="/examination" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Examination</Link>
                <Link href="/gallery" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                <Link href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>About</Link>
                
                <div className={styles.actionButtonsMobile}>
                  <Link href="/student/login" className={styles.loginBtn} onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <a href="#online-courses" className={styles.onlineCoursesBtn} onClick={() => setIsMenuOpen(false)}>Online Courses</a>
                  <Link href="/register" className={styles.admissionBtn} onClick={() => setIsMenuOpen(false)}>Take Admission</Link>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

