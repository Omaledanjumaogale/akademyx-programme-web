'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    User,
    BookOpen,
    Award,
    LogOut,
    Loader2,
    ArrowRight
} from 'lucide-react'

export default function DashboardPage() {
    const { user, isLoading, logout } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.push('/')
    }

    if (isLoading) {
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
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
                {/* Welcome Section */}
                <Card className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-bold mb-2">Welcome to Akademyx!</h2>
                        <p className="text-purple-100 mb-6">
                            Choose your dashboard type to get started with your learning journey.
                        </p>
                    </CardContent>
                </Card>

                {/* Dashboard Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Admin Dashboard */}
                    {user.role === 'admin' && (
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin')}>
                            <CardHeader>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <User className="w-6 h-6 text-purple-600" />
                                </div>
                                <CardTitle>Admin Dashboard</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">
                                    Manage applications, users, and system settings.
                                </p>
                                <Button className="w-full" variant="outline">
                                    Go to Admin <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Individual Dashboard */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/individual')}>
                        <CardHeader>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <CardTitle>Individual Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Track your learning progress and certifications.
                            </p>
                            <Button className="w-full" variant="outline">
                                View Progress <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Institution Dashboard */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/institution')}>
                        <CardHeader>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <Award className="w-6 h-6 text-green-600" />
                            </div>
                            <CardTitle>Institution Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Manage institutional partnerships and referrals.
                            </p>
                            <Button className="w-full" variant="outline">
                                View Details <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                className="justify-start h-auto py-4"
                                onClick={() => router.push('/')}
                            >
                                <BookOpen className="w-5 h-5 mr-3" />
                                <div className="text-left">
                                    <div className="font-semibold">Browse Courses</div>
                                    <div className="text-xs text-gray-500">Explore available programs</div>
                                </div>
                            </Button>

                            <Button
                                variant="outline"
                                className="justify-start h-auto py-4"
                                onClick={() => router.push('/referral')}
                            >
                                <Award className="w-5 h-5 mr-3" />
                                <div className="text-left">
                                    <div className="font-semibold">Referral Program</div>
                                    <div className="text-xs text-gray-500">Become a partner</div>
                                </div>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* User Profile */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Your Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Name:</span>
                                <span className="font-semibold">
                                    {user.firstName && user.lastName
                                        ? `${user.firstName} ${user.lastName}`
                                        : 'Not set'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-semibold">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Role:</span>
                                <span className="font-semibold capitalize">{user.role || 'user'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">User ID:</span>
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{user.id}</code>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
