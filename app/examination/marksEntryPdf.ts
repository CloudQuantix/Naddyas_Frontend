/**
 * PDF layout aligned with Swargumphan.docx (Marks entry Report template).
 * Uses standard PDF fonts (approximates Word: Felix Titling / Algerian / Magneto / Aparajita / Palatino).
 */

import { jsPDF } from 'jspdf'

export interface MarksPdfStudentRow {
    admissionId: number
    fullName: string
    formNo: string
    seatNo?: string | null
    marks: number | null
}

export interface SwargumphanMarksPdfParams {
    sheetId: number
    branch: string
    /** Shown in PDF when set (e.g. short branch label); otherwise `branch` is used. */
    branchDisplay?: string
    sessionLabel: string
    diplomaYear: string
    /** ISE_I | ISE_II | ESE */
    examType: string
    examTypeDisplay: string
    maxMark: number
    marksHeader: string
    students: MarksPdfStudentRow[]
    /** Optional line under header (e.g. music preference) */
    musicPreferenceLine?: string
}

async function fetchLogoDataUrl(): Promise<string | null> {
    if (typeof window === 'undefined') return null
    try {
        const res = await fetch('/Logo.png')
        if (!res.ok) return null
        const blob = await res.blob()
        return await new Promise((resolve, reject) => {
            const fr = new FileReader()
            fr.onload = () => resolve(fr.result as string)
            fr.onerror = () => reject(new Error('read'))
            fr.readAsDataURL(blob)
        })
    } catch {
        return null
    }
}

function drawLogo(doc: jsPDF, dataUrl: string | null, x: number, y: number, maxW: number, maxH: number) {
    if (!dataUrl) return
    try {
        doc.addImage(dataUrl, 'PNG', x, y, maxW, maxH, undefined, 'FAST')
    } catch {
        /* ignore missing image */
    }
}

