'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import layoutStyles from '../dashboard/StudentLayout.module.css'
import styles from './Result.module.css'

interface ResultData {
    success: boolean
    resultReady?: boolean
    student?: {
        admissionId: number
        fullName: string
        branch: string
        formNo?: string
        seatNo?: string
        diplomaYear?: string
        musicPreference?: string
    }
    marks?: {
        ISE_I: number | null
        ISE_II: number | null
        ESE: number | null
    }
    maxMarks?: {
        ISE_I: number
        ISE_II: number
        ESE: number
    }
    total?: {
        obtained: number | null
        max: number
        percentage: number | null
    }
    error?: string
}

function markDisplay(v: number | null | undefined) {
    return v == null ? '—' : String(v)
}

function escapeHtml(input: string) {
    return String(input)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

/** Grading per institute criteria (percentage out of 100). */
function gradeFromPercentage(pct: number | null | undefined): string {
    if (pct == null || Number.isNaN(pct)) return '—'
    if (pct >= 90) return 'A+ (Excellent / Outstanding)'
    if (pct >= 80) return 'A (Very Good)'
    if (pct >= 70) return 'B+ (Good)'
    if (pct >= 60) return 'B (Above Average)'
    if (pct >= 50) return 'C (Average / Pass)'
    if (pct >= 40) return 'D (Pass / Minimum)'
    return 'F (Fail)'
}

const RESULT_EXAM_NOTES = `The student's academic performance is evaluated through Internal and End Semester examinations as follows:

ISE I (Internal Semester Examination I) – Conducted in Semester I
ISE II (Internal Semester Examination II) – Conducted in Semester II
ESE (End Semester Examination) – Conducted once at the end of the academic year`

const GRADING_SCALE_LINES = [
    '90% – 100% → A+ (Excellent / Outstanding)',
    '80% – 89% → A (Very Good)',
    '70% – 79% → B+ (Good)',
    '60% – 69% → B (Above Average)',
    '50% – 59% → C (Average / Pass)',
    '40% – 49% → D (Pass / Minimum)',
    'Below 40% → F (Fail)',
]

export default function StudentResultPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<ResultData | null>(null)

    useEffect(() => {
        const studentId = sessionStorage.getItem('studentId')
        if (!studentId) {
            router.push('/student/login')
            return
        }
        const fetchResult = async () => {
            try {
                const res = await fetch(`/api/examination/result?studentId=${encodeURIComponent(studentId)}`, {
                    cache: 'no-store',
                })
                const json: ResultData = await res.json()
                if (res.ok && json.success) {
                    setData(json)
                } else {
                    setError(json.error || 'Failed to load result.')
                }
            } catch {
                setError('Failed to load result.')
            } finally {
                setLoading(false)
            }
        }
        fetchResult()
    }, [router])

    const handlePrint = () => {
        if (!data?.student || !data?.marks || !data?.maxMarks || !data?.total) return
        const w = window.open('', '_blank')
        if (!w) return
        const logoUrl = `${window.location.origin}/letterhead-logo.png`
        const studentName = escapeHtml(data.student.fullName || '')
        const branch = escapeHtml(data.student.branch || '—')
        const admissionId = escapeHtml(String(data.student.admissionId || ''))
        const diplomaYear = escapeHtml(data.student.diplomaYear || '—')
        const musicPref = escapeHtml(data.student.musicPreference || '—')
        const gradeDisplay = escapeHtml(gradeFromPercentage(data.total.percentage))
        const gradeScaleHtml = GRADING_SCALE_LINES.map((line) => `<div>${escapeHtml(line)}</div>`).join('')
        const examNotesHtml = escapeHtml(RESULT_EXAM_NOTES).replace(/\n/g, '<br/>')
        w.document.write(`
<!DOCTYPE html>
<html>
<head>
  <title>Result - ${data.student.fullName}</title>
  <style>
    body { font-family: 'Times New Roman', serif; margin: 20px; color: #111827; }
    .sheet { border: 2px solid #7f1d1d; padding: 16px; }
    .logoTop { text-align: center; margin-bottom: 12px; }
    .logoTop .logo { width: 132px; height: 132px; object-fit: contain; }
    .headSolo { display: flex; align-items: center; justify-content: center; border-bottom: 2px solid #7f1d1d; padding-bottom: 10px; }
    .headText { text-align: center; width: 100%; }
    .inst { font-size: 31px; font-weight: 700; color: #b91c1c; line-height: 1.05; }
    .tag { font-size: 16px; font-weight: 600; margin-top: 4px; }
    .title { margin: 14px 0 8px; text-align: center; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .sub { text-align: center; margin: 0 0 12px; font-size: 13px; font-weight: 600; color: #4b5563; }
    .meta { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
    .meta td { border: 1px solid #d1d5db; padding: 7px; font-size: 13px; }
    .meta .k { font-weight: 700; width: 18%; background: #f9fafb; }
    .result { width: 100%; border-collapse: collapse; margin-top: 6px; }
    .result th, .result td { border: 1px solid #9ca3af; padding: 8px; font-size: 14px; text-align: center; }
    .result th { background: #f3f4f6; font-weight: 700; }
    .result td:first-child, .result th:first-child { text-align: left; }
    .total { font-weight: 700; background: #fef3c7; }
    .gradeScale { margin-top: 12px; font-size: 11px; color: #4b5563; line-height: 1.4; }
    .gradeScaleTitle { font-weight: 700; margin-bottom: 4px; color: #374151; }
    .examNotes { margin-top: 12px; font-size: 12px; line-height: 1.45; color: #374151; }
    .footer { display: flex; justify-content: space-between; margin-top: 18px; font-size: 13px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="sheet">
  <div class="logoTop">
    <img class="logo" src="${logoUrl}" alt="Institute Logo" />
  </div>
  <div class="headSolo">
    <div class="headText">
      <div class="inst">Swargumphan Music Institute</div>
      <div class="tag">Begin your musical journey with us</div>
    </div>
  </div>
  <div class="title">STUDENT RESULT SHEET</div>
  <p class="sub">Academic Session: April/May 2025-26</p>
  <table class="meta">
    <tr>
      <td class="k">Name</td><td>${studentName}</td>
      <td class="k">Admission ID</td><td>${admissionId}</td>
    </tr>
    <tr>
      <td class="k">Diploma Year</td><td>${diplomaYear}</td>
      <td class="k">Music Preference</td><td>${musicPref}</td>
    </tr>
    <tr>
      <td class="k">Form No</td><td>${escapeHtml(data.student.formNo || '—')}</td>
      <td class="k">Seat No</td><td>${escapeHtml(data.student.seatNo || '—')}</td>
    </tr>
    <tr>
      <td class="k">Branch</td><td colspan="3">${branch}</td>
    </tr>
  </table>
  <table class="result">
    <thead>
      <tr><th>Exam</th><th>Obtained</th><th>Maximum</th></tr>
    </thead>
    <tbody>
      <tr><td>ISE I</td><td>${markDisplay(data.marks.ISE_I)}</td><td>${data.maxMarks.ISE_I}</td></tr>
      <tr><td>ISE II</td><td>${markDisplay(data.marks.ISE_II)}</td><td>${data.maxMarks.ISE_II}</td></tr>
      <tr><td>ESE</td><td>${markDisplay(data.marks.ESE)}</td><td>${data.maxMarks.ESE}</td></tr>
      <tr class="total">
        <td>Total (ISE I + ISE II + ESE)</td>
        <td>${markDisplay(data.total.obtained)}</td>
        <td>${data.total.max}</td>
      </tr>
      <tr class="total"><td>Percentage</td><td colspan="2">${data.total.percentage == null ? '—' : `${data.total.percentage}%`}</td></tr>
      <tr class="total"><td>Grade</td><td colspan="2">${gradeDisplay}</td></tr>
    </tbody>
  </table>
  <div class="gradeScale">
    <div class="gradeScaleTitle">Grading scale (reference)</div>
    ${gradeScaleHtml}
  </div>
  <div class="examNotes">${examNotesHtml}</div>
  <div class="footer">
    <span>Verified by Examination Cell</span>
    <span>Authorized Signature</span>
  </div>
  </div>
</body>
</html>`)
        w.document.close()
        w.focus()
        w.print()
    }

    return (
        <>
            <header className={layoutStyles.header}>
                <div className={layoutStyles.headerLeft}>
                    <h1 className={layoutStyles.headerTitle}>Result</h1>
                </div>
            </header>
            <main className={layoutStyles.contentArea}>
                <div className={styles.wrapper}>
                    <div className={styles.card}>
                        {loading && <p>Loading...</p>}
                        {!loading && error && <p className={styles.error}>{error}</p>}
                        {!loading && !error && data?.student && data?.marks && data?.maxMarks && data?.total && (
                            <>
                                <div className={styles.sheet}>
                                    <div className={styles.logoTop}>
                                        <img src="/letterhead-logo.png" alt="Institute Logo" className={styles.logoLarge} />
                                    </div>
                                    <div className={styles.headSolo}>
                                        <div className={styles.headText}>
                                            <p className={styles.institute}>Swargumphan Music Institute</p>
                                            <p className={styles.tagline}>Begin your musical journey with us</p>
                                        </div>
                                    </div>
                                    <h2 className={styles.title}>Student Result Sheet</h2>
                                    <p className={styles.session}>Academic Session: April/May 2025-26</p>
                                    <div className={styles.metaGrid}>
                                        <p><strong>Name:</strong> {data.student.fullName}</p>
                                        <p><strong>Admission ID:</strong> {data.student.admissionId}</p>
                                        <p><strong>Diploma Year:</strong> {data.student.diplomaYear || '—'}</p>
                                        <p><strong>Music Preference:</strong> {data.student.musicPreference || '—'}</p>
                                        <p><strong>Form No:</strong> {data.student.formNo || '—'}</p>
                                        <p><strong>Seat No:</strong> {data.student.seatNo || '—'}</p>
                                        <p><strong>Branch:</strong> {data.student.branch || '—'}</p>
                                    </div>
                                {!data.resultReady && (
                                    <p className={styles.hint}>Result is not complete yet. ISE I, ISE II and ESE all must be submitted.</p>
                                )}
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Exam</th>
                                                <th>Obtained</th>
                                                <th>Maximum</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ISE I</td>
                                                <td>{markDisplay(data.marks.ISE_I)}</td>
                                                <td>{data.maxMarks.ISE_I}</td>
                                            </tr>
                                            <tr>
                                                <td>ISE II</td>
                                                <td>{markDisplay(data.marks.ISE_II)}</td>
                                                <td>{data.maxMarks.ISE_II}</td>
                                            </tr>
                                            <tr>
                                                <td>ESE</td>
                                                <td>{markDisplay(data.marks.ESE)}</td>
                                                <td>{data.maxMarks.ESE}</td>
                                            </tr>
                                            <tr className={styles.totalRow}>
                                                <td>Total (ISE I + ISE II + ESE)</td>
                                                <td>{markDisplay(data.total.obtained)}</td>
                                                <td>{data.total.max}</td>
                                            </tr>
                                            <tr className={styles.totalRow}>
                                                <td>Percentage</td>
                                                <td colSpan={2}>
                                                    {data.total.percentage == null ? '—' : `${data.total.percentage}%`}
                                                </td>
                                            </tr>
                                            <tr className={styles.totalRow}>
                                                <td>Grade</td>
                                                <td colSpan={2}>{gradeFromPercentage(data.total.percentage)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                    <div className={styles.gradeScale}>
                                        <p className={styles.gradeScaleTitle}>Grading scale (reference)</p>
                                        <ul className={styles.gradeScaleList}>
                                            {GRADING_SCALE_LINES.map((line) => (
                                                <li key={line}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className={styles.examNotes}>{RESULT_EXAM_NOTES}</p>
                                </div>
                                <div className={styles.actions}>
                                    <button type="button" className={styles.printBtn} onClick={handlePrint}>
                                        Print / Save PDF
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}
