'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, BookOpen, Users, Award, Settings, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from './auth/AuthProvider'

interface MenuItem {
    label: string
    href: string
    icon: React.ElementType
    requiresAuth?: boolean
    adminOnly?: boolean
}

const menuItems: MenuItem[] = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Courses', href: '/#courses', icon: BookOpen },
    { label: 'Apply', href: '/#apply', icon: Award },
    { label: 'Referral', href: '/referral', icon: Users },
    { label: 'Dashboard', href: '/dashboard', icon: User, requiresAuth: true },
    { label: 'Admin', href: '/dashboard/admin', icon: Settings, requiresAuth: true, adminOnly: true },
]

export function MobileHamburger() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const { user, logout } = useAuth()

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const filteredMenuItems = menuItems.filter(item => {
        if (item.requiresAuth && !user) return false
        if (item.adminOnly && user?.role !== 'admin') return false
        return true
    })

    const handleLogout = async () => {
        await logout()
        setIsOpen(false)
    }

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-card/80 backdrop-blur-md border border-border/50 shadow-lg hover:bg-card transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-foreground" />
                ) : (
                    <Menu className="w-6 h-6 text-foreground" />
                )}
            </button>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />
                )}
            </AnimatePresence>

            {/* Menu Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-card border-l border-border/50 shadow-2xl z-40 overflow-y-auto"
                    >
                        <div className="p-6 space-y-6">
                            {/* User Info */}
                            {user && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="pb-6 border-b border-border/50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">
                                                {user.firstName || user.email}
                                            </p>
                                            <p className="text-sm text-muted-foreground capitalize">
                                                {user.role || 'User'}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Navigation Links */}
                            <nav className="space-y-2">
                                {filteredMenuItems.map((item, index) => {
                                    const Icon = item.icon
                                    const isActive = pathname === item.href ||
                                        (item.href !== '/' && pathname.startsWith(item.href))

                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                                        ? 'bg-primary text-white shadow-lg'
                                                        : 'hover:bg-muted/50 text-foreground'
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span className="font-medium">{item.label}</span>
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </nav>

                            {/* Logout Button */}
                            {user && (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Logout</span>
                                </motion.button>
                            )}

                            {/* App Info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-6 border-t border-border/50 text-center text-sm text-muted-foreground"
                            >
                                <p>Akademyx Programme</p>
                                <p className="text-xs mt-1">v1.0.0</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
