import { signOut } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';

export async function POST() {
    await signOut();
    return NextResponse.json({ message: 'Logged out' });
}
