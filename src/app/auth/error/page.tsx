'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function ErrorContent() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Authentication Error</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {error || 'An error occurred during authentication.'}
                    </p>
                </div>
                <div className="mt-5">
                    <Link href="/">
                        <Button>Return Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function AuthErrorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ErrorContent />
        </Suspense>
    )
}
