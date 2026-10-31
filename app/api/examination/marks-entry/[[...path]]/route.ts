import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

function targetUrl(segments: string[] | undefined, search: string) {
    const suffix = segments?.length ? segments.join('/') : '';
    const base = `${BACKEND_URL}/api/examination/marks-entry${suffix ? `/${suffix}` : ''}`;
    return search ? `${base}${search}` : base;
}

async function proxy(request: NextRequest, method: string, segments: string[] | undefined) {
    const url = targetUrl(segments, request.nextUrl.search);
    const headers: Record<string, string> = {};
    const auth = request.headers.get('authorization');
    if (auth) headers['Authorization'] = auth;
    const contentType = request.headers.get('content-type');
    if (contentType) headers['Content-Type'] = contentType;

    let body: string | undefined;
    if (method !== 'GET' && method !== 'HEAD') {
        try {
            body = await request.text();
        } catch {
            body = undefined;
        }
    }

    const response = await fetch(url, {
        method,
        headers,
        body: body && body.length > 0 ? body : undefined,
        cache: 'no-store',
    });

    const text = await response.text();
    let data: unknown;
    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        data = { raw: text };
    }

    return NextResponse.json(data as object, { status: response.status });
}

export async function GET(request: NextRequest, ctx: { params: Promise<{ path?: string[] }> }) {
    const { path } = await ctx.params;
    return proxy(request, 'GET', path);
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ path?: string[] }> }) {
    const { path } = await ctx.params;
    return proxy(request, 'POST', path);
}

export async function PUT(request: NextRequest, ctx: { params: Promise<{ path?: string[] }> }) {
    const { path } = await ctx.params;
    return proxy(request, 'PUT', path);
}
