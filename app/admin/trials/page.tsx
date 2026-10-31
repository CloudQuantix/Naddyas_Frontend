'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '../dashboard/AdminLayout'

interface TrialRecord {
    id: number
    booking_no: string
    student_name: string
    phone: string
    gender: string
    category: string
    branch: string
    trial_date: string
    trial_slot: string
    email: string
    parent_name: string
    address: string
    referral_code: string
    status: string
    notes: string
    created_at: string
}

export default function AdminTrialsPage() {
    const [trials, setTrials] = useState<TrialRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const fetchTrials = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/trials')
            const data = await res.json()
            if (data.success) {
                setTrials(data.trials || [])
            }
        } catch (e) {
            console.error('Failed to fetch trials:', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTrials()
    }, [])

    const updateStatus = async (id: number, status: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/trials/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            })
            fetchTrials()
        } catch (err) {
            console.error(err)
        }
    }

    const filtered = trials.filter((t) =>
        t.student_name?.toLowerCase().includes(search.toLowerCase()) ||
        t.phone?.includes(search) ||
        t.category?.toLowerCase().includes(search.toLowerCase()) ||
        t.booking_no?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <AdminLayout title="Free Trial Bookings">
            <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', color: '#1e293b', margin: 0 }}>Free Trial Bookings (Trials Table)</h2>
                        <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Manage incoming student free trial registrations and schedules</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Search student, phone, or course..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: '10px 16px',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            fontSize: '0.95rem',
                            minWidth: '280px',
                            outline: 'none',
                        }}
                    />
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading trial records...</div>
                ) : filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#64748b' }}>
                        No trial bookings found.
                    </div>
                ) : (
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', overflowX: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '950px' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                                    <th style={{ padding: '14px 18px' }}>Booking ID</th>
                                    <th style={{ padding: '14px 18px' }}>Student</th>
                                    <th style={{ padding: '14px 18px' }}>Mobile</th>
                                    <th style={{ padding: '14px 18px' }}>Course / Category</th>
                                    <th style={{ padding: '14px 18px' }}>Branch</th>
                                    <th style={{ padding: '14px 18px' }}>Trial Schedule</th>
                                    <th style={{ padding: '14px 18px' }}>Status</th>
                                    <th style={{ padding: '14px 18px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((t) => (
                                    <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '0.92rem', color: '#1e293b' }}>
                                        <td style={{ padding: '14px 18px', fontWeight: 600, color: '#d97706' }}>{t.booking_no}</td>
                                        <td style={{ padding: '14px 18px' }}>
                                            <div style={{ fontWeight: 600 }}>{t.student_name}</div>
                                            <small style={{ color: '#64748b' }}>{t.gender || 'Not specified'}</small>
                                        </td>
                                        <td style={{ padding: '14px 18px' }}>
                                            <a href={`tel:${t.phone}`} style={{ color: '#0284c7', textDecoration: 'none' }}>
                                                +91 {t.phone}
                                            </a>
                                        </td>
                                        <td style={{ padding: '14px 18px', fontWeight: 500 }}>{t.category}</td>
                                        <td style={{ padding: '14px 18px', color: '#64748b' }}>{t.branch}</td>
                                        <td style={{ padding: '14px 18px' }}>
                                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{t.trial_date || 'Date TBD'}</div>
                                            <small style={{ color: '#16a34a', fontWeight: 600 }}>{t.trial_slot || 'Slot TBD'}</small>
                                        </td>
                                        <td style={{ padding: '14px 18px' }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: 600,
                                                background: t.status === 'Confirmed' ? '#dcfce7' : t.status === 'Completed' ? '#e0f2fe' : '#fef3c7',
                                                color: t.status === 'Confirmed' ? '#15803d' : t.status === 'Completed' ? '#0369a1' : '#b45309'
                                            }}>
                                                {t.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 18px' }}>
                                            <a
                                                href={`https://wa.me/91${t.phone}?text=${encodeURIComponent(`Hello ${t.student_name}, this is from Swargumphan Music Institute regarding your Free Trial booking (${t.booking_no}) for ${t.category}.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    padding: '6px 12px',
                                                    background: '#25d366',
                                                    color: '#fff',
                                                    borderRadius: '6px',
                                                    textDecoration: 'none',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    marginRight: '8px'
                                                }}
                                            >
                                                💬 WhatsApp
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
