import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Let Sanity Studio handle its own authentication
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
