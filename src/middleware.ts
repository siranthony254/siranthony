import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect Sanity Studio in production
  if (pathname.startsWith('/studio')) {
    if (process.env.NODE_ENV === 'production') {
      const basicAuth = req.headers.get('authorization')
      const user = process.env.STUDIO_USERNAME || 'admin'
      const pass = process.env.STUDIO_PASSWORD || 'changeme'
      const validCredentials = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`

      if (basicAuth !== validCredentials) {
        return new NextResponse('Authentication required', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Sir Anthony Studio"',
          },
        })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*'],
}
