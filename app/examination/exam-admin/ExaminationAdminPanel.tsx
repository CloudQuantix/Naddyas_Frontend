'use client'

import { useState, useEffect, useMemo } from 'react'
import styles from '../../admin/examination/ExaminationAdmin.module.css'
import EditableStudentResult from './EditableStudentResult'

interface ExamInfoItem {
  id: number
  title: string
  content: string
  examDate: string | null
  sortOrder: number
  updatedAt: string | null
}

interface ExaminationData {
  success: boolean
  formEnabled?: boolean
  marksEntryEnabled?: boolean
  resultEnabled?: boolean
  items?: ExamInfoItem[]
  error?: string
}

interface BranchExamStatsRow {
  branch: string
  totalStudents: number
  examFormSubmitted: number
  examFormRemaining: number
}

interface StudentStatsPayload {
  success: boolean
  branches?: BranchExamStatsRow[]
  totals?: {
    totalStudents: number
    examFormSubmitted: number
    examFormRemaining: number
  }
  error?: string
}

interface BranchMarksStatusRow {
  branch: string
  totalStudents: number
  uploadedStudents: number
  uploadedPercentage: number
  submitted: {
    ISE_I: boolean
    ISE_II: boolean
    ESE: boolean
  }
  remaining: string[]
  completed: boolean
}

interface MarksStatusPayload {
  success: boolean
  branches?: BranchMarksStatusRow[]
  totals?: {
    totalBranches: number
    completedBranches: number
    pendingBranches: number
  }
  error?: string
}

function pct(submitted: number, total: number): number {
  if (!total) return 0
  return Math.round((submitted / total) * 100)
}

type ExamAdminPanelId =
  | 'studentForm'
  | 'notice'
  | 'marks'
  | 'registration'
  | 'musicPreference'
  | 'examFormClear'
  | 'resultEdit'

interface BranchMusicPreferenceRow {
  branch: string
  totalStudents: number
  instrumental: number
  vocal: number
  dance: number
  other: number
  nullPreference: number
  instrumentalDetails?: Record<string, number>
  vocalDetails?: Record<string, number>
  danceDetails?: Record<string, number>
}

interface MusicPreferenceStatsPayload {
  success: boolean
  branches?: BranchMusicPreferenceRow[]
  students?: Array<{
    admissionId: number | null
    fullName: string
    branch: string
    examFormNo: string
    seatNo: string
    phone: string
    email: string
    diplomaYear: string
    instrumentalSubject: string
    vocalSubject: string
    danceSubject: string
    preferenceType: string
  }>
  totals?: {
    totalStudents: number
    instrumental: number
    vocal: number
    dance: number
    other: number
    nullPreference: number
    instrumentalDetails?: Record<string, number>
    vocalDetails?: Record<string, number>
    danceDetails?: Record<string, number>
  }
  error?: string
}

