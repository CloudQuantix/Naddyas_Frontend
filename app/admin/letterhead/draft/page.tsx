'use client'

import { useMemo, useRef, useState } from 'react'
import AdminLayout from '../../dashboard/AdminLayout'
import styles from './page.module.css'

const FONT_SIZE_OPTIONS = ['12', '14', '16', '18', '20', '22', '24']
const ALLOWED_TAGS = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'BR', 'P', 'DIV', 'SPAN', 'UL', 'OL', 'LI'])

function stripHtml(html: string) {
    return html
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function sanitizeRichHtml(raw: string) {
    if (typeof window === 'undefined') return raw
    const tpl = document.createElement('template')
    tpl.innerHTML = raw
    const nodes = Array.from(tpl.content.querySelectorAll('*'))
    for (const node of nodes) {
        if (!ALLOWED_TAGS.has(node.tagName)) {
            node.replaceWith(document.createTextNode(node.textContent || ''))
            continue
        }
        for (const attr of Array.from(node.attributes)) {
            node.removeAttribute(attr.name)
        }
    }
    return tpl.innerHTML
}

export default function LetterHeadDraftPage() {
    const [toTextInput, setToTextInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [toFontSizeInput, setToFontSizeInput] = useState('16')
    const [descriptionFontSizeInput, setDescriptionFontSizeInput] = useState('14')

    const [toText, setToText] = useState('')
    const [description, setDescription] = useState('')
    const [toFontSize, setToFontSize] = useState('16')
    const [descriptionFontSize, setDescriptionFontSize] = useState('14')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const toEditorRef = useRef<HTMLDivElement | null>(null)
    const descriptionEditorRef = useRef<HTMLDivElement | null>(null)

    const canSubmit = useMemo(() => {
        return stripHtml(toTextInput).length > 0 && stripHtml(descriptionInput).length > 0
    }, [toTextInput, descriptionInput])

    const applyFormat = (target: 'to' | 'description', command: string) => {
        const editor = target === 'to' ? toEditorRef.current : descriptionEditorRef.current
        if (!editor) return
        editor.focus()
        document.execCommand(command, false)
        if (target === 'to') setToTextInput(editor.innerHTML)
        else setDescriptionInput(editor.innerHTML)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!canSubmit) return

        const safeTo = sanitizeRichHtml(toTextInput)
        const safeDescription = sanitizeRichHtml(descriptionInput)
        setToText(safeTo)
        setDescription(safeDescription)
        setToFontSize(toFontSizeInput)
        setDescriptionFontSize(descriptionFontSizeInput)
        setHasSubmitted(true)
    }

    const handlePrint = () => {
        if (!hasSubmitted) return
        const printWindow = window.open('', '_blank', 'width=900,height=1200')
        if (!printWindow) return

        const safeTo = sanitizeRichHtml(toText)
        const safeDescription = sanitizeRichHtml(description)

        const printHtml = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Letter Head Print</title>
  <style>
    @page { size: A4; margin: 0; }
    html, body {
      margin: 0;
      padding: 0;
      width: 210mm;
      min-height: 297mm;
      font-family: "Times New Roman", Times, serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      background: #f3f4f6;
    }
    .sheet {
      width: 210mm;
      min-height: 297mm;
      background: #f3f4f6;
    }
    .banner {
      background: #0d4b66;
      color: #fff;
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 16px;
      align-items: center;
      padding: 14px 22px;
    }
    .logoWrap { display: flex; align-items: center; justify-content: center; }
    .logoWrap img { width: 230px; height: 230px; object-fit: contain; }
    .bannerText { text-align: center; }
    .bannerText h1 { margin: 0 0 8px; font-size: 54px; line-height: 1.05; font-weight: 700; }
    .bannerText p { margin: 2px 0; font-size: 17px; line-height: 1.3; }
    .refDateRow {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 16px 24px 12px 16px;
      margin-top: 8px;
      color: #111827;
      font-size: 17px;
      font-weight: 700;
    }
    .refDateRow .refPart { margin-right: auto; text-align: left; flex: 0 0 auto; transform: translateX(12px); }
    .refDateRow .datePart { margin-left: auto; text-align: right; flex: 0 0 auto; transform: translateX(-16px); padding-right: 64px; }
    .content { color: #111827; padding: 0 108px 52px; min-height: 420px; }
    .toLine { margin: 12px 0 20px; font-weight: 700; text-align: left; font-size: ${toFontSize}px; }
    .description {
      margin: 0;
      text-align: justify;
      white-space: normal;
      line-height: 1.75;
      font-size: ${descriptionFontSize}px;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="banner">
      <div class="logoWrap"><img src="${window.location.origin}/letterhead-logo.png" alt="Naad Dhyas Logo" /></div>
      <div class="bannerText">
        <h1>नाद ध्यास फाउंडेशन</h1>
        <p>डेरेणप ता.पाटण जि. सातारा नोंदणी क्र. : E-0002608 (STR)</p>
        <p>स्वरगुंफण संगीत विद्यालय, राजय, प्लॉट नं. २१ संपदा सोसायटी, कर्मवीर नगर सातारा.</p>
        <p>फोन.9075960933</p>
        <p>ई-मेल id : nnaddhyass@gmail.com</p>
      </div>
    </div>
    <div class="refDateRow"><span class="refPart">Ref.No :</span><span class="datePart">Date :</span></div>
    <div class="content">
      <div class="toLine">To, ${safeTo}</div>
      <div class="description">${safeDescription}</div>
    </div>
  </div>
</body>
</html>
        `

        printWindow.document.open()
        printWindow.document.write(printHtml)
        printWindow.document.close()

        const runPrintWhenReady = () => {
            try {
                const images = Array.from(printWindow.document.images || [])
                const allLoaded = images.every((img) => img.complete && img.naturalWidth > 0)
                if (!allLoaded) {
                    setTimeout(runPrintWhenReady, 120)
                    return
                }
                printWindow.focus()
                printWindow.print()
                printWindow.close()
            } catch {
                printWindow.focus()
                printWindow.print()
                printWindow.close()
            }
        }

        setTimeout(runPrintWhenReady, 120)
    }

    return (
        <AdminLayout title="Letter Head Draft">
            <div className={styles.wrapper}>
                <div className={styles.formCard}>
                    <h2>Compose Letter</h2>
                    <p>Fill details and submit to generate letter text in letter head format.</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="toField">To</label>
                            <div className={styles.formatToolbar}>
                                <button type="button" onClick={() => applyFormat('to', 'bold')}>Bold</button>
                                <button type="button" onClick={() => applyFormat('to', 'underline')}>Underline</button>
                                <button type="button" onClick={() => applyFormat('to', 'italic')}>Italic</button>
                                <button type="button" onClick={() => applyFormat('to', 'insertUnorderedList')}>Bullets</button>
                            </div>
                            <div
                                id="toField"
                                ref={toEditorRef}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={(e) => setToTextInput(e.currentTarget.innerHTML)}
                                className={styles.richInput}
                                data-placeholder="Enter recipient name/designation"
                            />
                            <div className={styles.inlineControl}>
                                <label htmlFor="toFontSize">To font size</label>
                                <select
                                    id="toFontSize"
                                    value={toFontSizeInput}
                                    onChange={(e) => setToFontSizeInput(e.target.value)}
                                >
                                    {FONT_SIZE_OPTIONS.map((size) => (
                                        <option key={size} value={size}>
                                            {size}px
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="descriptionField">Description</label>
                            <div className={styles.formatToolbar}>
                                <button type="button" onClick={() => applyFormat('description', 'bold')}>Bold</button>
                                <button type="button" onClick={() => applyFormat('description', 'underline')}>Underline</button>
                                <button type="button" onClick={() => applyFormat('description', 'italic')}>Italic</button>
                                <button type="button" onClick={() => applyFormat('description', 'insertUnorderedList')}>Bullets</button>
                            </div>
                            <div
                                id="descriptionField"
                                ref={descriptionEditorRef}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={(e) => setDescriptionInput(e.currentTarget.innerHTML)}
                                className={`${styles.richInput} ${styles.descriptionInput}`}
                                data-placeholder="Enter the full letter description"
                            />
                            <div className={styles.inlineControl}>
                                <label htmlFor="descriptionFontSize">Description font size</label>
                                <select
                                    id="descriptionFontSize"
                                    value={descriptionFontSizeInput}
                                    onChange={(e) => setDescriptionFontSizeInput(e.target.value)}
                                >
                                    {FONT_SIZE_OPTIONS.map((size) => (
                                        <option key={size} value={size}>
                                            {size}px
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <button type="submit" className={styles.submitBtn} disabled={!canSubmit}>
                                Submit
                            </button>
                            <button
                                type="button"
                                className={styles.printBtn}
                                onClick={handlePrint}
                                disabled={!hasSubmitted}
                            >
                                Print
                            </button>
                        </div>
                    </form>
                </div>

                <div className={styles.previewCard}>
                    <h3>Letter Preview</h3>
                    <div className={styles.printRoot}>
                    <div className={styles.letterSheet}>
                        <div className={styles.letterHeadBanner}>
                            <div className={styles.logoWrap}>
                                <img src="/letterhead-logo.png" alt="Naad Dhyas Logo" className={styles.logoImage} />
                            </div>
                            <div className={styles.bannerText}>
                                <h1>नाद ध्यास फाउंडेशन</h1>
                                <p>डेरेणप ता.पाटण जि. सातारा नोंदणी क्र. : E-0002608 (STR)</p>
                                <p>स्वरगुंफण संगीत विद्यालय, राजय, प्लॉट नं. २१ संपदा सोसायटी, कर्मवीर नगर सातारा.</p>
                                <p>फोन.9075960933</p>
                                <p>ई-मेल id : nnaddhyass@gmail.com</p>
                            </div>
                        </div>

                        <div className={styles.refDateRow}>
                            <span className={styles.refPart}>Ref.No :</span>
                            <span className={styles.datePart}>Date :</span>
                        </div>

                        {hasSubmitted ? (
                            <div className={styles.letterContent}>
                                <div className={styles.toLine} style={{ fontSize: `${toFontSize}px` }}>
                                    <span>To, </span>
                                    <span dangerouslySetInnerHTML={{ __html: toText }} />
                                </div>
                                <div
                                    className={styles.descriptionLine}
                                    style={{ fontSize: `${descriptionFontSize}px` }}
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            </div>
                        ) : (
                            <p className={styles.placeholder}>Submit the form to generate letter content.</p>
                        )}
                    </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
