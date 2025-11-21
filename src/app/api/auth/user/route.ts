import { getUser } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { user } = await getUser();
        return NextResponse.json(user || null);
    } catch (error) {
        console.error('Error fetching user:', error);
        // Return null user instead of 500 error to allow app to function in unauthenticated state
        return NextResponse.json(null);
    }
}
