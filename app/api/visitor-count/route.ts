import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import os from 'os'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'
const INITIAL_VISITOR_COUNT = 900

function readLocalCount(): number {
    const candidates = [
        path.join(process.cwd(), 'data', 'visitor-count.json'),
        path.join(os.tmpdir(), 'visitor-count.json'),
    ]
    for (const filePath of candidates) {
        if (!fs.existsSync(filePath)) continue
        try {
            const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'))
            if (typeof parsed.count === 'number') return parsed.count
        } catch {
            /* try next */
        }
    }
    return INITIAL_VISITOR_COUNT
}

function writeLocalCount(count: number): void {
    let dataDir = path.join(process.cwd(), 'data')
    try {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }
        fs.writeFileSync(path.join(dataDir, 'visitor-count.json'), JSON.stringify({ count }))
    } catch {
        fs.writeFileSync(path.join(os.tmpdir(), 'visitor-count.json'), JSON.stringify({ count }))
    }
}

export async function GET(request: Request) {
    const url = new URL(request.url)
    const action = url.searchParams.get('action') === 'increment' ? 'increment' : 'get'

    try {
        const res = await fetch(`${BACKEND_URL}/api/visitor-count?action=${action}`, {
            cache: 'no-store',
        })
        const data = await res.json()
        if (res.ok && typeof data.count === 'number') {
            return NextResponse.json({ count: data.count })
        }
    } catch (error) {
        console.error('Visitor count backend proxy failed, using local fallback:', error)
    }

    try {
        let count = readLocalCount()
        if (action === 'increment') {
            count += 1
            writeLocalCount(count)
        }
        return NextResponse.json({ count })
    } catch (error: unknown) {
        console.error('Visitor count local fallback error:', error)
        return NextResponse.json({ count: INITIAL_VISITOR_COUNT })
    }
}
