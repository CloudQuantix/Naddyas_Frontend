'use client'

import { useEffect, useState } from 'react'
import styles from './YouTubeVideoStrip.module.css'

interface VideoItem {
  id: number
  title: string
  student: string
  instrument: string
  video_url: string
  thumbnail_url: string
}

function getYouTubeId(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

function getEmbedUrl(video: VideoItem): string {
  if (video.instrument && video.instrument.includes('|||YT:')) {
    const raw = video.instrument.split('|||YT:')[1]
    const id = getYouTubeId(raw)
    return id ? `https://www.youtube.com/embed/${id}` : raw
  }
  const id = getYouTubeId(video.video_url)
  return id ? `https://www.youtube.com/embed/${id}` : video.video_url
}

function getThumbnail(video: VideoItem): string {
  const ytId = getYouTubeId(video.video_url) || (video.instrument?.includes('|||YT:') ? getYouTubeId(video.instrument.split('|||YT:')[1]) : null)
  if (ytId && (!video.thumbnail_url || video.thumbnail_url.includes('dummy') || video.thumbnail_url.includes('reels-'))) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
  }
  if (video.thumbnail_url) {
    if (video.thumbnail_url.startsWith('http')) return video.thumbnail_url
    return `/api/reels/media?path=${encodeURIComponent(video.thumbnail_url)}`
  }
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
  }
  return '/Logos/1.jpeg'
}

export default function YouTubeVideoStrip() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch('/api/reels')
        const data = await res.json()
        if (data.success && Array.isArray(data.reels)) {
          setVideos(data.reels)
        }
      } catch (err) {
        console.error('Failed to load videos for strip:', err)
      } finally {
        setLoading(false)
      }
    }
    loadVideos()
  }, [])

  if (loading || videos.length === 0) {
    return null
  }

  return (
    <section className={styles.stripSection}>
      <div className={styles.stripHeader}>
        <h2 className={styles.stripTitle}>Watch Our Musical Journey</h2>
        <p className={styles.stripSubtitle}>
          Highlights, live performances, and student recitals from Swargumphan Music Institute
        </p>
      </div>

      <div className={styles.scrollTrackWrapper}>
        <div className={styles.videoList}>
          {videos.map((video) => (
            <div
              key={video.id}
              className={styles.videoCard}
              onClick={() => setActiveVideo(video)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveVideo(video)
                }
              }}
            >
              <div className={styles.thumbnailContainer}>
                <img
                  src={getThumbnail(video)}
                  alt={video.title}
                  className={styles.thumbnailImg}
                  loading="lazy"
                />
                <div className={styles.playOverlay}>
                  <div className={styles.playCircle}>▶</div>
                </div>
                <span className={styles.durationBadge}>Full Screen</span>
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.videoPerformer}>
                  {video.student || 'Swargumphan Music Institute'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {activeVideo && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setActiveVideo(null)}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setActiveVideo(null)}
            aria-label="Close Fullscreen Video"
          >
            ✕
          </button>
          <div
            className={styles.modalPlayerBox}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${getEmbedUrl(activeVideo)}?autoplay=1&rel=0`}
              title={activeVideo.title}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className={styles.modalCaption} onClick={(e) => e.stopPropagation()}>
            <h4>{activeVideo.title}</h4>
            <p>{activeVideo.student}</p>
          </div>
        </div>
      )}
    </section>
  )
}
