'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    DollarSign,
    TrendingUp,
    Award,
    LogOut,
    Loader2,
    ArrowLeft,
    Share2
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function InstitutionDashboardPage() {
    const { user, isLoading: authLoading, logout } = useAuth()
    const router = useRouter()

    // Fetch referral partner data
    const referralPartners = useQuery(api.crud.listReferralPartners)

    // Find current user's partner profile (if exists)
    const currentPartner = referralPartners?.find((p: any) => p.email === user?.email)

    const handleLogout = async () => {
        await logout()
        router.push('/')
    }

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Authentication Required</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">Please log in to access your dashboard.</p>
                        <Button onClick={() => router.push('/auth/login')} className="w-full">
                            Log In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Institution Dashboard</h1>
                                <p className="text-sm text-gray-600">Manage your referrals and earnings</p>
                            </div>
                        </div>
                        <Button onClick={handleLogout} variant="outline" size="sm">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                {!currentPartner ? (
                    /* Not a Partner Yet */
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>Become a Referral Partner</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-6">
                                You haven't registered as a referral partner yet. Join our referral program to earn commissions by referring students to Akademyx.
                            </p>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                                <h3 className="font-semibold text-purple-900 mb-2">Benefits:</h3>
                                <ul className="space-y-2 text-sm text-purple-800">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Earn ₦500 commission per confirmed referral</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Get your unique referral code</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Track all your referrals in real-time</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Monthly commission payouts</span>
                                    </li>
                                </ul>
                            </div>
                            <Button onClick={() => router.push('/referral')} className="w-full">
                                Register as Partner
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    /* Partner Dashboard */
                    <>
                        {/* Partner Info Card */}
                        <Card className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">{currentPartner.name}</h2>
                                        <p className="text-purple-100 mb-4 capitalize">{currentPartner.type} Partner</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">Referral Code:</span>
                                            <code className="bg-white/20 px-3 py-1 rounded text-lg font-mono">
                                                {currentPartner.referralCode}
                                            </code>
                                        </div>
                                    </div>
                                    <Badge variant={currentPartner.status === 'active' ? 'default' : 'secondary'} className="bg-white text-purple-600">
                                        {currentPartner.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Total Referrals
                                    </CardTitle>
                                    <Users className="w-4 h-4 text-purple-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{currentPartner.totalReferrals || 0}</div>
                                    <p className="text-xs text-gray-500 mt-1">All time</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Confirmed
                                    </CardTitle>
                                    <Award className="w-4 h-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{currentPartner.confirmedReferrals || 0}</div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {currentPartner.totalReferrals > 0
                                            ? Math.round((currentPartner.confirmedReferrals / currentPartner.totalReferrals) * 100)
                                            : 0}% conversion rate
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Total Commission
                                    </CardTitle>
                                    <DollarSign className="w-4 h-4 text-yellow-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">₦{(currentPartner.totalCommission || 0).toLocaleString()}</div>
                                    <p className="text-xs text-gray-500 mt-1">Earned to date</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Pending Payout
                                    </CardTitle>
                                    <TrendingUp className="w-4 h-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">₦{(currentPartner.pendingCommission || 0).toLocaleString()}</div>
                                    <p className="text-xs text-gray-500 mt-1">Awaiting payment</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Referral Link Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Share Your Referral Link</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                                    <div className="flex items-center justify-between">
                                        <code className="text-sm text-gray-700 flex-1">
                                            {typeof window !== 'undefined'
                                                ? `${window.location.origin}/?ref=${currentPartner.referralCode}`
                                                : `https://akademyx.com/?ref=${currentPartner.referralCode}`
                                            }
                                        </code>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    `${window.location.origin}/?ref=${currentPartner.referralCode}`
                                                )
                                            }}
                                        >
                                            Copy
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share on WhatsApp
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share on Twitter
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Banking Details */}
                        {currentPartner.bankingDetails && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Banking Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Bank Name:</span>
                                            <span className="font-semibold">{currentPartner.bankingDetails.bankName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Account Name:</span>
                                            <span className="font-semibold">{currentPartner.bankingDetails.accountName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Account Number:</span>
                                            <span className="font-semibold">{currentPartner.bankingDetails.accountNumber}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
