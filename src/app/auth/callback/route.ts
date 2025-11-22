import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
    // Handle WorkOS callback - redirect to homepage
    // Use defensive URL construction to handle build-time execution
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://akademyx-programme-web.pages.dev'
        return NextResponse.redirect(new URL('/', baseUrl))
    } catch (error) {
        // Fallback for build-time or if URL is invalid
        return NextResponse.redirect('https://akademyx-programme-web.pages.dev')
    }
}
