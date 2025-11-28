'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-background border-t border-border/50 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                                <span className="text-white font-bold text-lg font-heading">A</span>
                            </div>
                            <span className="text-2xl font-bold text-foreground font-heading tracking-tight">Akademyx</span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed">
                            Empowering African youths with futuristic digital skills and multiple income streams. Join the revolution today.
                        </p>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Facebook className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Twitter className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Instagram className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Linkedin className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-foreground text-lg mb-6 font-heading">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/certifications" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                                    Certifications
                                </Link>
                            </li>
                            <li>
                                <Link href="/referral" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                                    Refer & Earn
                                </Link>
                            </li>
                            <li>
                                <Link href="/application" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                                    Apply Now
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-foreground text-lg mb-6 font-heading">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary mt-0.5" />
                                <span>support@akademyx.com</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <Phone className="w-5 h-5 text-primary mt-0.5" />
                                <span>+234 902 515 2818</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                <span>Lagos, Nigeria</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter (Optional) or Badge */}
                    <div>
                        <h3 className="font-bold text-foreground text-lg mb-6 font-heading">Stay Updated</h3>
                        <p className="text-muted-foreground mb-4">
                            Subscribe to our newsletter for the latest updates and tech tips.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <Button size="sm">Subscribe</Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground text-sm text-center md:text-left">
                        © {currentYear} Akademyx. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        <span>for African Youths</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
