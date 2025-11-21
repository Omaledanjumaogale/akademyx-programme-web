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
    ArrowRight,
    Sparkles
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
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold text-foreground">Authentication Required</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6 text-center">Please log in to access your dashboard.</p>
                        <Button onClick={() => router.push('/auth/login')} className="w-full h-12 text-lg">
                            Log In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Header */}
            <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground font-heading">Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Welcome back, {user.firstName || user.email}</p>
                        </div>
                        <Button onClick={handleLogout} variant="outline" size="sm" className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-10 space-y-8">
                {/* Welcome Section */}
                <Card className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                    <CardContent className="p-10 relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-6 h-6 text-yellow-300" />
                            <h2 className="text-3xl font-bold font-heading">Welcome to Akademyx!</h2>
                        </div>
                        <p className="text-white/90 text-lg max-w-2xl">
                            Choose your dashboard type to get started with your learning journey.
                        </p>
                    </CardContent>
                </Card>

                {/* Dashboard Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Admin Dashboard */}
                    {user.role === 'admin' && (
                        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-border/50 hover:-translate-y-1" onClick={() => router.push('/admin')}>
                            <CardHeader>
                                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                                    <User className="w-7 h-7 text-purple-600" />
                                </div>
                                <CardTitle className="text-xl font-bold text-foreground">Admin Dashboard</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-6 min-h-[3rem]">
                                    Manage applications, users, and system settings.
                                </p>
                                <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors" variant="outline">
                                    Go to Admin <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Individual Dashboard */}
                    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-border/50 hover:-translate-y-1" onClick={() => router.push('/dashboard/individual')}>
                        <CardHeader>
                            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                                <BookOpen className="w-7 h-7 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl font-bold text-foreground">Individual Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-6 min-h-[3rem]">
                                Track your learning progress and certifications.
                            </p>
                            <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors" variant="outline">
                                View Progress <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Institution Dashboard */}
                    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-border/50 hover:-translate-y-1" onClick={() => router.push('/dashboard/institution')}>
                        <CardHeader>
                            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                                <Award className="w-7 h-7 text-emerald-600" />
                            </div>
                            <CardTitle className="text-xl font-bold text-foreground">Institution Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-6 min-h-[3rem]">
                                Manage institutional partnerships and referrals.
                            </p>
                            <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors" variant="outline">
                                View Details <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-foreground">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Button
                                variant="outline"
                                className="justify-start h-auto py-6 px-6 hover:bg-muted/50 border-border/50"
                                onClick={() => router.push('/')}
                            >
                                <div className="p-3 bg-primary/10 rounded-xl mr-4">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-foreground text-lg">Browse Courses</div>
                                    <div className="text-sm text-muted-foreground">Explore available programs</div>
                                </div>
                            </Button>

                            <Button
                                variant="outline"
                                className="justify-start h-auto py-6 px-6 hover:bg-muted/50 border-border/50"
                                onClick={() => router.push('/referral')}
                            >
                                <div className="p-3 bg-primary/10 rounded-xl mr-4">
                                    <Award className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-foreground text-lg">Referral Program</div>
                                    <div className="text-sm text-muted-foreground">Become a partner</div>
                                </div>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* User Profile */}
                <Card className="border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-foreground">Your Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-xl">
                                <span className="text-muted-foreground font-medium">Name</span>
                                <span className="font-bold text-foreground">
                                    {user.firstName && user.lastName
                                        ? `${user.firstName} ${user.lastName}`
                                        : 'Not set'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-xl">
                                <span className="text-muted-foreground font-medium">Email</span>
                                <span className="font-bold text-foreground">{user.email}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-xl">
                                <span className="text-muted-foreground font-medium">Role</span>
                                <span className="font-bold text-foreground capitalize px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{user.role || 'user'}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-xl">
                                <span className="text-muted-foreground font-medium">User ID</span>
                                <code className="text-xs bg-background border border-border px-3 py-1 rounded-lg font-mono text-muted-foreground">{user.id}</code>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
