'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Users,
    FileText,
    DollarSign,
    TrendingUp,
    CheckCircle,
    Clock,
    Award,
    Wallet,
    UserPlus,
    Activity,
    Loader2
} from 'lucide-react'

interface AnalyticsDashboardProps {
    analytics: any
    applications: any
    referralPartners: any
}

export function AnalyticsDashboard({ analytics, applications, referralPartners }: AnalyticsDashboardProps) {
    if (!analytics || !applications || !referralPartners) {
        return (
            <div className="text-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading analytics...</p>
            </div>
        )
    }

    const stats = [
        {
            title: 'Total Applications',
            value: analytics.totalApplications || 0,
            change: '+12% from last month',
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-500/10',
        },
        {
            title: 'Pending Review',
            value: analytics.pendingApplications || 0,
            change: `${analytics.pendingApplications || 0} awaiting action`,
            icon: Clock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-500/10',
        },
        {
            title: 'Approved',
            value: analytics.approvedApplications || 0,
            change: `${analytics.conversionRate || 0}% conversion rate`,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-500/10',
        },
        {
            title: 'Total Revenue',
            value: `₦${(analytics.totalRevenue || 0).toLocaleString()}`,
            change: '+8% from last month',
            icon: DollarSign,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-500/10',
        },
        {
            title: 'Referral Partners',
            value: analytics.totalReferralPartners || 0,
            change: `${analytics.activeReferralPartners || 0} active`,
            icon: Award,
            color: 'text-purple-600',
            bgColor: 'bg-purple-500/10',
        },
        {
            title: 'Total Commissions',
            value: `₦${(analytics.totalCommissions || 0).toLocaleString()}`,
            change: `₦${(analytics.pendingCommissions || 0).toLocaleString()} pending`,
            icon: Wallet,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-500/10',
        },
        {
            title: 'Paid Commissions',
            value: `₦${(analytics.paidCommissions || 0).toLocaleString()}`,
            change: 'All time',
            icon: TrendingUp,
            color: 'text-teal-600',
            bgColor: 'bg-teal-500/10',
        },
        {
            title: 'Active Users',
            value: applications?.length || 0,
            change: 'Total enrolled',
            icon: UserPlus,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-500/10',
        },
    ]

    // Recent activity
    const recentApplications = applications?.slice(0, 5) || []

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <Card
                            key={index}
                            className="hover:shadow-xl transition-all duration-300 border-border/50 group hover:-translate-y-1"
                        >
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">{stat.change}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Application Status Breakdown */}
                <Card className="border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-foreground">Application Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="font-medium text-foreground">Approved</span>
                                </div>
                                <span className="font-bold text-foreground">{analytics.approvedApplications || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                    <span className="font-medium text-foreground">Pending</span>
                                </div>
                                <span className="font-bold text-foreground">{analytics.pendingApplications || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span className="font-medium text-foreground">Rejected</span>
                                </div>
                                <span className="font-bold text-foreground">
                                    {(analytics.totalApplications || 0) - (analytics.approvedApplications || 0) - (analytics.pendingApplications || 0)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Recent Applications
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentApplications.length === 0 ? (
                                <p className="text-muted-foreground text-center py-4">No recent applications</p>
                            ) : (
                                recentApplications.map((app: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                                        <div>
                                            <p className="font-medium text-foreground">{app.firstName} {app.lastName}</p>
                                            <p className="text-xs text-muted-foreground">{app.email}</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === 'approved' ? 'bg-green-500/20 text-green-700' :
                                                app.status === 'pending' ? 'bg-orange-500/20 text-orange-700' :
                                                    'bg-red-500/20 text-red-700'
                                            }`}>
                                            {app.status}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue Overview */}
            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">Financial Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-2xl border border-emerald-500/20">
                            <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
                            <p className="text-3xl font-bold text-foreground">₦{(analytics.totalRevenue || 0).toLocaleString()}</p>
                            <p className="text-xs text-emerald-600 mt-2">+8% from last month</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-2xl border border-yellow-500/20">
                            <p className="text-sm text-muted-foreground mb-2">Total Commissions</p>
                            <p className="text-3xl font-bold text-foreground">₦{(analytics.totalCommissions || 0).toLocaleString()}</p>
                            <p className="text-xs text-yellow-600 mt-2">₦{(analytics.pendingCommissions || 0).toLocaleString()} pending</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-teal-500/10 to-teal-500/5 rounded-2xl border border-teal-500/20">
                            <p className="text-sm text-muted-foreground mb-2">Net Revenue</p>
                            <p className="text-3xl font-bold text-foreground">
                                ₦{((analytics.totalRevenue || 0) - (analytics.totalCommissions || 0)).toLocaleString()}
                            </p>
                            <p className="text-xs text-teal-600 mt-2">After commissions</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
