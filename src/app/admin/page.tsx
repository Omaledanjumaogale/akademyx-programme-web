'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    FileText,
    DollarSign,
    TrendingUp,
    CheckCircle,
    XCircle,
    Clock,
    LogOut,
    Loader2
} from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'


export default function AdminDashboard() {
    const { user, isLoading: authLoading, logout } = useAuth()
    const router = useRouter()
    const [selectedApplication, setSelectedApplication] = useState<any>(null)

    // Fetch data from Convex
    const applications = useQuery(api.crud.listApplications)
    const referralPartners = useQuery(api.crud.listReferralPartners)

    // Mutations
    const updateApplicationStatus = useMutation(api.crud.updateApplicationStatus)

    const handleLogout = async () => {
        await logout()
        router.push('/')
    }

    const handleApproveApplication = async (id: any) => {
        try {
            await updateApplicationStatus({ id, status: 'approved' })
            setSelectedApplication(null)
        } catch (error) {
            console.error('Failed to approve application:', error)
        }
    }

    const handleRejectApplication = async (id: any) => {
        try {
            await updateApplicationStatus({ id, status: 'rejected' })
            setSelectedApplication(null)
        } catch (error) {
            console.error('Failed to reject application:', error)
        }
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
                        <p className="text-gray-600 mb-4">Please log in to access the admin dashboard.</p>
                        <Button onClick={() => router.push('/auth/login')} className="w-full">
                            Log In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Calculate statistics
    const totalApplications = applications?.length || 0
    const pendingApplications = applications?.filter((app: any) => app.status === 'pending').length || 0
    const approvedApplications = applications?.filter((app: any) => app.status === 'approved').length || 0
    const totalPartners = referralPartners?.length || 0
    const totalRevenue = applications?.reduce((sum: number, app: any) => sum + (app.amount || 0), 0) || 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-sm text-gray-600">Welcome back, {user.firstName || user.email}</p>
                        </div>
                        <Button onClick={handleLogout} variant="outline" size="sm">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Applications
                            </CardTitle>
                            <FileText className="w-4 h-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalApplications}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                {pendingApplications} pending review
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Approved
                            </CardTitle>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{approvedApplications}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                {totalApplications > 0 ? Math.round((approvedApplications / totalApplications) * 100) : 0}% approval rate
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Referral Partners
                            </CardTitle>
                            <Users className="w-4 h-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalPartners}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                Active partners
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="w-4 h-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                From all applications
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Applications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!applications ? (
                            <div className="text-center py-8">
                                <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-2" />
                                <p className="text-gray-600">Loading applications...</p>
                            </div>
                        ) : applications.length === 0 ? (
                            <div className="text-center py-8">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600">No applications yet</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Name</th>
                                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Email</th>
                                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Phone</th>
                                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Amount</th>
                                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.slice(0, 10).map((app: any) => (
                                            <tr key={app._id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4 text-sm">
                                                    {app.firstName} {app.lastName}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{app.email}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{app.phone}</td>
                                                <td className="py-3 px-4">
                                                    <Badge
                                                        variant={
                                                            app.status === 'approved' ? 'default' :
                                                                app.status === 'rejected' ? 'destructive' :
                                                                    'secondary'
                                                        }
                                                    >
                                                        {app.status}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 px-4 text-sm font-semibold">
                                                    ₦{app.amount?.toLocaleString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {app.status === 'pending' && (
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleApproveApplication(app._id)}
                                                                className="text-green-600 hover:text-green-700"
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleRejectApplication(app._id)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Referral Partners Section */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Referral Partners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!referralPartners ? (
                            <div className="text-center py-8">
                                <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-2" />
                                <p className="text-gray-600">Loading partners...</p>
                            </div>
                        ) : referralPartners.length === 0 ? (
                            <div className="text-center py-8">
                                <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600">No referral partners yet</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {referralPartners.slice(0, 6).map((partner: any) => (
                                    <Card key={partner._id}>
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                                                    <p className="text-sm text-gray-600 capitalize">{partner.type}</p>
                                                </div>
                                                <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                                                    {partner.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Referrals:</span>
                                                    <span className="font-semibold">{partner.totalReferrals}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Confirmed:</span>
                                                    <span className="font-semibold text-green-600">{partner.confirmedReferrals}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Commission:</span>
                                                    <span className="font-semibold">₦{partner.totalCommission?.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Code:</span>
                                                    <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                                                        {partner.referralCode}
                                                    </code>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
