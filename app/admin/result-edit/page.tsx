'use client'

import { useMemo, useState } from 'react'
import AdminLayout from '../dashboard/AdminLayout'
import styles from './page.module.css'

type ResultRow = {
    sr: number
    subject: string
    max: string
    obtained: string
    remark: string
}

function escapeHtml(raw: string) {
    return raw
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')
}

export default function ResultEditPage() {
    // Header is intentionally NOT editable.
    const headerTitle = 'RESULT'
    const headerOrg = 'NAAD DHYAS FOUNDATION'

    const [studentName, setStudentName] = useState('Rahat Shaikh')
    const [branch, setBranch] = useState('Karmaveer Nagar Society')
    const [formNo, setFormNo] = useState('K-VA-0028')
    const [doNo, setDoNo] = useState('K-VA-00022')
    const [examName, setExamName] = useState('Examination Result')
    const [examMonthYear, setExamMonthYear] = useState('Apr 2026')
    const [date, setDate] = useState('19/04/2026')
    const [notes, setNotes] = useState('')

    const [rows, setRows] = useState<ResultRow[]>([
        { sr: 1, subject: 'Practical', max: '100', obtained: '85', remark: 'Pass' },
        { sr: 2, subject: 'Theory', max: '100', obtained: '78', remark: 'Pass' },
    ])

    const totals = useMemo(() => {
        const maxTotal = rows.reduce((sum, r) => sum + (parseFloat(r.max) || 0), 0)
        const obtTotal = rows.reduce((sum, r) => sum + (parseFloat(r.obtained) || 0), 0)
        const percent = maxTotal > 0 ? ((obtTotal / maxTotal) * 100).toFixed(2) : '0.00'
        return { maxTotal, obtTotal, percent }
    }, [rows])

    const addRow = () => {
        setRows((prev) => [
            ...prev,
            {
                sr: prev.length + 1,
                subject: '',
                max: '',
                obtained: '',
                remark: '',
            },
        ])
    }

    const removeLastRow = () => {
        setRows((prev) => (prev.length <= 1 ? prev : prev.slice(0, -1).map((r, idx) => ({ ...r, sr: idx + 1 }))))
    }

    const updateRow = (idx: number, patch: Partial<ResultRow>) => {
        setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)))
    }

    const downloadPdf = () => {
        const w = window.open('', '_blank')
        if (!w) {
            alert('Please allow popups to download PDF')
            return
        }

        const safe = {
            studentName: escapeHtml(studentName),
            branch: escapeHtml(branch),
            formNo: escapeHtml(formNo),
            doNo: escapeHtml(doNo),
            examName: escapeHtml(examName),
            examMonthYear: escapeHtml(examMonthYear),
            date: escapeHtml(date),
            notes: escapeHtml(notes),
        }

        const rowsHtml = rows
            .map(
                (r) => `
                <tr>
                    <td style="text-align:center;">${r.sr}</td>
                    <td>${escapeHtml(r.subject)}</td>
                    <td style="text-align:center;">${escapeHtml(r.max)}</td>
                    <td style="text-align:center;">${escapeHtml(r.obtained)}</td>
                    <td>${escapeHtml(r.remark)}</td>
                </tr>
            `
            )
            .join('')

        w.document.open()
        w.document.write(`
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Result - ${safe.studentName}</title>
  <style>
    @page { size: A4; margin: 10mm; }
    body { margin: 0; font-family: Arial, sans-serif; color: #111827; }
    .sheet { width: 210mm; min-height: 297mm; margin: 0 auto; }
    .header { padding: 18px 22px 12px; border-bottom: 2px solid #111827; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; text-align: center; }
    .header p { margin: 6px 0 0; text-align: center; font-size: 12px; font-weight: 700; }
    .body { padding: 16px 22px 20px; font-size: 12px; }
    .metaGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 18px; margin-bottom: 12px; }
    .metaLine { display: flex; gap: 8px; align-items: baseline; }
    .metaLabel { min-width: 120px; font-weight: 800; }
    .metaValue { border-bottom: 1px solid #111827; flex: 1; padding-bottom: 1px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
    th, td { border: 1px solid #111827; padding: 8px 6px; }
    th { background: #f3f4f6; text-align: center; font-weight: 900; }
    .right { text-align: right; }
    .center { text-align: center; }
    .footer { display: flex; justify-content: space-between; gap: 16px; margin-top: 26px; }
    .signBox { width: 220px; text-align: center; }
    .signLine { margin-top: 64px; border-top: 1px solid #111827; padding-top: 6px; font-weight: 800; }
    .notes { margin-top: 12px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <h1>${headerTitle}</h1>
      <p>${headerOrg}</p>
    </div>
    <div class="body">
      <div class="metaGrid">
        <div class="metaLine"><div class="metaLabel">Student Name:</div><div class="metaValue">${safe.studentName}</div></div>
        <div class="metaLine"><div class="metaLabel">Date:</div><div class="metaValue">${safe.date}</div></div>
        <div class="metaLine"><div class="metaLabel">Branch:</div><div class="metaValue">${safe.branch}</div></div>
        <div class="metaLine"><div class="metaLabel">Exam:</div><div class="metaValue">${safe.examName}</div></div>
        <div class="metaLine"><div class="metaLabel">Form No:</div><div class="metaValue">${safe.formNo}</div></div>
        <div class="metaLine"><div class="metaLabel">Month/Year:</div><div class="metaValue">${safe.examMonthYear}</div></div>
        <div class="metaLine"><div class="metaLabel">DO No:</div><div class="metaValue">${safe.doNo}</div></div>
        <div></div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:54px;">Sr No</th>
            <th>Subject</th>
            <th style="width:90px;">Max</th>
            <th style="width:110px;">Obtained</th>
            <th style="width:140px;">Remark</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
          <tr>
            <td colspan="2" class="right" style="font-weight:900;">Total</td>
            <td class="center" style="font-weight:900;">${totals.maxTotal}</td>
            <td class="center" style="font-weight:900;">${totals.obtTotal}</td>
            <td class="center" style="font-weight:900;">${totals.percent}%</td>
          </tr>
        </tbody>
      </table>

      ${safe.notes ? `<div class="notes"><strong>Notes:</strong> ${safe.notes}</div>` : ''}

      <div class="footer">
        <div class="signBox">
          <div class="signLine">Student Signature</div>
        </div>
        <div class="signBox">
          <div class="signLine">Examiner / Authority</div>
        </div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() { setTimeout(() => window.print(), 250); }
  </script>
</body>
</html>
        `)
        w.document.close()
    }

    return (
        <AdminLayout title="Result Edit">
            <div className={styles.page}>
                <div className={styles.panel}>
                    <h2>Editable fields (header locked)</h2>

                    <div className={styles.field}>
                        <label>Student Name</label>
                        <input value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                    </div>

                    <div className={styles.field}>
                        <label>Date (DD/MM/YYYY)</label>
                        <input value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div className={styles.field}>
                        <label>Branch</label>
                        <input value={branch} onChange={(e) => setBranch(e.target.value)} />
                    </div>

                    <div className={styles.field}>
                        <label>Exam Name</label>
                        <input value={examName} onChange={(e) => setExamName(e.target.value)} />
                    </div>

                    <div className={styles.field}>
                        <label>Month / Year</label>
                        <input value={examMonthYear} onChange={(e) => setExamMonthYear(e.target.value)} />
                    </div>

                    <div className={styles.field}>
                        <label>Form No</label>
                        <input value={formNo} onChange={(e) => setFormNo(e.target.value)} />
                    </div>

                    <div className={styles.field}>
                        <label>DO No</label>
                        <input value={doNo} onChange={(e) => setDoNo(e.target.value)} />
                    </div>

                    <div className={styles.field}>
                        <label>Notes (optional)</label>
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.btnSecondary} onClick={addRow}>
                            + Add Subject Row
                        </button>
                        <button type="button" className={styles.btnDanger} onClick={removeLastRow}>
                            - Remove Last Row
                        </button>
                        <button type="button" className={styles.btnPrimary} onClick={downloadPdf}>
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className={styles.previewWrap}>
                    <div className={styles.sheet}>
                        <div className={styles.header}>
                            <h1 className={styles.headerTitle}>{headerTitle}</h1>
                            <p className={styles.headerSub}>{headerOrg}</p>
                        </div>

                        <div className={styles.body}>
                            <div className={styles.metaGrid}>
                                <div className={styles.metaLine}>
                                    <div className={styles.metaLabel}>Student Name:</div>
                                    <div className={styles.metaValue}>{studentName}</div>
                                </div>
                                <div className={styles.metaLine}>
                                    <div className={styles.metaLabel}>Date:</div>
                                    <div className={styles.metaValue}>{date}</div>
                                </div>

                                <div className={styles.metaLine}>
                                    <div className={styles.metaLabel}>Branch:</div>
                                    <div className={styles.metaValue}>{branch}</div>
                                </div>
                                <div className={styles.metaLine}>
                                    <div className={styles.metaLabel}>Exam:</div>
                                    <div className={styles.metaValue}>{examName}</div>
                                </div>

                                <div className={styles.metaLine}>
                                    <div className={styles.metaLabel}>Form No:</div>
                                    <div className={styles.metaValue}>{formNo}</div>
                                </div>
                                <div className={styles.metaLine}>
                                    <div className={styles.metaLabel}>Month/Year:</div>
                                    <div className={styles.metaValue}>{examMonthYear}</div>
                                </div>

                                <div className={styles.metaLine}>
                                    <div className={styles.metaLabel}>DO No:</div>
                                    <div className={styles.metaValue}>{doNo}</div>
                                </div>
                                <div />
                            </div>

                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={{ width: 54 }}>Sr No</th>
                                        <th>Subject</th>
                                        <th style={{ width: 90 }}>Max</th>
                                        <th style={{ width: 110 }}>Obtained</th>
                                        <th style={{ width: 140 }}>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((r, idx) => (
                                        <tr key={idx}>
                                            <td className={styles.center}>{r.sr}</td>
                                            <td>
                                                <input
                                                    value={r.subject}
                                                    onChange={(e) => updateRow(idx, { subject: e.target.value })}
                                                    style={{ width: '100%', border: 'none', outline: 'none' }}
                                                />
                                            </td>
                                            <td className={styles.center}>
                                                <input
                                                    value={r.max}
                                                    onChange={(e) => updateRow(idx, { max: e.target.value })}
                                                    style={{ width: '100%', border: 'none', outline: 'none', textAlign: 'center' }}
                                                />
                                            </td>
                                            <td className={styles.center}>
                                                <input
                                                    value={r.obtained}
                                                    onChange={(e) => updateRow(idx, { obtained: e.target.value })}
                                                    style={{ width: '100%', border: 'none', outline: 'none', textAlign: 'center' }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    value={r.remark}
                                                    onChange={(e) => updateRow(idx, { remark: e.target.value })}
                                                    style={{ width: '100%', border: 'none', outline: 'none' }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={2} className={styles.right} style={{ fontWeight: 900 }}>
                                            Total
                                        </td>
                                        <td className={styles.center} style={{ fontWeight: 900 }}>
                                            {totals.maxTotal}
                                        </td>
                                        <td className={styles.center} style={{ fontWeight: 900 }}>
                                            {totals.obtTotal}
                                        </td>
                                        <td className={styles.center} style={{ fontWeight: 900 }}>
                                            {totals.percent}%
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {notes ? (
                                <div style={{ marginTop: 12, fontSize: 12 }}>
                                    <strong>Notes:</strong> {notes}
                                </div>
                            ) : null}

                            <div className={styles.footer}>
                                <div className={styles.signBox}>
                                    <div className={styles.signLine}>Student Signature</div>
                                </div>
                                <div className={styles.signBox}>
                                    <div className={styles.signLine}>Examiner / Authority</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

