'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/** Examination management moved to the public site: Examination → Exam_Admin (Exam Coordinator login). */
export default function AdminExaminationRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/examination/exam-admin')
  }, [router])

  return (
    <div style={{ padding: 40, textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <p>Redirecting to Exam Coordinator…</p>
      <p style={{ marginTop: 12, fontSize: 14, color: '#666' }}>
        Use <strong>Examination</strong> → <strong>Exam_Admin</strong> on the site, or{' '}
        <a href="/examination/exam-admin" style={{ color: '#800000' }}>
          open Exam Coordinator
        </a>
        .
      </p>
    </div>
  )
}
