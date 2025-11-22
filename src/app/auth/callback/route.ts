import { NextRequest, NextResponse } from 'next/server'

// Explicitly disable static optimization and use Edge runtime for Cloudflare
export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

export async function GET(request: NextRequest) {
    // Handle WorkOS callback - redirect to homepage
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
}
