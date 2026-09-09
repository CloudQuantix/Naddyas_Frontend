'use client'

import React, { useState, useEffect } from 'react'

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

function escapeHtml(input: string | number | null | undefined) {
    if (input == null) return ''
    return String(input)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function gradeFromPercentage(pctNum: number | null): string {
    if (pctNum == null || Number.isNaN(pctNum)) return '—'
    if (pctNum >= 90) return 'A+ (Excellent / Outstanding)'
    if (pctNum >= 80) return 'A (Very Good)'
    if (pctNum >= 70) return 'B+ (Good)'
    if (pctNum >= 60) return 'B (Above Average)'
    if (pctNum >= 50) return 'C (Average / Pass)'
    if (pctNum >= 40) return 'D (Pass / Minimum)'
    return 'F (Fail)'
}

const GRADING_SCALE_LINES = [
    '90% – 100% → A+ (Excellent / Outstanding)',
    '80% – 89% → A (Very Good)',
    '70% – 79% → B+ (Good)',
    '60% – 69% → B (Above Average)',
    '50% – 59% → C (Average / Pass)',
    '40% – 49% → D (Pass / Minimum)',
    'Below 40% → F (Fail)',
]

export default function EditableStudentResult() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchId, setSearchId] = useState('')
    const [fetched, setFetched] = useState(false)

    // Local Editable States (Header & Custom)
    const [instName, setInstName] = useState('Swargumphan Music Institute')
    const [instTagline, setInstTagline] = useState('Begin your musical journey with us')
    const [sheetTitle, setSheetTitle] = useState('STUDENT RESULT SHEET')
    const [sessionStr, setSessionStr] = useState('Academic Session: April/May 2025-26')
    const [examNotes, setExamNotes] = useState(
        `The student's academic performance is evaluated through Internal and End Semester examinations as follows:

ISE I (Internal Semester Examination I) – Conducted in Semester I
ISE II (Internal Semester Examination II) – Conducted in Semester II
ESE (End Semester Examination) – Conducted once at the end of the academic year`
    )

    // Local Editable States (Student)
    const [studentName, setStudentName] = useState('')
    const [admissionId, setAdmissionId] = useState('')
    const [diplomaYear, setDiplomaYear] = useState('')
    const [musicPref, setMusicPref] = useState('')
    const [formNo, setFormNo] = useState('')
    const [seatNo, setSeatNo] = useState('')
    const [branch, setBranch] = useState('')

    // Local Editable States (Marks)
    const [ise1, setIse1] = useState('')
    const [ise1Max, setIse1Max] = useState('25')
    const [ise2, setIse2] = useState('')
    const [ise2Max, setIse2Max] = useState('25')
    const [ese, setEse] = useState('')
    const [eseMax, setEseMax] = useState('50')
    const [totalObtained, setTotalObtained] = useState('')
    const [totalMax, setTotalMax] = useState('100')
    const [percentage, setPercentage] = useState('')
    const [grade, setGrade] = useState('')

    // Auto-calculate totals if marks change
    useEffect(() => {
        if (!fetched) return
        const v1 = parseFloat(ise1) || 0
        const v2 = parseFloat(ise2) || 0
        const v3 = parseFloat(ese) || 0
        const mx1 = parseFloat(ise1Max) || 0
        const mx2 = parseFloat(ise2Max) || 0
        const mxE = parseFloat(eseMax) || 0

        const totO = v1 + v2 + v3
        const totM = mx1 + mx2 + mxE

        setTotalObtained(String(totO))
        setTotalMax(String(totM))

        if (totM > 0) {
            const pct = Math.round((totO / totM) * 100 * 100) / 100
            setPercentage(String(pct))
            setGrade(gradeFromPercentage(pct))
        } else {
            setPercentage('0')
            setGrade(gradeFromPercentage(0))
        }
    }, [ise1, ise2, ese, ise1Max, ise2Max, eseMax, fetched])

    const handleFetch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchId) return
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/examination/result?studentId=${encodeURIComponent(searchId.trim())}`, {
                cache: 'no-store'
            })
            const data: ResultData = await res.json()
            if (res.ok && data.success && data.student) {
                setFetched(true)
                setStudentName(data.student.fullName || '')
                setAdmissionId(String(data.student.admissionId || searchId))
                setDiplomaYear(data.student.diplomaYear || '—')
                setMusicPref(data.student.musicPreference || '—')
                setFormNo(data.student.formNo || '—')
                setSeatNo(data.student.seatNo || '—')
                setBranch(data.student.branch || '—')

                setIse1(data.marks?.ISE_I != null ? String(data.marks.ISE_I) : '—')
                setIse2(data.marks?.ISE_II != null ? String(data.marks.ISE_II) : '—')
                setEse(data.marks?.ESE != null ? String(data.marks.ESE) : '—')

                setIse1Max(String(data.maxMarks?.ISE_I ?? 25))
                setIse2Max(String(data.maxMarks?.ISE_II ?? 25))
                setEseMax(String(data.maxMarks?.ESE ?? 50))

                setTotalObtained(data.total?.obtained != null ? String(data.total.obtained) : '—')
                setTotalMax(String(data.total?.max ?? 100))
                setPercentage(data.total?.percentage != null ? String(data.total.percentage) : '—')
                setGrade(gradeFromPercentage(data.total?.percentage ?? null))
            } else {
                setError(data.error || 'Result not found or not created yet.')
                setFetched(false)
            }
        } catch {
            setError('Failed to fetch result.')
            setFetched(false)
        } finally {
            setLoading(false)
        }
    }

    const handlePrint = () => {
        const w = window.open('', '_blank')
        if (!w) return
        const logoUrl = `${window.location.origin}/letterhead-logo.png`
        const gradeScaleHtml = GRADING_SCALE_LINES.map((line) => `<div>${escapeHtml(line)}</div>`).join('')
        const examNotesHtml = escapeHtml(examNotes).replace(/\n/g, '<br/>')

        w.document.write(`
