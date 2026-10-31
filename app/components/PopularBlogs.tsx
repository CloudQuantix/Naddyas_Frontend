'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './PopularBlogs.module.css'
import ScrollAnimation from './ScrollAnimation'

export default function PopularBlogs() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [numDots, setNumDots] = useState(1)

  const blogs = [
    {
      title: "The Journey of Indian Classical Music",
      description: "Discover the roots and evolution of traditional ragas and talas.",
      image: "/Logos/1.jpeg",
      link: "#"
    },
    {
      title: "Mastering the Harmonium",
      description: "Essential techniques and practices for beginners to advanced players.",
      image: "/Logos/2.jpeg",
      link: "#"
    },
    {
      title: "Understanding Tabla Rhythms",
      description: "A deep dive into the complex world of Indian percussion.",
      image: "/Logos/3.jpeg",
      link: "#"
    },
    {
      title: "Vocal Warm-ups for Classical Singing",
      description: "Protect your voice and improve your range with these exercises.",
      image: "/Logos/7.jpeg",
      link: "#"
    },
    {
      title: "The Art of Flute Playing",
      description: "Breathing techniques and melodies that soothe the soul.",
      image: "/Logos/5.jpeg",
      link: "#"
    },
    {
      title: "History of the Sitar",
      description: "Learn about the origins and masters of this stringed instrument.",
      image: "/Logos/6.jpeg",
      link: "#"
    }
  ]

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current
      // Calculate how many dots we actually need based on max scroll
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) {
        setNumDots(1)
        setActiveIndex(0)
        return
      }

      // We calculate a virtual "page" index
      const ratio = scrollLeft / maxScroll
      const active = Math.round(ratio * (numDots - 1))
      setActiveIndex(active)
    }
  }

  useEffect(() => {
    const updateDots = () => {
      if (scrollContainerRef.current) {
        const { clientWidth, scrollWidth } = scrollContainerRef.current
        const itemWidth = 320 + 25 // Card width + gap
        const visibleItems = Math.max(1, Math.floor(clientWidth / itemWidth))
        const totalPages = Math.ceil(blogs.length / visibleItems)
        setNumDots(Math.max(1, totalPages))
      }
    }
    
    updateDots()
    window.addEventListener('resize', updateDots)
    return () => window.removeEventListener('resize', updateDots)
  }, [blogs.length])

  const scrollToDot = (index: number) => {
    if (scrollContainerRef.current) {
      const { clientWidth, scrollWidth } = scrollContainerRef.current
      const maxScroll = scrollWidth - clientWidth
      const scrollPosition = (index / (numDots - 1 || 1)) * maxScroll
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setActiveIndex(index)
    }
  }

  return (
    <section className="section" style={{ background: '#f8fafc', padding: '60px 0' }}>
      <div className="container">
        <ScrollAnimation animationType="fadeInUp" delay={0.2}>
          <h2 className="section-title" style={{ color: 'var(--theme-maroon)', textAlign: 'center', marginBottom: '40px' }}>
            Most Popular Blogs
          </h2>
        </ScrollAnimation>
        
        <div 
          className={styles.scrollContainer} 
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          <div className={styles.scrollContent}>
            {blogs.map((blog, index) => (
              <div key={index} className={styles.blogCard}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    width={320} 
                    height={180} 
                    className={styles.blogImage} 
                  />
                </div>
                <div className={styles.blogContent}>
                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <p className={styles.blogDescription}>{blog.description}</p>
                  <Link href={blog.link} className={styles.readMoreBtn}>
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Pagination */}
        {numDots > 1 && (
          <div className={styles.paginationDots}>
            {Array.from({ length: numDots }).map((_, idx) => (
              <span
                key={idx}
                className={`${styles.dot} ${activeIndex === idx ? styles.activeDot : ''}`}
                onClick={() => scrollToDot(idx)}
              ></span>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
