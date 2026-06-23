import { NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const count = await sanityFetch<number>('count(*[_type == "post"])')
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error fetching blog count:', error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
