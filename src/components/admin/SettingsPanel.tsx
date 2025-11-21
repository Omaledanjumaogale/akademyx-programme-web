'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Settings,
    Bell,
    Lock,
    Globe,
    Palette,
    Database,
    Mail,
    Save
} from 'lucide-react'
import { useState } from 'react'

export function SettingsPanel() {
    const [settings, setSettings] = useState({
        siteName: 'Akademyx Programme',
        siteEmail: 'info@akademyx.com',
        applicationFee: '50000',
        commissionRate: '10',
        emailNotifications: true,
        smsNotifications: false,
    })

    const handleSave = () => {
        // Implement save functionality
        console.log('Saving settings:', settings)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-foreground font-heading">Settings</h2>
                <p className="text-muted-foreground">Manage system settings and configurations</p>
            </div>

            {/* General Settings */}
            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        General Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="siteName">Site Name</Label>
                            <Input
                                id="siteName"
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="siteEmail">Site Email</Label>
                            <Input
                                id="siteEmail"
                                type="email"
                                value={settings.siteEmail}
                                onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Financial Settings */}
            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        Financial Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="applicationFee">Application Fee (₦)</Label>
                            <Input
                                id="applicationFee"
                                type="number"
                                value={settings.applicationFee}
                                onChange={(e) => setSettings({ ...settings, applicationFee: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                            <Input
                                id="commissionRate"
                                type="number"
                                value={settings.commissionRate}
                                onChange={(e) => setSettings({ ...settings, commissionRate: e.target.value })}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notification Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive email alerts for new applications</p>
                            </div>
                        </div>
                        <Button
                            variant={settings.emailNotifications ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                        >
                            {settings.emailNotifications ? 'Enabled' : 'Disabled'}
                        </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                                <Bell className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">SMS Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive SMS alerts for important updates</p>
                            </div>
                        </div>
                        <Button
                            variant={settings.smsNotifications ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSettings({ ...settings, smsNotifications: !settings.smsNotifications })}
                        >
                            {settings.smsNotifications ? 'Enabled' : 'Disabled'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Security Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                            <Lock className="w-4 h-4 mr-2" />
                            Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <Lock className="w-4 h-4 mr-2" />
                            Enable Two-Factor Authentication
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Appearance
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Button variant="outline" className="flex-1">
                            Light Mode
                        </Button>
                        <Button variant="outline" className="flex-1">
                            Dark Mode
                        </Button>
                        <Button variant="default" className="flex-1">
                            System
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button onClick={handleSave} size="lg" className="gap-2">
                    <Save className="w-4 h-4" />
                    Save All Settings
                </Button>
            </div>
        </div>
    )
}
