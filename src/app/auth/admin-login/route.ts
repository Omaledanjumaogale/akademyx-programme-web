import { getSignInUrl } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';

// Explicitly disable static optimization and use Edge runtime for Cloudflare
export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

export async function GET() {
    // Get the sign-in URL - redirect will be handled by WorkOS callback
    const signInUrl = await getSignInUrl();
    return NextResponse.redirect(signInUrl);
}
