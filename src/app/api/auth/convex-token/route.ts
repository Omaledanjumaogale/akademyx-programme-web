import { getUser } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { user } = await getUser();

        // For Convex integration with WorkOS, we'll use the user's session
        // The user object itself serves as authentication proof
        if (user) {
            // Create a simple token representation
            // In production, you might want to use a proper JWT library
            const token = Buffer.from(JSON.stringify({
                sub: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                iat: Math.floor(Date.now() / 1000),
            })).toString('base64');

            return NextResponse.json({ token });
        }

        return NextResponse.json({ token: null });
    } catch (error) {
        console.error('Failed to get access token:', error);
        return NextResponse.json({ token: null }, { status: 500 });
    }
}
