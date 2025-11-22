import { NextResponse } from 'next/server'
import { env } from '@/lib/env'

export const dynamic = 'force-dynamic'

export async function GET() {
    // Handle WorkOS callback
    const baseUrl = env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return NextResponse.redirect(new URL('/', baseUrl))
}
