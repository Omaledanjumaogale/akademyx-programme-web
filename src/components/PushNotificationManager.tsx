'use client'

import { useState, useEffect } from 'react'
import { Bell, BellOff, Check } from 'lucide-react'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'

export function PushNotificationManager() {
    const [permission, setPermission] = useState<NotificationPermission>('default')
    const [showPrompt, setShowPrompt] = useState(false)
    const [subscription, setSubscription] = useState<PushSubscription | null>(null)

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission)

            // Check if user has already been prompted
            const prompted = localStorage.getItem('notification-prompted')
            if (!prompted && Notification.permission === 'default') {
                // Show prompt after a delay
                setTimeout(() => setShowPrompt(true), 5000)
            }
        }

        // Check existing subscription
        checkSubscription()
    }, [])

    const checkSubscription = async () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const registration = await navigator.serviceWorker.ready
                const sub = await registration.pushManager.getSubscription()
                setSubscription(sub)
            } catch (error) {
                console.error('Error checking subscription:', error)
            }
        }
    }

    const requestPermission = async () => {
        try {
            const result = await Notification.requestPermission()
            setPermission(result)
            localStorage.setItem('notification-prompted', 'true')

            if (result === 'granted') {
                await subscribeToPush()
                setShowPrompt(false)
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error)
        }
    }

    const subscribeToPush = async () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const registration = await navigator.serviceWorker.ready

                // Generate VAPID keys on your server and use the public key here
                const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''

                if (!vapidPublicKey) {
                    console.warn('VAPID public key not configured')
                    return
                }

                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                })

                setSubscription(subscription)

                // Send subscription to your server
                await fetch('/api/push/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(subscription)
                })

                console.log('Push subscription successful')
            } catch (error) {
                console.error('Error subscribing to push:', error)
            }
        }
    }

    const unsubscribeFromPush = async () => {
        if (subscription) {
            try {
                await subscription.unsubscribe()
                setSubscription(null)

                // Notify server
                await fetch('/api/push/unsubscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ endpoint: subscription.endpoint })
                })

                console.log('Push unsubscription successful')
            } catch (error) {
                console.error('Error unsubscribing from push:', error)
            }
        }
    }

    const handleDismiss = () => {
        setShowPrompt(false)
        localStorage.setItem('notification-prompted', 'true')
    }

    return (
        <>
            {/* Notification Prompt */}
            <AnimatePresence>
                {showPrompt && permission === 'default' && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-6 lg:max-w-md z-50"
                    >
                        <div className="bg-card border border-border/50 rounded-2xl shadow-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Bell className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1 text-foreground">Stay Updated</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Get notified about course updates, payment confirmations, and important announcements
                                    </p>
                                    <div className="flex gap-2">
                                        <Button onClick={requestPermission} className="flex-1">
                                            <Check className="w-4 h-4 mr-2" />
                                            Enable
                                        </Button>
                                        <Button onClick={handleDismiss} variant="outline" className="flex-1">
                                            Not Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notification Toggle (for settings page) */}
            {permission === 'granted' && (
                <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                        {subscription ? (
                            <Bell className="w-5 h-5 text-primary" />
                        ) : (
                            <BellOff className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                            <p className="font-medium text-foreground">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">
                                {subscription ? 'Enabled' : 'Disabled'}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={subscription ? unsubscribeFromPush : subscribeToPush}
                        variant={subscription ? 'destructive' : 'default'}
                        size="sm"
                    >
                        {subscription ? 'Disable' : 'Enable'}
                    </Button>
                </div>
            )}
        </>
    )
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}
