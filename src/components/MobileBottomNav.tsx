'use client'

import { Home, BookOpen, Award, User, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from './auth/AuthProvider'

interface NavItem {
    label: string
    href: string
    icon: React.ElementType
    requiresAuth?: boolean
}

const navItems: NavItem[] = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Courses', href: '/#courses', icon: BookOpen },
    { label: 'Apply', href: '/#apply', icon: Award },
    { label: 'Profile', href: '/dashboard', icon: User, requiresAuth: true },
]

export function MobileBottomNav() {
    const pathname = usePathname()
    const { user } = useAuth()

    // Don't show on certain pages
    const hiddenPaths = ['/checkout', '/auth/login', '/auth/signup']
    if (hiddenPaths.some(path => pathname.startsWith(path))) {
        return null
    }

    const filteredNavItems = navItems.filter(item => {
        if (item.requiresAuth && !user) return false
        return true
    })

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border/50 shadow-2xl safe-area-inset-bottom">
            <div className="flex items-center justify-around px-2 py-2">
                {filteredNavItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href ||
                        (item.href !== '/' && pathname.startsWith(item.href))

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[64px] min-h-[56px] touch-manipulation"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-primary/10 rounded-xl"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <div className="relative">
                                <Icon
                                    className={`w-6 h-6 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'
                                        }`}
                                />
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                                    />
                                )}
                            </div>
                            <span
                                className={`text-xs font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
