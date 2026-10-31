import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const formData = await request.formData()
        const res = await fetch(`${BACKEND_URL}/api/reels/${id}`, {
            method: 'PUT',
            body: formData,
        })
        const data = await res.json()
        if (!res.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to update reel' },
                { status: res.status }
            )
        }
        return NextResponse.json(data)
    } catch (error: unknown) {
        console.error('Reels PUT proxy error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update reel' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const res = await fetch(`${BACKEND_URL}/api/reels/${id}`, {
            method: 'DELETE',
        })
        const data = await res.json()
        if (!res.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to delete reel' },
                { status: res.status }
            )
        }
        return NextResponse.json(data)
    } catch (error: unknown) {
        console.error('Reels DELETE proxy error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete reel' },
            { status: 500 }
        )
    }
}
