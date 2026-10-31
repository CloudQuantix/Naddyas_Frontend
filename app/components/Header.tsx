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
  const [activeCourseTab, setActiveCourseTab] = useState<'instruments' | 'singing' | 'dancing'>('instruments')

  // Course categories matching exact user requirements:
  // Flute, Sitar, Sugam Sangeet, Bharatanatyam, Classical Vocal Music, Tabla, Sound Arrangement, Pakhawaj, Bhajan
  const courseMenuData = {
    instruments: [
      { name: 'Flute (Bansuri)', icon: '🪈', href: '/register' },
      { name: 'Sitar', icon: '🪕', href: '/register' },
      { name: 'Tabla', icon: '🥁', href: '/register' },
      { name: 'Pakhawaj', icon: '🪘', href: '/register' },
      { name: 'Sound Arrangement', icon: '🎛️', href: '/register' },
      { name: 'Harmonium', icon: '🪗', href: '/register' },
    ],
    singing: [
      { name: 'Classical Vocal Music', icon: '🎤', href: '/register' },
      { name: 'Sugam Sangeet', icon: '🎵', href: '/register' },
      { name: 'Bhajan & Devotional', icon: '🪔', href: '/register' },
    ],
    dancing: [
      { name: 'Bharatanatyam', icon: '🪷', href: '/register' },
      { name: 'Kathak Dance', icon: '💃', href: '/register' },
    ],
  }

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(`.${styles.coursesDropdownContainer}`)) {
        setIsCoursesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
          <div className={styles.navRow}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <Image
                src="/Logo2.png"
                alt="Logo"
                width={50}
                height={50}
                className={styles.logoImage}
                priority
              />
              <div className={styles.logoTextWrapper}>
                <span className={styles.logoText}>Swargumphan</span>
                <span className={styles.logoSubtext}>Music Institute</span>
              </div>
            </Link>

            {/* Navigation Links */}
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
                  {/* Courses Mega Menu Trigger */}
                  <div className={styles.coursesDropdownContainer}>
                    <button
                      type="button"
                      className={`${styles.coursesTriggerBtn} ${isCoursesOpen ? styles.coursesTriggerActive : ''}`}
                      onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                    >
                      <span>Courses</span>
                      <span className={`${styles.dropdownChevron} ${isCoursesOpen ? styles.chevronOpen : ''}`}>
                        ▾
                      </span>
                    </button>

                    {/* 2-Panel Mega Menu Modal */}
                    {isCoursesOpen && (
                      <div className={styles.megaMenuWrapper}>
                        {/* Left Tab Sidebar (4 Categories) */}
                        <div className={styles.megaSidebar}>
                          <button
                            type="button"
                            className={`${styles.tabBtn} ${activeCourseTab === 'instruments' ? styles.tabBtnActive : ''}`}
                            onMouseEnter={() => setActiveCourseTab('instruments')}
                            onClick={() => setActiveCourseTab('instruments')}
                          >
                            <span>Instruments</span>
                            <span className={styles.tabArrow}>›</span>
                          </button>
                          <button
                            type="button"
                            className={`${styles.tabBtn} ${activeCourseTab === 'singing' ? styles.tabBtnActive : ''}`}
                            onMouseEnter={() => setActiveCourseTab('singing')}
                            onClick={() => setActiveCourseTab('singing')}
                          >
                            <span>Singing</span>
                            <span className={styles.tabArrow}>›</span>
                          </button>
                          <button
                            type="button"
                            className={`${styles.tabBtn} ${activeCourseTab === 'dancing' ? styles.tabBtnActive : ''}`}
                            onMouseEnter={() => setActiveCourseTab('dancing')}
                            onClick={() => setActiveCourseTab('dancing')}
                          >
                            <span>Dancing</span>
                            <span className={styles.tabArrow}>›</span>
                          </button>
                        </div>

                        {/* Right Content Panel (2 columns of sub-courses) */}
                        <div className={styles.megaContent}>
                          <div className={styles.courseItemsGrid}>
                            {courseMenuData[activeCourseTab].map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className={styles.courseMenuItem}
                                onClick={() => {
                                  setIsCoursesOpen(false)
                                  setIsMenuOpen(false)
                                }}
                              >
                                <span className={styles.itemIcon}>{item.icon}</span>
                                <span className={styles.itemName}>{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</Link>
                  <a href="#events" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Events</a>
                  <Link href="/donation" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Donation</Link>
                  <Link href="/examination" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Examination</Link>
                  <Link href="/gallery" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                  <Link href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>About</Link>
                </>
              )}

              {/* Action buttons inside mobile drawer */}
              <div className={styles.actionButtonsMobile}>
                <Link href="/student/login" className={styles.loginBtn} onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link href="/trial" className={styles.onlineCoursesBtn} onClick={() => setIsMenuOpen(false)}>Book a Free Trial</Link>
                <Link href="/register" className={styles.admissionBtn} onClick={() => setIsMenuOpen(false)}>Admission Now</Link>
              </div>
            </nav>

            {/* Action buttons on desktop (aligned right on same line) */}
            <div className={styles.actionButtonsDesktop}>
              <Link href="/student/login" className={styles.loginBtn}>Login</Link>
              <Link href="/trial" className={styles.trialNavBtn}>Book a Free Trial</Link>
              <Link href="/register" className={styles.admissionBtn}>Admission Now</Link>
            </div>

            {/* Mobile menu hamburger toggle */}
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
        </div>
      </div>
    </header>
  )
}

