'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Award,
    Search,
    Eye,
    CheckCircle,
    XCircle,
    Loader2,
    Mail,
    Phone,
    Building2,
    User,
    TrendingUp,
    DollarSign,
    Users
} from 'lucide-react'

interface ReferralManagementProps {
    referralPartners: any
}

export function ReferralManagement({ referralPartners }: ReferralManagementProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState<'all' | 'individual' | 'institution'>('all')
    const [selectedPartner, setSelectedPartner] = useState<any>(null)

    const updatePartnerStatus = useMutation(api.crud.updateReferralPartnerStatus)

    if (!referralPartners) {
        return (
            <div className="text-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading referral partners...</p>
            </div>
        )
    }

    const handleApprove = async (partnerId: any) => {
        try {
            await updatePartnerStatus({ partnerId, status: 'active', isApproved: true })
            setSelectedPartner(null)
        } catch (error) {
            console.error('Failed to approve partner:', error)
        }
    }

    const handleDeactivate = async (partnerId: any) => {
        try {
            await updatePartnerStatus({ partnerId, status: 'inactive', isApproved: false })
            setSelectedPartner(null)
        } catch (error) {
            console.error('Failed to deactivate partner:', error)
        }
    }

    // Filter partners
    const filteredPartners = referralPartners.filter((partner: any) => {
        const matchesSearch =
            partner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            partner.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            partner.referralCode?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesType = typeFilter === 'all' || partner.type === typeFilter

        return matchesSearch && matchesType
    })

    const typeCounts = {
        all: referralPartners.length,
        individual: referralPartners.filter((p: any) => p.type === 'individual').length,
        institution: referralPartners.filter((p: any) => p.type === 'institution').length,
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-foreground font-heading">Referral Partner Management</h2>
                <p className="text-muted-foreground">Manage referral partners and track their performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-border/50 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Partners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{referralPartners.length}</div>
                    </CardContent>
                </Card>
                <Card className="border-border/50 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Partners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                            {referralPartners.filter((p: any) => p.status === 'active').length}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/50 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Referrals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">
                            {referralPartners.reduce((sum: number, p: any) => sum + (p.totalReferrals || 0), 0)}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/50 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Commissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">
                            ₦{referralPartners.reduce((sum: number, p: any) => sum + (p.totalCommission || 0), 0).toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="border-border/50">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, email, or referral code..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {(['all', 'individual', 'institution'] as const).map((type) => (
                                <Button
                                    key={type}
                                    variant={typeFilter === type ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setTypeFilter(type)}
                                    className="capitalize"
                                >
                                    {type} ({typeCounts[type]})
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground">No referral partners found</p>
                    </div>
                ) : (
                    filteredPartners.map((partner: any) => (
                        <Card key={partner._id} className="border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${partner.type === 'institution' ? 'bg-purple-500/10' : 'bg-blue-500/10'
                                            }`}>
                                            {partner.type === 'institution' ? (
                                                <Building2 className={`w-6 h-6 ${partner.type === 'institution' ? 'text-purple-600' : 'text-blue-600'}`} />
                                            ) : (
                                                <User className="w-6 h-6 text-blue-600" />
                                            )}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg font-bold text-foreground">{partner.name}</CardTitle>
                                            <p className="text-xs text-muted-foreground capitalize">{partner.type}</p>
                                        </div>
                                    </div>
                                    <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                                        {partner.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Contact Info */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Mail className="w-3 h-3" />
                                        <span className="truncate">{partner.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Phone className="w-3 h-3" />
                                        <span>{partner.phone}</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
                                    <div className="bg-muted/30 p-3 rounded-lg">
                                        <p className="text-xs text-muted-foreground mb-1">Referrals</p>
                                        <p className="text-xl font-bold text-foreground">{partner.totalReferrals || 0}</p>
                                        <p className="text-xs text-green-600">{partner.confirmedReferrals || 0} confirmed</p>
                                    </div>
                                    <div className="bg-muted/30 p-3 rounded-lg">
                                        <p className="text-xs text-muted-foreground mb-1">Commission</p>
                                        <p className="text-xl font-bold text-foreground">₦{(partner.totalCommission || 0).toLocaleString()}</p>
                                        <p className="text-xs text-orange-600">₦{(partner.pendingCommission || 0).toLocaleString()} pending</p>
                                    </div>
                                </div>

                                {/* Referral Code */}
                                <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                                    <p className="text-xs text-muted-foreground mb-1">Referral Code</p>
                                    <code className="text-sm font-mono font-bold text-primary">{partner.referralCode}</code>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setSelectedPartner(partner)}
                                        className="flex-1"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Details
                                    </Button>
                                    {partner.status === 'inactive' && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleApprove(partner._id)}
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Partner Detail Modal */}
            {selectedPartner && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">Partner Details</CardTitle>
                                <Button variant="outline" size="sm" onClick={() => setSelectedPartner(null)}>
                                    Close
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Basic Info */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-foreground">Basic Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground">Name</label>
                                        <p className="font-medium text-foreground">{selectedPartner.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Type</label>
                                        <p className="font-medium text-foreground capitalize">{selectedPartner.type}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Email</label>
                                        <p className="font-medium text-foreground">{selectedPartner.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Phone</label>
                                        <p className="font-medium text-foreground">{selectedPartner.phone}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">NIN Number</label>
                                        <p className="font-medium text-foreground">{selectedPartner.ninNumber}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">State of Resident</label>
                                        <p className="font-medium text-foreground">{selectedPartner.stateOfResident}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">State of Origin</label>
                                        <p className="font-medium text-foreground">{selectedPartner.stateOfOrigin}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Referral Code</label>
                                        <code className="font-mono font-bold text-primary">{selectedPartner.referralCode}</code>
                                    </div>
                                </div>
                            </div>

                            {/* Institution Details */}
                            {selectedPartner.type === 'institution' && selectedPartner.institutionName && (
                                <div>
                                    <h3 className="font-bold text-lg mb-4 text-foreground">Institution Details</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="text-sm text-muted-foreground">Institution Name</label>
                                            <p className="font-medium text-foreground">{selectedPartner.institutionName}</p>
                                        </div>
                                        {selectedPartner.studentUnionPresident && (
                                            <>
                                                <div className="col-span-2">
                                                    <label className="text-sm text-muted-foreground font-bold">Student Union President</label>
                                                </div>
                                                <div>
                                                    <label className="text-sm text-muted-foreground">Name</label>
                                                    <p className="font-medium text-foreground">{selectedPartner.studentUnionPresident.name}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm text-muted-foreground">Email</label>
                                                    <p className="font-medium text-foreground">{selectedPartner.studentUnionPresident.email}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm text-muted-foreground">Phone</label>
                                                    <p className="font-medium text-foreground">{selectedPartner.studentUnionPresident.phone}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Banking Details */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-foreground">Banking Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground">Bank Name</label>
                                        <p className="font-medium text-foreground">{selectedPartner.bankingDetails.bankName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Account Number</label>
                                        <p className="font-medium text-foreground">{selectedPartner.bankingDetails.accountNumber}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm text-muted-foreground">Account Name</label>
                                        <p className="font-medium text-foreground">{selectedPartner.bankingDetails.accountName}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Stats */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-foreground">Performance Statistics</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                                        <p className="text-sm text-muted-foreground mb-1">Total Referrals</p>
                                        <p className="text-2xl font-bold text-foreground">{selectedPartner.totalReferrals || 0}</p>
                                    </div>
                                    <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                                        <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
                                        <p className="text-2xl font-bold text-foreground">{selectedPartner.confirmedReferrals || 0}</p>
                                    </div>
                                    <div className="bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20">
                                        <p className="text-sm text-muted-foreground mb-1">Total Commission</p>
                                        <p className="text-2xl font-bold text-foreground">₦{(selectedPartner.totalCommission || 0).toLocaleString()}</p>
                                    </div>
                                    <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
                                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                                        <p className="text-2xl font-bold text-foreground">₦{(selectedPartner.pendingCommission || 0).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-4 border-t">
                                {selectedPartner.status === 'inactive' ? (
                                    <Button
                                        onClick={() => handleApprove(selectedPartner._id)}
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Activate Partner
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handleDeactivate(selectedPartner._id)}
                                        variant="destructive"
                                        className="flex-1"
                                    >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Deactivate Partner
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
