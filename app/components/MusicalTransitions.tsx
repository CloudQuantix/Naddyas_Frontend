'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './MusicalTransitions.module.css'

interface Note {
  id: number;
  char: string;
  left: number;
  delay: number;
  size: number;
}

const NOTE_CHARS = ['♪', '♫', '♬', '♩'];

export default function MusicalTransitions() {
  const pathname = usePathname();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Generate 8-12 random notes
    const numNotes = Math.floor(Math.random() * 5) + 8;
    const newNotes: Note[] = [];

    for (let i = 0; i < numNotes; i++) {
      newNotes.push({
        id: Date.now() + i,
        char: NOTE_CHARS[Math.floor(Math.random() * NOTE_CHARS.length)],
        left: Math.random() * 100, // 0 to 100vw
        delay: Math.random() * 1.5, // 0 to 1.5s delay
        size: Math.random() * 2 + 1, // 1rem to 3rem
      });
    }

    setNotes(newNotes);

    // Clean up notes after animation finishes (approx 4.5s max)
    const timeout = setTimeout(() => {
      setNotes([]);
    }, 4500);

    return () => clearTimeout(timeout);
  }, [pathname]); // Trigger on route change

  if (notes.length === 0) return null;

  return (
    <div className={styles.transitionContainer}>
      {notes.map(note => (
        <div 
          key={note.id} 
          className={styles.note}
          style={{
            left: `${note.left}vw`,
            animationDelay: `${note.delay}s`,
            fontSize: `${note.size}rem`,
          }}
        >
          {note.char}
        </div>
      ))}
    </div>
  )
}
