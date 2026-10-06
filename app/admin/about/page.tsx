'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../dashboard/AdminLayout'
import styles from './AboutEditor.module.css'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className={styles.status}>Loading editor…</div>,
})

const DEFAULT_EDITOR_HTML = `<h2>Welcome to Swargumphan</h2><p>Edit this text using the toolbar — try <strong>bold</strong>, <em>colors</em>, lists, and images (image button or paste).</p><p>Everything you save here appears on the home page under <strong>About</strong>.</p>`

export default function AdminAboutPage() {
    const router = useRouter()
    const [value, setValue] = useState(DEFAULT_EDITOR_HTML)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [status, setStatus] = useState('')
    const [showPreview, setShowPreview] = useState(false)

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ align: [] }],
                ['blockquote', 'link', 'image'],
                ['clean'],
            ],
        }),
        []
    )

    const formats = useMemo(
        () => [
            'header',
            'bold',
            'italic',
            'underline',
            'strike',
            'color',
            'background',
            'script',
            'list',
            'bullet',
            'indent',
            'align',
            'blockquote',
            'link',
            'image',
        ],
        []
    )

    const load = useCallback(async () => {
        setError('')
        try {
            const res = await fetch('/api/site-about', { cache: 'no-store' })
            const data = await res.json()
            if (data.success && typeof data.html === 'string' && data.html.trim() !== '') {
                setValue(data.html)
            } else {
                setValue(DEFAULT_EDITOR_HTML)
            }
        } catch {
            setError('Could not load current content. You can still edit and save.')
            setValue(DEFAULT_EDITOR_HTML)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        const role = localStorage.getItem('adminRole')
        const isRoot = localStorage.getItem('isRootAdmin') === 'true'
        if (role !== 'ROOT' && !isRoot) {
            router.replace('/admin/dashboard')
            return
        }
        load()
    }, [router, load])

    const handleSave = async () => {
        const adminId = localStorage.getItem('adminId')
        const adminUsername = localStorage.getItem('adminUsername')
        if (!adminId && !adminUsername) {
            setError('Session expired. Please log in again.')
            return
        }
        setSaving(true)
        setError('')
        setStatus('')
        try {
            const res = await fetch('/api/site-about', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    html: value,
                    adminId: adminId ? Number(adminId) : undefined,
                    adminUsername: adminUsername || undefined,
                }),
            })
            const data = await res.json()
            if (!res.ok || !data.success) {
                setError(data.error || 'Save failed')
                return
            }
            setStatus('Saved successfully. Refresh the home page to see changes.')
        } catch {
            setError('Network error while saving.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <AdminLayout title="About (Home Page)">
            <div className={styles.wrap}>
                <div className={styles.intro}>
                    <h2>Home — About section</h2>
                    <p>
                        Rich text below is shown on the public site in the <strong>#about</strong> block (navbar
                        &quot;About&quot; link). Use headings, colors, alignment, quotes, links, and images.
                    </p>
                    <div className={styles.toolbarNote}>
                        Tip: Use the image button to paste a URL, or paste a screenshot directly into the editor.
                    </div>
                </div>

                {error ? <div className={styles.error}>{error}</div> : null}

                {loading ? (
                    <p className={styles.status}>Loading current content…</p>
                ) : (
                    <>
                        <div className={styles.editorShell}>
                            <ReactQuill
                                theme="snow"
                                value={value}
                                onChange={setValue}
                                modules={modules}
                                formats={formats}
                                placeholder="Write your About content…"
                            />
                        </div>

                        <div className={styles.actions}>
                            <button type="button" className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                                {saving ? 'Saving…' : 'Save to website'}
                            </button>
                            <button
                                type="button"
                                className={styles.previewBtn}
                                onClick={() => setShowPreview((v) => !v)}
                            >
                                {showPreview ? 'Hide preview' : 'Preview'}
                            </button>
                            {status ? <span className={styles.status}>{status}</span> : null}
                        </div>

                        {showPreview ? (
                            <div className={styles.previewPanel}>
                                <h3>Approximate appearance on home (inside the About card)</h3>
                                <div
                                    className={styles.previewHtml}
                                    dangerouslySetInnerHTML={{ __html: value }}
                                />
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </AdminLayout>
    )
}
