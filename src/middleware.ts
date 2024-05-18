import { env } from '@/config'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const production = process.env.NODE_ENV === 'production'

export async function middleware(req: NextRequest, res: NextResponse) {
    const { pathname } = req.nextUrl
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/hub', req.url))
    }
    const host = headers().get('host')!
    if (production && !env.ALLOWED_HOSTS.includes(host)) {
        return new NextResponse(null, { status: 403 })
    }
    return NextResponse.next()
}