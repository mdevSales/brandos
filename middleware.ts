import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware ensures all routes are publicly accessible
// No authentication required for this workshop app
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
