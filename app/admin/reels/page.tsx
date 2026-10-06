'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '../dashboard/AdminLayout'
import styles from './ReelsManagement.module.css'

interface Reel {
    id: number
    title: string
    student: string
    instrument: string
    video_url: string
    thumbnail_url: string
    views: number
    likes: number
    created_at: string
}

export default function ReelsManagementPage() {
    const [reels, setReels] = useState<Reel[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [savingEdit, setSavingEdit] = useState(false)

    const [title, setTitle] = useState('')
    const [student, setStudent] = useState('')
    const [instrument, setInstrument] = useState('')
    const [videoType, setVideoType] = useState<'file' | 'youtube'>('youtube')
    const [videoUrl, setVideoUrl] = useState('')
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

    const [viewReel, setViewReel] = useState<Reel | null>(null)
    const [editReel, setEditReel] = useState<Reel | null>(null)
    const [editTitle, setEditTitle] = useState('')
    const [editStudent, setEditStudent] = useState('')
    const [editInstrument, setEditInstrument] = useState('')
    const [editVideoType, setEditVideoType] = useState<'file' | 'youtube' | 'keep'>('keep')
    const [editVideoUrl, setEditVideoUrl] = useState('')
    const [editVideoFile, setEditVideoFile] = useState<File | null>(null)
    const [editThumbnailFile, setEditThumbnailFile] = useState<File | null>(null)

    const fetchReels = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/reels')
            const data = await res.json()
            if (data.success) {
                setReels(data.reels || [])
            }
        } catch (e) {
            console.error('Error fetching reels:', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReels()
    }, [])

    const getMediaUrl = (url: string) => {
        if (!url) return ''
        if (url.startsWith('http')) return url
        if (url.startsWith('/api/reels/media')) return url
        return `/api/reels/media?path=${encodeURIComponent(url)}`
    }

    const isVideoFile = (url: string) =>
        Boolean(url.match(/\.(mp4|mov|avi|mkv|webm)$/i) || url.includes('/uploads/'))

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!thumbnailFile || !title || !student || !instrument) {
            alert('Please fill all fields and select a thumbnail.')
            return
        }
        if (videoType === 'file' && !videoFile) {
            alert('Please select a video file.')
            return
        }
        if (videoType === 'youtube' && !videoUrl) {
            alert('Please enter a YouTube URL.')
            return
        }

        try {
            setUploading(true)
            const formData = new FormData()
            formData.append('title', title)
            formData.append('student', student)
            
            // Hack to bypass backend file requirement: store YouTube URL in instrument field
            if (videoType === 'youtube' && videoUrl) {
                formData.append('instrument', `${instrument}|||YT:${videoUrl}`)
                const dummyVideo = new File(["dummy video"], "dummy.mp4", { type: "video/mp4" })
                formData.append('video', dummyVideo)
            } else {
                formData.append('instrument', instrument)
                if (videoFile) formData.append('video', videoFile)
            }
            
            formData.append('thumbnail', thumbnailFile)

            const res = await fetch('/api/reels', { method: 'POST', body: formData })
            const data = await res.json()
            if (data.success) {
                alert('Reel uploaded successfully!')
                setTitle('')
                setStudent('')
                setInstrument('')
                setVideoFile(null)
                setVideoUrl('')
                setThumbnailFile(null)
                const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>
                fileInputs.forEach((input) => { input.value = '' })
                await fetchReels()
            } else {
                alert(data.error || 'Failed to upload reel')
            }
        } catch (err) {
            console.error('Error uploading reel:', err)
            alert('Failed to upload reel')
        } finally {
            setUploading(false)
        }
    }

    const openEdit = (reel: Reel) => {
        setEditReel(reel)
        setEditTitle(reel.title)
        setEditStudent(reel.student)
        
        // Parse YouTube URL from instrument if it exists
        if (reel.instrument.includes('|||YT:')) {
            const parts = reel.instrument.split('|||YT:')
            setEditInstrument(parts[0])
            setEditVideoType('youtube')
            setEditVideoUrl(parts[1])
        } else {
            setEditInstrument(reel.instrument)
            setEditVideoType('keep')
            setEditVideoUrl('')
        }
        
        setEditVideoFile(null)
        setEditThumbnailFile(null)
    }

    const closeEdit = () => {
        setEditReel(null)
        setEditVideoType('keep')
        setEditVideoUrl('')
        setEditVideoFile(null)
        setEditThumbnailFile(null)
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editReel || !editTitle || !editStudent || !editInstrument) {
            alert('Title, student, and instrument are required.')
            return
        }

        try {
            setSavingEdit(true)
            const formData = new FormData()
            formData.append('title', editTitle)
            formData.append('student', editStudent)
            
            if (editVideoType === 'youtube' && editVideoUrl) {
                formData.append('instrument', `${editInstrument}|||YT:${editVideoUrl}`)
                const dummyVideo = new File(["dummy video"], "dummy.mp4", { type: "video/mp4" })
                formData.append('video', dummyVideo)
            } else {
                formData.append('instrument', editInstrument)
                if (editVideoType === 'file' && editVideoFile) {
                    formData.append('video', editVideoFile)
                }
            }
            
            if (editThumbnailFile) formData.append('thumbnail', editThumbnailFile)

            const res = await fetch(`/api/reels/${editReel.id}`, {
                method: 'PUT',
                body: formData,
            })
            const data = await res.json()
            if (data.success) {
                alert('Reel updated successfully!')
                closeEdit()
                await fetchReels()
            } else {
                alert(data.error || 'Failed to update reel')
            }
        } catch (err) {
            console.error('Error updating reel:', err)
            alert('Failed to update reel')
        } finally {
            setSavingEdit(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this reel?')) return
        try {
            const res = await fetch(`/api/reels/${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                if (viewReel?.id === id) setViewReel(null)
                if (editReel?.id === id) closeEdit()
                await fetchReels()
            } else {
                alert(data.error || 'Failed to delete reel')
            }
        } catch (err) {
            console.error('Error deleting reel:', err)
            alert('Failed to delete reel')
        }
    }

    return (
        <AdminLayout title="Reels Management">
            <div className={styles.container}>
                <div className={styles.headerSection}>
                    <div>
                        <h2>Reels Management</h2>
                        <p>Upload and manage reels for the home page</p>
                    </div>
                </div>

                <div className={styles.formCard}>
                    <h3 className={styles.formTitle}>Upload New Reel</h3>
                    <form onSubmit={handleUpload}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter reel title"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <input
                                    type="text"
                                    value={student}
                                    onChange={(e) => setStudent(e.target.value)}
                                    placeholder="Enter description"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Instrument</label>
                                <input
                                    type="text"
                                    value={instrument}
                                    onChange={(e) => setInstrument(e.target.value)}
                                    placeholder="e.g. Tabla, Vocal, Flute"
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Video Source</label>
                                <select 
                                    value={videoType} 
                                    onChange={(e) => setVideoType(e.target.value as 'file' | 'youtube')}
                                    className={styles.selectInput}
                                >
                                    <option value="youtube">YouTube Link</option>
                                    <option value="file">Upload File</option>
                                </select>
                            </div>
                            {videoType === 'youtube' ? (
                                <div className={styles.formGroup}>
                                    <label>YouTube Embed URL</label>
                                    <input
                                        type="text"
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        placeholder="e.g. https://www.youtube.com/embed/..."
                                        required
                                    />
                                </div>
                            ) : (
                                <div className={styles.formGroup}>
                                    <label>Video File (MP4, MOV)</label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                        required
                                    />
                                </div>
                            )}
                            <div className={styles.formGroup}>
                                <label>Thumbnail Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.formActions}>
                            <button type="submit" className={styles.uploadButton} disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Upload Reel'}
                            </button>
                        </div>
                    </form>
                </div>

                {loading ? (
                    <div className={styles.loading}>Loading reels data...</div>
                ) : reels.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No reels found.</p>
                        <p className={styles.emptySubtext}>Upload your first reel using the form above.</p>
                    </div>
                ) : (
                    <div className={styles.reelGrid}>
                        {reels.map((reel) => (
                            <div key={reel.id} className={styles.reelCard}>
                                <div className={styles.thumbnailWrapper}>
                                    <img
                                        src={getMediaUrl(reel.thumbnail_url)}
                                        alt={reel.title}
                                        className={styles.thumbnailImage}
                                    />
                                </div>
                                <div className={styles.reelInfo}>
                                    <h3>{reel.title}</h3>
                                    <p className={styles.reelMeta}>
                                        {reel.student} • {reel.instrument.includes('|||YT:') ? reel.instrument.split('|||YT:')[0] : reel.instrument}
                                    </p>
                                    <div className={styles.reelStats}>
                                        <span>👁️ {reel.views} Views</span>
                                        <span>❤️ {reel.likes} Likes</span>
                                    </div>
                                    <div className={styles.actionRow}>
                                        <button
                                            type="button"
                                            className={styles.viewBtn}
                                            onClick={() => setViewReel(reel)}
                                        >
                                            View
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.editBtn}
                                            onClick={() => openEdit(reel)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.deleteBtn}
                                            onClick={() => handleDelete(reel.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {viewReel && (
                <div className={styles.modalBackdrop} onClick={() => setViewReel(null)}>
                    <div className={styles.viewModal} onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className={styles.modalClose}
                            onClick={() => setViewReel(null)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h3 className={styles.modalTitle}>{viewReel.title}</h3>
                        <p className={styles.modalMeta}>
                            {viewReel.student} • {viewReel.instrument.includes('|||YT:') ? viewReel.instrument.split('|||YT:')[0] : viewReel.instrument}
                        </p>
                        <div className={styles.videoWrapper}>
                            {viewReel.instrument.includes('|||YT:') ? (
                                <iframe
                                    src={viewReel.instrument.split('|||YT:')[1]}
                                    title={viewReel.title}
                                    className={styles.previewVideo}
                                    allowFullScreen
                                />
                            ) : isVideoFile(viewReel.video_url) ? (
                                <video
                                    src={getMediaUrl(viewReel.video_url)}
                                    controls
                                    autoPlay
                                    className={styles.previewVideo}
                                />
                            ) : (
                                <iframe
                                    src={viewReel.video_url}
                                    title={viewReel.title}
                                    className={styles.previewVideo}
                                    allowFullScreen
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {editReel && (
                <div className={styles.modalBackdrop} onClick={closeEdit}>
                    <div className={styles.editModal} onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className={styles.modalClose}
                            onClick={closeEdit}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h3 className={styles.modalTitle}>Edit Reel</h3>
                        <form onSubmit={handleEdit}>
                            <div className={styles.formGroup}>
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <input
                                    type="text"
                                    value={editStudent}
                                    onChange={(e) => setEditStudent(e.target.value)}
                                    placeholder="Enter description"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Instrument</label>
                                <input
                                    type="text"
                                    value={editInstrument}
                                    onChange={(e) => setEditInstrument(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Video Source</label>
                                <select 
                                    value={editVideoType} 
                                    onChange={(e) => setEditVideoType(e.target.value as 'file' | 'youtube' | 'keep')}
                                    className={styles.selectInput}
                                >
                                    <option value="keep">Keep Existing Video</option>
                                    <option value="youtube">New YouTube Link</option>
                                    <option value="file">Upload New File</option>
                                </select>
                            </div>
                            {editVideoType === 'youtube' && (
                                <div className={styles.formGroup}>
                                    <label>YouTube Embed URL</label>
                                    <input
                                        type="text"
                                        value={editVideoUrl}
                                        onChange={(e) => setEditVideoUrl(e.target.value)}
                                        placeholder="e.g. https://www.youtube.com/embed/..."
                                        required
                                    />
                                </div>
                            )}
                            {editVideoType === 'file' && (
                                <div className={styles.formGroup}>
                                    <label>Replace Video File</label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => setEditVideoFile(e.target.files?.[0] || null)}
                                        required
                                    />
                                </div>
                            )}
                            <div className={styles.formGroup}>
                                <label>Replace Thumbnail (optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setEditThumbnailFile(e.target.files?.[0] || null)}
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeEdit}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.saveBtn} disabled={savingEdit}>
                                    {savingEdit ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}
