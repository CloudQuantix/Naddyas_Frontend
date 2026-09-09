import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

async function readJsonSafe(response: Response, fallbackError: string) {
    const text = await response.text()
    try {
        return text ? JSON.parse(text) : {}
    } catch {
        return { success: false, error: fallbackError }
    }
}

export async function GET() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/admin/examination/marks-status`, { cache: 'no-store' })
        const data = await readJsonSafe(response, 'Backend returned a non-JSON response for marks status.')
        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to fetch marks upload status' },
                { status: response.status }
            )
        }
        return NextResponse.json(data)
    } catch (error: unknown) {
        console.error('[API] examination marks-status error:', error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Failed to fetch marks upload status' },
            { status: 500 }
        )
    }
}
