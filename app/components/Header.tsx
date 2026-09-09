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
      <div className={`${styles.topBar} ${transparent ? styles.transparentBg : ''}`}>
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

        </div>
      </div>
      <div className={`${styles.navbar} ${transparent ? styles.transparentBg : ''}`}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/Logo2.png"
              alt="Logo"
              width={100}
              height={100}
              className={styles.logoImage}
              priority
            />
            <span className={styles.logoText}>SWARGUMPHAN</span>
          </Link>
          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

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
                <div
                  className={styles.dropdown}
                  onMouseEnter={() => setIsCoursesOpen(true)}
                  onMouseLeave={() => setIsCoursesOpen(false)}
                >
                  <a href="#courses" className={styles.navLink} onClick={() => setIsCoursesOpen(!isCoursesOpen)}>
                    Courses
                    <span className={styles.dropdownArrow}>▼</span>
                  </a>
                  {isCoursesOpen && (
                    <div className={styles.dropdownMenu}>
                      <a href="#online-courses" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>Online Courses</a>
                      <a href="#offline-courses" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>Offline Courses</a>
                    </div>
                  )}
                </div>
                <a href="#events" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Events</a>
                <Link href="/donation" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Donation</Link>
                <Link href="/examination" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Examination</Link>
                <Link href="/gallery" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                <a href="#about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>About</a>
                <Link href="/register" className={styles.admissionBtn} onClick={() => setIsMenuOpen(false)}>Take Admission 🪈</Link>
                <Link href="/student/login" className={styles.loginBtn} onClick={() => setIsMenuOpen(false)}>Login 🎵</Link>
                <Link href="/" className={styles.navbarRightLogoWrapper}>
                  <Image
                    src="/nad_dhyas.png"
                    alt="Nad Dhyas Logo"
                    width={75}
                    height={75}
                    className={styles.navbarRightLogo}
                    priority
                  />
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

