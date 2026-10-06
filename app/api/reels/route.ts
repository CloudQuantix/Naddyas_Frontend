import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

function isConnectionRefused(error: unknown): boolean {
    if (!(error instanceof Error)) return false
    const cause = error.cause as { code?: string; errors?: { code?: string }[] } | undefined
    if (cause?.code === 'ECONNREFUSED') return true
    if (Array.isArray(cause?.errors)) {
        return cause.errors.some((e) => e?.code === 'ECONNREFUSED')
    }
    return false
}

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/reels`, {
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if (!res.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to fetch reels' },
                { status: res.status }
            )
        }
        return NextResponse.json(data)
    } catch (error: unknown) {
        console.error('Reels GET proxy error:', error)
        if (isConnectionRefused(error)) {
            return NextResponse.json({
                success: true,
                reels: [],
                message:
                    'Backend unavailable; reels not loaded. Start Nad_Dhyas_Backend on ' + BACKEND_URL,
            })
        }
        return NextResponse.json(
            { success: false, error: 'Failed to fetch reels' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const res = await fetch(`${BACKEND_URL}/api/reels`, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()
        if (!res.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to upload reel' },
                { status: res.status }
            )
        }
        return NextResponse.json(data)
    } catch (error: unknown) {
        console.error('Reels POST proxy error:', error)
        if (isConnectionRefused(error)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Backend server is not running. Start Nad_Dhyas_Backend on ' + BACKEND_URL,
                },
                { status: 503 }
            )
        }
        return NextResponse.json(
            { success: false, error: 'Failed to upload reel' },
            { status: 500 }
        )
    }
}
