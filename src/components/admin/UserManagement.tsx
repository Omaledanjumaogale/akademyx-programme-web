'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    Search,
    UserPlus,
    Shield,
    Mail,
    Calendar,
    MoreVertical
} from 'lucide-react'
import { useState } from 'react'

export function UserManagement() {
    const [searchTerm, setSearchTerm] = useState('')

    // Mock user data - replace with real data from Convex
    const users = [
        {
            id: '1',
            name: 'Admin User',
            email: 'admin@akademyx.com',
            role: 'admin',
            status: 'active',
            joinedAt: new Date('2024-01-01'),
        },
        // Add more mock users as needed
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground font-heading">User Management</h2>
                    <p className="text-muted-foreground">Manage system users and permissions</p>
                </div>
                <Button className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add New User
                </Button>
            </div>

            {/* Search */}
            <Card className="border-border/50">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">System Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">User</th>
                                    <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Role</th>
                                    <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                                    <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Joined</th>
                                    <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <Users className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{user.name}</p>
                                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                                                <Shield className="w-3 h-3 mr-1" />
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-3 h-3" />
                                                {user.joinedAt.toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Button variant="outline" size="sm">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{users.length}</div>
                    </CardContent>
                </Card>
                <Card className="border-border/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                            {users.filter(u => u.status === 'active').length}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Admins</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">
                            {users.filter(u => u.role === 'admin').length}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
