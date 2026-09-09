'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../MarksEntry.module.css'
import { downloadSwargumphanMarksPdf } from '../marksEntryPdf'
import { EXAMINATION_BRANCHES } from '../branches'
import {
    DIPLOMA_YEARS,
    INSTRUMENT_OPTIONS,
    VOCAL_OPTIONS,
    DANCE_OPTIONS,
    EXAM_TYPE_OPTIONS,
    SESSION_LABEL_OPTIONS,
    MARKS_ENTRY_TOKEN_KEY,
    MARKS_ENTRY_BRANCH_KEY,
} from '@/app/lib/marksEntryOptions'

type SheetStatus = 'draft' | 'locked' | 'submitted'

interface StudentRow {
    admissionId: number
    fullName: string
    formNo: string
    seatNo: string
    examSubmitted: boolean
    marks: number | null
}

async function api(path: string, init: RequestInit = {}) {
    const url = `/api/examination/marks-entry/${path.replace(/^\//, '')}`
    const token =
        typeof window !== 'undefined' ? sessionStorage.getItem(MARKS_ENTRY_TOKEN_KEY) : null
    const headers: Record<string, string> = { ...(init.headers as Record<string, string>) }
    if (token) headers['Authorization'] = `Bearer ${token}`
    if (init.body != null) headers['Content-Type'] = 'application/json'
    return fetch(url, {
        ...init,
        headers,
        cache: 'no-store',
    })
}

function marksInputsFromStudents(students: StudentRow[]): Record<number, string> {
    const o: Record<number, string> = {}
    for (const s of students) {
        o[s.admissionId] = s.marks != null ? String(s.marks) : ''
    }
    return o
}

