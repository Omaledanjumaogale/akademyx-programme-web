'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    CheckCircle,
    XCircle,
    Eye,
    Search,
    Filter,
    Download,
    Loader2,
    Mail,
    Phone,
    MapPin,
    User,
    Calendar
} from 'lucide-react'
import { format } from 'date-fns'

interface ApplicationManagementProps {
    applications: any
}

export function ApplicationManagement({ applications }: ApplicationManagementProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
    const [selectedApp, setSelectedApp] = useState<any>(null)

    const updateApplicationStatus = useMutation(api.crud.updateApplicationStatus)

    if (!applications) {
        return (
            <div className="text-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading applications...</p>
            </div>
        )
    }

    const handleApprove = async (applicationId: any) => {
        try {
            await updateApplicationStatus({ applicationId, status: 'approved' })
            setSelectedApp(null)
        } catch (error) {
            console.error('Failed to approve application:', error)
        }
    }

    const handleReject = async (applicationId: any) => {
        try {
            await updateApplicationStatus({ applicationId, status: 'rejected' })
            setSelectedApp(null)
        } catch (error) {
            console.error('Failed to reject application:', error)
        }
    }

    // Filter applications
    const filteredApplications = applications.filter((app: any) => {
        const matchesSearch =
            app.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.phone?.includes(searchTerm)

        const matchesStatus = statusFilter === 'all' || app.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const statusCounts = {
        all: applications.length,
        pending: applications.filter((app: any) => app.status === 'pending').length,
        approved: applications.filter((app: any) => app.status === 'approved').length,
        rejected: applications.filter((app: any) => app.status === 'rejected').length,
    }

    return (
        <div className="space-y-6">
            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground font-heading">Application Management</h2>
                    <p className="text-muted-foreground">Review and manage all programme applications</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export Data
                </Button>
            </div>

            {/* Filters */}
            <Card className="border-border/50">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="flex gap-2">
                            {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                                <Button
                                    key={status}
                                    variant={statusFilter === status ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter(status)}
                                    className="capitalize"
                                >
                                    {status} ({statusCounts[status]})
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Applications Table */}
            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">
                        Applications ({filteredApplications.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredApplications.length === 0 ? (
                        <div className="text-center py-12">
                            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground">No applications found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Applicant</th>
                                        <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Contact</th>
                                        <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Location</th>
                                        <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                                        <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Amount</th>
                                        <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Date</th>
                                        <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredApplications.map((app: any) => (
                                        <tr key={app._id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                            <td className="py-4 px-4">
                                                <div>
                                                    <p className="font-medium text-foreground">{app.firstName} {app.lastName}</p>
                                                    <p className="text-xs text-muted-foreground">{app.occupation}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Mail className="w-3 h-3" />
                                                        <span className="truncate max-w-[200px]">{app.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Phone className="w-3 h-3" />
                                                        <span>{app.phone}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{app.stateOfResident}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <Badge
                                                    variant={
                                                        app.status === 'approved' ? 'default' :
                                                            app.status === 'rejected' ? 'destructive' :
                                                                'secondary'
                                                    }
                                                    className="capitalize"
                                                >
                                                    {app.status}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="font-semibold text-foreground">₦{app.amount?.toLocaleString()}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{format(new Date(app.createdAt), 'MMM dd, yyyy')}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setSelectedApp(app)}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    {app.status === 'pending' && (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleApprove(app._id)}
                                                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleReject(app._id)}
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Application Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">Application Details</CardTitle>
                                <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                                    Close
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-foreground">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground">Full Name</label>
                                        <p className="font-medium text-foreground">{selectedApp.firstName} {selectedApp.lastName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Age</label>
                                        <p className="font-medium text-foreground">{selectedApp.age}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Email</label>
                                        <p className="font-medium text-foreground">{selectedApp.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Phone</label>
                                        <p className="font-medium text-foreground">{selectedApp.phone}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Occupation</label>
                                        <p className="font-medium text-foreground">{selectedApp.occupation}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Location</label>
                                        <p className="font-medium text-foreground">{selectedApp.location}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">State of Resident</label>
                                        <p className="font-medium text-foreground">{selectedApp.stateOfResident}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">State of Origin</label>
                                        <p className="font-medium text-foreground">{selectedApp.stateOfOrigin}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm text-muted-foreground">NIN Number</label>
                                        <p className="font-medium text-foreground">{selectedApp.ninNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Application Details */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-foreground">Application Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground">Motivation</label>
                                        <p className="font-medium text-foreground mt-1">{selectedApp.motivation}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Experience</label>
                                        <p className="font-medium text-foreground mt-1">{selectedApp.experience}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Goals</label>
                                        <p className="font-medium text-foreground mt-1">{selectedApp.goals}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            {selectedApp.status === 'pending' && (
                                <div className="flex gap-4 pt-4 border-t">
                                    <Button
                                        onClick={() => handleApprove(selectedApp._id)}
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Approve Application
                                    </Button>
                                    <Button
                                        onClick={() => handleReject(selectedApp._id)}
                                        variant="destructive"
                                        className="flex-1"
                                    >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Reject Application
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
