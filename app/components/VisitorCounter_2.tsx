'use client';

import { useEffect, useState } from 'react';
import styles from './VisitorCounter.module.css';

export default function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('hasVisitedSession');
        const action = hasVisited ? 'get' : 'increment';

        fetch(`/api/visitor-count?action=${action}`)
            .then((res) => res.json())
            .then((data) => {
                const nextCount = typeof data?.count === 'number' ? data.count : 0;
                setCount(nextCount);
                if (!hasVisited) {
                    sessionStorage.setItem('hasVisitedSession', 'true');
                }
            })
            .catch((err) => {
                console.error('Error fetching visitor count:', err);
                setCount(0);
            });
    }, []);

    if (count === null) {
        return (
            <div className={styles.loadingWrapper}>
                <span className={styles.loadingText}>Tuning in...</span>
            </div>
        );
    }

    return (
        <div className={styles.counterWrapper}>
            <div className={styles.equalizer}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
            </div>

            <div className={styles.textContainer}>
                <span className={styles.numbers}>
                    {count.toString().padStart(6, '0')}
                </span>
                <span className={styles.label}>
                    Total Visitors
                </span>
            </div>

            <div className={styles.iconContainer}>
                🎵
            </div>
        </div>
    );
}