<!DOCTYPE html>
<html>
<head>
  <title>Result - ${escapeHtml(studentName)}</title>
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
      <div class="inst">${escapeHtml(instName)}</div>
      <div class="tag">${escapeHtml(instTagline)}</div>
    </div>
  </div>
  <div class="title">${escapeHtml(sheetTitle)}</div>
  <p class="sub">${escapeHtml(sessionStr)}</p>
  <table class="meta">
    <tr>
      <td class="k">Name</td><td>${escapeHtml(studentName)}</td>
      <td class="k">Admission ID</td><td>${escapeHtml(admissionId)}</td>
    </tr>
    <tr>
      <td class="k">Diploma Year</td><td>${escapeHtml(diplomaYear)}</td>
      <td class="k">Music Preference</td><td>${escapeHtml(musicPref)}</td>
    </tr>
    <tr>
      <td class="k">Form No</td><td>${escapeHtml(formNo)}</td>
      <td class="k">Seat No</td><td>${escapeHtml(seatNo)}</td>
    </tr>
    <tr>
      <td class="k">Branch</td><td colspan="3">${escapeHtml(branch)}</td>
    </tr>
  </table>
  <table class="result">
    <thead>
      <tr><th>Exam</th><th>Obtained</th><th>Maximum</th></tr>
    </thead>
    <tbody>
      <tr><td>ISE I</td><td>${escapeHtml(ise1)}</td><td>${escapeHtml(ise1Max)}</td></tr>
      <tr><td>ISE II</td><td>${escapeHtml(ise2)}</td><td>${escapeHtml(ise2Max)}</td></tr>
      <tr><td>ESE</td><td>${escapeHtml(ese)}</td><td>${escapeHtml(eseMax)}</td></tr>
      <tr class="total">
        <td>Total (ISE I + ISE II + ESE)</td>
        <td>${escapeHtml(totalObtained)}</td>
        <td>${escapeHtml(totalMax)}</td>
      </tr>
      <tr class="total"><td>Percentage</td><td colspan="2">${escapeHtml(percentage)}${percentage !== '—' ? '%' : ''}</td></tr>
      <tr class="total"><td>Grade</td><td colspan="2">${escapeHtml(grade)}</td></tr>
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
        setTimeout(() => w.print(), 300)
    }

    const inputStyle = {
        width: '100%',
        padding: '6px',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        fontFamily: 'inherit',
        fontSize: '14px',
        marginBottom: '10px'
    }
    const labelStyle = { display: 'block', fontWeight: 600, marginBottom: '4px', fontSize: '13px', color: '#374151' }
    const groupStyle = { marginBottom: '12px' }
    const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }
    const grid3Style = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }

    return (
        <div>
            <div style={{ marginBottom: '20px', padding: '16px', background: '#f3f4f6', borderRadius: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Fetch Student Result</h2>
                <form onSubmit={handleFetch} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                        type="text"
                        value={searchId}
                        onChange={e => setSearchId(e.target.value)}
                        placeholder="Enter Admission ID..."
                        style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', width: '250px' }}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '8px 16px',
                            background: '#042b4d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {loading ? 'Fetching...' : 'Fetch Result'}
                    </button>
                </form>
                {error && <p style={{ color: '#dc2626', marginTop: '10px', fontWeight: 500 }}>{error}</p>}
            </div>

            {fetched && (
                <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '12px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Editable Result Layout</h2>
                        <button
                            type="button"
                            onClick={handlePrint}
                            style={{ padding: '10px 20px', background: '#8b0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Print / Save PDF
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Headers */}
                        <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '6px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>Header Settings</h3>
                            <div style={gridStyle}>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Institute Name</label>
                                    <input style={inputStyle} value={instName} onChange={e => setInstName(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Tagline</label>
                                    <input style={inputStyle} value={instTagline} onChange={e => setInstTagline(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Sheet Title</label>
                                    <input style={inputStyle} value={sheetTitle} onChange={e => setSheetTitle(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Academic Session</label>
                                    <input style={inputStyle} value={sessionStr} onChange={e => setSessionStr(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Student Details */}
                        <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '6px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>Student Information</h3>
                            <div style={gridStyle}>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Student Name</label>
                                    <input style={inputStyle} value={studentName} onChange={e => setStudentName(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Admission ID</label>
                                    <input style={inputStyle} value={admissionId} onChange={e => setAdmissionId(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Diploma Year</label>
                                    <input style={inputStyle} value={diplomaYear} onChange={e => setDiplomaYear(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Music Preference</label>
                                    <input style={inputStyle} value={musicPref} onChange={e => setMusicPref(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Form No</label>
                                    <input style={inputStyle} value={formNo} onChange={e => setFormNo(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Seat No</label>
                                    <input style={inputStyle} value={seatNo} onChange={e => setSeatNo(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Branch</label>
                                    <input style={inputStyle} value={branch} onChange={e => setBranch(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Marks Details */}
                        <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '6px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>Marks Configuration</h3>
                            <div style={grid3Style}>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>ISE I (Obtained)</label>
                                    <input type="number" style={inputStyle} value={ise1} onChange={e => setIse1(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>ISE I (Max)</label>
                                    <input type="number" style={inputStyle} value={ise1Max} onChange={e => setIse1Max(e.target.value)} />
                                </div>
                                <div></div>

                                <div style={groupStyle}>
                                    <label style={labelStyle}>ISE II (Obtained)</label>
                                    <input type="number" style={inputStyle} value={ise2} onChange={e => setIse2(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>ISE II (Max)</label>
                                    <input type="number" style={inputStyle} value={ise2Max} onChange={e => setIse2Max(e.target.value)} />
                                </div>
                                <div></div>

                                <div style={groupStyle}>
                                    <label style={labelStyle}>ESE (Obtained)</label>
                                    <input type="number" style={inputStyle} value={ese} onChange={e => setEse(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>ESE (Max)</label>
                                    <input type="number" style={inputStyle} value={eseMax} onChange={e => setEseMax(e.target.value)} />
                                </div>
                                <div></div>

                                <div style={groupStyle}>
                                    <label style={labelStyle}>Total Obtained</label>
                                    <input style={inputStyle} value={totalObtained} onChange={e => setTotalObtained(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Total Max</label>
                                    <input style={inputStyle} value={totalMax} onChange={e => setTotalMax(e.target.value)} />
                                </div>
                                <div></div>

                                <div style={groupStyle}>
                                    <label style={labelStyle}>Percentage</label>
                                    <input style={inputStyle} value={percentage} onChange={e => setPercentage(e.target.value)} />
                                </div>
                                <div style={groupStyle}>
                                    <label style={labelStyle}>Grade</label>
                                    <input style={inputStyle} value={grade} onChange={e => setGrade(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Footer Notes */}
                        <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '6px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>Footer & Notes</h3>
                            <div style={groupStyle}>
                                <label style={labelStyle}>Exam Notes</label>
                                <textarea
                                    style={{ ...inputStyle, minHeight: '120px' }}
                                    value={examNotes}
                                    onChange={e => setExamNotes(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
