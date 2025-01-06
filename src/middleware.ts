import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/transition', request.url))
}

export const config = {
    matcher: '/((?!transition|api|_next/static|_next/image|favicon.ico).*)',
}
