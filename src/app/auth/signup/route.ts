import { NextRequest, NextResponse } from 'next/server'

// Explicitly disable static optimization
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

export async function GET(request: NextRequest) {
    // Redirect to homepage
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
}
