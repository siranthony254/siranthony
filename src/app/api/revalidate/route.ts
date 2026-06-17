import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Revalidation API Route for Sanity Webhooks
 * 
 * This endpoint is called by Sanity webhooks when documents are created, updated, or deleted.
 * It triggers Next.js revalidation to ensure the site displays the latest content.
 * 
 * Usage:
 * 1. Deploy this project to production
 * 2. Create a webhook in Sanity Studio that triggers on:
 *    - publishDocument
 *    - deleteDocument  
 *    - updateDocument
 * 3. Point the webhook to: https://your-domain.com/api/revalidate
 * 4. Include the secret header: X-Sanity-Secret
 */

export async function POST(request: NextRequest) {
  try {
    // Verify the request comes from Sanity using the secret
    const secret = request.headers.get('x-sanity-secret')
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, error: 'Invalid secret' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { type, documentId, documentType } = body

    console.log(`Revalidation triggered: ${type} for ${documentType} (${documentId})`)

    // Revalidate specific paths based on document type
    const pathMap: Record<string, string[]> = {
      post: ['/conversations', '/'],
      author: ['/conversations', '/about'],
      gallery: ['/gallery'],
      service: ['/work', '/'],
      speakingTopic: ['/work'],
      testimonial: ['/work', '/'],
      micdupEvent: ['/micdup', '/'],
      webDevProject: ['/portfolio', '/'],
      caseStudy: ['/portfolio', '/'],
      intellectualWork: ['/portfolio', '/'],
      siteSettings: ['/', '/about', '/contact'],
    }

    // Revalidate paths associated with this document type
    const pathsToRevalidate = documentType ? pathMap[documentType] || [] : []
    
    // Always revalidate the homepage for any content change
    if (!pathsToRevalidate.includes('/')) {
      pathsToRevalidate.push('/')
    }

    // Revalidate all relevant paths
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path)
        console.log(`Revalidated path: ${path}`)
      } catch (error) {
        console.warn(`Failed to revalidate path ${path}:`, error)
      }
    }

    // Also revalidate by tag if using tag-based revalidation
    if (documentType) {
      try {
        revalidateTag(documentType)
        revalidateTag(`${documentType}-${documentId}`)
      } catch (error) {
        console.warn(`Failed to revalidate tags:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Revalidated paths for ${documentType}`,
      revalidatedPaths: pathsToRevalidate,
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Revalidation API is running',
    usage: 'POST to this endpoint with a Sanity webhook payload',
  })
}