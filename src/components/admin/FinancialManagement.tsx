'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Wallet,
    TrendingUp,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Loader2,
    CreditCard,
    PiggyBank,
    Receipt
} from 'lucide-react'

interface FinancialManagementProps {
    analytics: any
    applications: any
    referralPartners: any
}

export function FinancialManagement({ analytics, applications, referralPartners }: FinancialManagementProps) {
    if (!analytics || !applications || !referralPartners) {
        return (
            <div className="text-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading financial data...</p>
            </div>
        )
    }

    const totalRevenue = analytics.totalRevenue || 0
    const totalCommissions = analytics.totalCommissions || 0
    const paidCommissions = analytics.paidCommissions || 0
    const pendingCommissions = analytics.pendingCommissions || 0
    const netRevenue = totalRevenue - totalCommissions

    // Recent transactions (mock data - you can replace with real data)
    const recentTransactions = applications?.slice(0, 10).map((app: any) => ({
        id: app._id,
        type: 'payment',
        description: `Application fee - ${app.firstName} ${app.lastName}`,
        amount: app.amount,
        date: new Date(app.createdAt),
        status: app.paymentStatus
    })) || []

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground font-heading">Financial Management</h2>
                    <p className="text-muted-foreground">Track revenue, commissions, and manage finances</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export Report
                </Button>
            </div>

            {/* Wallet Overview */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0 shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-white/80 text-sm font-medium mb-2">Total Wallet Balance</CardTitle>
                            <div className="text-5xl font-bold mb-2">₦{netRevenue.toLocaleString()}</div>
                            <p className="text-white/70 text-sm">Net revenue after commissions</p>
                        </div>
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Wallet className="w-10 h-10" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                        <div>
                            <p className="text-white/70 text-xs mb-1">Total Revenue</p>
                            <p className="text-xl font-bold">₦{totalRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-white/70 text-xs mb-1">Total Commissions</p>
                            <p className="text-xl font-bold">₦{totalCommissions.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-white/70 text-xs mb-1">Pending Payouts</p>
                            <p className="text-xl font-bold">₦{pendingCommissions.toLocaleString()}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground mb-1">₦{totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-green-600">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground mb-1">₦{totalCommissions.toLocaleString()}</div>
                        <p className="text-xs text-red-600">Commission payouts</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground mb-1">₦{netRevenue.toLocaleString()}</div>
                        <p className="text-xs text-blue-600">
                            {totalRevenue > 0 ? Math.round((netRevenue / totalRevenue) * 100) : 0}% profit margin
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Commission Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-foreground">Commission Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                    <Receipt className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Total Commissions</p>
                                    <p className="text-sm text-muted-foreground">All time</p>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-foreground">₦{totalCommissions.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Paid Commissions</p>
                                    <p className="text-sm text-muted-foreground">Completed payouts</p>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-foreground">₦{paidCommissions.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                    <PiggyBank className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Pending Commissions</p>
                                    <p className="text-sm text-muted-foreground">Awaiting payout</p>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-foreground">₦{pendingCommissions.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Earners */}
                <Card className="border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-foreground">Top Earning Partners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {referralPartners
                                ?.sort((a: any, b: any) => (b.totalCommission || 0) - (a.totalCommission || 0))
                                .slice(0, 5)
                                .map((partner: any, index: number) => (
                                    <div key={partner._id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-500 text-white' :
                                                    index === 1 ? 'bg-gray-400 text-white' :
                                                        index === 2 ? 'bg-orange-600 text-white' :
                                                            'bg-muted text-muted-foreground'
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{partner.name}</p>
                                                <p className="text-xs text-muted-foreground">{partner.totalReferrals || 0} referrals</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-foreground">₦{(partner.totalCommission || 0).toLocaleString()}</p>
                                    </div>
                                ))}
                            {(!referralPartners || referralPartners.length === 0) && (
                                <p className="text-center text-muted-foreground py-4">No partners yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentTransactions.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">No transactions yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Description</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Date</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                                        <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.map((transaction: any) => (
                                        <tr key={transaction.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                                                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                                                    </div>
                                                    <span className="font-medium text-foreground">{transaction.description}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-muted-foreground">
                                                {transaction.date.toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${transaction.status === 'completed' ? 'bg-green-500/20 text-green-700' :
                                                        'bg-orange-500/20 text-orange-700'
                                                    }`}>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <span className="font-bold text-green-600">+₦{transaction.amount.toLocaleString()}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