export default function MarksEntryPage() {
    const router = useRouter()
    const [gateLoading, setGateLoading] = useState(true)
    const [marksEntryEnabled, setMarksEntryEnabled] = useState(false)

    const [step, setStep] = useState<'login' | 'criteria' | 'entry'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [branch, setBranch] = useState('')
    const [managerName, setManagerName] = useState('')

    const [diplomaYear, setDiplomaYear] = useState('')
    const [instrumentalSubject, setInstrumentalSubject] = useState('')
    const [vocalSubject, setVocalSubject] = useState('')
    const [danceSubject, setDanceSubject] = useState('')
    const [examType, setExamType] = useState('')
    const [sessionLabel, setSessionLabel] = useState('')

    const [sheetId, setSheetId] = useState<number | null>(null)
    const [sheetStatus, setSheetStatus] = useState<SheetStatus>('draft')
    const [maxMark, setMaxMark] = useState(25)
    const [marksHeader, setMarksHeader] = useState('')
    const [students, setStudents] = useState<StudentRow[]>([])
    const [markInputs, setMarkInputs] = useState<Record<number, string>>({})

    const [busy, setBusy] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        const check = async () => {
            try {
                const res = await fetch('/api/examination', { cache: 'no-store' })
                const data = await res.json()
                if (data.success && data.marksEntryEnabled) {
                    setMarksEntryEnabled(true)
                } else {
                    setMarksEntryEnabled(false)
                    router.replace('/examination')
                }
            } catch {
                router.replace('/examination')
            } finally {
                setGateLoading(false)
            }
        }
        check()
    }, [router])

    useEffect(() => {
        if (!marksEntryEnabled || gateLoading) return
        const token = sessionStorage.getItem(MARKS_ENTRY_TOKEN_KEY)
        if (token) {
            const storedBranch = sessionStorage.getItem(MARKS_ENTRY_BRANCH_KEY)
            if (storedBranch) setBranch(storedBranch)
            setStep('criteria')
        }
    }, [marksEntryEnabled, gateLoading])

    const handleMusicInstrumental = (v: string) => {
        setInstrumentalSubject(v)
        if (v) {
            setVocalSubject('')
            setDanceSubject('')
        }
    }
    const handleMusicVocal = (v: string) => {
        setVocalSubject(v)
        if (v) {
            setInstrumentalSubject('')
            setDanceSubject('')
        }
    }
    const handleMusicDance = (v: string) => {
        setDanceSubject(v)
        if (v) {
            setInstrumentalSubject('')
            setVocalSubject('')
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setMessage(null)
        setBusy(true)
        try {
            const res = await api('login', {
                method: 'POST',
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    password,
                    branch,
                }),
            })
            const data = await res.json()
            if (!data.success) {
                setError(data.error || 'Login failed.')
                return
            }
            sessionStorage.setItem(MARKS_ENTRY_TOKEN_KEY, data.token)
            const serverBranch = data.manager?.branch != null ? String(data.manager.branch).trim() : ''
            if (serverBranch) sessionStorage.setItem(MARKS_ENTRY_BRANCH_KEY, serverBranch)
            setBranch(serverBranch || branch)
            setManagerName(data.manager?.name || '')
            setPassword('')
            setStep('criteria')
            setMessage('Signed in. Select filters and load students.')
        } catch {
            setError('Network error.')
        } finally {
            setBusy(false)
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem(MARKS_ENTRY_TOKEN_KEY)
        sessionStorage.removeItem(MARKS_ENTRY_BRANCH_KEY)
        setStep('login')
        setSheetId(null)
        setStudents([])
        setMarkInputs({})
        setMessage(null)
    }

    const handleLoadStudents = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setMessage(null)
        const musicCount = [instrumentalSubject, vocalSubject, danceSubject].filter(Boolean).length
        if (musicCount !== 1) {
            setError('Select exactly one music preference (Instrumental, Vocal, or Dance).')
            return
        }
        if (!diplomaYear || !examType || !sessionLabel) {
            setError('Please complete all fields.')
            return
        }
        setBusy(true)
        try {
            const res = await api('session', {
                method: 'POST',
                body: JSON.stringify({
                    diplomaYear,
                    instrumentalSubject: instrumentalSubject || '',
                    vocalSubject: vocalSubject || '',
                    danceSubject: danceSubject || '',
                    examType,
                    sessionLabel,
                }),
            })
            const data = await res.json()
            if (!data.success) {
                setError(data.error || 'Could not create list.')
                return
            }
            setSheetId(data.sheetId)
            setSheetStatus(data.status)
            if (data.branch != null && String(data.branch).trim() !== '') {
                const b = String(data.branch).trim()
                setBranch(b)
                sessionStorage.setItem(MARKS_ENTRY_BRANCH_KEY, b)
            }
            setMaxMark(data.maxMark)
            setMarksHeader(data.marksHeader)
            const list: StudentRow[] = (data.students || []).map((s: any) => ({
                admissionId: s.admissionId,
                fullName: s.fullName,
                formNo: s.formNo,
                seatNo: s.seatNo || '',
                examSubmitted: Boolean(s.examSubmitted),
                marks: s.marks ?? null,
            }))
            setStudents(list)
            setMarkInputs(marksInputsFromStudents(list))
            setStep('entry')
            setMessage(`Loaded ${list.length} student(s). Enter marks, then save.`)
        } catch {
            setError('Network error.')
        } finally {
            setBusy(false)
        }
    }

    const refreshSheet = useCallback(async () => {
        if (sheetId == null) return
        const res = await api(`session/${sheetId}`)
        const data = await res.json()
        if (!data.success) return
        setSheetStatus(data.status)
        if (data.branch != null && String(data.branch).trim() !== '') {
            const b = String(data.branch).trim()
            setBranch(b)
            sessionStorage.setItem(MARKS_ENTRY_BRANCH_KEY, b)
        }
        const list: StudentRow[] = (data.students || []).map((s: any) => ({
            admissionId: s.admissionId,
            fullName: s.fullName,
            formNo: s.formNo,
            seatNo: s.seatNo || '',
            examSubmitted: Boolean(s.examSubmitted),
            marks: s.marks ?? null,
        }))
        setStudents(list)
        setMarkInputs(marksInputsFromStudents(list))
    }, [sheetId])

    /** Build marks payload; if requireAllForLock, every student must have a valid number. */
    const buildMarksPayload = (requireAllForLock: boolean): Record<string, string | number> | null => {
        const marks: Record<string, string | number> = {}
        const eligibleStudents = students.filter((s) => s.examSubmitted)
        if (requireAllForLock && eligibleStudents.length === 0) {
            setError('No eligible students. Only students with submitted exam form can be marked.')
            return null
        }
        for (const s of students) {
            if (!s.examSubmitted) continue
            const raw = (markInputs[s.admissionId] ?? '').trim()
            if (raw === '') {
                if (requireAllForLock) {
                    setError('Enter marks for all students before locking.')
                    return null
                }
                marks[String(s.admissionId)] = ''
            } else {
                const n = parseFloat(raw)
                if (Number.isNaN(n)) {
                    setError(`Invalid mark for ${s.fullName}.`)
                    return null
                }
                if (n < 0 || n > maxMark) {
                    setError(`Marks must be between 0 and ${maxMark} for ${s.fullName}.`)
                    return null
                }
                marks[String(s.admissionId)] = n
            }
        }
        return marks
    }

    const persistMarks = async (requireAllForLock: boolean): Promise<boolean> => {
        if (sheetId == null || sheetStatus !== 'draft') return false
        setError(null)
        const marks = buildMarksPayload(requireAllForLock)
        if (!marks) return false
        try {
            const res = await api(`session/${sheetId}/marks`, {
                method: 'PUT',
                body: JSON.stringify({ marks }),
            })
            const data = await res.json()
            if (!data.success) {
                setError(data.error || 'Save failed.')
                return false
            }
            await refreshSheet()
            return true
        } catch {
            setError('Network error.')
            return false
        }
    }

    const handleSaveMarks = async () => {
        if (sheetId == null || sheetStatus !== 'draft') return
        setMessage(null)
        setBusy(true)
        const ok = await persistMarks(false)
        if (ok) setMessage('Marks saved.')
        setBusy(false)
    }

    const handleLock = async () => {
        if (sheetId == null) return
        setError(null)
        setMessage(null)
        setBusy(true)
        try {
            const ok = await persistMarks(true)
            if (!ok) return
            const res = await api(`session/${sheetId}/lock`, { method: 'POST', body: '{}' })
            const data = await res.json()
            if (!data.success) {
                setError(data.error || 'Lock failed.')
                return
            }
            setSheetStatus('locked')
            setMessage('Marks locked. Review and submit.')
            await refreshSheet()
        } catch {
            setError('Network error.')
        } finally {
            setBusy(false)
        }
    }

    const handleSubmitFinal = async () => {
        if (sheetId == null) return
        setBusy(true)
        setError(null)
        try {
            const res = await api(`session/${sheetId}/submit`, { method: 'POST', body: '{}' })
            const data = await res.json()
            if (!data.success) {
                setError(data.error || 'Submit failed.')
                return
            }
            setSheetStatus('submitted')
            setMessage('Submitted. You can download the PDF.')
            await refreshSheet()
        } catch {
            setError('Network error.')
        } finally {
            setBusy(false)
        }
    }

    const handleDownloadPdf = async () => {
        if (!students.length || sheetStatus !== 'submitted' || sheetId == null) return
        const examTypeDisplay =
            EXAM_TYPE_OPTIONS.find((o) => o.value === examType)?.label ?? examType
        let musicPreferenceLine = ''
        if (instrumentalSubject) musicPreferenceLine = `Music preference — Instrumental: ${instrumentalSubject}`
        else if (vocalSubject) musicPreferenceLine = `Music preference — Vocal: ${vocalSubject}`
        else if (danceSubject) musicPreferenceLine = `Music preference — Dance: ${danceSubject}`
        const branchDisplay =
            EXAMINATION_BRANCHES.find((b) => b.value === branch)?.label ?? branch
        try {
            await downloadSwargumphanMarksPdf({
                sheetId,
                branch,
                branchDisplay,
                sessionLabel,
                diplomaYear,
                examType,
                examTypeDisplay,
                maxMark,
                marksHeader,
                students: students.map((s) => ({
                    admissionId: s.admissionId,
                    fullName: s.fullName,
                    formNo: s.formNo,
                    seatNo: s.seatNo,
                    marks: s.marks,
                })),
                musicPreferenceLine: musicPreferenceLine || undefined,
            })
        } catch {
            setError('Could not generate PDF.')
        }
    }

    const backToCriteria = () => {
        setStep('criteria')
        setSheetId(null)
        setStudents([])
        setMarkInputs({})
        setMessage(null)
        setError(null)
    }

    if (gateLoading) {
        return (
            <main className={styles.main}>
                <p className={styles.loading}>Loading…</p>
            </main>
        )
    }

    if (!marksEntryEnabled) {
        return null
    }

    return (
        <main className={styles.main}>
            <div className={step === 'entry' ? styles.containerWide : styles.container}>
                <h1 className={styles.title}>Marks Entry</h1>
                <p className={styles.subtitle}>
                    Sign in with branch manager email and password. Only students of your branch matching the filters appear.
                </p>

                {error && <p className={styles.error}>{error}</p>}
                {message && <p className={styles.success}>{message}</p>}

                {step === 'login' && (
                    <div className={styles.card}>
                        <form onSubmit={handleLogin}>
                            <div className={styles.field}>
                                <label htmlFor="me-email">Email (branch manager)</label>
                                <input
                                    id="me-email"
                                    type="email"
                                    autoComplete="username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="me-password">Password</label>
                                <input
                                    id="me-password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="me-branch">Branch</label>
                                <select
                                    id="me-branch"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    required
                                >
                                    <option value="">Select branch</option>
                                    {EXAMINATION_BRANCHES.map((b) => (
                                        <option key={b.value} value={b.value}>
                                            {b.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className={styles.submitBtn} disabled={busy}>
                                {busy ? 'Signing in…' : 'Sign in'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 'criteria' && (
                    <div className={styles.card}>
                        <p className={styles.metaLine}>
                            Signed in{managerName ? ` as ${managerName}` : ''}.
                            <button type="button" className={styles.dangerBtn} style={{ marginLeft: 12 }} onClick={handleLogout}>
                                Sign out
                            </button>
                        </p>
                        <form onSubmit={handleLoadStudents}>
                            <div className={styles.sectionTitle}>Diploma year</div>
                            <div className={styles.field}>
                                <label htmlFor="me-diploma">Diploma year</label>
                                <select
                                    id="me-diploma"
                                    value={diplomaYear}
                                    onChange={(e) => setDiplomaYear(e.target.value)}
                                    required
                                >
                                    <option value="">Select year</option>
                                    {DIPLOMA_YEARS.map((y) => (
                                        <option key={y} value={y}>
                                            {y}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.sectionTitle}>Music preference (same as admission form)</div>
                            <div className={styles.musicGrid}>
                                <div className={styles.musicCategory}>
                                    <h4>Instrumental</h4>
                                    <select
                                        className={styles.selectFull}
                                        value={instrumentalSubject}
                                        onChange={(e) => handleMusicInstrumental(e.target.value)}
                                        disabled={!!(vocalSubject || danceSubject)}
                                    >
                                        <option value="">Select instrument</option>
                                        {INSTRUMENT_OPTIONS.map((o) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.musicCategory}>
                                    <h4>Indian classical vocal</h4>
                                    <select
                                        className={styles.selectFull}
                                        value={vocalSubject}
                                        onChange={(e) => handleMusicVocal(e.target.value)}
                                        disabled={!!(instrumentalSubject || danceSubject)}
                                    >
                                        <option value="">Select vocal style</option>
                                        {VOCAL_OPTIONS.map((o) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.musicCategory}>
                                    <h4>Dance</h4>
                                    <select
                                        className={styles.selectFull}
                                        value={danceSubject}
                                        onChange={(e) => handleMusicDance(e.target.value)}
                                        disabled={!!(instrumentalSubject || vocalSubject)}
                                    >
                                        <option value="">Select dance style</option>
                                        {DANCE_OPTIONS.map((o) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.sectionTitle}>Exam</div>
                            <div className={styles.field}>
                                <select value={examType} onChange={(e) => setExamType(e.target.value)} required>
                                    <option value="">Select exam</option>
                                    {EXAM_TYPE_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.sectionTitle}>Session</div>
                            <div className={styles.field}>
                                <select value={sessionLabel} onChange={(e) => setSessionLabel(e.target.value)} required>
                                    <option value="">Select session</option>
                                    {SESSION_LABEL_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={busy}>
                                {busy ? 'Loading…' : 'Load students'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 'entry' && sheetId != null && (
                    <div className={styles.card}>
                        <p className={styles.metaLine}>
                            Branch: <strong>{branch}</strong> · Session: <strong>{sessionLabel}</strong> · Diploma:{' '}
                            <strong>{diplomaYear}</strong> · Status: <strong>{sheetStatus}</strong>
                        </p>
                        <div className={styles.toolbar}>
                            <button type="button" className={styles.secondaryBtn} onClick={backToCriteria}>
                                New list
                            </button>
                            <button type="button" className={styles.secondaryBtn} onClick={handleLogout}>
                                Sign out
                            </button>
                        </div>

                        <div className={styles.tableWrap}>
                            <table className={styles.marksTable}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Form No</th>
                                        <th>Seat No</th>
                                        <th>Name</th>
                                        <th>{marksHeader}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((s, i) => (
                                        <tr key={s.admissionId} className={!s.examSubmitted ? styles.disabledStudent : ''}>
                                            <td>{i + 1}</td>
                                            <td>{s.formNo || '—'}</td>
                                            <td>{s.seatNo || '—'}</td>
                                            <td>
                                                {s.fullName}
                                                {!s.examSubmitted && <div className={styles.smallNote}>Exam form not submitted</div>}
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={maxMark}
                                                    step="0.01"
                                                    className={styles.markInput}
                                                    disabled={sheetStatus !== 'draft' || !s.examSubmitted}
                                                    value={markInputs[s.admissionId] ?? ''}
                                                    onChange={(e) =>
                                                        setMarkInputs((prev) => ({
                                                            ...prev,
                                                            [s.admissionId]: e.target.value,
                                                        }))
                                                    }
                                                    aria-label={`Marks for ${s.fullName}`}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className={styles.hint}>
                            ISE I and ISE II: marks out of 25. ESE: marks out of 50. Save often while in draft.
                        </p>
                        <p className={styles.hint}>Students without submitted exam form are shown but disabled for marks entry.</p>

                        <div className={styles.toolbar}>
                            <button
                                type="button"
                                className={styles.secondaryBtn}
                                onClick={handleSaveMarks}
                                disabled={busy || sheetStatus !== 'draft'}
                            >
                                Save marks
                            </button>
                            <button
                                type="button"
                                className={styles.submitBtn}
                                style={{ width: 'auto', marginTop: 0 }}
                                onClick={handleLock}
                                disabled={busy || sheetStatus !== 'draft' || students.length === 0}
                            >
                                Lock marks
                            </button>
                            <button
                                type="button"
                                className={styles.submitBtn}
                                style={{ width: 'auto', marginTop: 0, background: '#065f46' }}
                                onClick={handleSubmitFinal}
                                disabled={busy || sheetStatus !== 'locked'}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className={styles.secondaryBtn}
                                onClick={handleDownloadPdf}
                                disabled={sheetStatus !== 'submitted'}
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
