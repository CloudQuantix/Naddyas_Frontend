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

// Helper to extract YouTube video ID
function getYouTubeId(url: string): string | null {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
}

function getYouTubeEmbedUrl(url: string): string {
    const id = getYouTubeId(url)
    if (id) return `https://www.youtube.com/embed/${id}`
    return url
}

export default function YouTubeVideosManagementPage() {
    const [videos, setVideos] = useState<Reel[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [savingEdit, setSavingEdit] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [youtubeUrl, setYoutubeUrl] = useState('')
    const [customThumbnail, setCustomThumbnail] = useState<File | null>(null)

    const [viewVideo, setViewVideo] = useState<Reel | null>(null)
    const [editVideo, setEditVideo] = useState<Reel | null>(null)
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editYoutubeUrl, setEditYoutubeUrl] = useState('')
    const [editThumbnailFile, setEditThumbnailFile] = useState<File | null>(null)

    const fetchVideos = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/reels')
            const data = await res.json()
            if (data.success) {
                setVideos(data.reels || [])
            }
        } catch (e) {
            console.error('Error fetching videos:', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVideos()
    }, [])

    const getMediaUrl = (url: string) => {
        if (!url) return ''
        if (url.startsWith('http')) return url
        if (url.startsWith('/api/reels/media')) return url
        return `/api/reels/media?path=${encodeURIComponent(url)}`
    }

    const getVideoThumbnail = (video: Reel) => {
        const ytId = getYouTubeId(video.video_url) || (video.instrument.includes('|||YT:') ? getYouTubeId(video.instrument.split('|||YT:')[1]) : null)
        if (ytId && (!video.thumbnail_url || video.thumbnail_url.includes('dummy') || video.thumbnail_url.includes('reels-'))) {
            return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
        }
        if (video.thumbnail_url) return getMediaUrl(video.thumbnail_url)
        if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
        return '/Logos/1.jpeg'
    }

    const getVideoEmbedUrl = (video: Reel) => {
        if (video.instrument && video.instrument.includes('|||YT:')) {
            return getYouTubeEmbedUrl(video.instrument.split('|||YT:')[1])
        }
        return getYouTubeEmbedUrl(video.video_url)
    }

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || !youtubeUrl.trim()) {
            alert('Please provide a video title and YouTube link.')
            return
        }

        const ytId = getYouTubeId(youtubeUrl)
        if (!ytId) {
            alert('Please enter a valid YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)')
            return
        }

        const embedUrl = `https://www.youtube.com/embed/${ytId}`

        try {
            setUploading(true)
            const formData = new FormData()
            formData.append('title', title.trim())
            formData.append('student', description.trim() || 'Swargumphan Academy')
            formData.append('instrument', `YouTube|||YT:${embedUrl}`)
            
            // Dummy video blob to fulfill backend requirement
            const dummyVideo = new File(["youtube-placeholder"], "youtube.mp4", { type: "video/mp4" })
            formData.append('video', dummyVideo)

            if (customThumbnail) {
                formData.append('thumbnail', customThumbnail)
            } else {
                // Fetch youtube thumbnail and send as file so backend multer accepts it
                try {
                    const thumbRes = await fetch(`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`)
                    const blob = await thumbRes.blob()
                    const thumbFile = new File([blob], `yt-${ytId}.jpg`, { type: "image/jpeg" })
                    formData.append('thumbnail', thumbFile)
                } catch {
                    const fallbackBlob = new File(["dummy-img"], "dummy.jpg", { type: "image/jpeg" })
                    formData.append('thumbnail', fallbackBlob)
                }
            }

            const res = await fetch('/api/reels', { method: 'POST', body: formData })
            const data = await res.json()
            if (data.success) {
                alert('YouTube Video added successfully!')
                setTitle('')
                setDescription('')
                setYoutubeUrl('')
                setCustomThumbnail(null)
                const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>
                fileInputs.forEach((input) => { input.value = '' })
                await fetchVideos()
            } else {
                alert(data.error || 'Failed to add YouTube video')
            }
        } catch (err) {
            console.error('Error adding video:', err)
            alert('Failed to add video')
        } finally {
            setUploading(false)
        }
    }

    const openEdit = (video: Reel) => {
        setEditVideo(video)
        setEditTitle(video.title)
        setEditDescription(video.student || '')
        
        if (video.instrument && video.instrument.includes('|||YT:')) {
            setEditYoutubeUrl(video.instrument.split('|||YT:')[1])
        } else {
            setEditYoutubeUrl(video.video_url || '')
        }
        setEditThumbnailFile(null)
    }

    const closeEdit = () => {
        setEditVideo(null)
        setEditYoutubeUrl('')
        setEditThumbnailFile(null)
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editVideo || !editTitle.trim()) {
            alert('Title is required.')
            return
        }

        try {
            setSavingEdit(true)
            const formData = new FormData()
            formData.append('title', editTitle.trim())
            formData.append('student', editDescription.trim() || 'Swargumphan Academy')

            if (editYoutubeUrl.trim()) {
                const embedUrl = getYouTubeEmbedUrl(editYoutubeUrl.trim())
                formData.append('instrument', `YouTube|||YT:${embedUrl}`)
                const dummyVideo = new File(["youtube-placeholder"], "youtube.mp4", { type: "video/mp4" })
                formData.append('video', dummyVideo)
            } else {
                formData.append('instrument', editVideo.instrument)
            }

            if (editThumbnailFile) {
                formData.append('thumbnail', editThumbnailFile)
            }

            const res = await fetch(`/api/reels/${editVideo.id}`, {
                method: 'PUT',
                body: formData,
            })
            const data = await res.json()
            if (data.success) {
                alert('YouTube Video updated successfully!')
                closeEdit()
                await fetchVideos()
            } else {
                alert(data.error || 'Failed to update video')
            }
        } catch (err) {
            console.error('Error updating video:', err)
            alert('Failed to update video')
        } finally {
            setSavingEdit(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this video?')) return

        try {
            const res = await fetch(`/api/reels/${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                if (viewVideo?.id === id) setViewVideo(null)
                if (editVideo?.id === id) closeEdit()
                await fetchVideos()
            } else {
                alert(data.error || 'Failed to delete video')
            }
        } catch (err) {
            console.error('Error deleting video:', err)
            alert('Failed to delete video')
        }
    }

    return (
        <AdminLayout title="YouTube Videos Management">
            <div className={styles.container}>
                <div className={styles.headerSection}>
                    <div>
                        <h2>YouTube Videos Management</h2>
                        <p>Add YouTube video links to showcase in the horizontal video strip below Our Courses</p>
                    </div>
                </div>

                <div className={styles.formCard}>
                    <h3 className={styles.formTitle}>Add New YouTube Video</h3>
                    <form onSubmit={handleUpload}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Video Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Classical Raga Performance - Student Recital"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>YouTube Video Link *</label>
                                <input
                                    type="text"
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                    placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
                                    required
                                />
                                <small style={{ color: '#888', marginTop: '4px', fontSize: '0.8rem' }}>
                                    Thumbnail is automatically fetched from YouTube.
                                </small>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description / Performer</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="e.g. Performed by Ananya - Swargumphan Student"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Custom Thumbnail (Optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setCustomThumbnail(e.target.files?.[0] || null)}
                                />
                            </div>
                        </div>
                        <div className={styles.formActions}>
                            <button type="submit" className={styles.uploadButton} disabled={uploading}>
                                {uploading ? 'Adding Video...' : '▶ Add YouTube Video'}
                            </button>
                        </div>
                    </form>
                </div>

                {loading ? (
                    <div className={styles.loading}>Loading YouTube videos...</div>
                ) : videos.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No YouTube videos added yet.</p>
                        <p className={styles.emptySubtext}>Paste a YouTube link above to add your first video to the horizontal strip.</p>
                    </div>
                ) : (
                    <div className={styles.reelGrid}>
                        {videos.map((video) => (
                            <div key={video.id} className={styles.reelCard}>
                                <div 
                                    className={styles.thumbnailWrapper} 
                                    style={{ cursor: 'pointer', paddingBottom: '56.25%' }}
                                    onClick={() => setViewVideo(video)}
                                    title="Click to view full screen"
                                >
                                    <img
                                        src={getVideoThumbnail(video)}
                                        alt={video.title}
                                        className={styles.thumbnailImage}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(0,0,0,0.3)',
                                        transition: 'background 0.2s',
                                    }}>
                                        <div style={{
                                            width: '52px',
                                            height: '52px',
                                            borderRadius: '50%',
                                            background: '#ff0000',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            fontSize: '1.4rem',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                                            paddingLeft: '3px',
                                        }}>
                                            ▶
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.reelInfo}>
                                    <h3>{video.title}</h3>
                                    <p className={styles.reelMeta}>
                                        {video.student || 'Swargumphan Academy'}
                                    </p>
                                    <div className={styles.actionRow}>
                                        <button
                                            type="button"
                                            className={styles.viewBtn}
                                            onClick={() => setViewVideo(video)}
                                        >
                                            ⛶ Fullscreen
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.editBtn}
                                            onClick={() => openEdit(video)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.deleteBtn}
                                            onClick={() => handleDelete(video.id)}
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

            {/* Fullscreen Video Modal */}
            {viewVideo && (
                <div 
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.92)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                    }}
                    onClick={() => setViewVideo(null)}
                >
                    <div 
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '1000px',
                            aspectRatio: '16 / 9',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            backgroundColor: '#000',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setViewVideo(null)}
                            style={{
                                position: 'absolute',
                                top: '-45px',
                                right: '0',
                                background: 'transparent',
                                border: 'none',
                                color: '#ffffff',
                                fontSize: '2rem',
                                cursor: 'pointer',
                                padding: '4px 10px',
                            }}
                            aria-label="Close Fullscreen"
                        >
                            ✕
                        </button>
                        <iframe
                            src={`${getVideoEmbedUrl(viewVideo)}?autoplay=1`}
                            title={viewVideo.title}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                    <div style={{ color: '#fff', marginTop: '16px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '4px' }}>{viewVideo.title}</h3>
                        <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>{viewVideo.student}</p>
                    </div>
                </div>
            )}

            {/* Edit Video Modal */}
            {editVideo && (
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
                        <h3 className={styles.modalTitle}>Edit YouTube Video</h3>
                        <form onSubmit={handleEdit}>
                            <div className={styles.formGroup}>
                                <label>Title *</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>YouTube Link</label>
                                <input
                                    type="text"
                                    value={editYoutubeUrl}
                                    onChange={(e) => setEditYoutubeUrl(e.target.value)}
                                    placeholder="Leave blank to keep existing link or paste new YouTube URL"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description / Performer</label>
                                <input
                                    type="text"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Replace Thumbnail (Optional)</label>
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
