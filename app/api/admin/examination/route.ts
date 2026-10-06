import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

async function readJsonSafe(response: Response, fallbackError: string) {
    const text = await response.text();
    try {
        return text ? JSON.parse(text) : {};
    } catch {
        return { success: false, error: fallbackError };
    }
}

export async function GET() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/admin/examination`, { cache: 'no-store' });
        const data = await readJsonSafe(response, 'Backend returned a non-JSON response for examination settings.');
        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to fetch examination settings' },
                { status: response.status }
            );
        }
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API] Admin examination GET error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to fetch examination settings' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const response = await fetch(`${BACKEND_URL}/api/admin/examination`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await readJsonSafe(response, 'Backend returned a non-JSON response while updating settings.');
        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to update examination settings' },
                { status: response.status }
            );
        }
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API] Admin examination PUT error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to update examination settings' },
            { status: 500 }
        );
    }
}
