import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function GET(request: NextRequest) {
    try {
        const pathParam = request.nextUrl.searchParams.get('path')
        if (!pathParam) {
            return NextResponse.json(
                { success: false, error: 'Media path is required' },
                { status: 400 }
            )
        }

        const mediaUrl = pathParam.startsWith('http')
            ? pathParam
            : `${BACKEND_URL}${pathParam.startsWith('/') ? pathParam : '/' + pathParam}`

        const range = request.headers.get('range')
        const fetchHeaders: HeadersInit = { Accept: '*/*' }
        if (range) {
            fetchHeaders['Range'] = range
        }

        const response = await fetch(mediaUrl, { method: 'GET', headers: fetchHeaders })
        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: `Failed to fetch media: ${response.status}` },
                { status: response.status }
            )
        }

        const contentType = response.headers.get('content-type') || 'application/octet-stream'
        const headers: Record<string, string> = {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
        }

        const contentLength = response.headers.get('content-length')
        const contentRange = response.headers.get('content-range')
        const acceptRanges = response.headers.get('accept-ranges')

        if (contentLength) headers['Content-Length'] = contentLength
        if (contentRange) headers['Content-Range'] = contentRange
        if (acceptRanges) headers['Accept-Ranges'] = acceptRanges

        return new NextResponse(response.body, {
            status: response.status,
            headers,
        })
    } catch (error) {
        console.error('Reels media proxy error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch media' },
            { status: 500 }
        )
    }
}
