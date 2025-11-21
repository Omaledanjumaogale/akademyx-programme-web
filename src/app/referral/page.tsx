'use client'

import dynamicImport from 'next/dynamic'

const ReferralSection = dynamicImport(() => import('@/components/ReferralSection').then(mod => ({ default: mod.ReferralSection })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-96 rounded-lg"></div>
})

export const dynamic = 'force-dynamic'

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <ReferralSection />
    </div>
  )
}