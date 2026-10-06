'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ScrollAnimation from './ScrollAnimation'
import styles from './ReelsSection.module.css'

interface Reel {
  id: number
  title: string
  student: string
  instrument: string
  views: string | number
  likes: string | number
  thumbnail: string
  videoUrl: string
}

const FALLBACK_REELS: Reel[] = [
  {
    id: 1,
    title: 'Raga Bhairavi - Morning Practice',
    student: 'Aarav Mehta',
    instrument: 'Classical Vocal',
    views: '12.4K',
    likes: '1.2K',
    thumbnail: '/reels/singer.png',
    videoUrl: 'https://www.youtube.com/embed/S26X4x4Rzic?autoplay=1&mute=0',
  },
  {
    id: 2,
    title: 'Teental Drut Laya Percussion Solo',
    student: 'Rohan Sharma',
    instrument: 'Tabla',
    views: '18.9K',
    likes: '2.1K',
    thumbnail: '/reels/tabla.png',
    videoUrl: 'https://www.youtube.com/embed/U3H86P853XQ?autoplay=1&mute=0',
  },
]

export default function ReelsSection() {
  const [reels, setReels] = useState<Reel[]>(FALLBACK_REELS)
  const [activeReel, setActiveReel] = useState<Reel | null>(null)
  const [likedReels, setLikedReels] = useState<number[]>([])

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await fetch('/api/reels')
        const data = await res.json()
        if (data.success && data.reels && data.reels.length > 0) {
          const apiReels = data.reels
            .filter((r: { thumbnail_url?: string; video_url?: string }) => r.thumbnail_url && r.video_url)
            .map((r: {
              id: number
              title: string
              student: string
              instrument: string
              views: string | number
              likes: string | number
              thumbnail_url: string
              video_url: string
            }) => ({
              id: r.id,
              title: r.title,
              student: r.student,
              instrument: r.instrument,
              views: r.views,
              likes: r.likes,
              thumbnail: r.thumbnail_url,
              videoUrl: r.video_url,
            }))
          setReels(apiReels)
        }
      } catch (e) {
        console.error('Error fetching reels:', e)
      }
    }
    fetchReels()
  }, [])

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (likedReels.includes(id)) {
      setLikedReels(likedReels.filter((item) => item !== id))
    } else {
      setLikedReels([...likedReels, id])
    }
  }

  const getMediaUrl = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    if (url.startsWith('/api/reels/media')) return url
    return `/api/reels/media?path=${encodeURIComponent(url)}`
  }

  const isVideoFile = (url: string) => {
    return url.match(/\.(mp4|mov|avi|mkv|webm)$/) || url.includes('/uploads/')
  }

  return (
    <section className={styles.reelsSection}>
      <div className="container">
        <ScrollAnimation animationType="fadeInUp" delay={0.1}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Watch & Listen</span>
            <h2 className={styles.title}>Videos & Reels </h2>
            <p className={styles.subtitle}>
              Catch quick glimpses of our students showing their musical talent, classes, and performances in action.
            </p>
          </div>
        </ScrollAnimation>

        <div className={styles.reelsGrid}>
          {reels.map((reel, index) => (
            <ScrollAnimation
              key={reel.id}
              className={styles.reelGridItem}
              animationType="fadeInUp"
              delay={0.15 * (index + 1)}
            >
              <div
                className={styles.reelCard}
                onClick={() => setActiveReel(reel)}
              >
                {/* Thumbnail Image */}
                <div className={styles.thumbnailWrapper}>
                  <Image
                    src={getMediaUrl(reel.thumbnail)}
                    alt={reel.title}
                    fill
                    className={styles.thumbnailImage}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className={styles.overlayGradient} />
                </div>

                {/* Vertical Soundwave Visualizer on Card (Decorative) */}
                <div className={styles.cardSoundwave}>
                  <span className={styles.soundBar}></span>
                  <span className={styles.soundBar}></span>
                  <span className={styles.soundBar}></span>
                  <span className={styles.soundBar}></span>
                </div>

                {/* Floating Play Button */}
                <div className={styles.playButton}>
                  <span className={styles.playIcon}>▶</span>
                </div>

                {/* Reel Info Footer Overlay */}
                <div className={styles.reelCardFooter}>
                  <div className={styles.tagGroup}>
                    <span className={styles.instrumentTag}>{reel.instrument}</span>
                    <span className={styles.viewsTag}>👁️ {reel.views}</span>
                  </div>
                  <h3 className={styles.reelTitle}>{reel.title}</h3>
                  <p className={styles.studentName}>{reel.student}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Reels Fullscreen / Video Overlay Modal */}
      {activeReel && (
        <div className={styles.modalBackdrop} onClick={() => setActiveReel(null)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className={styles.closeButton}
              onClick={() => setActiveReel(null)}
              aria-label="Close reel"
            >
              &times;
            </button>

            <div className={styles.reelLayout}>
              {/* Main 9:16 Video Player Container */}
              <div className={styles.videoPlayerContainer}>
                {isVideoFile(activeReel.videoUrl) ? (
                  <video
                    src={getMediaUrl(activeReel.videoUrl)}
                    controls
                    autoPlay
                    className={styles.reelVideo}
                  />
                ) : (
                  <iframe
                    src={activeReel.videoUrl}
                    title={activeReel.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className={styles.reelIframe}
                  ></iframe>
                )}

                {/* Overlay Text Inside Video */}
                <div className={styles.videoOverlayDetails}>
                  <div className={styles.studentProfile}>
                    <div className={styles.avatar}>
                      {activeReel.student[0]}
                    </div>
                    <div>
                      <h4 className={styles.modalStudentName}>{activeReel.student}</h4>
                      <p className={styles.modalInstrument}>{activeReel.instrument}</p>
                    </div>
                  </div>
                  <p className={styles.modalReelTitle}>{activeReel.title}</p>
                </div>
              </div>

              {/* Interaction Sidebar (Instagram style) */}
              <div className={styles.sidebarActions}>
                <button
                  className={`${styles.actionBtn} ${likedReels.includes(activeReel.id) ? styles.liked : ''}`}
                  onClick={(e) => toggleLike(activeReel.id, e)}
                >
                  <div className={styles.actionIconContainer}>
                    ❤️
                  </div>
                  <span className={styles.actionCount}>
                    {likedReels.includes(activeReel.id) ? 'Liked' : activeReel.likes}
                  </span>
                </button>

                <div className={styles.actionBtn}>
                  <div className={styles.actionIconContainer}>
                    👁️
                  </div>
                  <span className={styles.actionCount}>{activeReel.views}</span>
                </div>

                <button
                  className={styles.actionBtn}
                  onClick={() => {
                    navigator.clipboard.writeText(getMediaUrl(activeReel.videoUrl))
                    alert('Reel link copied to clipboard!')
                  }}
                >
                  <div className={styles.actionIconContainer}>
                    🔗
                  </div>
                  <span className={styles.actionCount}>Share</span>
                </button>

                {/* Rotating Vinyl Record for Music Vibe */}
                <div className={styles.vinylContainer}>
                  <div className={styles.vinylRecord}>
                    🎵
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
