'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ExaminationAdminPanel from './ExaminationAdminPanel'
import {
  EXAM_COORDINATOR_SESSION_KEY,
  verifyExamCoordinatorCredentials,
  clearExamCoordinatorSession,
  setExamCoordinatorSession,
} from '@/app/lib/examCoordinatorAuth'
import examStyles from '../Examination.module.css'
import styles from './ExamCoordinator.module.css'

export default function ExamCoordinatorPage() {
  const [hydrated, setHydrated] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setHydrated(true)
    setLoggedIn(sessionStorage.getItem(EXAM_COORDINATOR_SESSION_KEY) === 'true')
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    if (verifyExamCoordinatorCredentials(username.trim(), password)) {
      setExamCoordinatorSession()
      setLoggedIn(true)
      setPassword('')
    } else {
      setError('Invalid username or password.')
    }
    setBusy(false)
  }

  const handleLogout = () => {
    clearExamCoordinatorSession()
    setLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  if (!hydrated) {
    return (
      <main className={examStyles.main}>
        <p className={examStyles.loading}>Loading…</p>
      </main>
    )
  }

  if (!loggedIn) {
    return (
      <main className={examStyles.main}>
        <div className={examStyles.container}>
          <div className={styles.loginWrap}>
            <h1 className={styles.loginTitle}>Exam Coordinator</h1>
            <p className={styles.loginSubtitle}>Sign in to manage examination notices and settings.</p>
            {error && <p className={styles.loginError}>{error}</p>}
            <form className={styles.loginForm} onSubmit={handleLogin}>
              <div className={styles.field}>
                <label htmlFor="ec-user">Username</label>
                <input
                  id="ec-user"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="ec-pass">Password</label>
                <input
                  id="ec-pass"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn} disabled={busy}>
                {busy ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <p className={styles.tempNote}>
              Temporary login only — replace with secure backend authentication before production.
            </p>
            <Link href="/examination" className={styles.backLink}>
              ← Back to Notice
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={examStyles.main}>
      <div className={`${examStyles.container} ${styles.fullWidthContainer}`}>
        <div className={styles.toolbar}>
          <Link href="/examination">← Notice</Link>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            Sign out
          </button>
        </div>
        <ExaminationAdminPanel />
      </div>
    </main>
  )
}
