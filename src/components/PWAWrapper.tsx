'use client'

import { useEffect } from 'react'
import { OfflineIndicator } from './OfflineIndicator'
import { MobileBottomNav } from './MobileBottomNav'
import { MobileHamburger } from './MobileHamburger'
import { PWAInstallPrompt } from './PWAInstallPrompt'
import { PushNotificationManager } from './PushNotificationManager'

export function PWAWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Register service worker
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log('Service Worker registered:', registration)

                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New service worker available
                                    if (confirm('New version available! Reload to update?')) {
                                        newWorker.postMessage({ type: 'SKIP_WAITING' })
                                        window.location.reload()
                                    }
                                }
                            })
                        }
                    })
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error)
                })
        }

        // Add viewport height CSS variable for mobile browsers
        const setVH = () => {
            const vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--vh', `${vh}px`)
        }

        setVH()
        window.addEventListener('resize', setVH)
        window.addEventListener('orientationchange', setVH)

        return () => {
            window.removeEventListener('resize', setVH)
            window.removeEventListener('orientationchange', setVH)
        }
    }, [])

    return (
        <>
            <OfflineIndicator />
            <MobileHamburger />
            {children}
            <MobileBottomNav />
            <PWAInstallPrompt />
            <PushNotificationManager />
        </>
    )
}