/** Same UI as the former admin Examination page, without AdminLayout. */
export default function ExaminationAdminPanel() {
  const detailLabel = (detailMap?: Record<string, number>) => {
    const entries = Object.entries(detailMap || {})
      .filter(([, count]) => Number(count) > 0)
      .sort((a, b) => a[0].localeCompare(b[0]))
    if (!entries.length) return '—'
    return entries.map(([name, count]) => `${name}: ${count}`).join(', ')
  }

  const [activePanel, setActivePanel] = useState<ExamAdminPanelId>('studentForm')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)
  const [branchStats, setBranchStats] = useState<BranchExamStatsRow[]>([])
  const [statsTotals, setStatsTotals] = useState<{
    totalStudents: number
    examFormSubmitted: number
    examFormRemaining: number
  } | null>(null)
  const [musicStatsLoading, setMusicStatsLoading] = useState(false)
  const [musicStatsError, setMusicStatsError] = useState<string | null>(null)
  const [musicStatsRows, setMusicStatsRows] = useState<BranchMusicPreferenceRow[]>([])
  const [musicStudents, setMusicStudents] = useState<MusicPreferenceStatsPayload['students']>([])
  const [musicStatsTotals, setMusicStatsTotals] = useState<{
    totalStudents: number
    instrumental: number
    vocal: number
    dance: number
    other: number
    nullPreference: number
  } | null>(null)
  const [selectedMusicBranch, setSelectedMusicBranch] = useState<string>('ALL')
  const [selectedMusicYear, setSelectedMusicYear] = useState<string>('ALL')
  const [selectedPreferenceType, setSelectedPreferenceType] = useState<string>('ALL')
  const [selectedInstrumental, setSelectedInstrumental] = useState<string>('ALL')
  const [selectedVocal, setSelectedVocal] = useState<string>('ALL')
  const [selectedDance, setSelectedDance] = useState<string>('ALL')
  const [marksStatusLoading, setMarksStatusLoading] = useState(false)
  const [marksStatusError, setMarksStatusError] = useState<string | null>(null)
  const [marksStatusRows, setMarksStatusRows] = useState<BranchMarksStatusRow[]>([])
  const [marksStatusTotals, setMarksStatusTotals] = useState<{
    totalBranches: number
    completedBranches: number
    pendingBranches: number
  } | null>(null)
  const [formEnabled, setFormEnabled] = useState(false)
  const [marksEntryEnabled, setMarksEntryEnabled] = useState(false)
  const [resultEnabled, setResultEnabled] = useState(false)
  const [toggling, setToggling] = useState(false)
  const [togglingMarks, setTogglingMarks] = useState(false)
  const [togglingResult, setTogglingResult] = useState(false)
  const [items, setItems] = useState<ExamInfoItem[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: '', content: '', examDate: '' })
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [reordering, setReordering] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const EXAM_FORM_CLEAR_PHRASE = 'Delete Exam-form'
  const [clearAllPhrase, setClearAllPhrase] = useState('')
  const [clearingAll, setClearingAll] = useState(false)
  const [clearSeatInput, setClearSeatInput] = useState('')
  const [clearingSeat, setClearingSeat] = useState(false)
  const [clearFormMessage, setClearFormMessage] = useState<string | null>(null)
  const [clearFormError, setClearFormError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
    fetchStudentStats()
    fetchMarksStatus()
    fetchMusicPreferenceStats()
  }, [])

  const fetchStudentStats = async () => {
    try {
      setStatsLoading(true)
      setStatsError(null)
      const res = await fetch('/api/admin/examination/student-stats', { cache: 'no-store' })
      const data: StudentStatsPayload = await res.json()
      if (data.success && data.branches && data.totals) {
        setBranchStats(data.branches)
        setStatsTotals(data.totals)
      } else {
        setStatsError(data.error || 'Failed to load student statistics.')
      }
    } catch (e: unknown) {
      setStatsError(e instanceof Error ? e.message : 'Failed to load student statistics.')
    } finally {
      setStatsLoading(false)
    }
  }

  const fetchMarksStatus = async () => {
    try {
      setMarksStatusLoading(true)
      setMarksStatusError(null)
      const res = await fetch('/api/admin/examination/marks-status', { cache: 'no-store' })
      const data: MarksStatusPayload = await res.json()
      if (data.success && data.branches && data.totals) {
        setMarksStatusRows(data.branches)
        setMarksStatusTotals(data.totals)
      } else {
        setMarksStatusError(data.error || 'Failed to load marks upload status.')
      }
    } catch (e: unknown) {
      setMarksStatusError(e instanceof Error ? e.message : 'Failed to load marks upload status.')
    } finally {
      setMarksStatusLoading(false)
    }
  }

  const handleClearAllExamForms = async () => {
    setClearFormError(null)
    setClearFormMessage(null)
    if (clearAllPhrase.trim() !== EXAM_FORM_CLEAR_PHRASE) {
      setClearFormError(`Type exactly: ${EXAM_FORM_CLEAR_PHRASE}`)
      return
    }
    if (!window.confirm('This will delete ALL exam registrations and related entered marks for those students. Continue?')) {
      return
    }
    try {
      setClearingAll(true)
      const res = await fetch('/api/admin/examination/clear-all-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmPhrase: clearAllPhrase.trim() }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setClearFormError(data.error || 'Failed to clear exam registrations.')
        return
      }
      setClearAllPhrase('')
      setClearFormMessage(
        `Cleared ${data.deletedRegistrations ?? 0} registration(s). Students may submit the exam form again; new exam form numbers and seat numbers will be assigned on submit.`
      )
      await fetchStudentStats()
      await fetchMusicPreferenceStats()
      await fetchMarksStatus()
    } catch {
      setClearFormError('Failed to clear exam registrations.')
    } finally {
      setClearingAll(false)
    }
  }

  const handleClearExamFormBySeat = async () => {
    setClearFormError(null)
    setClearFormMessage(null)
    const seat = clearSeatInput.trim()
    if (!seat) {
      setClearFormError('Enter a seat number.')
      return
    }
    if (!window.confirm(`Clear exam registration for seat ${seat}? The student will be able to submit the form again with a new seat number.`)) {
      return
    }
    try {
      setClearingSeat(true)
      const res = await fetch('/api/admin/examination/clear-registration-by-seat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatNo: seat }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setClearFormError(data.error || 'Failed to clear registration.')
        return
      }
      setClearSeatInput('')
      setClearFormMessage(data.message || 'Exam form cleared.')
      await fetchStudentStats()
      await fetchMusicPreferenceStats()
      await fetchMarksStatus()
    } catch {
      setClearFormError('Failed to clear registration.')
    } finally {
      setClearingSeat(false)
    }
  }

  const fetchMusicPreferenceStats = async () => {
    try {
      setMusicStatsLoading(true)
      setMusicStatsError(null)
      const res = await fetch('/api/admin/examination/music-preference-stats', { cache: 'no-store' })
      const data: MusicPreferenceStatsPayload = await res.json()
      if (data.success && data.branches && data.totals) {
        setMusicStatsRows(data.branches)
        setMusicStatsTotals(data.totals)
        setMusicStudents(data.students || [])
      } else {
        setMusicStatsError(data.error || 'Failed to load music preference statistics.')
      }
    } catch (e: unknown) {
      setMusicStatsError(e instanceof Error ? e.message : 'Failed to load music preference statistics.')
    } finally {
      setMusicStatsLoading(false)
    }
  }

  const splitValues = (value: string): string[] =>
    String(value || '')
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)

  const uniqueMusicYears = useMemo(
    () => Array.from(new Set((musicStudents || []).map((s) => s.diplomaYear).filter(Boolean))).sort(),
    [musicStudents]
  )
  const uniquePreferenceTypes = useMemo(
    () => Array.from(new Set((musicStudents || []).map((s) => s.preferenceType).filter(Boolean))).sort(),
    [musicStudents]
  )
  const uniqueInstrumentals = useMemo(
    () =>
      Array.from(new Set((musicStudents || []).flatMap((s) => splitValues(s.instrumentalSubject)).filter(Boolean))).sort(),
    [musicStudents]
  )
  const uniqueVocals = useMemo(
    () => Array.from(new Set((musicStudents || []).flatMap((s) => splitValues(s.vocalSubject)).filter(Boolean))).sort(),
    [musicStudents]
  )
  const uniqueDances = useMemo(
    () => Array.from(new Set((musicStudents || []).flatMap((s) => splitValues(s.danceSubject)).filter(Boolean))).sort(),
    [musicStudents]
  )

  const filteredMusicStudents = useMemo(() => {
    return (musicStudents || []).filter((s) => {
      if (selectedMusicBranch !== 'ALL' && s.branch !== selectedMusicBranch) return false
      if (selectedMusicYear !== 'ALL' && s.diplomaYear !== selectedMusicYear) return false
      if (selectedPreferenceType !== 'ALL' && s.preferenceType !== selectedPreferenceType) return false
      if (selectedInstrumental !== 'ALL' && !splitValues(s.instrumentalSubject).includes(selectedInstrumental)) return false
      if (selectedVocal !== 'ALL' && !splitValues(s.vocalSubject).includes(selectedVocal)) return false
      if (selectedDance !== 'ALL' && !splitValues(s.danceSubject).includes(selectedDance)) return false
      return true
    })
  }, [
    musicStudents,
    selectedMusicBranch,
    selectedMusicYear,
    selectedPreferenceType,
    selectedInstrumental,
    selectedVocal,
    selectedDance,
  ])

  const filteredMusicBranchRows = useMemo(() => {
    const byBranch = new Map<string, BranchMusicPreferenceRow>()
    for (const s of filteredMusicStudents) {
      if (!byBranch.has(s.branch)) {
        byBranch.set(s.branch, {
          branch: s.branch,
          totalStudents: 0,
          instrumental: 0,
          vocal: 0,
          dance: 0,
          other: 0,
          nullPreference: 0,
          instrumentalDetails: {},
          vocalDetails: {},
          danceDetails: {},
        })
      }
      const b = byBranch.get(s.branch)!
      b.totalStudents += 1
      if (s.preferenceType === 'Instrumental') {
        b.instrumental += 1
        splitValues(s.instrumentalSubject).forEach((v) => (b.instrumentalDetails![v] = (b.instrumentalDetails![v] || 0) + 1))
      } else if (s.preferenceType === 'Vocal') {
        b.vocal += 1
        splitValues(s.vocalSubject).forEach((v) => (b.vocalDetails![v] = (b.vocalDetails![v] || 0) + 1))
      } else if (s.preferenceType === 'Dance') {
        b.dance += 1
        splitValues(s.danceSubject).forEach((v) => (b.danceDetails![v] = (b.danceDetails![v] || 0) + 1))
      } else if (s.preferenceType === 'Null') {
        b.nullPreference += 1
      } else {
        b.other += 1
      }
    }
    return Array.from(byBranch.values()).sort((a, b) => a.branch.localeCompare(b.branch))
  }, [filteredMusicStudents])

  const filteredMusicTotals = useMemo(
    () =>
      filteredMusicBranchRows.reduce(
        (acc, b) => ({
          totalStudents: acc.totalStudents + b.totalStudents,
          instrumental: acc.instrumental + b.instrumental,
          vocal: acc.vocal + b.vocal,
          dance: acc.dance + b.dance,
          other: acc.other + b.other,
          nullPreference: acc.nullPreference + b.nullPreference,
          instrumentalDetails: Object.entries(b.instrumentalDetails || {}).reduce((a, [k, v]) => {
            a[k] = (a[k] || 0) + Number(v || 0)
            return a
          }, acc.instrumentalDetails || {}),
          vocalDetails: Object.entries(b.vocalDetails || {}).reduce((a, [k, v]) => {
            a[k] = (a[k] || 0) + Number(v || 0)
            return a
          }, acc.vocalDetails || {}),
          danceDetails: Object.entries(b.danceDetails || {}).reduce((a, [k, v]) => {
            a[k] = (a[k] || 0) + Number(v || 0)
            return a
          }, acc.danceDetails || {}),
        }),
        {
          totalStudents: 0,
          instrumental: 0,
          vocal: 0,
          dance: 0,
          other: 0,
          nullPreference: 0,
          instrumentalDetails: {} as Record<string, number>,
          vocalDetails: {} as Record<string, number>,
          danceDetails: {} as Record<string, number>,
        }
      ),
    [filteredMusicBranchRows]
  )

  const applySettingsFromResponse = (data: ExaminationData) => {
    if (typeof data.formEnabled === 'boolean') {
      setFormEnabled(data.formEnabled)
    }
    if (typeof data.marksEntryEnabled === 'boolean') {
      setMarksEntryEnabled(data.marksEntryEnabled)
    }
    if (typeof data.resultEnabled === 'boolean') {
      setResultEnabled(data.resultEnabled)
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/examination', { cache: 'no-store' })
      const data: ExaminationData = await res.json()
      if (data.success) {
        applySettingsFromResponse(data)
        setItems(data.items || [])
      } else {
        setError(data.error || 'Failed to load')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFormEnabled = async (enabled: boolean) => {
    if (toggling) return
    setToggling(true)
    setMessage(null)
    setError(null)
    try {
      const res = await fetch('/api/admin/examination', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formEnabled: enabled }),
      })
      const data = await res.json()
      if (data.success) {
        applySettingsFromResponse(data)
        setMessage(enabled ? 'Exam registration form is now ON.' : 'Exam registration form is now OFF.')
      } else {
        setError(data.error || 'Failed to update')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to update')
    } finally {
      setToggling(false)
    }
  }

  const handleToggleMarksEntry = async (enabled: boolean) => {
    if (togglingMarks) return
    setTogglingMarks(true)
    setMessage(null)
    setError(null)
    try {
      const res = await fetch('/api/admin/examination', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marksEntryEnabled: enabled }),
      })
      const data = await res.json()
      if (data.success) {
        applySettingsFromResponse(data)
        setMessage(
          enabled
            ? 'Marks Entry is now shown on the public Examination page.'
            : 'Marks Entry is now hidden from the Examination page.'
        )
      } else {
        setError(data.error || 'Failed to update')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to update')
    } finally {
      setTogglingMarks(false)
    }
  }

  const handleToggleResult = async (enabled: boolean) => {
    if (togglingResult) return
    setTogglingResult(true)
    setMessage(null)
    setError(null)
    try {
      const res = await fetch('/api/admin/examination', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultEnabled: enabled }),
      })
      const data = await res.json()
      if (data.success) {
        applySettingsFromResponse(data)
        setMessage(
          enabled
            ? 'Result is now shown in Student Dashboard.'
            : 'Result is now hidden from Student Dashboard.'
        )
      } else {
        setError(data.error || 'Failed to update')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to update')
    } finally {
      setTogglingResult(false)
    }
  }

  const openAddModal = () => {
    setEditingId(null)
    setForm({ title: '', content: '', examDate: '' })
    setModalOpen(true)
  }

  const openEditModal = (item: ExamInfoItem) => {
    setEditingId(item.id)
    setForm({
      title: item.title || '',
      content: item.content || '',
      examDate: item.examDate ? String(item.examDate).split('T')[0] : '',
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
    setForm({ title: '', content: '', examDate: '' })
  }

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const url = editingId
        ? `/api/admin/examination/info/${editingId}`
        : '/api/admin/examination/info'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          content: form.content,
          examDate: form.examDate || null,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setMessage(editingId ? 'Exam info updated.' : 'Exam info added.')
        closeModal()
        await fetchData()
      } else {
        setError(data.error || 'Failed to save')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this exam info?')) return
    setDeletingId(id)
    setError(null)
    setMessage(null)
    try {
      const res = await fetch(`/api/admin/examination/info/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setMessage('Exam info deleted.')
        await fetchData()
      } else {
        setError(data.error || 'Failed to delete')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.setData('application/json', JSON.stringify({ index }))
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    setDragOverIndex(null)
    const dragIndex = draggedIndex
    setDraggedIndex(null)
    if (dragIndex == null || dragIndex === dropIndex) return
    const newItems = [...items]
    const [removed] = newItems.splice(dragIndex, 1)
    newItems.splice(dropIndex, 0, removed)
    setItems(newItems)
    setReordering(true)
    setMessage(null)
    setError(null)
    try {
      const order = newItems.map((it) => it.id)
      const res = await fetch('/api/admin/examination/info/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order }),
      })
      const data = await res.json()
      if (data.success) {
        setItems(data.items || newItems)
        setMessage('Order updated. Top item will appear first on the public page.')
      } else {
        setError(data.error || 'Failed to reorder')
        setItems(items)
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to reorder')
      setItems(items)
    } finally {
      setReordering(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Examination</h1>
        <p>
          Use the menu on the left: <strong>Student form</strong> for branch-wise students and exam-form counts;{' '}
          <strong>Exam notice</strong> for public notice content only.
        </p>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.success}>{message}</p>}

      <div className={styles.examAdminLayout}>
        <aside className={styles.examAdminSideNav} aria-label="Exam admin sections">
          <div className={styles.examAdminSideHeader}>
            <div className={styles.examAdminSideBrand}>
              <h2>Exam_Admin</h2>
              <p>Examination</p>
            </div>
          </div>
          <ul className={styles.examAdminNavList}>
            <li>
              <button
                type="button"
                className={`${styles.examAdminNavBtn} ${activePanel === 'studentForm' ? styles.examAdminNavBtnActive : ''}`}
                onClick={() => setActivePanel('studentForm')}
              >
                <span className={styles.examAdminNavIcon} aria-hidden />
                <span>Student form</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.examAdminNavBtn} ${activePanel === 'notice' ? styles.examAdminNavBtnActive : ''}`}
                onClick={() => setActivePanel('notice')}
              >
                <span className={styles.examAdminNavIcon} aria-hidden />
                <span>Exam notice</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.examAdminNavBtn} ${activePanel === 'marks' ? styles.examAdminNavBtnActive : ''}`}
                onClick={() => setActivePanel('marks')}
              >
                <span className={styles.examAdminNavIcon} aria-hidden />
                <span>Marks entry</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.examAdminNavBtn} ${activePanel === 'registration' ? styles.examAdminNavBtnActive : ''}`}
                onClick={() => setActivePanel('registration')}
              >
                <span className={styles.examAdminNavIcon} aria-hidden />
                <span>Exam Registration</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.examAdminNavBtn} ${activePanel === 'musicPreference' ? styles.examAdminNavBtnActive : ''}`}
                onClick={() => setActivePanel('musicPreference')}
              >
                <span className={styles.examAdminNavIcon} aria-hidden />
                <span>Music Preference Stats</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.examAdminNavBtn} ${activePanel === 'examFormClear' ? styles.examAdminNavBtnActive : ''}`}
                onClick={() => setActivePanel('examFormClear')}
              >
                <span className={styles.examAdminNavIcon} aria-hidden />
                <span>Exam form reset</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.examAdminNavBtn} ${activePanel === 'resultEdit' ? styles.examAdminNavBtnActive : ''}`}
                onClick={() => setActivePanel('resultEdit')}
              >
                <span className={styles.examAdminNavIcon} aria-hidden />
                <span>Result Edit (Print)</span>
              </button>
            </li>
          </ul>
        </aside>

        <div className={styles.examAdminMain}>
          {activePanel === 'studentForm' && (
            <section className={styles.section}>
              <div className={styles.statsSectionHead}>
                <h2 className={styles.sectionTitle}>Student form — details by branch</h2>
                <button
                  type="button"
                  className={styles.statsRefreshBtn}
                  onClick={() => fetchStudentStats()}
                  disabled={statsLoading}
                >
                  {statsLoading ? 'Refreshing…' : 'Refresh counts'}
                </button>
              </div>
              <p className={styles.sectionDesc}>
                Admitted students grouped by branch. <strong>Exam form filled</strong> is how many submitted the online exam
                registration (linked by admission id). <strong>Remaining</strong> have not submitted yet.
              </p>
              {statsLoading && !statsTotals && <p className={styles.loading}>Loading statistics…</p>}
              {statsError && <p className={styles.error}>{statsError}</p>}
              {!statsLoading && statsTotals && (
                <>
                  <div className={styles.statsSummary}>
                    <div className={styles.statsSummaryCard}>
                      <div className={styles.statsSummaryValue}>{statsTotals.totalStudents}</div>
                      <div className={styles.statsSummaryLabel}>Total students (all branches)</div>
                    </div>
                    <div className={styles.statsSummaryCard}>
                      <div className={styles.statsSummaryValue}>{statsTotals.examFormSubmitted}</div>
                      <div className={styles.statsSummaryLabel}>Exam form filled</div>
                    </div>
                    <div className={styles.statsSummaryCard}>
                      <div className={styles.statsSummaryValue}>{statsTotals.examFormRemaining}</div>
                      <div className={styles.statsSummaryLabel}>Remaining (not submitted)</div>
                    </div>
                    <div className={styles.statsSummaryCard}>
                      <div className={styles.statsSummaryValue}>{pct(statsTotals.examFormSubmitted, statsTotals.totalStudents)}%</div>
                      <div className={styles.statsSummaryLabel}>Submitted (overall)</div>
                    </div>
                  </div>
                  <div className={styles.statsTableWrap}>
                    <table className={styles.statsTable}>
                      <thead>
                        <tr>
                          <th>Branch</th>
                          <th>Total students</th>
                          <th>Exam form filled</th>
                          <th>Remaining</th>
                          <th>% filled</th>
                        </tr>
                      </thead>
                      <tbody>
                        {branchStats.map((row) => (
                          <tr key={row.branch}>
                            <td>{row.branch}</td>
                            <td>{row.totalStudents}</td>
                            <td>{row.examFormSubmitted}</td>
                            <td>{row.examFormRemaining}</td>
                            <td>{pct(row.examFormSubmitted, row.totalStudents)}%</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className={styles.statsTableFoot}>
                          <td>All branches</td>
                          <td>{statsTotals.totalStudents}</td>
                          <td>{statsTotals.examFormSubmitted}</td>
                          <td>{statsTotals.examFormRemaining}</td>
                          <td>{pct(statsTotals.examFormSubmitted, statsTotals.totalStudents)}%</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </>
              )}
            </section>
          )}

          {activePanel === 'notice' &&
            (loading ? (
              <p className={styles.loading}>Loading examination notice settings…</p>
            ) : (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Exam notice</h2>
                <p className={styles.sectionDesc}>
                  Notice-only content for the public page at <strong>/examination</strong>. Add, edit, or remove items; drag to
                  reorder — the first item appears first.
                </p>
                <button type="button" className={styles.addBtn} onClick={openAddModal}>
                  + Add Exam Info
                </button>

                {items.length === 0 ? (
                  <p className={styles.noItems}>No exam info added yet. Click &quot;Add Exam Info&quot; to add one.</p>
                ) : (
                  <>
                    {reordering && <p className={styles.reorderHint}>Saving order…</p>}
                    <ul className={styles.itemList}>
                      {items.map((item, index) => (
                        <li
                          key={item.id}
                          className={`${styles.itemCard} ${draggedIndex === index ? styles.itemCardDragging : ''} ${dragOverIndex === index ? styles.itemCardDragOver : ''}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragLeave={handleDragLeave}
                          onDragEnd={handleDragEnd}
                          onDrop={(e) => handleDrop(e, index)}
                        >
                          <div className={styles.itemDragHandle} title="Drag to reorder">
                            <span className={styles.dragIcon}>⋮⋮</span>
                            <span className={styles.itemOrder}>{index + 1}</span>
                          </div>
                          <div className={styles.itemContent}>
                            <h3 className={styles.itemTitle}>{item.title || 'Untitled'}</h3>
                            {item.examDate && (
                              <p className={styles.itemDate}>Exam date: {new Date(item.examDate).toLocaleDateString('en-IN')}</p>
                            )}
                            {item.content && (
                              <p className={styles.itemPreview}>
                                {item.content.slice(0, 120)}
                                {item.content.length > 120 ? '…' : ''}
                              </p>
                            )}
                          </div>
                          <div className={styles.itemActions}>
                            <button type="button" className={styles.editBtn} onClick={() => openEditModal(item)}>
                              Update
                            </button>
                            <button
                              type="button"
                              className={styles.deleteBtn}
                              onClick={() => handleDelete(item.id)}
                              disabled={deletingId === item.id}
                            >
                              {deletingId === item.id ? 'Deleting…' : 'Delete'}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
            ))}

          {activePanel === 'marks' &&
            (loading ? (
              <p className={styles.loading}>Loading…</p>
            ) : (
              <>
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Marks entry</h2>
                  <p className={styles.sectionDesc}>
                    When ON, visitors see &quot;Marks Entry&quot; in the main header while on Examination pages (with &quot;Home&quot; to
                    the main site and &quot;Notice&quot; to /examination). When OFF, Marks Entry is hidden and its URL redirects to the
                    Notice page.
                  </p>
                  <div className={styles.toggleSection}>
                    <span className={styles.toggleLabel}>Show Marks Entry in Examination navbar</span>
                    <div className={styles.toggleGroup}>
                      <button
                        type="button"
                        className={`${styles.toggleBtn} ${!marksEntryEnabled ? styles.toggleBtnActive : ''}`}
                        onClick={() => handleToggleMarksEntry(false)}
                        disabled={togglingMarks}
                      >
                        Off
                      </button>
                      <button
                        type="button"
                        className={`${styles.toggleBtn} ${marksEntryEnabled ? styles.toggleBtnActive : ''}`}
                        onClick={() => handleToggleMarksEntry(true)}
                        disabled={togglingMarks}
                      >
                        On
                      </button>
                    </div>
                  </div>
                  <div className={styles.toggleSection} style={{ marginTop: 14 }}>
                    <span className={styles.toggleLabel}>Enable Result in Student Dashboard</span>
                    <div className={styles.toggleGroup}>
                      <button
                        type="button"
                        className={`${styles.toggleBtn} ${!resultEnabled ? styles.toggleBtnActive : ''}`}
                        onClick={() => handleToggleResult(false)}
                        disabled={togglingResult}
                      >
                        Off
                      </button>
                      <button
                        type="button"
                        className={`${styles.toggleBtn} ${resultEnabled ? styles.toggleBtnActive : ''}`}
                        onClick={() => handleToggleResult(true)}
                        disabled={togglingResult}
                      >
                        On
                      </button>
                    </div>
                  </div>
                </section>

                <section className={styles.section}>
                  <div className={styles.statsSectionHead}>
                    <h2 className={styles.sectionTitle}>Branch-wise marks upload status</h2>
                    <button
                      type="button"
                      className={styles.statsRefreshBtn}
                      onClick={() => fetchMarksStatus()}
                      disabled={marksStatusLoading}
                    >
                      {marksStatusLoading ? 'Refreshing…' : 'Refresh status'}
                    </button>
                  </div>
                  <p className={styles.sectionDesc}>
                    Shows which branch has already uploaded <strong>ISE I</strong>, <strong>ISE II</strong>, and <strong>ESE</strong>{' '}
                    (submitted sheets) and what is remaining.
                  </p>
                  {marksStatusLoading && !marksStatusTotals && <p className={styles.loading}>Loading marks upload status…</p>}
                  {marksStatusError && <p className={styles.error}>{marksStatusError}</p>}
                  {!marksStatusLoading && marksStatusTotals && (
                    <>
                      <div className={styles.statsSummary}>
                        <div className={styles.statsSummaryCard}>
                          <div className={styles.statsSummaryValue}>{marksStatusTotals.totalBranches}</div>
                          <div className={styles.statsSummaryLabel}>Total branches</div>
                        </div>
                        <div className={styles.statsSummaryCard}>
                          <div className={styles.statsSummaryValue}>{marksStatusTotals.completedBranches}</div>
                          <div className={styles.statsSummaryLabel}>All uploaded (ISE I + ISE II + ESE)</div>
                        </div>
                        <div className={styles.statsSummaryCard}>
                          <div className={styles.statsSummaryValue}>{marksStatusTotals.pendingBranches}</div>
                          <div className={styles.statsSummaryLabel}>Pending branches</div>
                        </div>
                      </div>
                      <div className={styles.statsTableWrap}>
                        <table className={styles.statsTable}>
                          <thead>
                            <tr>
                              <th>Branch</th>
                              <th>Total students</th>
                              <th>Marks uploaded (students)</th>
                              <th>Uploaded %</th>
                              <th>ISE I</th>
                              <th>ISE II</th>
                              <th>ESE</th>
                              <th>Remaining</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {marksStatusRows.map((row) => (
                              <tr key={row.branch}>
                                <td>{row.branch}</td>
                                <td>{row.totalStudents}</td>
                                <td>{row.uploadedStudents}</td>
                                <td>{row.uploadedPercentage}%</td>
                                <td>{row.submitted.ISE_I ? 'Uploaded' : 'Pending'}</td>
                                <td>{row.submitted.ISE_II ? 'Uploaded' : 'Pending'}</td>
                                <td>{row.submitted.ESE ? 'Uploaded' : 'Pending'}</td>
                                <td>{row.remaining.length ? row.remaining.join(', ') : '—'}</td>
                                <td>{row.completed ? 'Completed' : 'In Progress'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </section>
              </>
            ))}

          {activePanel === 'registration' &&
            (loading ? (
              <p className={styles.loading}>Loading…</p>
            ) : (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Exam Registration</h2>
                <p className={styles.sectionDesc}>
                  When ON, students see the &quot;Exam Form&quot; option in the student portal and can submit exam registration. When
                  OFF, the option is hidden.
                </p>
                <div className={styles.toggleSection}>
                  <span className={styles.toggleLabel}>Enable Exam Registration</span>
                  <div className={styles.toggleGroup}>
                    <button
                      type="button"
                      className={`${styles.toggleBtn} ${!formEnabled ? styles.toggleBtnActive : ''}`}
                      onClick={() => handleToggleFormEnabled(false)}
                      disabled={toggling}
                    >
                      Off
                    </button>
                    <button
                      type="button"
                      className={`${styles.toggleBtn} ${formEnabled ? styles.toggleBtnActive : ''}`}
                      onClick={() => handleToggleFormEnabled(true)}
                      disabled={toggling}
                    >
                      On
                    </button>
                  </div>
                </div>
              </section>
            ))}

          {activePanel === 'resultEdit' && (
            <section className={styles.section}>
              <EditableStudentResult />
            </section>
          )}

          {activePanel === 'musicPreference' && (
            <section className={styles.section}>
              <div className={styles.statsSectionHead}>
                <h2 className={styles.sectionTitle}>Branch-wise music preference statistics</h2>
                <button
                  type="button"
                  className={styles.statsRefreshBtn}
                  onClick={() => fetchMusicPreferenceStats()}
                  disabled={musicStatsLoading}
                >
                  {musicStatsLoading ? 'Refreshing…' : 'Refresh stats'}
                </button>
              </div>
              <p className={styles.sectionDesc}>
                Shows student distribution by music preference for each branch, including <strong>Other</strong> and{' '}
                <strong>Null / Not selected</strong>.
              </p>

              <div className={styles.toggleSection} style={{ marginBottom: 14, rowGap: 10 }}>
                <label className={styles.toggleLabel} htmlFor="music-branch-filter">
                  Select branch
                </label>
                <select
                  id="music-branch-filter"
                  value={selectedMusicBranch}
                  onChange={(e) => setSelectedMusicBranch(e.target.value)}
                  style={{ minWidth: 240, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', background: '#fff' }}
                >
                  <option value="ALL">All branches</option>
                  {musicStatsRows.map((r) => (
                    <option key={r.branch} value={r.branch}>
                      {r.branch}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMusicYear}
                  onChange={(e) => setSelectedMusicYear(e.target.value)}
                  style={{ minWidth: 180, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', background: '#fff' }}
                >
                  <option value="ALL">All years</option>
                  {uniqueMusicYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedPreferenceType}
                  onChange={(e) => setSelectedPreferenceType(e.target.value)}
                  style={{ minWidth: 180, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', background: '#fff' }}
                >
                  <option value="ALL">All preference types</option>
                  {uniquePreferenceTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedInstrumental}
                  onChange={(e) => setSelectedInstrumental(e.target.value)}
                  style={{ minWidth: 180, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', background: '#fff' }}
                >
                  <option value="ALL">All instrumental</option>
                  {uniqueInstrumentals.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedVocal}
                  onChange={(e) => setSelectedVocal(e.target.value)}
                  style={{ minWidth: 180, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', background: '#fff' }}
                >
                  <option value="ALL">All vocal</option>
                  {uniqueVocals.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedDance}
                  onChange={(e) => setSelectedDance(e.target.value)}
                  style={{ minWidth: 180, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', background: '#fff' }}
                >
                  <option value="ALL">All dance</option>
                  {uniqueDances.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              {musicStatsLoading && !musicStatsTotals && <p className={styles.loading}>Loading preference statistics…</p>}
              {musicStatsError && <p className={styles.error}>{musicStatsError}</p>}
              {!musicStatsLoading && musicStatsTotals && (
                <>
                  <div className={styles.statsSummary}>
                    <div className={styles.statsSummaryCard}>
                      <div className={styles.statsSummaryValue}>
                        {selectedMusicBranch === 'ALL'
                          ? filteredMusicTotals.totalStudents
                          : (filteredMusicBranchRows.find((r) => r.branch === selectedMusicBranch)?.totalStudents ?? 0)}
                      </div>
                      <div className={styles.statsSummaryLabel}>Total students</div>
                    </div>
                    <div className={styles.statsSummaryCard}>
                      <div className={styles.statsSummaryValue}>
                        {selectedMusicBranch === 'ALL'
                          ? filteredMusicTotals.other
                          : (filteredMusicBranchRows.find((r) => r.branch === selectedMusicBranch)?.other ?? 0)}
                      </div>
                      <div className={styles.statsSummaryLabel}>Other / Multiple</div>
                    </div>
                    <div className={styles.statsSummaryCard}>
                      <div className={styles.statsSummaryValue}>
                        {selectedMusicBranch === 'ALL'
                          ? filteredMusicTotals.nullPreference
                          : (filteredMusicBranchRows.find((r) => r.branch === selectedMusicBranch)?.nullPreference ?? 0)}
                      </div>
                      <div className={styles.statsSummaryLabel}>Null / Not selected</div>
                    </div>
                  </div>

                  <div className={styles.statsTableWrap}>
                    <table className={styles.statsTable}>
                      <thead>
                        <tr>
                          <th>Branch</th>
                          <th>Total students</th>
                          <th>Instrumental</th>
                          <th>Vocal</th>
                          <th>Dance</th>
                          <th>Other / Multiple</th>
                          <th>Null / Not selected</th>
                          <th>Instrumental details</th>
                          <th>Vocal details</th>
                          <th>Dance details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selectedMusicBranch === 'ALL'
                          ? filteredMusicBranchRows
                          : filteredMusicBranchRows.filter((r) => r.branch === selectedMusicBranch)
                        ).map((row) => (
                          <tr key={row.branch}>
                            <td>{row.branch}</td>
                            <td>{row.totalStudents}</td>
                            <td>{row.instrumental}</td>
                            <td>{row.vocal}</td>
                            <td>{row.dance}</td>
                            <td>{row.other}</td>
                            <td>{row.nullPreference}</td>
                            <td>{detailLabel(row.instrumentalDetails)}</td>
                            <td>{detailLabel(row.vocalDetails)}</td>
                            <td>{detailLabel(row.danceDetails)}</td>
                          </tr>
                        ))}
                      </tbody>
                      {selectedMusicBranch === 'ALL' && musicStatsTotals && (
                        <tfoot>
                          <tr className={styles.statsTableFoot}>
                            <td>All branches</td>
                            <td>{filteredMusicTotals.totalStudents}</td>
                            <td>{filteredMusicTotals.instrumental}</td>
                            <td>{filteredMusicTotals.vocal}</td>
                            <td>{filteredMusicTotals.dance}</td>
                            <td>{filteredMusicTotals.other}</td>
                            <td>{filteredMusicTotals.nullPreference}</td>
                            <td>{detailLabel(filteredMusicTotals.instrumentalDetails)}</td>
                            <td>{detailLabel(filteredMusicTotals.vocalDetails)}</td>
                            <td>{detailLabel(filteredMusicTotals.danceDetails)}</td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>

                  <div className={styles.statsSectionHead} style={{ marginTop: 20 }}>
                    <h3 className={styles.sectionTitle}>Student credentials (detailed)</h3>
                  </div>
                  <div className={styles.statsTableWrap}>
                    <table className={styles.statsTable}>
                      <thead>
                        <tr>
                          <th>Admission ID</th>
                          <th>Full name</th>
                          <th>Branch</th>
                          <th>Exam form no</th>
                          <th>Seat no</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Diploma year</th>
                          <th>Preference type</th>
                          <th>Instrumental</th>
                          <th>Vocal</th>
                          <th>Dance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMusicStudents.map((s) => (
                          <tr key={`${s.admissionId ?? 'na'}-${s.fullName}-${s.branch}`}>
                            <td>{s.admissionId ?? '—'}</td>
                            <td>{s.fullName || '—'}</td>
                            <td>{s.branch || '—'}</td>
                            <td>{s.examFormNo || '—'}</td>
                            <td>{s.seatNo || '—'}</td>
                            <td>{s.phone || '—'}</td>
                            <td>{s.email || '—'}</td>
                            <td>{s.diplomaYear || '—'}</td>
                            <td>{s.preferenceType || '—'}</td>
                            <td>{s.instrumentalSubject || '—'}</td>
                            <td>{s.vocalSubject || '—'}</td>
                            <td>{s.danceSubject || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </section>
          )}

          {activePanel === 'examFormClear' && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Exam form — clear and allow resubmit</h2>
              <p className={styles.sectionDesc}>
                After a registration is removed, that student can submit the exam form again. New{' '}
                <strong>exam form numbers</strong> and <strong>seat numbers</strong> are assigned on the next successful
                submission. Clearing all registrations also deletes marks-entry rows for those students on submitted sheets.
              </p>
              {clearFormError && <p className={styles.error}>{clearFormError}</p>}
              {clearFormMessage && <p className={styles.success}>{clearFormMessage}</p>}

              <div className={styles.statsSectionHead} style={{ marginTop: 16 }}>
                <h3 className={styles.sectionTitle}>Clear all exam registrations</h3>
              </div>
              <p className={styles.sectionDesc}>
                Type <strong>{EXAM_FORM_CLEAR_PHRASE}</strong> in the field below, then click the button. This removes every
                submitted exam registration.
              </p>
              <div className={styles.field} style={{ maxWidth: 420 }}>
                <label htmlFor="clear-all-confirm">Confirmation text</label>
                <input
                  id="clear-all-confirm"
                  type="text"
                  autoComplete="off"
                  value={clearAllPhrase}
                  onChange={(e) => setClearAllPhrase(e.target.value)}
                  placeholder={EXAM_FORM_CLEAR_PHRASE}
                />
              </div>
              <button
                type="button"
                className={styles.deleteBtn}
                disabled={clearingAll || clearAllPhrase.trim() !== EXAM_FORM_CLEAR_PHRASE}
                onClick={handleClearAllExamForms}
              >
                {clearingAll ? 'Clearing…' : 'Clear all exam registrations'}
              </button>

              <div className={styles.statsSectionHead} style={{ marginTop: 28 }}>
                <h3 className={styles.sectionTitle}>Clear one student by seat number</h3>
              </div>
              <p className={styles.sectionDesc}>
                Enter the <strong>seat number</strong> from the student&apos;s exam form (for example SN-240001), then clear only
                that registration.
              </p>
              <div className={styles.field} style={{ maxWidth: 320 }}>
                <label htmlFor="clear-seat-no">Seat number</label>
                <input
                  id="clear-seat-no"
                  type="text"
                  autoComplete="off"
                  value={clearSeatInput}
                  onChange={(e) => setClearSeatInput(e.target.value)}
                  placeholder="e.g. SN-240001"
                />
              </div>
              <button
                type="button"
                className={styles.deleteBtn}
                disabled={clearingSeat || !clearSeatInput.trim()}
                onClick={handleClearExamFormBySeat}
              >
                {clearingSeat ? 'Clearing…' : "Clear this student's exam form"}
              </button>
            </section>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{editingId ? 'Update Exam Info' : 'Add Exam Info'}</h3>
            <form onSubmit={handleSaveInfo}>
              <div className={styles.field}>
                <label htmlFor="ec-modal-title">Title</label>
                <input
                  id="ec-modal-title"
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Theory Exam Schedule"
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="ec-modal-examDate">Exam Date</label>
                <input
                  id="ec-modal-examDate"
                  type="date"
                  value={form.examDate}
                  onChange={(e) => setForm((p) => ({ ...p, examDate: e.target.value }))}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="ec-modal-content">Content (when exam will happen, instructions, etc.)</label>
                <textarea
                  id="ec-modal-content"
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                  placeholder="Enter examination details..."
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn} disabled={saving}>
                  {saving ? 'Saving…' : editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
