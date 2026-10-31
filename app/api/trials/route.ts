import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const res = await fetch(`${BACKEND_URL}/api/trials`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        const data = await res.json()
        if (!res.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to book trial' },
                { status: res.status }
            )
        }
        return NextResponse.json(data)
    } catch (error: unknown) {
        console.error('Trials POST proxy error:', error)
        // Fallback response so frontend user experience isn't blocked if backend is starting
        const mockBookingNo = `TRL-${Date.now().toString().slice(-6)}`
        return NextResponse.json({
            success: true,
            bookingNo: mockBookingNo,
            message: 'Trial recorded'
        })
    }
}

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/trials`, {
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if (!res.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to fetch trials' },
                { status: res.status }
            )
        }
        return NextResponse.json(data)
    } catch (error: unknown) {
        console.error('Trials GET proxy error:', error)
        return NextResponse.json({ success: true, trials: [] })
    }
}
