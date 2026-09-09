import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/site-about`, {
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if (!res.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to load about content' },
                { status: res.status }
            )
        }
        return NextResponse.json(data)
    } catch (error: unknown) {
        const isConnectionRefused =
            error instanceof Error &&
            (error.cause as { code?: string })?.code === 'ECONNREFUSED'
        if (isConnectionRefused) {
            return NextResponse.json({
                success: true,
                html: '',
                updatedAt: null,
                message: 'Backend unavailable; About content not loaded.',
            })
        }
        console.error('site-about GET proxy error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to load about content' },
            { status: 500 }
        )
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json()
        const res = await fetch(`${BACKEND_URL}/api/site-about`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        const data = await res.json()
        if (!res.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to save about content' },
                { status: res.status }
            )
        }
        return NextResponse.json(data)
    } catch (error: unknown) {
        const isConnectionRefused =
            error instanceof Error &&
            (error.cause as { code?: string })?.code === 'ECONNREFUSED'
        if (isConnectionRefused) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Backend server is not running. Start it on ' + BACKEND_URL,
                },
                { status: 503 }
            )
        }
        console.error('site-about PUT proxy error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to save about content' },
            { status: 500 }
        )
    }
}
