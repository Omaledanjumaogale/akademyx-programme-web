'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, Wifi, RefreshCw } from 'lucide-react'
import { useNetworkState } from 'react-use'

export function OfflineIndicator() {
    const networkState = useNetworkState()
    const [showOffline, setShowOffline] = useState(false)
    const [pendingSync, setPendingSync] = useState(false)

    useEffect(() => {
        setShowOffline(!networkState.online)

        // Check for pending sync items
        if (typeof window !== 'undefined' && 'caches' in window) {
            checkPendingSync()
        }
    }, [networkState.online])

    const checkPendingSync = async () => {
        try {
            const cacheNames = await caches.keys()
            const pendingCaches = cacheNames.filter(name =>
                name.includes('pending-applications') || name.includes('pending-payments')
            )
            setPendingSync(pendingCaches.length > 0)
        } catch (error) {
            console.error('Error checking pending sync:', error)
        }
    }

    const handleRetry = async () => {
        if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
            try {
                const registration = await navigator.serviceWorker.ready
                await registration.sync.register('sync-applications')
                await registration.sync.register('sync-payments')
                setPendingSync(false)
            } catch (error) {
                console.error('Sync registration failed:', error)
            }
        }
    }

    return (
        <AnimatePresence>
            {showOffline && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                >
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <WifiOff className="w-5 h-5 animate-pulse" />
                                <div>
                                    <p className="font-semibold text-sm">You're offline</p>
                                    <p className="text-xs opacity-90">
                                        {pendingSync
                                            ? 'Some changes will sync when you're back online' 
                      : 'Limited functionality available'}
                                    </p>
                                </div>
                            </div>
                            {pendingSync && (
                                <button
                                    onClick={handleRetry}
                                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors text-sm"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span className="hidden sm:inline">Retry Sync</span>
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}

            {!showOffline && networkState.online && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                >
                    <div className="container mx-auto px-4 py-2">
                        <div className="flex items-center justify-center gap-2">
                            <Wifi className="w-4 h-4" />
                            <p className="text-sm font-medium">Back online</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