/** Portrait A4 — matches Word section size. */
export async function downloadSwargumphanMarksPdf(p: SwargumphanMarksPdfParams): Promise<void> {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()
    const margin = 14
    const logoUrl = await fetchLogoDataUrl()
    const logoW = 32
    const logoH = 26
    let y = 10

    // —— Header row (3 columns like Word): logo | branding | logo ——
    drawLogo(doc, logoUrl, margin, y, logoW, logoH)
    const centerX = pageW / 2
    doc.setFont('times', 'bold')
    doc.setFontSize(26)
    doc.text('Swargumphan', centerX, y + 11, { align: 'center' })
    doc.setFont('times', 'bold')
    doc.setFontSize(19)
    doc.text('Music Institute', centerX, y + 21, { align: 'center' })
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(15)
    doc.text('Learn Music. Anytime. Anywhere.', centerX, y + 30, { align: 'center' })
    drawLogo(doc, logoUrl, pageW - margin - logoW, y, logoW, logoH)

    /* Extra gap below “Learn Music…” before the maroon rule */
    y = 52
    doc.setDrawColor(120, 0, 0)
    doc.setLineWidth(0.3)
    doc.line(margin, y, pageW - margin, y)
    y += 10

    // Title
    doc.setFont('times', 'bold')
    doc.setFontSize(20)
    doc.setTextColor(80, 0, 0)
    doc.text('Marks entry Report', centerX, y, { align: 'center' })
    doc.setTextColor(0, 0, 0)
    y += 8
    doc.setFont('times', 'bold')
    doc.setFontSize(16)
    doc.text(`Session: ${p.sessionLabel}`, centerX, y, { align: 'center' })
    y += 14

    // Meta: one line — Diploma (left), Branch (center), Exam type (right); 13pt
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    const diplomaLine = `Diploma: ${p.diplomaYear}`
    const branchLine = `Branch: ${p.branchDisplay ?? p.branch ?? '—'}`
    const examLine = `Exam type: ${p.examTypeDisplay}`
    /* Side labels first; branch drawn last so it stays visible if strings overlap horizontally. */
    doc.text(diplomaLine, margin, y)
    doc.text(examLine, pageW - margin, y, { align: 'right' })
    doc.text(branchLine, centerX, y, { align: 'center' })
    y += 8

    if (p.musicPreferenceLine) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(12)
        doc.text(p.musicPreferenceLine, centerX, y, { align: 'center' })
        y += 7
    }

    const today = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text(`Date: ${today}`, centerX, y, { align: 'center' })
    y += 12

    y += 6

    // —— Table (Sr.No, Form No, Seat No, Student Name, Exam Type (Marks / max), Lock Status) ——
    const col = {
        sr: margin,
        form: margin + 12,
        seat: margin + 34,
        name: margin + 58,
        exam: margin + 115,
        lock: pageW - margin - 28,
    }
    const rowH = 7
    /** Space for bottom signature row on every page */
    const footerReserveMm = 52
    const tableBottom = pageH - footerReserveMm

    const examColHeader = `${p.examTypeDisplay} (Marks / ${p.maxMark})`

    function drawTableHeader(yy: number) {
        const headerH = 9
        doc.setFillColor(245, 245, 245)
        doc.rect(margin, yy - 4, pageW - 2 * margin, headerH, 'F')
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text('Sr.No', col.sr, yy + 3)
        doc.text('Form No', col.form, yy + 3)
        doc.text('Seat No', col.seat, yy + 3)
        doc.text('Student Name', col.name, yy + 3)
        const examLines = doc.splitTextToSize(examColHeader, col.lock - col.exam - 4)
        doc.text(examLines, col.exam, yy + 3)
        doc.text('Lock Status', col.lock, yy + 3)
        doc.setDrawColor(180, 180, 180)
        doc.line(margin, yy + headerH - 1, pageW - margin, yy + headerH - 1)
        return yy + headerH + 2
    }

    let ty = drawTableHeader(y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)

    p.students.forEach((s, i) => {
        if (ty > tableBottom) {
            doc.addPage()
            ty = 16
            ty = drawTableHeader(ty)
            doc.setFont('helvetica', 'normal')
            doc.setFontSize(9.5)
        }
        const seatDisplay = s.seatNo || '—'
        const markStr = s.marks != null ? String(s.marks) : ''
        doc.text(String(i + 1), col.sr, ty)
        doc.text(String(s.formNo || '—'), col.form, ty)
        doc.text(seatDisplay, col.seat, ty)
        const nameLines = doc.splitTextToSize(s.fullName || '—', col.exam - col.name - 2)
        doc.text(nameLines, col.name, ty)
        const examCellText = markStr !== '' ? markStr : '—'
        const examLines = doc.splitTextToSize(examCellText, col.lock - col.exam - 2)
        doc.text(examLines, col.exam, ty)
        doc.text('Submitted', col.lock, ty)
        ty += Math.max(rowH, nameLines.length * 4.2, examLines.length * 4.2)
    })

    // —— Footer signatures: fixed at bottom of each page ——
    const lineY = pageH - 38
    const textY = pageH - 26
    const totalPages = doc.getNumberOfPages()
    doc.setFont('times', 'bold')
    doc.setFontSize(10)
    const sigW = (pageW - 2 * margin) / 3
    for (let pg = 1; pg <= totalPages; pg++) {
        doc.setPage(pg)
        doc.setDrawColor(0, 0, 0)
        doc.setLineWidth(0.2)
        doc.line(margin, lineY, pageW - margin, lineY)
        doc.text('Name & Signature of the\nCourse teacher', margin + sigW / 2, textY, { align: 'center' })
        doc.text('Name & Signature of the\nExam Co-ordinator', margin + sigW + sigW / 2, textY, { align: 'center' })
        doc.text('Head of Department', margin + 2 * sigW + sigW / 2, textY, { align: 'center' })
    }

    doc.save(`Swargumphan-Marks-Entry-${p.sheetId}.pdf`)
}
