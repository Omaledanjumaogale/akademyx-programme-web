'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    LayoutDashboard,
    Users,
    FileText,
    DollarSign,
    Settings,
    UserCog,
    TrendingUp,
    Wallet,
    LogOut,
    Loader2,
    BarChart3,
    UserPlus,
    Award
} from 'lucide-react'

// Import sub-components
import { AnalyticsDashboard } from './AnalyticsDashboard'
import { ApplicationManagement } from './ApplicationManagement'
import { ReferralManagement } from './ReferralManagement'
import { FinancialManagement } from './FinancialManagement'
import { UserManagement } from './UserManagement'
import { SettingsPanel } from './SettingsPanel'

type TabType = 'analytics' | 'applications' | 'referrals' | 'financial' | 'users' | 'settings'

export function AdminDashboard() {
    const { user, isLoading: authLoading, logout } = useAuth()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<TabType>('analytics')

    // Fetch analytics data
    const analytics = useQuery(api.crud.getDashboardAnalytics)
    const applications = useQuery(api.crud.getApplications)
    const referralPartners = useQuery(api.crud.getReferralPartners)

    const handleLogout = async () => {
        await logout()
        router.push('/')
    }

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading admin dashboard...</p>
                </div>
            </div>
        )
    }

    // TODO: Re-enable authentication check once admin login is set up
    // if (!user) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-background">
    //             <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
    //                 <CardHeader>
    //                     <CardTitle className="text-center text-2xl font-bold text-foreground">Authentication Required</CardTitle>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <p className="text-muted-foreground mb-6 text-center">Please log in to access the admin dashboard.</p>
    //                     <Button onClick={() => router.push('/auth/login')} className="w-full h-12 text-lg">
    //                         Log In
    //                     </Button>
    //                 </CardContent>
    //             </Card>
    //         </div>
    //     )
    // }

    // TODO: Re-enable role check once admin authentication is properly set up
    // if (user && user.role !== 'admin') {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-background">
    //             <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
    //                 <CardHeader>
    //                     <CardTitle className="text-center text-2xl font-bold text-destructive">Access Denied</CardTitle>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <p className="text-muted-foreground mb-6 text-center">You don't have permission to access the admin dashboard.</p>
    //                     <Button onClick={() => router.push('/')} className="w-full h-12 text-lg">
    //                         Go Home
    //                     </Button>
    //                 </CardContent>
    //             </Card>
    //         </div>
    //     )
    // }

    const tabs = [
        { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
        { id: 'applications' as TabType, label: 'Applications', icon: FileText },
        { id: 'referrals' as TabType, label: 'Referrals', icon: Award },
        { id: 'financial' as TabType, label: 'Financial', icon: Wallet },
        { id: 'users' as TabType, label: 'Users', icon: UserCog },
        { id: 'settings' as TabType, label: 'Settings', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Header */}
            <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground font-heading">Admin Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Welcome back, {user?.firstName || user?.email || 'Admin'}</p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            size="sm"
                            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                {/* Navigation Tabs */}
                <div className="mb-8 overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <Button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    variant={activeTab === tab.id ? 'default' : 'outline'}
                                    className={`flex items-center gap-2 ${activeTab === tab.id
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'hover:bg-muted/50'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </Button>
                            )
                        })}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in duration-300">
                    {activeTab === 'analytics' && (
                        <AnalyticsDashboard
                            analytics={analytics}
                            applications={applications}
                            referralPartners={referralPartners}
                        />
                    )}
                    {activeTab === 'applications' && (
                        <ApplicationManagement applications={applications} />
                    )}
                    {activeTab === 'referrals' && (
                        <ReferralManagement referralPartners={referralPartners} />
                    )}
                    {activeTab === 'financial' && (
                        <FinancialManagement
                            analytics={analytics}
                            applications={applications}
                            referralPartners={referralPartners}
                        />
                    )}
                    {activeTab === 'users' && (
                        <UserManagement />
                    )}
                    {activeTab === 'settings' && (
                        <SettingsPanel />
                    )}
                </div>
            </div>
        </div>
    )
}
