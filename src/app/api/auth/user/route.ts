import { getUser } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
    const { user } = await getUser();
    return NextResponse.json(user || null);
}
