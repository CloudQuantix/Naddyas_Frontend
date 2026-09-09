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

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get('studentId');
        const backendUrl = studentId
            ? `${BACKEND_URL}/api/examination?studentId=${encodeURIComponent(studentId)}`
            : `${BACKEND_URL}/api/examination`;
        const response = await fetch(backendUrl, { cache: 'no-store' });
        const data = await readJsonSafe(response, 'Backend returned a non-JSON response for examination info.');
        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to fetch examination info' },
                { status: response.status }
            );
        }
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API] Examination GET error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to fetch examination info' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const response = await fetch(`${BACKEND_URL}/api/examination`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await readJsonSafe(response, 'Backend returned a non-JSON response while submitting exam form.');
        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: data.error || 'Failed to submit exam form' },
                { status: response.status }
            );
        }
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error('[API] Examination POST error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to submit exam form' },
            { status: 500 }
        );
    }
}
